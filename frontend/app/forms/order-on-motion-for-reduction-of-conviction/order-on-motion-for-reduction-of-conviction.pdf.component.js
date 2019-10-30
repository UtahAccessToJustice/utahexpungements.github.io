import React from "react";
import RenderPage from "../render-page.component";
import PositionedString from "../pdf-rendering/positioned-string.component";
import PositionedCheckmark from "../pdf-rendering/positioned-checkmark.component.js";
import {
  getJudicialDistrict,
  getCounty
} from "../form-common-options/form-common-options";

export default function OrderOnMotionForReductionOfConvinction_Pdf({
  data: {
    case: { courtType, county, courtAddress }
  },
  renderData
}) {
  return (
    <>
      <RenderPage url="/static/forms/order-on-motion-for-reduction-of-conviction/05_Order_on_Motion_for_Reduction_of_Conviction-1.png">
        <PositionedString
          debugKey="person.fullName"
          left={personalInfo}
          top="13.8%"
        >
          <div>
            {renderData("person.firstName")} {renderData("person.middleName")}{" "}
            {renderData("person.lastName")}
          </div>
        </PositionedString>
        <PositionedString
          dataKey="person.addressStreet"
          left={personalInfo}
          top="17.49%"
        />
        <PositionedString
          debugKey="petitionerAddress"
          left={personalInfo}
          top="21.09%"
        >
          {`${renderData("person.addressCity")}, `}
          {renderData("person.addressState")}
          {`\u0020`}
          {renderData("person.addressZip")}
        </PositionedString>
        <PositionedString
          dataKey="person.homePhone"
          left={personalInfo}
          top="24.5%"
        />
        <PositionedString
          dataKey="person.email"
          left={personalInfo}
          top="28.1%"
        />
        <PositionedString debugKey="petitioner" left={personalInfo} top="50.1%">
          <div>
            {renderData("person.firstName")} {renderData("person.middleName")}{" "}
            {renderData("person.lastName")}
          </div>
        </PositionedString>
        <PositionedString dataKey="case.caseNumber" left="54.05%" top="50.1%" />
        <PositionedString dataKey="case.judgeName" left="54.05%" top="54.7%" />
        <PositionedString
          dataKey="case.courtAddress"
          left="26.2%"
          top="37.7%"
        />
        <PositionedCheckmark
          dataKey="case.courtType"
          left="36.2%"
          top={courtTypeTop}
          shouldShow={courtType === "District"}
        />
        <PositionedCheckmark
          dataKey="case.courtType"
          left="47%"
          top={courtTypeTop}
          shouldShow={courtType === "Justice"}
        />
        <PositionedString left="25.9%" top="35.3%" debugKey="judicialDistrict">
          {courtAddress && getJudicialDistrict(courtAddress, courtType)}
        </PositionedString>

        <PositionedString left="50.7%" top="35.3%" debugKey="county">
          {courtAddress && getCounty(courtAddress, courtType)}
        </PositionedString>
      </RenderPage>
    </>
  );
}

const personalInfo = `11.5%`;
const courtTypeTop = `32.8%`;
const countyDistrictTop = `37.35%`;
const page2Checkmarks = `18.15%`;
