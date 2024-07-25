import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import BaseClass from "../pages/BaseClass/BasePage";
import testData from '../../fixtures/testData.json';

const baseClassObj = new BaseClass()

When('Click on Verify your Account link on login page on login page', () => {
    baseClassObj.verifyValidationOfMemberField();
});

Then('Verify validation message {string} appears', (validationMsg: string) => {
    baseClassObj.verifyValidationMsg(validationMsg);
});

When('Clear the Member firstName field', () => {
    baseClassObj.verifyValidationOfMemberFirstField();
});

When('Clear the Member LastName field', () => {
    baseClassObj.verifyValidationOfMemberLastField();
});

When('Enter the Member Verification detail fields and clear First Name Field', () => {
    baseClassObj.enterValidMemberDetails();
    baseClassObj.removeContactInfoInputField(0);
});

When('Enter the Member Verification detail fields and clear Last Name Field', () => {
    baseClassObj.enterValidMemberDetails();
    baseClassObj.removeContactInfoInputField(1);
});

When('Clear the Zip code field', () => {
    baseClassObj.enterValidMemberDetails();
    baseClassObj.clearInputData(3);
});

When('Clear the address field', () => {
    baseClassObj.enterValidMemberDetails();
    baseClassObj.clearInputData(0);
});

When('Clear the city field', () => {
    baseClassObj.enterValidMemberDetails();
    baseClassObj.clearInputData(2);
});

When('Clear the email field', () => {
    baseClassObj.enterValidMemberDetails();
    baseClassObj.clearInputData(4);
});

When('Clear the Phone number field', () => {
    baseClassObj.enterValidMemberDetails();
    baseClassObj.clearInputData(5);
});

When('Enter invalid student details', () => {
    baseClassObj.verifyStudentVerificationIncorrectDetails();
});

Then('Verify verification Failed error message {string} appears', (validationMessage: string) => {
    baseClassObj.verificationFailedErrorMsg(validationMessage);
});

When('Enter the valid student credentials', () => {
    baseClassObj.enterStudentVerificationDetails(
        testData.studentFirstName,
        testData.studentLastName,
        testData.studentDateOfBirthField,
        testData.studentID
    );
});

Then('Verify Success message {string} is displayed', () => {
    cy.verifyPageUrl(testData.studentRegistrationPageUrl);
});

When('Clears the student firstName field', () => {
    baseClassObj.removeContactInfoInputField(0);
});

When('Clears the student lastName field', () => {
    baseClassObj.removeContactInfoInputField(1);
});

Then('Verify student first name field validation message {string} appears', () => {
    baseClassObj.verifyFormFieldsValidations(0, "Please Enter Your First Name");
});

Then('Verify student last name field validation message {string} appears', () => {
    baseClassObj.verifyFormFieldsValidations(0, "Please Enter Your Last Name");
});

When('Clears the student city field', () => {
    baseClassObj.removeAddressInfoInputField(2);
});

Then('Verify Student city field validation message {string} appears', () => {
    baseClassObj.verifyFormFieldsValidations(0, "Please Enter Your City");
});

Then('Verify the validation message of username field', () => {
    baseClassObj.verifyValidationMsg("Please Enter Your User Name");
});

Then('Verify the validation message of password field', () => {
    baseClassObj.verifyValidationMsg("Please Enter Your Password");
});

Then('Verify the validation message of confirm password field', () => {
    baseClassObj.verifyValidationMsg("Please Confirm Your Password");
});

When('Clears the student Zip code field', () => {
    baseClassObj.removeAddressInfoInputField(3);
});

Then('Verify validation message appears for Zip code field', () => {
    baseClassObj.verifyFormFieldsValidations(0, "Please Enter Your Zip Code");
});

When('Clears the Phone number field', () => {
    baseClassObj.removeAddressInfoInputField(5);
});

Then('Verify the validation message of phone number field', () => {
    baseClassObj.verifyFormFieldsValidations(0, "Please Enter Your Phone Number");
});