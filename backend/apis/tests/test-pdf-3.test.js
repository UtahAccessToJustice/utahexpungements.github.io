const { file } = require("../docket-pdf-test-files/test-pdf-3");
const { parsePdfText } = require("../parse-docket-pdf.utils");

describe("test suite for test-pdf-3", () => {
  let parsedFile;
  beforeEach(() => {
    parsedFile = parsePdfText(file);
  });

  describe("verify parseCaseNumber function works as expected", () => {
    test("case number is accurate", () => {
      expect(parsedFile.caseNumber).toBe("000000000");
    });
  });

  describe("verify that parseCharges function works as expected", () => {
    test("charges have the correct values", () => {
      let charge1 = parsedFile.charges[0];
      let charge2 = parsedFile.charges[1];
      expect(charge1.statute).toBe("53-3-202(1)(A)");
      expect(charge1.description).toBe("NO VALID LICENSE Misdemeanor");
      expect(charge1.disposition).toBe("Dismissed (w/o prej)");
      expect(charge1.dispositionDate).toBe("Month 00, 0000");

      expect(charge2.statute).toBe("41-6A-601");
      expect(charge2.description).toBe(
        "SPEEDING 70 in a 65 Class C Misdemeanor Offense Date: Month 00, 0000"
      );
      expect(charge2.disposition).toBe("Dismissed (w/o prej)");
      expect(charge2.dispositionDate).toBe("Month 00, 0000");
    });
  });

  describe("verify that parseAccountSummary function works as expected", () => {
    test("always adds accountSummary property as an array", () => {
      expect(parsedFile.accountSummary.length).toBe(1);
    });
  });

  describe("verify that parseProceedings function works as expected", () => {
    test("Charge 1 dismissed on 08-09-12", () => {
      expect(parsedFile.proceedings[0].date).toBe("08-09-12");
    });
    test("Charge 2 dismissed on 08-09-12", () => {
      expect(parsedFile.proceedings[1].date).toBe("08-09-12");
    });
    test("Case Closed on 08-09-12", () => {
      expect(
        parsedFile.proceedings[parsedFile.proceedings.length - 1].date
      ).toBe("08-09-12");
    });
  });
});
