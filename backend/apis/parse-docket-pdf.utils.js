const sectionHeaderRegex = /^([A-Z][A-Z ]+)/;

exports.parsePdfText = function parsePdfText(text) {
  const lines = text.split("\n");
  let sections = [];
  let foundCaseNumberSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = sectionHeaderRegex.exec(line);
    if (match) {
      addSection(match[1].trim(), i);
    }
  }

  function addSection(name, lineNumber) {
    const shouldAdd = name !== "CASE NUMBER" || !foundCaseNumberSection;
    if (name === "CASE NUMBER") {
      foundCaseNumberSection = true;
    }
    if (shouldAdd) {
      sections.push({ name, lineNumber });
    }
  }

  return {
    caseNumber: parseCaseNumber(lines, sections),
    charges: parseCharges(lines, sections),
    accountSummary: parseAccountSummary(lines, sections),
    proceedings: parseProceedings(lines, sections)
  };
};

function parseCaseNumber(lines, sections) {
  // There are multiple CASE NUMBER sections, but hopefully are all the same,
  // so we can just use the first one??
  const section = sections.find(section => section.name === "CASE NUMBER");

  if (!section) {
    // we apparently don't have a case number
    return null;
  }

  let caseNumber = lines[section.lineNumber];
  caseNumber = caseNumber.replace("CASE NUMBER ", "");
  caseNumber = caseNumber.slice(
    0,
    caseNumber.indexOf(" ") || caseNumber.length
  );
  return caseNumber;
}

function parseCharges(lines, sections) {
  const charges = [];

  let lastLineWasCharge = false;

  function addDispositionToCharges(line) {
    const lastCharge = charges.length > 0 ? charges[charges.length - 1] : null;

    if (lastLineWasCharge) {
      lastLineWasCharge = false;
      lastCharge.description += ` ${line}`;
    } else if (line.startsWith("Charge")) {
      lastLineWasCharge = true;
      const [chargeNumber, statute, description] = line.split(" - ");
      charges.push({
        statute,
        description
      });
    } else if (line.startsWith("Disposition:")) {
      const numeric = /\d/;
      let lastNumericIndex = 0;
      const trimmed = line.replace("Disposition: ", "");
      for (let i = 0; i < trimmed.length; i++) {
        if (numeric.test(trimmed[i])) {
          lastNumericIndex = i;
        }
      }
      lastCharge.disposition = trimmed.slice(lastNumericIndex + 1).trim();
      lastCharge.dispositionDate = trimmed
        .slice(0, lastNumericIndex + 1)
        .trim();
    }
  }

  walkSection(lines, sections, "CHARGES", addDispositionToCharges);

  const chargesWithSeverity = charges.map(charge => {
    //need to check for special cases where speeding is the charge.
    const { description, ...rest } = charge;
    const wordsArr = description.split(/\s/);
    const words = wordsArr.map(word => {
      if (word === "in") {
        word = "IN";
      } else if (word === "a") {
        word = "A";
      }
      return word;
    });
    const splitIndex = words.findIndex(word => word.toUpperCase() !== word);
    const offenseName = words.slice(0, splitIndex).join(" ");
    const severity = words.slice(splitIndex).join(" ");
    const charges = { ...rest, offenseName, severity };
    return charges;
  });

  return chargesWithSeverity;
}

function parseAccountSummary(lines, sections) {
  const subsections = [];
  let balances;
  const sectionLastIndex = sections.filter(section => {
    return section.name === "PROCEEDINGS" && section.lineNumber;
  })[0].lineNumber;

  function addAccounts(line, index) {
    const words = line.split(/\s/);
    const isSubsection =
      words.length > 0 &&
      words[0].toUpperCase() === words[0] &&
      !words.includes("CASE") &&
      /[a-zA-Z]/.test(line);

    if (isSubsection) {
      subsections.push({ name: line, lineNumber: index });
    }

    balances = subsections.map((subsection, arrayIndex) => {
      const endIndex =
        arrayIndex + 1 !== subsections.length
          ? subsections[arrayIndex + 1].lineNumber
          : sectionLastIndex;

      let amountDue,
        amountPaid,
        costType,
        collection,
        originalAmountDue,
        amendedAmountDue,
        trustName;

      for (let i = subsection.lineNumber; i < endIndex; i++) {
        const line = lines[i];
        const words = line.split(/\s/);

        if (line.includes("Amount Due")) {
          if (line.includes("Original")) {
            originalAmountDue = words[words.length - 1];
          } else if (line.includes("Amended")) {
            amendedAmountDue = words[words.length - 1];
          }
          amountDue = words[words.length - 1];
        } else if (line.includes("Amount Paid") || line.includes("Paid In")) {
          amountPaid = words[words.length - 1];
        }
        costType = getCostType(line) || costType;
        collection = collection || line.includes("State Debt Collection");
        if (line.includes("Trust Description")) {
          trustName = line.slice(line.indexOf(": ") + 2);
        }
      }
      const returnObj = {
        name: subsection.name === "TRUST DETAIL" ? trustName : subsection.name,
        amountDue,
        originalAmountDue,
        amendedAmountDue,
        amountPaid,
        costType,
        collection
      };
      return returnObj;
    });
  }

  function getCostType(line) {
    if (line.includes("Trust Description:")) {
      const target = line.slice(line.indexOf(":") + 2);
      if (target.includes("Restitution")) {
        return "restitution";
      }
      if (target.includes("Fee")) {
        return "fee";
      }
      if (target.includes("Interest")) {
        return "interest";
      }
    }

    if (line.includes("FINE")) {
      return "fine";
    }

    if (line.includes("UNPAID INTEREST")) {
      return "unpaid interest";
    }
  }

  walkSection(lines, sections, "ACCOUNT SUMMARY", addAccounts);

  return balances;
}

function parseProceedings(lines, sections) {
  const keywords = [
    "Case Closed",
    "Dismissed",
    "Warrant issued",
    "Warrant recalled",
    "Sentence",
    "sentenced",
    "plea",
    "SENTENCE, JUDGEMENT, COMMITMENT"
  ];
  const proceedings = [];
  let date, dateIndex;

  function addRelevantDates(line, index) {
    const datedLine = /[\d*][\d][-]/;

    if (line.search(datedLine) === 0) {
      date = line.slice(0, 8).trim();
      dateIndex = index;
    }
    const content = index === dateIndex ? line.slice(9) : line.slice(0);
    const result = keywords.filter(keyword => {
      return content.includes(keyword);
    });
    if (result.length > 0) {
      proceedings.push({ date, content });
    }
  }

  walkSection(lines, sections, "PROCEEDINGS", addRelevantDates);

  return proceedings;
}

function walkSection(lines, sections, name, walk) {
  const sectionIndex = sections.findIndex(section => section.name === name);

  if (sectionIndex < 0) {
    // no section with that name
    return;
  }

  const startLine = sections[sectionIndex].lineNumber;
  const endLine =
    sectionIndex + 1 < sections.length
      ? sections[sectionIndex + 1].lineNumber
      : lines.length;

  for (let i = startLine; i < endLine; i++) {
    walk(lines[i].trim(), i);
  }
}
