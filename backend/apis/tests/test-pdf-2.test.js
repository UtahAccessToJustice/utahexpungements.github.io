const { file } = require("../docket-pdf-test-files/test-pdf-2");
const { parsePdfText } = require("../parse-docket-pdf.utils");

describe("test suite for test-pdf-2", () => {
  let parsedFile;
  beforeEach(() => {
    parsedFile = parsePdfText(file);
  });
  describe("verify parseCaseNumber function works as expected", () => {
    test("case number is accurate", () => {
      expect(parsedFile.caseNumber).toBe("123456789");
    });
  });

  describe("verify that parseCharges function works as expected", () => {
    test("charges have the correct values", () => {
      let charge1 = parsedFile.charges[0];
      expect(charge1.statute).toBe("76-5-108");
      expect(charge1.description).toBe(
        "ATTEMPTED VIOLATION OF PROTECTIVE ORDER Class A Misdemeanor (amended) to Class B Misdemeanor"
      );
      expect(charge1.disposition).toBe("Guilty");
      expect(charge1.dispositionDate).toBe("April 24, 2015");
    });
  });

  describe("verify that parseAccountSummary function works as expected", () => {
    test("catches all UNPAID INTEREST accounts and includes the associated amountDue and amountPaid", () => {
      const findInterest = parsedFile.accountSummary.filter(item => {
        return item.costType === "unpaid interest";
      });
      expect(findInterest[0].amountDue).toBe("0.00");
      expect(findInterest[0].amountPaid).toBe("0.00");
    });

    test("should have collection: true at least one charge", () => {
      const collectionList = parsedFile.accountSummary.filter(item => {
        return item.collection;
      });
      expect(collectionList.length).toBeGreaterThan(0);
    });
  });

  test("should have originalAmountDue and amendedAmountDue properties for collection cases", () => {
    const collectionList = parsedFile.accountSummary.filter(item => {
      return item.collection;
    });
    expect(collectionList[0].originalAmountDue).toBe("600.00");
    expect(collectionList[0].amendedAmountDue).toBe("0.00");
  });

  describe("verify that parseProceedings function works as expected", () => {
    test("Sentence, Judgement, Commitment date is 04-24-15", () => {
      const sentenceDate = parsedFile.proceedings.filter(item => {
        return item.content.includes("Sentence, Judgment, Commitment");
      });
      expect(sentenceDate[0].date).toBe("04-24-15");
    });
    test("Case Closed on 10-12-18", () => {
      expect(
        parsedFile.proceedings[parsedFile.proceedings.length - 1].date
      ).toBe("10-12-18");
    });
  });
});
