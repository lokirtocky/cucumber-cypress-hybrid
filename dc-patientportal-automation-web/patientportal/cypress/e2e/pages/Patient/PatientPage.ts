import testData from "../../../fixtures/testData.json";
import WaitUtils from "cypress/support/utils/WaitUtils";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const breedName = faker.animal.dog();
const email = faker.internet.email();

class PatientPage {
  private IAgreeTermsAndConditionsCheckbox =
    "app-terms-and-conditions ion-checkbox";
  private selectPrefferedLangaugeDropdown =
    "app-patient-web > ion-grid > ion-row > ion-col:nth-child(1) > ion-row > ion-col.margin-top-10.md.hydrated > ion-card > app-dob-info > div > ion-row:nth-child(2) > ion-col > app-dropdown > form > ion-select";
  private termsAndConditionText = "app-terms-and-conditions ion-text";
  private nextButton = "//ion-button[contains(text(), 'NEXT')]/.";
  private continueBtn = "//ion-button[contains(text(), ' Continue ')]";
  private Click_EnterPetInfo =
    "//ion-label[contains(text(),'Enter Pet Information')]/..";
  private PetInformationText = "app-patient-add-pet ion-label";
  private click_AddButton = "//ion-button[contains(text(),'Add')]/.";
  private nameInputBx = "app-personal-information form ion-input input";
  private breedInputBx = "app-personal-information form ion-input input";
  private averageYearInputBx = "app-personal-information form ion-input input";
  private averageMonthInputBx = "app-personal-information form ion-input input";
  private averageWeightInputBx =
    "app-personal-information form ion-input input";
  private typeDropdownField = "app-dropdown form ion-select";
  private genderDropdownField = "app-dropdown form ion-select";
  private click_On_AddBtn =
    "//app-medical-info-card//ion-button[contains(text(),'Add')]";
  private enterMedicalInfoTab =
    "//*[contains(text(),' Enter Medical Information')]/.";
  private useThisAddressBtn =
    "//ion-button[contains(text(),'USE THIS ADDRESS')]/.";
  private enterDependentInfoTab =
    "//*[contains(text(),' Enter Dependent Information')]/.";
  private click_SaveDependentInformationBtn =
    "//app-dependent-information//ion-button[contains(text(),'Save dependent information')]/.";
  private registrationCompletedTxt =
    "app-patient-login-info ion-card-content ion-col ion-label";
  private LoginBtn =
    "app-patient-login-info ion-card-content ion-col ion-button";
  private memeberIDTxtBx = 'ion-input[formcontrolname="memberId"] input';
  private lastNameTxtBx = 'ion-input[formcontrolname="firstName"] input';
  private firstNameTxtBx = 'ion-input[formcontrolname="lastName"] input';
  private errMsg = ".hydrated:nth-of-type(1) .validation-error";
  private verifyButton = 'ion-button[type="submit"]';
  private contactInformationHeaderTxt =
    ".desktop-margin-left.hydrated.in-toolbar.md.toolbar-background.toolbar-label > .contact-text.hydrated.md.sc-ion-label-md-h.sc-ion-label-md-s.text-blue";
  private verificarButton = "//ion-button[contains(text(),'VERIFICAR')]";
  private studentFirstNameField =
    "app-verify-student-account-form form ion-input input";
  private studentPersonalInformationField =
    "app-verify-student-account-form form ion-input input";
  private addressField = "app-address-info form ion-input input";
  private patientRegDetailsField = "app-password-info ion-input input";
  private deleteMedicalCondition = "ion-button.add-btn-danger";
  private selectMedicalConditionsDropdow = "app-dropdown ion-select";
  private nameFieldInputBx = "app-dependent-name-information ion-input input";
  private dobInputBx = "app-custom-date ion-input input";
  private addressInputBx = "app-dependent-address-information ion-input input";
  private enterSurgeryDetail = "app-medical-form form ion-textarea textarea";
  private enterAddressField = "app-address-auto-complete ion-input input";
  private languageToggleBtn = "app-header-menu ion-select";
  private selectEspanolaLanguage = "ion-radio-group ion-item:nth-child(2)";
  private verificarBtn = "(//ion-button[contains(text(),'VERIFICAR')])[3]";
  private raceEthnicityDropdown =
    "app-physique-info-form-card form ion-row:nth-child(2) app-dropdown form ion-select";
  private hamburgIconOnMedicalInfoPage =
    "app-medical-information-add ion-fab-button ion-icon";
  private goToDashboardButton =
    "//ion-button[contains(text(),'Go To Dashboard')]";
  private studentIdField = "app-verify-student-account-form form ion-input input";
  private studPersonalInformationField = "app-patient-web form ion-input input"

