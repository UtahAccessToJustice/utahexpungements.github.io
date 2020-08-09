const { file } = require("../docket-pdf-test-files/test-pdf-1");
const { parsePdfText } = require("../parse-docket-pdf.utils");

describe("test suite for test-pdf-1", () => {
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
      expect(charge1.statute).toBe("76-6-602");
      expect(charge1.description).toBe(
        "RETAIL THEFT (SHOPLIFTING) Class B Misdemeanor"
      );
      expect(charge1.disposition).toBe("{Guilty}");
      expect(charge1.dispositionDate).toBe("June 30, 2016");
    });
  });

  describe("verify that parseAccountSummary function works as expected", () => {
    test("catches all the FINES and includes the associated amountDue and amountPaid", () => {
      const findFines = parsedFile.accountSummary.filter(item => {
        return item.costType === "fine";
      });
      expect(findFines[0].amountDue).toBe("680.00");
      expect(findFines[0].amountPaid).toBe("680.00");
    });
    test("catches all the FEES and includes the associated amountDue and amountPaid", () => {
      const findFees = parsedFile.accountSummary.filter(item => {
        return item.costType === "fee";
      });
      expect(findFees[0].amountDue).toBe("49.55");
      expect(findFees[0].amountPaid).toBe("49.55");
    });
    test("catches all INTEREST accounts and includes the associated amountDue and amountPaid", () => {
      const findInterest = parsedFile.accountSummary.filter(item => {
        return item.costType === "interest";
      });
      expect(findInterest[0].amountDue).toBe("2.65");
      expect(findInterest[0].amountPaid).toBe("2.65");
    });
    test("catches all the RESTITUTION cases and includes the associated amountDue and amountPaid", () => {
      const findRestitution = parsedFile.accountSummary.filter(item => {
        return item.costType === "restitution";
      });
      expect(findRestitution[0].amountDue).toBe("99.00");
      expect(findRestitution[0].amountPaid).toBe("99.00");
    });
    test("should NOT have collection: true on any charge", () => {
      const collectionList = parsedFile.accountSummary.filter(item => {
        return item.collection;
      });
      expect(collectionList.length).toBe(0);
    });
  });

  describe("verify that parseProceedings function works as expected", () => {
    test("produces a non-empty array of proceedings", () => {
      expect(parsedFile.proceedings[0]).not.toBeUndefined();
    });
    test("Case Closed on 09-02-16", () => {
      expect(
        parsedFile.proceedings[parsedFile.proceedings.length - 1].date
      ).toBe("09-02-16");
    });
  });
});
