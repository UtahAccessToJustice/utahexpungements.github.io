import React from "react";
import TextInput from "../inputs/text-input.component.js";
import FormThatPrints from "../inputs/form-that-prints.component.js";
import Section from "../inputs/section.component.js";
import Select from "../inputs/select.component.js";
import Radio from "../inputs/radio.component.js";
import GroupSelect from "../inputs/group-select.component.js";
import CheckBox from "../inputs/checkbox.component.js";
import TextArea from "../inputs/text-area.component.js";
import {
  DistrictCourtList,
  JusticeCourtList,
  courtTypeOptions
} from "../form-common-options/form-common-options.js";
import TextInputGroup from "../inputs/text-input-group.component.js";
import { DataContainerContext } from "../data-container.component.js";
import useDeepCompareEffect from "../../../hooks/useDeepCompareEffect.js";

const waiveFeeRelationship = [
  { value: "plaintiffPetitioner", label: "plaintiff / Petitioner" },
  {
    value: "plaintiffPetitionerAttorney",
    label: "plaintiff / Petitioner's Attorney"
  },
  { value: "defendantRespondent", label: "Defendant / Respondent" },
  {
    value: "defendantRespondentAttorney",
    label: "Defendant / Respondent's Attorney"
  }
];

const employerInputs = [
  "NameOfEmployer",
  "EmployersAddress",
  "EmployersPhone",
  "JobTitle",
  "HourlyRateOrAnnualSalary",
  "HoursPerWeek"
];

const businessInterests = [
  "BusinessName",
  "Address",
  "Phone",
  "NatureOfBusiness",
  "CurrentValueOfBusiness",
  "PercentOwnedByPetitioner",
  "PercentOwnedByPlaintiff"
];

const realEstateInterest = [
  "Address",
  "DateAcquired",
  "NamesOnTitle",
  "OriginalCost",
  "CurrentValue",
  "FirstMortgageOrLienHolder",
  "FirstMortgageOrLienHolderAddress",
  "FirstMortgageOrLienHolderPhone",
  "AmountOwed",
  "MonthlyPayments",
  "SecondMortgageOrLienHolder",
  "SecondMortgageOrLienHolderAddress",
  "SecondMortgageOrLienHolderPhone",
  "AmountOwed",
  "MonthlyPayments"
];

const personalPropertyList = [
  "PropertyDescription",
  "DebtOwedTo",
  "NamesOnTitle",
  "AmountOwed",
  "MinimumMonthlyPayment"
];

const debtOwed = [
  "TypeOfDebt",
  "DebtOwedTo",
  "NamesOnDebt",
  "AmountOwed",
  "MinimumMonthlyPayment"
];

const bankOrCredit = [
  "AccountNumber",
  "DateOpened",
  "NameAndAddress",
  "NamesOnAccount",
  "CurrentBalance"
];

function DisplayTotal({ amounts, dataKey }) {
  const dataContext = React.useContext(DataContainerContext);
  let [total, setTotal] = React.useState(0);

  useDeepCompareEffect(() => {
    if (amounts) {
      setTotal(sumObjectValues(amounts));
    }
  }, [amounts]);

  return <div className="web-form-input">Total: {total}</div>;
}

function sumObjectValues(values) {
  if (!values) {
    return 0;
  }
  const params = Object.keys(values);
  if (params.length == 0) {
    return 0;
  } else {
    const copyValues = Object.assign({}, values);
    const firstKey = params[0];
    const value = isNaN(parseInt(values[firstKey]))
      ? 0
      : parseInt(values[firstKey]);
    delete copyValues[firstKey];
    return value + sumObjectValues(copyValues);
  }
}

