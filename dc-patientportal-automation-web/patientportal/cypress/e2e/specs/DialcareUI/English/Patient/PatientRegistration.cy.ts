import BaseClass from "../../../../pages/BaseClass/BasePage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import StudentPage from "../../../../pages/MemberRegister/MemberRegisterPage";
import testData from "../../../../../fixtures/testData.json";
import commonPage from "../../../../pages/Common/CommonPage";
import { faker } from "@faker-js/faker";

const loginPage = new BaseClass();
const patientPage = new PatientPage();
const studentPage = new StudentPage();
const commonPageObj = new commonPage();

context("PATIENT TEST CASES", () => {
  specify("Patient: Contact Information >> Verify that Terms & Conditions Flyout is displayed after Clicking on NEXT Button on Contact Information Page", () => {
    loginPage.memberAccountVerification();
    patientPage.verifyPatientRegistrationPage();
    patientPage.selectPrefferedLanguageDropdown();
    studentPage.enterUserDetailsForms();
    patientPage.clickContinueBtn();
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.verifyPatientRegistrationPageUrl();
  }
  );

  specify("TC_01: PATIENT PORTAL >> Patient Registration >> Verify validation message appears after entering the invalid details", () => {
    loginPage.enterInvalid_PatientDetails(
      testData.patient_Email,
      testData.patient_Password
    );
    loginPage.verifyValidationMessageForInvalidPatientDetails(
      "Verification failed. Please try again."
    );
  }
  );

  specify("TC_02: PP: Verify Member Verification Process on Patient Portal ", () => {
    loginPage.memberAccountVerification();
    patientPage.verifyPatientRegistrationPage();
  });

  specify("TC_03: PP >> Patient Registration >> Verify Validation appears for existing user", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    patientPage.selectPrefferedLanguageDropdown();
    studentPage.verifyValidationOfExistingUserIsDisplayed();
  }
  );

  specify("TC_04: PP: Student Verification - Verify validations on FirstName field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeContactInfoInputField(0);
    loginPage.verifyValidationMsg("Please Enter Your First Name");
  }
  );

  specify("TC_05: PP: Student Verification - Verify validations on LastName field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeContactInfoInputField(1);
    loginPage.verifyValidationMsg("Please Enter Your Last Name");
  }
  );

  specify("TC_06: PP: Student Verification - Verify validations on FirstName field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeContactInfoInputField(0);
    loginPage.verifyFormFieldsValidations(0, "Please Enter Your First Name");
  }
  );

  specify("TC_07: PP: Student Verification - Verify validations on LastName field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeContactInfoInputField(1);
    loginPage.verifyFormFieldsValidations(0, "Please Enter Your Last Name");
  }
  );

  specify("TC_08: PP: Student Verification - Verify validations on Address1 field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.verifyFormFieldsValidations(0, "Please Enter Your Address");
  }
  );

  specify("TC_09: PP: Student Verification - Verify validations on City field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeAddressInfoInputField(2);
    loginPage.verifyFormFieldsValidations(0, "Please Enter Your City");
  }
  );

  specify("TC_10: PP: Student Verification - Verify validations on Zip code on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeAddressInfoInputField(3);
    loginPage.verifyFormFieldsValidations(1, "Please Enter Your Zip Code");
  }
  );

  specify("TC_11: PP: Student Verification - Verify validations on Email field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeAddressInfoInputField(4);
    loginPage.verifyFormFieldsValidations(
      1,
      "Please Enter Your Email Address"
    );
  }
  );

  specify("TC_12: PP: Student Verification - Verify validations on Phone Number field on Field", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    loginPage.removeAddressInfoInputField(5);
    loginPage.verifyFormFieldsValidations(
      1,
      "Please Enter Your Phone Number"
    );
  }
  );

  specify("TC_13: PP: Patient - Verify Add Medical Conditions page is displayed", () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("Verified Successfully");
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickEnterMedicalInfoTab();
    patientPage.clickAddBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed("Add Medical Conditions");
    commonPageObj.clickBackIcon();
    commonPageObj.logoutApplication();
  }
  );

  specify('TC_14: PP: Patient - Verify user able to save "Add Medical Conditions"', () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("Verified Successfully");
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.verifyPatientRegistrationPageUrl();

    patientPage.clickEnterMedicalInfoTab();
    patientPage.clickAddBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed("Add Medical Conditions");
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    commonPageObj.clickOnButton("SAVE & ADD ANOTHER");
    commonPageObj.clickBackIcon();
    commonPageObj.logoutApplication();
  }
  );

  specify('TC_15: PP: Patient - Verify user able to delete the added "Add Medical Conditions"', () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("Verified Successfully");
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickEnterMedicalInfoTab();
    patientPage.clickAddBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed("Add Medical Conditions");
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    patientPage.clickSaveBtn("SAVE");
    commonPageObj.clickBackIcon();
    patientPage.clickDeleteMedicalCondition();
    commonPageObj.logoutApplication();
  }
  );

  specify('TC_16: PP: Patient - Verify user able to add multiple "Medical Conditions"', () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("Verified Successfully");
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.clickEnterMedicalInfoTab();
    patientPage.clickAddBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed("Add Medical Conditions");
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    commonPageObj.clickOnButton("SAVE & ADD ANOTHER");
    patientPage.selectMedicalConditionDropdown("Asthma ");
    patientPage.clickSaveBtn("SAVE");
    patientPage.verifyMedicalConditionsAreSaved(["Arthritis", "Asthma"]);
    commonPageObj.logoutApplication();
  }
  );

  specify('TC_17: PP: Patient - Verify user able to delete all added "Medical Conditions"', () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("Verified Successfully");
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.verifyPatientRegistrationPageUrl();

    patientPage.clickEnterMedicalInfoTab();
    patientPage.clickAddBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed("Add Medical Conditions");
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    commonPageObj.clickOnButton("SAVE & ADD ANOTHER");
    patientPage.selectMedicalConditionDropdown("Asthma ");
    patientPage.clickSaveBtn("SAVE");
    patientPage.verifyMedicalConditionsAreSaved(["Arthritis", "Asthma"]);
    patientPage.clickDeleteMedicalCondition();
    patientPage.verifyNoMedicalInformationAdded(
      "No medical conditions added"
    );
    commonPageObj.logoutApplication();
  }
  );

  specify("TC_18: PP: Verify that Member clicks on the Save Dependent Information and lands on the Dependent Medical Information Screen", () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("Verified Successfully");
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickEnterDependentInfoTab();
    patientPage.clickAddBtn(0);
    patientPage.verifyDependentRegistrationPageUrl(
      testData.verifyDependentRegistrationPageUrl
    );
    patientPage.enterDependentMedicalInformationFields();
    commonPageObj.clickOnButton("Save dependent information");
    patientPage.verifyAddMedicalInformationPageUrl();
  }
  );

  specify("TC_19: PP: Verify that Add Surgeries Flyout appears when User clicks on ADD button for Surgeries", () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("Verified Successfully");
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickEnterDependentInfoTab();
    patientPage.clickAddBtn(0);
    patientPage.verifyDependentRegistrationPageUrl(
      testData.verifyDependentRegistrationPageUrl
    );
    patientPage.enterDependentMedicalInformationFields();
    commonPageObj.clickOnButton("Save dependent information");
    patientPage.verifyAddMedicalInformationPageUrl();
    patientPage.clickAddBtn(3);
    patientPage.verifyPopupDisplays("Add Surgeries");
    patientPage.enterSurgeryDetails("cold");
    patientPage.clickSaveBtn("SAVE");
  }
  );
});
