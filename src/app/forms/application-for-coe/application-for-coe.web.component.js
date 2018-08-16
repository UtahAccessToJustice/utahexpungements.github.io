import React from 'react'
import {Scoped} from 'kremling'
import TextInput from '../inputs/text-input.component.js'
import Checkbox from '../inputs/checkbox.component.js'
import FormThatPrints from '../inputs/form-that-prints.component.js'
import Select from '../inputs/select.component.js'

const paymentOptions = [
  {label: `Check, money order, or Cashier's check`, value: 'check'},
  {label: 'Credit card (domestic only)', value: 'creditCard'},
  {label: `Pay in person`, value: 'payInPerson'},
]

const creditCardOptions = [
  {label: 'Visa', value: 'visa'},
  {label: 'Mastercard', value: 'mastercard'},
  {label: 'Discover', value: 'discover'},
  {label: 'American Express', value: 'amex'},
]

export default class ApplicationForCOE_Web extends React.Component {
  render() {
    return (
      <Scoped css={css}>
        <FormThatPrints>
          <TextInput dataKey="lastName" label="Last name" {...this.props} />
          <TextInput dataKey="firstName" label="First name" {...this.props} />
          <TextInput dataKey="middleName" label="Middle name" {...this.props} />
          <TextInput dataKey="birthday" label="Birthday (will be fancier datepicker input in future)" {...this.props} />
          <TextInput dataKey="previouslyUsedNames" label="Previously used names" {...this.props} />
          <TextInput dataKey="mailingAddress" label="Mailing address" {...this.props} />
          <TextInput dataKey="socialSecurity" label="Social security number" {...this.props} />
          <TextInput dataKey="driversLicenseNumber" label="Drivers license number" {...this.props} />
          <TextInput dataKey="driversLicenseState" label="Drivers license state" {...this.props} />
          <TextInput dataKey="homePhone" label="Home phone number" {...this.props} />
          <TextInput dataKey="dayPhone" label="Day phone number" {...this.props} />
          <Checkbox dataKey="isTrafficExpungement" label="Is this a traffic expungement?" {...this.props} />
          <Checkbox dataKey="isAcquittalExpungement" label="Is this an acquittal?" {...this.props} />
          <TextInput dataKey="nameOfPetitioner" label="Name of petitioner" {...this.props} />
          <Select label="Payment method" dataKey="paymentMethod" options={paymentOptions} {...this.props} />
          {this.props.data.paymentMethod === 'creditCard' &&
            <>
              <Select label="Card issuer" dataKey="creditCardIssuer" options={creditCardOptions} {...this.props} />
              <TextInput dataKey="cardNumber" label="Credit card number" {...this.props} />
              <TextInput dataKey="cardSecurityNumber" label="Security code" {...this.props} />
              <TextInput dataKey="cardExpirationMonth" label="Expiration month" {...this.props} />
              <TextInput dataKey="cardExpirationYear" label="Expiration year" {...this.props} />
              <TextInput dataKey="nameOnCard" label="Name on card" {...this.props} />
              <TextInput dataKey="cardZip" label="Card zip code" {...this.props} />
            </>
          }
          <input type="submit" value="Print Form" />
        </FormThatPrints>
      </Scoped>
    )
  }
}

const css = `
`