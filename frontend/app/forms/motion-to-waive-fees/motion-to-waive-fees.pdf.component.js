import React from "react";
import RenderPage from "../render-page.component.js";
import PositionedString from "../pdf-rendering/positioned-string.component.js";
import PositionedCheckmark from "../pdf-rendering/positioned-checkmark.component.js";
import { DataContainerContext } from "../data-container.component.js";
import {
  getJudicialDistrict,
  getCounty
} from "../form-common-options/form-common-options.js";
import moment from "moment";

export default function MotionToWaiveFees_Pdf({ data, renderData }) {
  return (
    <>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-01.png">
        <PositionedString debugKey="fullName" left={farLeft} top="14.06%">
          {`${renderData("person.firstName")} ${renderData(
            "person.middleName"
          )} ${renderData("person.lastName")}`}
        </PositionedString>
        <PositionedString
          dataKey="person.addressStreet"
          left={farLeft}
          top="17.50%"
        />
        <PositionedString debugKey="lineAddress" left={farLeft} top="20.90%">
          {`${renderData("person.addressCity")}, ${renderData(
            "person.addressState"
          )} ${renderData("person.addressZip")}`}
        </PositionedString>

        <PositionedString
          dataKey="person.dayPhone"
          left={farLeft}
          top="24.75%"
        />
        <PositionedString dataKey="person.email" left={farLeft} top="27.90%" />
        <PositionedCheckmark
          dataKey="person.relation"
          left="16.4%"
          top="31.68%"
          shouldShow={data.person.relation === "plaintiffPetitioner"}
        />
        <PositionedCheckmark
          dataKey="person.relation"
          left="16.4%"
          top="33.08%"
          shouldShow={data.person.relation === "plaintiffPetitionerAttorney"}
        />
        <PositionedCheckmark
          dataKey="person.relation"
          left="40.7%"
          top="31.68%"
          shouldShow={data.person.relation === "defendantRespondent"}
        />
        <PositionedCheckmark
          dataKey="person.relation"
          left="40.7%"
          top="33.08%"
          shouldShow={data.person.relation === "defendantRespondentAttorney"}
        />
        <PositionedString dataKey="person.attorney" top="33.08%" left="77.5%" />
        <PositionedCheckmark
          dataKey="case.courtType"
          left="37.5%"
          top={courtTypeTop}
          shouldShow={data.case.courtType === "District"}
        />

        <PositionedCheckmark
          dataKey="case.courtType"
          left="47.9%"
          top={courtTypeTop}
          shouldShow={data.case.courtType === "Justice"}
        />
        <PositionedString
          dataKey="case.courtAddress"
          left="27.8%"
          top="43.2%"
        />

        <PositionedString left="25.9%" top="40.15%" debugKey="judicialDistrict">
          {data.case.courtAddress &&
            getJudicialDistrict(data.case.courtAddress, data.case.courtType)}
        </PositionedString>

        <PositionedString left="50.7%" top="40.15%" debugKey="county">
          {data.case.courtAddress &&
            getCounty(data.case.courtAddress, data.case.courtType)}
        </PositionedString>

        <PositionedString debugKey="petitionerName" left="12.5%" top="50.9%">
          {`${renderData("person.firstName")} ${renderData(
            "person.middleName"
          )} ${renderData("person.lastName")}`}
        </PositionedString>

        <PositionedString dataKey="case.defendant" left="12.5%" top="59%">
          {renderData("case.defendant")}
        </PositionedString>

        <PositionedString
          dataKey="case.caseNumber"
          left={caseJudgeLeft}
          top="56%"
        />

        <PositionedString
          dataKey="case.judgeName"
          left={caseJudgeLeft}
          top="60.5%"
        />
        <PositionedString
          dataKey="case.commissionerName"
          left={caseJudgeLeft}
          top="65.3%"
        />

        <PositionedCheckmark dataKey="case.filingFee" left="17.8%" top="78%" />
        <PositionedString
          dataKey="case.filingFeeAmount"
          top="80.2%"
          left="31.7%"
        />
        <PositionedCheckmark dataKey="case.ocapFee" left="17.8%" top="82.6%" />
        <PositionedCheckmark
          dataKey="case.divorceEducation"
          left="17.8%"
          top="85.1%"
        />

        <PositionedCheckmark
          dataKey="case.divorceOrientation"
          left="56.2%"
          top="78%"
        />
        <PositionedCheckmark
          dataKey="case.vitalRecordFee"
          left="56.2%"
          top="82%"
        />
        <PositionedCheckmark
          dataKey="case.serviceFee"
          left="56.2%"
          top="87.2%"
        />
      </RenderPage>

      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-02.png">
        <PositionedCheckmark
          dataKey="case.appealFee"
          left="17.8%"
          top="13.4%"
        />
        <PositionedCheckmark
          dataKey="case.appealFeeLarge"
          left="20.8%"
          top="15.6%"
        />
        <PositionedCheckmark
          dataKey="case.appealFeeSmall"
          left="20.8%"
          top="17.2%"
        />
        <PositionedCheckmark
          dataKey="case.otherFeeToWaive"
          left="56.3%"
          top="13.2%"
        />
        <PositionedString
          debugKey="otherFeeToWaiveExplanation"
          left="64.8%"
          top="13.3%"
        >
          {`${renderData("case.otherFeeToWaiveName")} ( $${renderData(
            "case.otherFeeToWaiveAmount"
          )} )`}
        </PositionedString>

        <PositionedCheckmark dataKey="case.employed" left="18.1%" top="24.2%" />
        <PositionedCheckmark
          dataKey="case.hourlyEmployee"
          left="22.7%"
          top="26.7%"
        />
        <PositionedCheckmark
          dataKey="case.salaryEmployee"
          left="22.7%"
          top="29.3%"
        />
        <PositionedCheckmark
          dataKey="case.selfEmployed"
          left="22.7%"
          top="31.6%"
        />
        <PositionedCheckmark
          dataKey="case.otherEmployment"
          left="22.7%"
          top="34.1%"
        />
        <PositionedString
          dataKey="case.otherEmployeeExplain"
          left="37.7%"
          top="34.1%"
        />
        <PositionedString
          dataKey="person.currentEmployment[0].NameOfEmployer"
          left="19.2%"
          top="46.2%"
          fontSize="12px"
        />
        <PositionedString
          dataKey="person.currentEmployment[0].EmployersAddress"
          left="35.2%"
          top="45.2%"
          fontSize="10px"
        />
        <PositionedString
          dataKey="person.currentEmployment[0].EmployersPhone"
          left="35.2%"
          top="47.4%"
          fontSize="10px"
        />
        <PositionedString
          dataKey="person.currentEmployment[0].JobTitle"
          left="61.9%"
          top="46.2%"
        />
        <PositionedString
          dataKey="person.currentEmployment[0].HourlyRateOrAnnualSalary"
          left="72.6%"
          top="47.3%"
        />
        <PositionedString
          dataKey="person.currentEmployment[0].HoursPerWeek"
          left="83.5%"
          top="46.2%"
        />
        <PositionedString
          dataKey="person.currentEmployment[1].NameOfEmployer"
          left="19.2%"
          top="51.2%"
          fontSize="12px"
        />
        <PositionedString
          dataKey="person.currentEmployment[1].EmployersAddress"
          left="35.2%"
          top="50.2%"
          fontSize="10px"
        />
        <PositionedString
          dataKey="person.currentEmployment[1].EmployersPhone"
          left="35.2%"
          top="52.4%"
          fontSize="10px"
        />
        <PositionedString
          dataKey="person.currentEmployment[1].JobTitle"
          left="61.9%"
          top="51.2%"
        />
        <PositionedString
          dataKey="person.currentEmployment[1].HourlyRateOrAnnualSalary"
          left="72.6%"
          top="52%"
        />
        <PositionedString
          dataKey="person.currentEmployment[1].HoursPerWeek"
          left="83.5%"
          top="51.2%"
        />
        <PositionedString
          dataKey="person.currentEmployment[2].NameOfEmployer"
          left="19.2%"
          top="56.2%"
          fontSize="12px"
        />
        <PositionedString
          dataKey="person.currentEmployment[2].EmployersAddress"
          left="35.2%"
          top="55.2%"
          fontSize="10px"
        />
        <PositionedString
          dataKey="person.currentEmployment[2].EmployersPhone"
          left="35.2%"
          top="57.4%"
          fontSize="10px"
        />
        <PositionedString
          dataKey="person.currentEmployment[2].JobTitle"
          left="61.9%"
          top="56.2%"
        />
        <PositionedString
          dataKey="person.currentEmployment[2].HourlyRateOrAnnualSalary"
          left="72.6%"
          top="56.8%"
        />
        <PositionedString
          dataKey="person.currentEmployment[2].HoursPerWeek"
          left="83.5%"
          top="56.2%"
        />
        <PositionedCheckmark
          dataKey="case.unemployed"
          left="18.1%"
          top="60.4%"
        />
        <PositionedString
          dataKey="case.unemployedExplanation"
          left="21.8%"
          top="62.8%"
        />

        <PositionedString
          dataKey="case.adultDependents"
          left="40.7%"
          top="76.4%"
        />
        <PositionedString
          dataKey="case.childrenDependents"
          left="40.7%"
          top="79.9%"
        />
      </RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-03.png">
        <PositionedCheckmark
          dataKey="person.grossMonthlyIncome"
          left="18%"
          top="16.8%"
        />
        <PositionedString
          dataKey="person.income.workIncome"
          left="76%"
          top="27%"
        />
        <PositionedString
          dataKey="person.income.rentalIncome"
          left="76%"
          top="29%"
        />
        <PositionedString
          dataKey="person.income.businessIncome"
          left="76%"
          top="31.3%"
        />
        <PositionedString
          dataKey="person.income.interest"
          left="76%"
          top="33.7%"
        />
        <PositionedString
          dataKey="person.income.dividends"
          left="76%"
          top="36%"
        />
        <PositionedString
          dataKey="person.income.retirementIncome"
          left="76%"
          top="38.4%"
        />
        <PositionedString
          dataKey="person.income.workersCompensation"
          left="76%"
          top="40.8%"
        />
        <PositionedString
          dataKey="person.income.privateDisabilityInsurance"
          left="76%"
          top="42.9%"
        />
        <PositionedString dataKey="person.income.ssdi" left="76%" top="45.1%" />
        <PositionedString dataKey="person.income.ssi" left="76%" top="47.5%" />
        <PositionedString
          dataKey="person.income.socialSecurityOther"
          left="76%"
          top="49.9%"
        />
        <PositionedString
          dataKey="person.income.unemploymentBenefits"
          left="76%"
          top="52.3%"
        />
        <PositionedString
          dataKey="person.income.educationalBenefits"
          left="76%"
          top="54.4%"
        />
        <PositionedString
          dataKey="person.income.veteransBenefits"
          left="76%"
          top="57%"
        />
        <PositionedString
          dataKey="person.income.alimony"
          left="76%"
          top="59.3%"
        />
        <PositionedString
          dataKey="person.income.childSupport"
          left="76%"
          top="61.6%"
        />
        <PositionedString
          dataKey="person.income.civilPayments"
          left="76%"
          top="63.7%"
        />
        <PositionedString
          dataKey="person.income.victimRestitution"
          left="76%"
          top="66.1%"
        />
        <PositionedString
          dataKey="person.income.publicAssistance"
          left="76%"
          top="68.4%"
        />
        <PositionedString
          dataKey="person.income.householdFinancialSupport"
          left="76%"
          top="70.7%"
        />
        <PositionedString
          dataKey="person.income.otherFinancialSupport"
          left="76%"
          top="73.3%"
        />
        <PositionedString
          dataKey="person.income.trustIncome"
          left="76%"
          top="75.5%"
        />
        <PositionedString
          dataKey="person.income.annuityIncome"
          left="76%"
          top="77.9%"
        />
        <PositionedString
          dataKey="person.income.total"
          left="76%"
          top="84.6%"
        />
      </RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-04.png">
        <PositionedCheckmark
          dataKey="person.noGrossMonthlyIncome"
          left="18%"
          top="13.4%"
        />
        <PositionedString
          dataKey="person.noGrossMonthlyIncomeExplanation"
          left="18%"
          top="15.7%"
        />

        <PositionedCheckmark
          dataKey="person.monthlyTaxDeductions"
          top="30.8%"
          left="18%"
        />
        <PositionedCheckmark
          dataKey="person.monthlyTaxDeductions"
          top="28.3%"
          left="18%"
          shouldShow={data.person.monthlyTaxDeductions === false}
        />

        <PositionedString dataKey="person.tax.federal" top="36.7%" left="49%" />
        <PositionedString dataKey="person.tax.state" top="39%" left="49%" />
        <PositionedString
          dataKey="person.tax.municipal"
          top="41.6%"
          left="49%"
        />
        <PositionedString dataKey="person.tax.FICA" top="43.9%" left="49%" />
        <PositionedString
          dataKey="person.tax.medicare"
          top="46.7%"
          left="49%"
        />

        <PositionedString
          dataKey="person.expenses.rent"
          top="81.5%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.realEstateTax"
          top="83.4%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.realEstateInsurance"
          top="85.8%"
          left="69.5%"
        />
      </RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-05.png">
        <PositionedString
          dataKey="person.expenses.realEstateMaintenance"
          top="17.7%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.foodHomeSupplies"
          top="19.9%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.clothing"
          top="22.3%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.autoPayments"
          top="24.5%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.autoInsurance"
          top="27%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.autoFuel"
          top="29.2%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.maintenance"
          top="31.5%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.transportation"
          top="33.9%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.utilities"
          top="36.3%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.telephone"
          top="38.5%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.television"
          top="40.8%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.internet"
          top="43.3%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.creditCardPayments"
          top="45.5%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.loanAndOtherDebt"
          top="47.7%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.alimony"
          top="50%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.childSupport"
          top="52.5%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.childCare"
          top="54.7%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.extraActivitiesChildren"
          top="57%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.educationChild"
          top="59.4%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.educationSelf"
          top="61.7%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.healthInsurance"
          top="64%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.healthExpenses"
          top="66.3%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.otherInsurance"
          top="68.6%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.entertainment"
          top="70.9%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.laundryDryClean"
          top="73.2%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.donations"
          top="75.5%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.gifts"
          top="77.9%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.unionDues"
          top="80.2%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.garnishments"
          top="82.6%"
          left="69.5%"
        />
        <PositionedString
          dataKey="person.expenses.retireDeposits"
          top="84.8%"
          left="69.5%"
        />
      </RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-06.png">
        <PositionedCheckmark
          dataKey="person.businessInterest"
          top="28%"
          left="18%"
        />
        <PositionedCheckmark
          dataKey="person.businessInterest"
          top="25.7%"
          left="18%"
          shouldShow={data.person.businessInterest !== true}
        />
        <PositionedCheckmark
          dataKey="person.financialAssets"
          top="66.7%"
          left="18%"
        />
        <PositionedCheckmark
          dataKey="person.financialAssets"
          top="64.1%"
          left="18%"
          shouldShow={data.person.financialAssets !== true}
        />
      </RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-07.png"></RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-08.png">
        <PositionedCheckmark dataKey="person.realEstate" top="29%" left="18%" />
        <PositionedCheckmark
          dataKey="person.realEstate"
          top="26.4%"
          left="18%"
          shouldShow={data.person.realEstate !== true}
        />
        <PositionedCheckmark
          dataKey="person.personalProperty"
          top="80.4%"
          left="18%"
        />
        <PositionedCheckmark
          dataKey="person.personalProperty"
          top="77.8%"
          left="18%"
          shouldShow={data.person.personalProperty !== true}
        />
      </RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-09.png">
        <PositionedCheckmark
          dataKey="person.debtsOwed"
          top="42.8%"
          left="18%"
        />
        <PositionedCheckmark
          dataKey="person.debtsOwed"
          top="40.3%"
          left="18%"
          shouldShow={data.person.debtsOwed !== true}
        />
        <PositionedCheckmark
          dataKey="person.otherReasonNotToPay"
          top="75.2%"
          left="18%"
        />
        <PositionedString
          dataKey="person.otherNoPayExplanation"
          top="77.6%"
          left="18%"
        />
      </RenderPage>
      <RenderPage url="/static/forms/motion-to-waive-fees/Motion_to_Waive_Fees_and_Statement_Supporting-10.png">
        <PositionedString debugKey="printedName" left="54.4%" top="33.6%">
          {`${renderData("person.firstName")} ${renderData(
            "person.middleName"
          )} ${renderData("person.lastName")}`}
        </PositionedString>
      </RenderPage>
    </>
  );
}

const farLeft = `11.28%`;
const courtTypeTop = `36.9%`;
const countyDistrictTop = `37.35%`;
const caseJudgeLeft = `54.1%`;
const caseNumberLeft = `37.1%`;
