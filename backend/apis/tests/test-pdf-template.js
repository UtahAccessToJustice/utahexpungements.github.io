const { file } = require("../docket-pdf-test-files/test-pdf-1"); //replace with actual file path
const { parsePdfText } = require("../parse-docket-pdf.utils");

describe("test suite for test-pdf-<file number>", () => {
  let parsedFile;
  beforeEach(() => {
    parsedFile = parsePdfText(file);
  });
  describe("verify parseCaseNumber function works as expected", () => {
    test("case number is accurate", () => {
      expect(parsedFile.caseNumber).toBe("<eight digit case number>");
    });
  });

  describe("verify that parseCharges function works as expected", () => {
    test("charges have the correct values", () => {
      // Test at least one charge; ideally test all charges on docket.
      let charge1 = parsedFile.charges[0];
      expect(charge1.statute).toBe("<statute>");
      expect(charge1.description).toBe("<description>");
      expect(charge1.disposition).toBe("<disposition>");
      expect(charge1.dispositionDate).toBe("<dispositionDate>");
    });
  });

  describe("verify that parseAccountSummary function works as expected", () => {
    // Include relevant tests based on the content of file.
  });

  describe("verify that parseProceedings function works as expected", () => {
    // Include relevant tests based on the content of file.
  });
});