  public getVerifyBtn() {
    return cy.get(this.verifyButton);
  }

  public getContactInformationHeaderTxt() {
    return cy.get(this.contactInformationHeaderTxt);
  }

  public getMemeberIDTxtBx() {
    return cy.get(this.memeberIDTxtBx);
  }

  public getLastNameTxtBx() {
    return cy.get(this.lastNameTxtBx);
  }

  public getFirstNameTxtBx() {
    return cy.get(this.firstNameTxtBx);
  }

  public getErrMsg() {
    return cy.get(this.errMsg);
  }

  public verifyPatientRegistrationPageUrl() {
    cy.verifyPageUrl(testData.verifyPatient_RegistrationPageUrl);
  }

  public verifyPatientRegistrationPage(): void {
    cy.url().should("include", testData.patientRegistrationPageUrl);
  }

  public clickAgreeTermsAndConditionsCheckbox(): void {
    cy.get(this.termsAndConditionText)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    WaitUtils.waitForElementToAppear(this.IAgreeTermsAndConditionsCheckbox);
    cy.get(this.IAgreeTermsAndConditionsCheckbox).click();
    cy.xpath(this.nextButton).click();
  }

  public selectPrefferedLanguageDropdown(): void {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.wait(5000);
    cy.get(this.selectPrefferedLangaugeDropdown)
      .trigger("mousedown")
      .click({ force: true });
    WaitUtils.waitForTextToAppear(
      `//ion-radio[contains(text(),'English')]`,
      "English"
    );
    cy.xpath(`//ion-radio[contains(text(),'English')]`).click();
  }

  public clickContinueBtn(): void {
    cy.xpath(this.continueBtn).click({ force: true });
  }

  public verifyPatientLoginInfoPageURl(): void {
    cy.verifyPageUrl(testData.patientLoginInfoPageUrl);
  }

  public clickOnUseThisAddressBtn(): void {
    cy.xpath(this.useThisAddressBtn).should("be.visible").focus().click();
  }

  public clickEnterPetInfo(): void {
    cy.clickButton(this.Click_EnterPetInfo, { method: "xpath" });
  }

  public verifyPetInformationPopupIsDisplayed(): void {
    cy.isVisible(this.PetInformationText, { method: "get" });
  }

  public clickAddBtn(index: number): void {
    cy.xpath(this.click_AddButton).eq(index).click({ force: true });
  }

  public verifyPetInformationPageUrl(): void {
    cy.verifyPageUrl(testData.registerPetInformationPageUrl);
  }

  public enterPetInfoField(): void {
    cy.get(this.nameInputBx).eq(0).type(firstName, { force: true });
    cy.get(this.typeDropdownField).eq(1).click({ force: true });
    WaitUtils.waitForElementToAppear('//*[contains(text(),"Male ")]');
    cy.xpath('//*[contains(text(),"Male ")]').eq(1).click({ force: true });
    cy.get(this.breedInputBx).eq(1).type(breedName, { force: true });
    cy.get(this.averageYearInputBx).eq(2).type("1", { force: true });
    cy.get(this.averageMonthInputBx).eq(3).type("1", { force: true });
    cy.get(this.averageWeightInputBx).eq(4).type("10", { force: true });
    cy.get(this.genderDropdownField).eq(2).click({ force: true });
    WaitUtils.waitForElementToAppear('//ion-radio[contains(text(),"Yes ")]');
    cy.xpath('//ion-radio[contains(text(),"Yes ")]').click({ force: true });
  }