export default function MotionToWaiveFees_Web({ data }) {
  return (
    <FormThatPrints>
      <h1 className="web-from-input">This is a private record</h1>
      <Section name="1. Personal Information">
        <TextInput dataKey="person.firstName" label="First name" />
        <TextInput dataKey="person.middleName" label="Middle name" />
        <TextInput dataKey="person.lastName" label="Last name" />
        <TextInput dataKey="person.addressStreet" label="Street address" />
        <TextInput dataKey="person.addressCity" label="City" />
        <TextInput dataKey="person.addressState" label="State" />
        <TextInput dataKey="person.addressZip" label="Zip" />
        <TextInput dataKey="person.dayPhone" label="Phone" />
        <TextInput dataKey="person.email" label="Email" />
        <small className="web-form-input">
          Check your email. You will receive information and documents at this
          email address.
        </small>

        <Select
          dataKey="person.relation"
          label="Relation"
          options={waiveFeeRelationship}
        />

        {data.person.relation && data.person.relation.includes("Attorney") && (
          <TextInput label="Bar Number" dataKey="person.attorney.barNumber" />
        )}
      </Section>

      <Section name="2. Case Information">
        <Radio
          dataKey="case.courtType"
          label="Court Type"
          options={courtTypeOptions}
        />

        {data.case.courtType === "District" && (
          <GroupSelect
            dataKey="case.courtAddress"
            label="District Courts"
            groupOptions={DistrictCourtList}
          />
        )}
        {data.case.courtType === "Justice" && (
          <GroupSelect
            dataKey="case.courtAddress"
            label="Justice Courts"
            groupOptions={JusticeCourtList}
          />
        )}

        <TextInput dataKey="case.caseNumber" label="Case number" />
        <TextInput dataKey="case.judgeName" label="Judge" />
        <TextInput dataKey="case.commissionerName" label="Commissioner" />
        <small className="web-form-input">(Domestic cases)</small>
        <TextInput dataKey="case.defendant" label={__("respondent")} />
      </Section>

      <Section name="3. Fees to waive">
        <p className="web-form-input">
          I ask for the following fee(s) to be waived:
        </p>
        <small className="web-form-input">(Choose all that apply)</small>
        <CheckBox
          dataKey="case.filingFee"
          label="Filing fee"
          name="feesToWaive"
        />
        <small className="web-form-input">(Refer to Civil Cover Sheet)</small>
        {data.case.filingFee && (
          <TextInput label="Filing Fee Amount" dataKey="case.filingFeeAmount" />
        )}
        <CheckBox dataKey="case.ocapFee" label="OCAP fee" name="feesToWaive" />
        <small className="web-form-input">($20.00)</small>

        <CheckBox
          name="feesToWaive"
          dataKey="case.divorceEducation"
          label="Divorce education class fee"
        />
        <small className="web-form-input">(Maximum $35.00)</small>

        <CheckBox
          dataKey="case.divorceOrientation"
          label="Divorce orientation class fee"
          name="feesToWaive"
        />
        <small className="web-form-input">(Maximum $30.00)</small>

        <CheckBox
          dataKey="case.vitalRecordFee"
          label="Office of Vital Records fee"
          name="feesToWaive"
        />
        <small className="web-form-input">
          (Certification of Adoption or Certificate of Divorce; $8.00)
        </small>

        <CheckBox
          dataKey="case.serviceFee"
          label="Service Fee"
          name="feesToWaive"
        />
        <small className="web-form-input">(within Utah)</small>

        <CheckBox
          dataKey="case.appealFee"
          label="Appeal fee"
          name="feesToWaive"
        />
        {data.case.appealFee && (
          <>
            <CheckBox
              label="$225 Filing fee"
              dataKey="case.appealFeeLarge"
              name="filingFeeAmount"
            />
            <CheckBox
              label="$10 small claims appeal"
              dataKey="case.appealFeeSmall"
              name="filingFeeAmount"
            />
            <small className="web-form-input">(Justice Court)</small>
          </>
        )}
        <CheckBox
          dataKey="case.otherFeeToWaive"
          label="Other"
          name="feesToWaive"
        />
        {data.case.otherFeeToWaive && (
          <>
            <TextInput label="Explain" dataKey="case.otherFeeToWaiveName" />
            <TextInput label="Amount" dataKey="case.otherFeeToWaiveAmount" />
          </>
        )}
      </Section>

      <Section name="4. Employment">
        <CheckBox
          dataKey="case.employed"
          label="I am employed"
          name="employmentStatuses"
        />
        {data.case.employed && (
          <>
            <small className="web-form-input">(Choose all that apply):</small>
            <CheckBox
              dataKey="case.hourlyEmployee"
              label="An hourly employee"
              name="employmentType"
            />
            <small className="web-form-input">(Form W-2)</small>
            <CheckBox
              dataKey="case.salaryEmployee"
              label="A salaried employee"
              name="employmentType"
            />
            <small className="web-form-input">(Form W-2)</small>
            <CheckBox
              dataKey="case.selfEmployed"
              label="Self-employed"
              name="employmentType"
            />
            <small className="web-form-input">
              (Form 1099, Form K-1, Schedule C, etc.)
            </small>
            <CheckBox
              dataKey="case.otherEmployment"
              label="other"
              name="employmentType"
            />
            {data.case.otherEmployment && (
              <TextArea dataKey="case.otherEmployeeExplain" label="Explain" />
            )}
          </>
        )}
        {data.case.employed &&
          (data.case.hourlyEmployee ||
            data.case.salaryEmployee ||
            data.case.selfEmployed ||
            data.case.otherEmployment) && (
            <TextInputGroup
              groupLabel="Current Employers"
              buttonLabel="Employer"
              inputs={employerInputs}
              dataKey="person.currentEmployment"
              maxInputs={3}
            />
          )}
        <CheckBox
          dataKey="case.unemployed"
          label="I am unemployed"
          name="employmentStatuses"
        />
        {data.case.unemployed && (
          <TextArea dataKey="case.unemployedExplanation" label="Explain" />
        )}
      </Section>

      <Section name="5. Dependents">
        <p className="web-form-input">
          The following people depend on me for support
        </p>
        <small className="web-form-input">
          (Count Spouse, children or other dependents in your house hold.)
        </small>
        <TextInput label="Number of adults" dataKey="case.adultDependents" />
        <TextInput
          label="Number of children under 18"
          dataKey="case.childrenDependents"
        />
      </Section>

      <Section name="6. Gross Monthly Income">
        <CheckBox
          label="I have the following monthly income before tax deductions:"
          name="grossMonthlyIncome"
          dataKey="person.grossMonthlyIncome"
        />
        <small className="web-form-input">
          (For income that changes from month to month, calculate the annual
          total and divide by 12 months to list a monthly average.)
        </small>
        {data.person.grossMonthlyIncome && (
          <>
            <TextInput label="Work" dataKey="person.income.workIncome" />
            <small className="web-form-input">
              (Including self employment, wages, salaries, commissions, bonuses,
              tips and overtime)
            </small>
            <TextInput
              label="Rental income"
              dataKey="person.income.rentalIncome"
            />
            <TextInput
              label="Business income"
              dataKey="person.income.businessIncome"
            />
            <TextInput label="Interest" dataKey="person.income.interest" />
            <TextInput label="Dividends" dataKey="person.income.dividends" />
            <TextInput
              label="Retirement income"
              dataKey="person.income.retirementIncome"
            />
            <small className="web-form-input">
              (Including pensions, 401(k), IRA, etc.)
            </small>
            <TextInput
              label="Workers compensation"
              dataKey="person.income.workersCompensation"
            />
            <TextInput
              label="Private disability insurance"
              dataKey="person.income.privateDisabilityInsurance"
            />
            <TextInput
              label="Social Security Disability Income"
              dataKey="person.income.ssdi"
            />
            <small className="web-form-input">(SSDI)</small>
            <TextInput
              label="Supplemental Security Income"
              dataKey="person.income.ssi"
            />
            <small className="web-form-input">(SSI)</small>
            <TextInput
              label="Social Security"
              dataKey="person.income.socialSecurityOther"
            />
            <small className="web-form-input">(Other than SSDI or SSI)</small>
            <TextInput
              label="Unemployment benefits"
              dataKey="person.income.unemploymentBenefits"
            />
            <TextInput
              label="Educational benefits"
              dataKey="person.income.educationalBenefits"
            />
            <small className="web-form-input">
              (Including grants, loans, cash scholarships, etc.)
            </small>
            <TextInput
              label="Veteran's benefits"
              dataKey="person.income.veteransBenefits"
            />
            <TextInput label="Alimony" dataKey="person.income.alimony" />
            <TextInput
              label="Child Support"
              dataKey="person.income.childSupport"
            />
            <TextInput
              label="Payments from civil litigation "
              dataKey="person.income.civilPayments"
            />
            <TextInput
              label="Victim restitution"
              dataKey="person.income.victimRestitution"
            />
            <TextInput
              label="Public assistance"
              dataKey="person.income.publicAssistance"
            />
            <small className="web-form-input">
              (Including AFDC, FEP, TANF, welfare, etc.)
            </small>
            <TextInput
              label="Financial support from household members"
              dataKey="person.income.householdFinancialSupport"
            />
            <TextInput
              label="Financial support from non-household members"
              dataKey="person.income.otherFinancialSupport"
            />
            <TextInput
              label="Trust income"
              dataKey="person.income.trustIncome"
            />
            <TextInput
              label="Annuity income"
              dataKey="person.income.annuityIncome"
            />
          </>
        )}
        <DisplayTotal
          amounts={data.person.income}
          dataKey="person.income.total"
        />
        <CheckBox
          label="I have no income because:"
          dataKey="person.noGrossMonthlyIncome"
          name="grossMonthlyIncome"
        />
        {data.person.noGrossMonthlyIncome && (
          <TextArea
            label="Explain"
            dataKey="person.noGrossMonthlyIncomeExplanation"
          />
        )}
      </Section>

      <Section name="6. Monthly Tax Deductions">
        <CheckBox
          label="I have the following monthly tax deductions."
          dataKey="person.monthlyTaxDeductions"
          name="monthlyTaxDeductions"
        />
        {data.person.monthlyTaxDeductions && (
          <>
            <TextInput
              label="Federal income tax"
              dataKey="person.tax.federal"
            />
            <TextInput label="State income tax" dataKey="person.tax.state" />
            <TextInput
              label="Municipal income tax"
              dataKey="person.tax.municipal"
            />
            <TextInput label="FICA" dataKey="person.tax.FICA" />
            <TextInput label="Medicare" dataKey="person.tax.medicare" />
          </>
        )}
      </Section>

      <Section name="7. Monthly expenses">
        <small className="web-form-input">
          (Include amounts you pay for yourself and any spouse, children or
          other dependents in your household)
        </small>
        <TextInput label="Rent or mortgage" dataKey="person.expenses.rent" />
        <TextInput
          label="Real estate taxes"
          dataKey="person.expenses.realEstateTax"
        />
        <small className="web-form-input">(if not included in mortgage)</small>
        <TextInput
          label="real estate insurance"
          dataKey="person.expenses.realEstateInsurance"
        />
        <small className="web-form-input">(if not included in mortgage)</small>
        <TextInput
          label="Real estate maintenance"
          dataKey="person.expenses.realEstateMaintenance"
        />
        <TextInput
          label="Food and household supplies"
          dataKey="person.expenses.foodHomeSupplies"
        />
        <TextInput label="Clothing" dataKey="person.expenses.clothing" />
        <TextInput
          label="Automobile payments"
          dataKey="person.expenses.autoPayments"
        />
        <TextInput
          label="Automobile insurance"
          dataKey="person.expenses.autoInsurance"
        />
        <TextInput label="Automobile fuel" dataKey="person.expenses.autoFuel" />
        <TextInput
          label="Automobile maintenance"
          dataKey="person.expenses.maintenance"
        />
        <TextInput
          label="Other transportation costs"
          dataKey="person.expenses.transportation"
        />
        <small className="web-form-input">
          (public transportation, parking, etc.)
        </small>
        <TextInput label="Utilities" dataKey="person.expenses.utilities" />
        <small className="web-form-input">
          (such as electricity gas, water, sewage, garbage)
        </small>
        <TextInput label="Telephone" dataKey="person.expenses.telephone" />
        <TextInput
          label="Paid television, cable, satellite"
          dataKey="person.expenses.television"
        />
        <TextInput label="Internet" dataKey="person.expenses.internet" />
        <TextInput
          label="Credit card payments"
          dataKey="person.expenses.creditCardPayments"
        />
        <TextInput
          label="Loan and other debt payments"
          dataKey="person.expenses.loanAndOtherDebt"
        />
        <TextInput label="Alimony" dataKey="person.expenses.alimony" />
        <TextInput
          label="Child support"
          dataKey="person.expenses.childSupport"
        />
        <TextInput label="Child care" dataKey="person.expenses.childCare" />
        <TextInput
          label="Extracurricular activities for children"
          dataKey="person.expenses.extraActivitiesChildren"
        />
        <TextInput label="Education" dataKey="person.expenses.educationChild" />
        <small className="web-form-input">(children)</small>
        <TextInput label="Education" dataKey="person.expenses.educationSelf" />
        <small className="web-form-input">(self)</small>
        <TextInput
          label="Health care insurance"
          dataKey="person.expenses.healthInsurance"
        />
        <TextInput
          label="Health care expenses"
          dataKey="person.expenses.healthExpenses"
        />
        <small className="web-form-input">
          (excluding insurance listed above)
        </small>
        <TextInput
          label="Other insurance"
          dataKey="person.expenses.otherInsurance"
        />
        <small className="web-form-input">(describe)</small>
        <TextInput
          label="Entertainment"
          dataKey="person.expenses.entertainment"
        />
        <TextInput
          label="Laundry and dry cleaning"
          dataKey="person.expenses.laundryDryClean"
        />
        <TextInput label="Donations" dataKey="person.expenses.donations" />
        <TextInput label="Gifts" dataKey="person.expenses.gifts" />
        <TextInput
          label="Union and other dues"
          dataKey="person.expenses.unionDues"
        />
        <TextInput
          label="Garnishments or expense withholding order"
          dataKey="person.expenses.garnishments"
        />
        <TextInput
          label="Retirement deposits"
          dataKey="person.expenses.retireDeposits"
        />
        <small className="web-form-input">
          (including pensions, 401(k), IRA, etc.)
        </small>
      </Section>

      <Section name="8. Business Interest">
        <CheckBox
          label="I have the following business interests"
          dataKey="person.businessInterest"
          name="businessInterests"
        />
        {data.person.businessInterest && (
          <TextInputGroup
            groupLabel="Business interests"
            inputs={businessInterests}
            buttonLabel="business"
            maxInputs={2}
            dataKey="person.currentBusinessInterests"
          />
        )}
      </Section>

      <Section name="9. Financial Assets">
        <CheckBox
          label="I have the following financial assets."
          dataKey="person.financialAssets"
          name="financialAssets"
        />
        {data.person.financialAssets && (
          <React.Fragment>
            <CheckBox
              label="Bank or credit union"
              dataKey="person.financialBankOrCreditUnion"
              name="bankOrCredit"
            />
            {data.person.financialBankOrCreditUnion && (
              <TextInputGroup
                groupLabel="Bank or credit union"
                inputs={bankOrCredit}
                buttonLabel="Bank or credit union"
                maxInputs={2}
                dataKey="person.bankOrCredit"
              />
            )}
            <CheckBox
              label="Stocks, bonds, securities, money market account, "
              dataKey="person.financialStocksSecuritiesMoney"
              name="stocksSecurities"
            />
            {data.person.financialStocksSecuritiesMoney && (
              <div className="web-form-input">
                <TextInput
                  label="Account number"
                  dataKey="person.stocksAccount"
                />
                <TextInput
                  label="Date opened"
                  dataKey="person.stocksDateOpened"
                />
                <TextInput
                  label="Name of institution"
                  dataKey="person.stocksInstitutionName"
                />
                <TextInput
                  label="Address of institution"
                  dataKey="person.stocksAddress"
                />
                <TextInput
                  label="Names on account"
                  dataKey="person.stocksAccountNames"
                />
                <TextInput
                  label="Current Balance"
                  dataKey="person.stocksBalance"
                />
              </div>
            )}
            <CheckBox
              label="Retirement account"
              dataKey="person.financialRetirementAccount"
              name="retirementAccount"
            />
            {data.person.financialRetirementAccount && (
              <div className="web-form-input">
                <TextInput
                  label="Account number"
                  dataKey="person.retirementAccount"
                />
                <TextInput
                  label="Date opened"
                  dataKey="person.retirementDateOpened"
                />
                <TextInput
                  label="Name of institution"
                  dataKey="person.retirementInstitutionName"
                />
                <TextInput
                  label="Address of institution"
                  dataKey="person.retirementAddress"
                />
                <TextInput
                  label="Names on account"
                  dataKey="person.retirementAccountNames"
                />
                <TextInput
                  label="Current Balance"
                  dataKey="person.retirementBalance"
                />
              </div>
            )}
            <CheckBox
              label="Profit sharing plan"
              dataKey="person.financialProfitSharing"
              name="profitSharingPlan"
            />
            {data.person.financialProfitSharing && (
              <div className="web-form-input">
                <TextInput
                  label="Account number"
                  dateKet="person.profitShareAccount"
                />
                <TextInput
                  label="Date opened"
                  dateKet="person.profitShareDateOpened"
                />
                <TextInput
                  label="Name of institution"
                  dateKet="person.profitInstitutionShareName"
                />
                <TextInput
                  label="Address of institution"
                  dateKet="person.profitShareAddress"
                />
                <TextInput
                  label="Names on account"
                  dateKet="person.profitShareAccountNames"
                />
                <TextInput
                  label="Current Balance"
                  dateKet="person.profitShareBalance"
                />
              </div>
            )}
            <CheckBox
              label="Annuity"
              dataKey="person.financialAnnuity"
              name="financialAnnuity"
            />
            {data.person.financialAnnuity && (
              <div className="web-form-input">
                <TextInput
                  label="Account number"
                  dataKey="person.annuityAccount"
                />
                <TextInput
                  label="Date opened"
                  dataKey="person.annuityDateOpened"
                />
                <TextInput
                  label="Name of institution"
                  dataKey="person.annuityInstitutionName"
                />
                <TextInput
                  label="Address of institution"
                  dataKey="person.annuityAddress"
                />
                <TextInput
                  label="Names on account"
                  dataKey="person.annuityAccountNames"
                />
                <TextInput
                  label="Current Balance"
                  dataKey="person.annuityBalance"
                />
              </div>
            )}
            <CheckBox
              label="Life insurance"
              dataKey="person.financialLifeInsurance"
              name="lifeInsurance"
            />
            {data.person.financialLifeInsurance && (
              <div className="web-form-input">
                <TextInput
                  label="Account number"
                  dataKey="person.lifeInsuranceAccount"
                />
                <TextInput
                  label="Date opened"
                  dataKey="person.lifeInsuranceDateOpened"
                />
                <TextInput
                  label="Name of institution"
                  dataKey="person.lifeInsuranceInstitutionName"
                />
                <TextInput
                  label="Address of institution"
                  dataKey="person.lifeInsuranceAddress"
                />
                <TextInput
                  label="Names on account"
                  dataKey="person.lifeInsuranceAccountNames"
                />
                <TextInput
                  label="Current Balance"
                  dataKey="person.lifeInsuranceBalance"
                />
              </div>
            )}
            <CheckBox
              label="Money owed to me"
              dataKey="person.financialMoneyOwed"
              name="moneyOwed"
            />
            {data.person.financialMoneyOwed && (
              <div className="web-form-input">
                <TextInput
                  label="Date of loan"
                  dataKey="person.moneyOwedDate"
                />
                <TextInput
                  label="Name of institution"
                  dataKey="person.moneyOwedInstitutionName"
                />
                <TextInput
                  label="Address of institution"
                  dataKey="person.moneyOwedAddress"
                />
                <TextInput
                  label="Names on account"
                  dataKey="person.moneyOwedAccountNames"
                />
                <TextInput
                  label="Current Balance"
                  dataKey="person.moneyOwedBalance"
                />
              </div>
            )}
            <CheckBox
              label="Cash"
              dataKey="person.financialCash"
              name="financialCash"
            />
            {data.person.financialCash && (
              <div className="web-form-input">
                <TextInput
                  label="Current Balance"
                  dataKey="person.cashBalance"
                />
              </div>
            )}
            <CheckBox
              label="Other"
              dataKey="person.financialOther"
              name="financialOther"
            />
            {data.person.financialOther && (
              <div className="web-form-input">
                <TextArea
                  label="Describe"
                  dataKey="person.financialOtherExplain"
                />
                <TextInput label="Current Balance" />
              </div>
            )}
          </React.Fragment>
        )}
      </Section>

      <Section name="10. Real Estate">
        <CheckBox
          label="I have the following real estate"
          dataKey="person.realEstate"
          name="realEstate"
        />
        {data.person.realEstate && (
          <TextInputGroup
            groupLabel="Real estate"
            inputs={realEstateInterest}
            buttonLabel="Real estate"
            maxInputs={2}
            dataKey="person.realEstateInterests"
          />
        )}
      </Section>

      <Section name="11. Personal Property">
        <CheckBox
          label="I have the following personal property"
          dataKey="person.personalProperty"
          name="personalProperty"
        />
        {data.person.personalProperty && (
          <TextInputGroup
            groupLabel="Personal Property"
            inputs={personalPropertyList}
            buttonLabel="property"
            maxInputs={5}
            dataKey="person.currentPersonalProperty"
          />
        )}
      </Section>

      <Section name="12. Debts Owed">
        <CheckBox
          label="I do owe the following debts"
          dataKey="person.debtsOwed"
          name="debtsOwed"
        />
        {data.person.debtsOwed && (
          <TextInputGroup
            groupLabel="Debt owed"
            inputs={debtOwed}
            buttonLabel="debt"
            maxInputs={6}
            dataKey="person.currentDebtsOwed"
          />
        )}
      </Section>

      <Section name="13. Other">
        <CheckBox
          label="The following facts also show why I cannot pay these court fees."
          dataKey="person.otherReasonNotToPay"
          name="otherFacts"
        />
        {data.person.otherReasonNotToPay && (
          <TextArea label="Explain" dataKey="person.otherNoPayExplanation" />
        )}
      </Section>
    </FormThatPrints>
  );
}
