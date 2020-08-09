const { file } = require("../docket-pdf-test-files/test-pdf-4");
const { parsePdfText } = require("../parse-docket-pdf.utils");

describe("test suite for test-pdf-4", () => {
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
      // Test at least one charge; ideally test all charges on docket.
      let charge1 = parsedFile.charges[0];
      expect(charge1.statute).toBe("58-37-8(1)(A)(II)");
      expect(charge1.description).toBe(
        "DISTRIBUTE/OFFER/ARRANGE DISTRIBUTION OF CONTROLLED SUBSTANC 2nd Degree Felony"
      );
      expect(charge1.disposition).toBe("Plea in abeyance");
      expect(charge1.dispositionDate).toBe("April 25, 2018");
    });
  });

  describe("verify that parseAccountSummary function works as expected", () => {
    // Include relevant tests based on the content of file.
    test("the accountSummary is empty", () => {
      expect(parsedFile.accountSummary[0].name).toBe("ACCOUNT SUMMARY");
    });
  });

  describe("verify that parseProceedings function works as expected", () => {
    // Include relevant tests based on the content of file.
    test("the case is not closed", () => {
      const closed = parsedFile.proceedings.filter(item => {
        return item.content.includes("Case Closed");
      });

      expect(closed[0]).toBeUndefined();
    });
    test("all the issued warrants were recalled", () => {
      const warrantsIssued = parsedFile.proceedings.filter(item => {
        return item.content.includes("Warrant issued");
      });
      const warrantsRecalled = parsedFile.proceedings.filter(item => {
        return item.content.includes("Warrant recalled");
      });
      expect(warrantsIssued.length).toEqual(warrantsRecalled.length);
    });
  });
});
