import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import contactInformationPage from "../pages/MyAccount/ContactInformationPage";
import commonPage from "../pages/Common/CommonPage";
import testData from "../../fixtures/testData.json";
import { faker } from "@faker-js/faker";
import requestVirtualVisitPage from '../pages/RequestVirtualVisit/RequestVirtualVisitPage';

const lastName = faker.name.lastName();
const email = faker.internet.email();

const contactInformationPageObj = new contactInformationPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();
const commonPageObj = new commonPage();

When("Click on Dependents on MyAccount", () => {
  contactInformationPageObj.clickDependentsTab();
});

When("Click on Add button", () => {
  commonPageObj.clickOnButton("Add");
});

When("Enter the Overaged dependent input fields", () => {
  const firstName = faker.name.firstName();
  const dependentDetails = {
    depFirstName: firstName,
    depLastName: lastName,
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

  contactInformationPageObj.enterOverAgedDependent(dependentDetails);
});

When("Click on SAVE button", () => {
  commonPageObj.clickOnButton("SAVE");
});

When(
  "Navigates to the mailinator page and click on REGISTER button to register the dependent",
  () => {
    contactInformationPageObj.verifyEmailReceivedForOverAgedDependentRegistration(
      email
    );
  }
);

Then("Login the overaged dependent with new credentials", () => {
  const firstName = faker.name.firstName();
  contactInformationPageObj.registerDependentWithNewCredentials(
    firstName,
    testData.password,
    testData.password
  );
});

When("Enter the details to ADD Spouse details", () => {
  const firstName = faker.name.firstName();
  const spouseDetails = {
    depFirstName: firstName,
    depLastName: lastName,
    emailField: `testuser${Math.floor(Math.random() * 200)}@mailinator.com`,
    phoneNo: "1234567890",
    depDOB: "05/01/1990",
    preferredLanguage: "English",
    gender: "Female",
    ethnicity: "African American(non-Hispanic)",
    heightFeet: "5",
    heightInches: "5",
    heightFraction: "70",
    address: "123",
    accountHolder: "Spouse",
  };
  contactInformationPageObj.enterOverAgedDependent(spouseDetails);
});

When("Click on Back icon", () => {
  const backButton = "//ion-label[contains(text(),'back')]/ion-icon";
  cy.xpath(backButton).click();
  cy.wait(2000);
});

When("Enter the Underaged Dependent details", () => {
  const firstName = faker.name.firstName();
  const underAgedDependentDetails = {
    depFirstName: firstName,
    depLastName: lastName,
    emailField: email,
    phoneNo: "1234567890",
    depDOB: "05/02/2023",
    preferredLanguage: "English",
    gender: "Male",
    ethnicity: "African American(non-Hispanic)",
    heightFeet: "2",
    heightInches: "2",
    heightFraction: "20",
    address: "123",
    accountHolder: "Child",
  };
  contactInformationPageObj.enterUnderAgedDependent(underAgedDependentDetails);
});

When(
  "Click on Dependent for spouse to grant the access to add the medical Conditions",
  () => {
    cy.reload();
    contactInformationPageObj.clickToGrandAccessToDependend();
  }
);

When("Click on Dependents tab under MyAccounts", () => {
  contactInformationPageObj.clickDependentTab();
});

When("Click on Confirm button to grant the access", () => {
  const confirmButton = "//ion-button[contains(text(),'CONFIRM')]";
  cy.xpath(confirmButton).click();
});

When("Click on underaged Dependent on spouse page", () => {
  contactInformationPageObj.clickOnUnderAgedDependentOnSpouseProfile();
});

When("Navigates to the mailinator and Register the Spouse", () => {
  const firstName = faker.name.firstName();
  contactInformationPageObj.verifyEmailReceivedForOverAgedDependentRegistration(
    email
  );
  contactInformationPageObj.registerDependentWithNewCredentials(
    firstName,
    testData.password,
    testData.password
  );
});

When('Enter the Medical conditions for the underaAged dependent', () => {
    commonPageObj.clickOnButton('Add');
    requestVirtualVisitPageObj
        .getPharmacySearchBtn()
        .should("be.visible")
        .and("not.be.hidden");
    requestVirtualVisitPageObj
        .getPharmacySearchBtn()
        .should("be.visible")
        .and("not.be.disabled");
    requestVirtualVisitPageObj.clickPharmacySearchBtn();
    requestVirtualVisitPageObj
        .getPharmacyDataList()
        .should("have.length", "18");
    requestVirtualVisitPageObj
        .getPharmacyDataList()
        .contains("BC Pharmacy")
        .click();
    requestVirtualVisitPageObj.clickPharmacyNextBtn();
});

When('Click on PETs on My Account', () => {
    contactInformationPageObj.clickPetsTab();
});

When('click on Add button', () => {
    commonPageObj.clickOnButton("Add");
});

When('Add Pets Information fields', () => {
    const catName = faker.animal.cat();
    contactInformationPageObj.enterPetsInformation(catName);
});

When('Click on Continue button', () => {
    commonPageObj.clickOnButton(" Continue ");
});

When('Click on Delete button',() => {
    commonPageObj.clickOnButton(" Delete");
});

Then('Verify {string} Toast Message is displayed', (toastMessage: string) => {
    commonPageObj.verifyConfirmationMessage(toastMessage);
});

When('Click on newly added Pet',() => {
    contactInformationPageObj.clickOnListOfExistingPets(1);
});