  public clickSavePetInformationBtn(): void {
    cy.contains(" Save Pet Information ").click();
  }

  public clickAddButton(index: number): void {
    cy.xpath(this.click_On_AddBtn).eq(index).click({ force: true });
  }

  public verifyPopupDisplays(popupText: string): void {
    const normalizedPopupText = popupText.replace(/\s+/g, " ").trim();
    cy.xpath(
      `//ion-label[contains(normalize-space(text()),"${normalizedPopupText}")]`
    ).should("be.visible");
  }

  public clickEnterMedicalInfoTab(): void {
    cy.clickButton(this.enterMedicalInfoTab, { method: "xpath" });
  }

  public verifyMedicalInfoPageUrl(): void {
    cy.verifyPageUrl(testData.verifyMedicalInfoPageUrl);
  }

  public clickEnterDependentInfoTab(): void {
    cy.clickButton(this.enterDependentInfoTab, { method: "xpath" });
  }

  public clickAddDependentButton(): void {
    cy.clickButton(this.click_AddButton, { method: "xpath" });
  }

  public verifyDependentRegistrationPageUrl(dependentPageUrl: string): void {
    cy.verifyPageUrl(dependentPageUrl);
  }

  public clickSaveDependentInformation_Button(): void {
    cy.xpath(this.click_SaveDependentInformationBtn)
      .should("be.visible")
      .click();
  }

  public verifyAddMedicalInformationPageUrl(): void {
    cy.verifyPageUrl(testData.addMedicalInformationPageURL);
  }

  public verifyVisibilityOfRegistrationComplete(): void {
    cy.get(this.registrationCompletedTxt).then(($el) => {
      const thanksForRegistrationText = $el.text();
      cy.log(thanksForRegistrationText);
    });
  }

  public clickLoginBtn(): void {
    cy.get(this.LoginBtn).should("be.visible").click();
  }

  public loginWithRegisteredPatientWithNewCredentials(password: string): void {
    cy.viewport(1920, 1080);
    let redirectUrl;
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(
      redirectUrl,
      { args: { email, password } },
      ({ email, password }) => {
        let emailAddressTxtBx = "form#localAccountForm input#signInName";
        let passwordFieldTxtBx = "form#localAccountForm input#password";
        let dialCareLogo = 'img[alt="logo"]';
        let signInButton = "button#next";
        cy.get(dialCareLogo).should("be.visible");

        // Retrieve the entered username from Cypress environment
        let enteredUsername = Cypress.env("Entered username is");

        // Fill in the username and password fields
        cy.get(emailAddressTxtBx)
          .should("be.visible")
          .click()
          .type(enteredUsername);
        cy.get(passwordFieldTxtBx).should("be.visible").click().type(password);

        // Click the sign-in button
        cy.get(signInButton).click();
      }
    );

    cy.url().should("include", testData.dashboardPageUrl);
  }

  verifyValidationOfMemberIdField(validationMsg: string): void {
    cy.get(this.memeberIDTxtBx).click({ force: true });
    cy.get(this.firstNameTxtBx).eq(0).click({ force: true });
    cy.contains(validationMsg).should("be.visible");
  }

  verifyValidationOfFirstNameField(validationMsg: string): void {
    cy.get(this.lastNameTxtBx).eq(0).click({ force: true });
    cy.get(this.memeberIDTxtBx).click({ force: true });
    cy.contains(validationMsg).should("be.visible");
  }

  verifyValidationOfLastNameField(validationMsg: string): void {
    cy.get(this.firstNameTxtBx).eq(0).click({ force: true });
    cy.get(this.firstNameTxtBx).eq(0).type("t").clear();
    cy.contains(validationMsg).should("be.visible");
  }

  clickVerificarBtn(index: number): void {
    cy.xpath(this.verificarButton).eq(index).click();
  }

