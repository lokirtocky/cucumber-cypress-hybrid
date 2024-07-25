import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import BaseClass from "../pages/BaseClass/BasePage";
import PatientPage from "../pages/Patient/PatientPage";
import testData from "../../fixtures/testData.json";
import StudentPage from "../pages/MemberRegister/MemberRegisterPage";
import { faker } from "@faker-js/faker";
import commonPage from "../pages/Common/CommonPage";

const username = faker.name.firstName();
const lastname = faker.name.lastName();
const email = faker.internet.email();
const phoneNumber = faker.phone.number();

const loginPage = new BaseClass();
const patientPage = new PatientPage();
const studentPageObj = new StudentPage();
const commonPageObj = new commonPage();

When("Enter the Member {string} and {string} and {string} details", () => {
  loginPage.verifyPatientRegistration(
    testData.memberID,
    testData.Member_FirstName,
    testData.Member_LastName
  );
});

Then(
  "Verify {string} success message is displayed",
  (successMessage: string) => {
    cy.contains(successMessage).should("be.visible");
  }
);

When(
  "Select the Preffered language from the dropdown and select the address",
  () => {
    patientPage.selectPrefferedLanguageDropdown();
  }
);

When("Enter the Registration details for user to be registered", () => {
  const firstName = faker.name.firstName();
  patientPage.enterPatientDetailsForRegistration(
    firstName,
    testData.password,
    testData.password
  );
});

When("Click on TERMS and CONDITIONS checkbox", () => {
  patientPage.clickAgreeTermsAndConditionsCheckbox();
});

When("Click on Go to Dashboard button", () => {
  patientPage.clickGoToDashboardBtn();
});

When("Logout the user", () => {
  commonPageObj.logoutApplication();
});

When("Login with new credentials with user", () => {
  patientPage.loginWithRegisteredPatientWithNewCredentials(testData.password);
});

When(
  "User enters the student verification {string} and {string} and {string} and {string} details",
  () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
  }
);

When("Enter the Parent Guardian Information", () => {
  studentPageObj.enterParentGuardianInformation(
    username,
    lastname,
    email,
    phoneNumber,
    testData.studentDateOfBirthField
  );
});
