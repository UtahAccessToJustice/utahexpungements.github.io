const sectionHeaderRegex = /^([A-Z][A-Z ]+)/g;

exports.parsePdfText = function parsePdfText(text) {
  const lines = text.split("\n");
  const sections = [];
  let gotCase = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = sectionHeaderRegex.exec(line);
    if (match && match[1].trim() !== "CASE NUMBER") {
      sections.push({
        lineNumber: i,
        name: match[1].trim()
      });
    } else if (match && match[1].trim() === "CASE NUMBER" && gotCase < 1) {
      gotCase++;
      sections.push({
        lineNumber: i,
        name: match[1].trim()
      });
    }
  }

  return {
    caseNumber: parseCaseNumber(lines, sections),
    charges: parseCharges(lines, sections),
    accountSummary: parseAccountSummary(lines, sections)
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
      lastNumericIndex = 0;
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

  return charges;
}

function parseAccountSummary(lines, sections) {
  const accounts = [];

  walkSection(lines, sections, "ACCOUNT SUMMARY", line => {
    accounts.push(line);
  });

  return accounts;
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
    walk(lines[i].trim());
  }
}