  verifyStudentFirstNameField_Validation(validationMsg: string): void {
    cy.get(this.studentFirstNameField).eq(0).click({ force: true });
    cy.get(this.studentFirstNameField).eq(1).click({ force: true });
    cy.contains(validationMsg).should("be.visible");
  }

  verifyStudentLastNameField_Validation(validationMsg: string): void {
    cy.get(this.studentFirstNameField).eq(1).click({ force: true });
    cy.get(this.studentFirstNameField).eq(0).click({ force: true });
    cy.contains(validationMsg).should("be.visible");
  }

  verifyStudentDOBFieldValidation(validationMsg: string): void {
    cy.get(this.studentFirstNameField).eq(2).click({ force: true });
    cy.get(this.studentFirstNameField).eq(0).click({ force: true });
    cy.contains(validationMsg).should("be.visible");
  }

  verifyStudentIDFieldValidation(validationMsg: string): void {
    cy.get(this.studentIdField).eq(3).type(" ");
    cy.get(this.studentFirstNameField).eq(0).click();
    cy.contains(validationMsg).should("be.visible");
  }

  verifySuccessfullyVerifiedToastMessageAppears(successfullMsg: string): void {
    cy.get(this.studentFirstNameField).eq(0).type(testData.studentFirstName);
    cy.get(this.studentFirstNameField).eq(1).type(testData.studentLastName);
    cy.get(this.studentFirstNameField)
      .eq(2)
      .type(testData.studentDateOfBirthField);
    cy.get(this.studentFirstNameField).eq(3).type(testData.studentID);
    cy.xpath(this.verificarButton).eq(2).click();
    cy.contains(successfullMsg).should("be.visible");
  }

  verifyStudentUserNameFieldValidation(validationMsg: string): void {
    // cy.get(this.studPersonalInformationField).eq(10).clear();
    cy.contains(validationMsg).should("be.visible");
  }

  verifyStudentPasswordFieldValidation(validationMsg: string): void {
    cy.contains(validationMsg).should("be.visible");
  }

  verifyStudentFirstNameFieldValidation(validationMsg: string): void {
    cy.get(this.studentPersonalInformationField).eq(0).clear();
    cy.get(this.studentPersonalInformationField).eq(1).click();
    cy.contains(validationMsg).should("be.visible");
  }

  verifyStudentLastNameFieldValidation(validationMsg: string): void {
    cy.get(this.studentPersonalInformationField).eq(1).clear();
    cy.get(this.studentPersonalInformationField).eq(0).click();
    cy.contains(validationMsg).should("be.visible");
  }

  verifyPreferredLanguageFieldValidation(validationMsg: string): void {
    cy.contains(validationMsg).should("be.visible");
  }

  verifyAddress1FieldValidation(validationMsg: string): void {
    cy.get(this.addressField).eq(0).clear();
    cy.contains(validationMsg).should("be.visible");
    // cy.get(this.addressField).eq(0).clear();
  }

  verifyCityFieldValidation(validationMsg: string): void {
    cy.get(this.addressField).eq(2).clear().click();
    cy.contains(validationMsg).should("be.visible");
  }

  verifyZipCodeFieldValidation(validationMsg: string): void {
    cy.get(this.addressField).eq(3).clear().click();
    cy.contains(validationMsg).should("be.visible");
  }

  verifyEmailFieldValidation(validationMsg: string): void {
    cy.get(this.addressField).eq(4).clear().click();
    cy.contains(validationMsg).should("be.visible");
  }

  verifyPhoneNumberFieldValidation(validationMsg: string): void {
    cy.get(this.addressField).eq(5).clear().click();
    cy.contains(validationMsg).should("be.visible");
  }

  public verifyMedicalInformationIsDisplayed(medicalCondition: string): void {
    const normalizedPopupText = medicalCondition.replace(/\s+/g, " ").trim();
    cy.xpath(
      `//ion-label[contains(normalize-space(text()),"${normalizedPopupText}")]`
    ).should("be.visible");
  }

