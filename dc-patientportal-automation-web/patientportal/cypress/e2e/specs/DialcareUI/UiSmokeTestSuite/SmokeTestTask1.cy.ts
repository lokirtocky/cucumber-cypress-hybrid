import BaseClass from "../../../pages/BaseClass/BasePage";
import testData from "../../../../fixtures/testData.json";
import commonPage from "../../../pages/Common/CommonPage";
import memberVerificationPage from "../../../pages/MemberRegister/MemberRegisterPage";
import contactInformationPage from "../../../pages/MyAccount/ContactInformationPage";
import PatientPage from "../../../pages/Patient/PatientPage";
import { faker } from "@faker-js/faker";

const lastName = faker.person.lastName();
const email = faker.internet.email();

const basePageObj = new BaseClass();
const commonPageObj = new commonPage();
const contactInformationPageObj = new contactInformationPage();
const memberVerificationPageObj = new memberVerificationPage();
const patientPage = new PatientPage();

context("SMOKE TESTS", () => {
  specify("TASK_TC_01 - Verify Email Triggering is working", () => {
    const firstName = faker.person.firstName().toLowerCase();
    const userName =  faker.person.firstName().toLowerCase() + faker.person.lastName().toLowerCase()
    const dependentDetails = {
      depFirstName: firstName.replace('-', 'L'),
      depLastName: lastName.replace('-', 'F'),
      emailField: `testqa${Math.floor(Math.random() * 100)}@mailinator.com`,
      phoneNo: "1234567890",
      depDOB: "05/01/1990",
      preferredLanguage: "English",
      gender: "Female",
      ethnicity: "African American(non-Hispanic)",
      heightFeet: "5",
      heightInches: "5",
      heightFraction: "50",
      address: "123",
      accountHolder: "Dependent",
    };

    basePageObj.loginPatient(Cypress.env("user3"), Cypress.env("password"));
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    contactInformationPageObj.clickMyAccountDiv();
    contactInformationPageObj.verifyAccountsPageUrl();
    contactInformationPageObj.clickDependentsTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.dependentInformationPageUrl
    );
    commonPageObj.clickOnButton("Add");
    contactInformationPageObj.enterOverAgedDependent(dependentDetails);
    commonPageObj.clickOnButton("SAVE");
    commonPageObj.clickDependentBackBtn();
    commonPageObj.logoutApplication();
    contactInformationPageObj.verifyEmailReceivedForOverAgedDependentRegistration(
      email
    ); // Verifies the mail triggers for Overaged Dependent
    contactInformationPageObj.registerDependentWithNewCredentials(
      userName.replace('-', 'C'),
      testData.password,
      testData.password
    ); // Registration of dependent with new credentials
    patientPage.verifyPatientRegistrationPageUrl(); // Verified dependent logged in and navigates to the login page
    commonPageObj.logoutApplication();
  });

  specify("TASK_TC_02 - Verify PATIENT REGISTRATION Functionality", () => {
    const username = faker.person.firstName()+faker.person.lastName()+"0001";
    basePageObj.verifyPatientRegistration(
      Cypress.env("memberId"),
      Cypress.env("firstName"),
      Cypress.env("lastName")
    );
    memberVerificationPageObj.verifySuccessfullyVerifiedMsg(
      "Verified Successfully"
    );
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username.replace('-','C'),
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    commonPageObj.logoutApplication();
    patientPage.loginWithRegisteredPatientWithNewCredentials(testData.password);
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    ); // Verify after registration user navigates to Dashboard page URl
    commonPageObj.logoutApplication();
  });
});