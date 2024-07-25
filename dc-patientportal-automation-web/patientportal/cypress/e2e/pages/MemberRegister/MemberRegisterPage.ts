import testData from "../../../fixtures/testData.json";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

class StudentPage {
  private menuIcon = "app-dashboard ion-fab-button";
  private studentTab =
    "//ion-content//ion-list//ion-label[contains(text(),' Student ')]";
  private verifyButton = "form ion-grid:nth-child(2) ion-button";
  private firstNameField = "input#ion-input-29";
  private lastNameField = "input#ion-input-30";
  private dateOfBirthField = "input#ion-input-31";
  private studentIdField = "input#ion-input-32";
  private verifyStudentButton = '//ion-button[contains(text(),"VERIFY")]';
  private userNameField = 'ion-input[formcontrolname="userName"] input';
  private passwordField = 'ion-input[formcontrolname="password"] input';
  private confirmPasswordField =
    'ion-input[formcontrolname="confirmPassword"] input';
  private continueButton = "//ion-button[contains(text(),'Continue')]/..";
  private parentGuardianFNameField = "app-name-information ion-input input";
  private parentGuardianLNameField = "app-name-information ion-input input";
  private parentGuardianEmailField = 'ion-input[formcontrolname="email"] input';
  private parentGuardianPhoneNumField =
    'ion-input[formcontrolname="phoneNumber"] input';
  private parentGuardianDOBField = "app-custom-date form ion-input input";
  private termsAndConditionCheckbox = "ion-checkbox";
  private nextButton = "//ion-button[contains(text(), 'NEXT')]";
  private selectPrefferedLanuage = "form ion-select";
  private selectPreferredLanguageOption = "//span[contains(text(),'ENGLISH')]";
  private enterAddressField = "app-address-auto-complete ion-input input";
  private continuarBtn = "//ion-button[contains(text(),'Continuar')]/.";
  private proximoBtn = "//ion-button[contains(text(),'PRÓXIMO')]/.";
  private languageToggleBtn = "app-header-menu ion-select";
  private selectEspanolaLanguage = "ion-radio-group ion-item:nth-child(2)";

  public enterRegistrationDetailsFields(): void {
    const usernameField = this.userNameField;
    cy.get(usernameField)
      .type(firstName, { force: true })
      .then(() => {
        Cypress.env("Entered username", firstName);
      });
    cy.get(this.passwordField).type(testData.password, { force: true });
    cy.get(this.confirmPasswordField).type(testData.password, { force: true });
    cy.clickButton(this.continueButton, { method: "xpath" });
  }

  public clickMenuIcon(): void {
    cy.clickButton(this.menuIcon, { method: "get" });
  }

  public clickStudentTab(): void {
    cy.clickButton(this.studentTab, { method: "xpath" });
  }

  public verifyMemberAccountPage(): void {
    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
  }
  public clickVerifyButton(): void {
    cy.isVisible(this.verifyButton);
    cy.clickButton(this.verifyButton, { method: "get" });
  }

  public enterStudentDetailsForm(): void {
    cy.setValue(this.firstNameField, testData.studentFirstName);
    cy.setValue(this.lastNameField, testData.studentLastName);
    cy.setValue(this.dateOfBirthField, testData.studentDateOfBirthField);
    cy.setValue(this.studentIdField, testData.studentID);
    cy.get(this.verifyStudentButton).eq(1).click();
  }

  public verifyStudentRegistrationPage(): void {
    cy.verifyPageUrl(testData.studentRegistrationPageURL);
  }

  public selectPreferredLanguageDropdown(): void {
    cy.waitUntil(() =>
      cy.get(this.selectPrefferedLanuage).eq(2).should("be.visible")
    );

    cy.get(this.selectPrefferedLanuage)
      .eq(2)
      .should("be.visible")
      .click({ force: true });
    cy.xpath(this.selectPreferredLanguageOption).should("be.visible");
    cy.xpath(this.selectPreferredLanguageOption)
      .should("be.visible")
      .click({ force: true });
  }

  public enterUserDetailsForms(): void {
    const uniquePart = Math.floor(Math.random() * 1000000);
    const username = faker.name.firstName();
    cy.get(this.userNameField).type(username, { force: true });
    cy.get(this.passwordField).type(testData.password, { force: true });
    cy.get(this.confirmPasswordField).type(testData.password, { force: true });
    cy.clickButton(this.continueButton, { method: "xpath" });
  }

  public verifyParentDetailsPageURl(): void {
    cy.verifyPageUrl(testData.registrationParentInformationPageUrl);
  }

  public enterParentGuardianInformation(
    FName: string,
    LName: string,
    Email: string,
    PHNo: string,
    DOB: string
  ): void {
    const uniquePart = Math.floor(Math.random() * 1000000);
    const email = `test${uniquePart}@gmail.com`;
    cy.verifyPageUrl(testData.registrationParentInformationPageUrl);
    cy.get(this.parentGuardianFNameField).eq(0).type(FName);
    cy.get(this.parentGuardianFNameField).eq(1).type(LName);
    cy.log("Patient email Id :" + email);
    cy.setValue(this.parentGuardianEmailField, Email);
    cy.setValue(this.parentGuardianPhoneNumField, PHNo);
    cy.get(this.parentGuardianDOBField).eq(0).type(DOB);
    cy.clickButton(this.continueButton, { method: "xpath" });
    cy.get(this.termsAndConditionCheckbox).eq(0).click();
    cy.clickButton(this.nextButton, { method: "xpath" });
  }

  public verifyValidationOfExistingUserIsDisplayed(): void {
    cy.get(this.enterAddressField)
      .type("123", { force: true, delay: 100 })
      .type("{enter}");
    cy.get(this.userNameField).type(testData.existingUserName, { force: true });
    cy.get(this.passwordField).type(testData.password, { force: true });
    cy.get(this.confirmPasswordField).type(testData.password, { force: true });
    cy.clickButton(this.continueButton, { method: "xpath" });
    cy.contains("This UserName is Already Registered").should("be.visible");
  }

  public verifySuccessfullyVerifiedMsg(successfullMsg: string): void {
    cy.contains(successfullMsg).should("be.visible");
  }

  public clickContinuarBtn(): void {
    cy.xpath(this.continuarBtn).click();
  }

  public clickOnVerifyButton() {
    cy.xpath(this.verifyStudentButton).eq(1).click();
  }

  public enterParentInformationFields(): void {
    const uniquePart = Math.floor(Math.random() * 1000000);
    const email = `test${uniquePart}@gmail.com`;
    cy.get(this.languageToggleBtn).click();
    cy.get(this.selectEspanolaLanguage).click();
    cy.verifyPageUrl(testData.registrationParentInformationPageUrl);
    cy.get(this.parentGuardianFNameField)
      .eq(0)
      .type(firstName, { force: true });
    cy.get(this.parentGuardianFNameField).eq(1).type(lastName, { force: true });
    cy.log("Patient email Id :" + email);
    cy.setValue(this.parentGuardianEmailField, email);
    cy.setValue(this.parentGuardianPhoneNumField, testData.enterPhoneNumber);
    cy.get(this.parentGuardianDOBField)
      .eq(0)
      .type(testData.studentDateOfBirthField);
    cy.xpath(this.continuarBtn).click();
    cy.get(this.termsAndConditionCheckbox).eq(0).click();
    cy.clickButton(this.proximoBtn, { method: "xpath" });
  }
}

export default StudentPage;