  enterPatientDetailsForRegistration(
    user_name: string,
    password: string,
    confirmPassword: string
  ): void {
    cy.get(this.patientRegDetailsField)
      .eq(0)
      .click()
      .type(user_name, { force: true })
      .then(() => {
        // Store the entered username in the Cypress environment
        Cypress.env("Entered username is", user_name);
      });

    Cypress.env("Entered password is", password);
    cy.get(this.patientRegDetailsField).eq(1).click().type(password);
    cy.get(this.patientRegDetailsField).eq(2).click().type(confirmPassword);
    cy.clickButton(this.continueBtn, { method: "xpath" });
  }

  enterPatientDetailsForRegistrationInSpanish(
    user_name: string,
    password: string,
    confirmPassword: string
  ): void {
    cy.get(this.patientRegDetailsField)
      .eq(0)
      .click()
      .type(user_name, { force: true })
      .then(() => {
        // Store the entered username in the Cypress environment
        Cypress.env("Entered username is", user_name);
      });

    Cypress.env("Entered password is", password);
    cy.get(this.patientRegDetailsField)
      .eq(1)
      .click()
      .type(password, { force: true });
    cy.get(this.patientRegDetailsField)
      .eq(2)
      .click()
      .type(confirmPassword, { force: true });
  }

  selectMedicalConditionDropdown(radioOption: string): void {
    WaitUtils.waitForElementToAppear(this.selectMedicalConditionsDropdow);
    cy.get(this.selectMedicalConditionsDropdow).last().click({ force: true });
    WaitUtils.waitForElementToAppear(
      `//ion-radio[contains(text(),'${radioOption}')]`
    );
    cy.xpath(`//ion-radio[contains(text(),'${radioOption}')]`).click({
      force: true,
    });
  }

  clickDeleteMedicalCondition(): void {
    cy.get(this.deleteMedicalCondition).each(($button) => {
      // Click on each delete button
      cy.wrap($button).click({ force: true });
      cy.xpath("//ion-button[contains(text(),'CONFIRM')]").click({
        force: true,
      });
    });
  }

  clickSaveBtn(button: string): void {
    cy.xpath(`//ion-button[contains(text(),"${button}")]`)
      .last()
      .click({ force: true });
  }

  public verifyMedicalConditionsAreSaved(conditionTexts: string[]): void {
    conditionTexts.forEach((conditionText) => {
      cy.get("ion-row")
        .contains("ion-label.medical-history-sub-title", conditionText)
        .should("be.visible");
    });
  }

  public verifyPatientMedicalInfoPageUrl(): void {
    cy.verifyPageUrl(testData.patientMedicalInfoPageUrl);
  }

  verifyNoMedicalInformationAdded(medicalConditionText: string): void {
    cy.xpath(
      `//ion-label[contains(text(),'${medicalConditionText}')]/.`
    ).should("be.visible");
  }

  selectPrefferedLanguage(prefferedLangauge: string): void {
    WaitUtils.waitForElementToAppear(this.selectPrefferedLangaugeDropdown);
    cy.get(this.selectPrefferedLangaugeDropdown)
      .trigger("mouseover")
      .click({ force: true });
    WaitUtils.waitForElementToAppear(
      `//ion-radio[contains(text(),'${prefferedLangauge}')]`
    );
    cy.xpath(`//ion-radio[contains(text(),'${prefferedLangauge}')]`).click({
      force: true,
    });
  }

  enterDependentMedicalInformationFields(): void {
    cy.get(this.nameFieldInputBx).eq(0).type(firstName, { force: true });
    cy.get(this.nameFieldInputBx).eq(1).type(lastName, { force: true });
    cy.get(this.typeDropdownField).eq(0).click({ force: true });
    cy.xpath(`//ion-radio[contains(text(),'CVT ')]`).click();
    cy.get(this.dobInputBx).type("01/01/2003", { force: true });
    cy.get(this.typeDropdownField).eq(1).click({ force: true });
    cy.get(this.typeDropdownField).eq(2).click({ force: true });
    cy.xpath("//ion-radio[contains(text(),'English ')]").click({ force: true });
    cy.get(this.addressInputBx)
      .eq(0)
      .type("234", { delay: 100 })
      .type("{enter}");
    cy.get(this.addressInputBx).eq(4).type(email, { force: true });
    cy.get(this.addressInputBx).eq(5).type("1234567890", { force: true });
  }

  enterSurgeryDetails(surgeryType: string): void {
    cy.get(this.enterSurgeryDetail).type(surgeryType);
    cy.get(this.dobInputBx).type("01/2000");
  }

  clickAddMedicalInformationType(meidcalInformationType: string): void {
    cy.xpath(`//*[contains(text(),"${meidcalInformationType}")]/.`)
      .should("be.visible")
      .click({ force: true });
  }

  verifyStudentRegistrationPageUrl(): void {
    cy.verifyPageUrl(testData.studentRegistrationPageURL);
    cy.contains(
      " Thank you for completing your registration. You can go to dashboard or continue to add additional information. "
    ).should("be.visible");
  }

  verifyAddMedicalInformationAddPageURL(): void {
    cy.verifyPageUrl(testData.addMedicalInformationPageURL);
  }

  verifyStudentVerification(
    studentFName: string,
    studentLName: string,
    dob: string,
    studentID: string
  ): void {
    let firstName_Field = 'ion-input input[inputmode="text"]';
    let lastName_Field = 'ion-input input[inputmode="text"]';
    let dateOfBirthTxtBox = "app-custom-date input";
    let studentIdField = 'ion-input[formcontrolname="studentId"] input';
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    cy.viewport(1920, 1080);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {

      let emailAddressField = "#signInName";
      let passwordField = "input#password";
      let signInButton = "button#next";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get("body").should('be.visible');
      cy.get(dialCareLogo).should('be.visible');
      cy.get(emailAddressField).should('be.visible');
      cy.get(passwordField).should('be.visible');
      cy.get(signInButton).should('be.visible');
      cy.get(verifyYourAccount_Tab).click();
    });

    cy.get(this.languageToggleBtn).click();
    cy.get(this.selectEspanolaLanguage).click();
    cy.xpath(this.verificarButton).last().click();
    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(firstName_Field).first().type(studentFName);
    cy.get(lastName_Field).eq(1).type(studentLName);
    cy.get(dateOfBirthTxtBox).type(dob);
    cy.get(studentIdField).type(studentID);
    cy.xpath(this.verificarBtn).click();
  }

  clickHamburgerIconOnMedicalInformationPage() {
    cy.reload();
    cy.get(this.hamburgIconOnMedicalInfoPage).click();
  }

  enterStudentRegistrationFields(
    user_name: string,
    password: string,
    confirmPassword: string
  ): void {
    cy.get(this.patientRegDetailsField)
      .eq(0)
      .click()
      .type(user_name, { force: true })
      .then(() => {
        // Store the entered username in the Cypress environment
        Cypress.env("Entered username is", user_name);
      });

    Cypress.env("Entered password is", password);
    cy.get(this.patientRegDetailsField).eq(1).click().type(password);
    cy.get(this.patientRegDetailsField).eq(2).click().type(confirmPassword);
  }

  selectMedicalInformationDetails(selectGender: string, selectRace: string) {
    cy.get(this.raceEthnicityDropdown).click();
    cy.xpath(`//ion-radio[contains(text(),'${selectRace}')]`).click({
      force: true,
    });
  }

  clickGoToDashboardBtn() {
    cy.xpath(this.goToDashboardButton)
      .should("have.text", "Go To Dashboard")
      .click();
  }

  deleteAddedMedicalInformation(): void {
    cy.get(this.deleteMedicalCondition).each(($button) => {
      // Click on each delete button
      cy.wrap($button).click({ force: true });
      cy.xpath("//ion-button[contains(text(),'CONFIRMAR')]").click({
        force: true,
      });
    });
  }
}

export default PatientPage;
