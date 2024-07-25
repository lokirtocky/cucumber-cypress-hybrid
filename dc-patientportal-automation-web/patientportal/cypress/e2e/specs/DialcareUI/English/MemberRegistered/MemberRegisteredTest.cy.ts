import baseClass from "../../../../pages/BaseClass/BasePage";
import StudentPage from "../../../../pages/MemberRegister/MemberRegisterPage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import testData from "../../../../../fixtures/testData.json";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const phoneNumber = faker.phone.number();

const patientPage = new PatientPage();
const loginPage = new baseClass();
const studentPage = new StudentPage();

context("MEMBER VERIFICATION TEST CASE", () => {
  specify("PP: STUDENT VERIFICATION PAGE", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
  });

  specify("PP: STUDENT VERIFICATION - STUDENT GUARDIAN TEST CASE", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    patientPage.selectPrefferedLanguageDropdown();
    studentPage.enterUserDetailsForms();
    studentPage.enterParentGuardianInformation(
      firstName,
      lastName,
      email,
      phoneNumber,
      testData.studentDateOfBirthField
    );
  });

  specify("Verify Primary patient able to ADD PET information", () => {
    const username = faker.internet.userName();
    loginPage.verifyPatientRegistration(
      testData.memberID,
      testData.Member_FirstName,
      testData.Member_LastName
    );
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    patientPage.clickAgreeTermsAndConditionsCheckbox();
    patientPage.clickEnterPetInfo();
    patientPage.verifyPetInformationPopupIsDisplayed();
  });

  specify(
    "PP: Enter Pet Information - Verify user able to add Pet Info fields and save data",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterPetInfo();
      patientPage.verifyPetInformationPopupIsDisplayed();
      patientPage.clickAddBtn(0);
      patientPage.enterPetInfoField();
    }
  );

  specify(
    "Verify Primary Patient able to Add 'Primary Veterinarian' Medical Conditions",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterPetInfo();
      patientPage.verifyPetInformationPopupIsDisplayed();
      patientPage.clickAddBtn(0);
      patientPage.clickAddBtn(0);
      patientPage.verifyPopupDisplays("Add Primary Veterinarian");
    }
  );

  specify(
    "Verify Primary Patient able to Add 'Medical Conditions' Medical Conditions",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterPetInfo();
      patientPage.verifyPetInformationPopupIsDisplayed();
      patientPage.clickAddBtn(0);
      patientPage.clickAddBtn(1);
      patientPage.verifyPopupDisplays("Add Medical Conditions");
    }
  );

  // Skipping the tst as the functionality doesnot exist for now on UI
  specify.skip(
    "PP: Edit Pet Information - Add Family Medical History: Verify POP-UP enables on click ADD button",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickLoginBtn();
      patientPage.loginWithRegisteredPatientWithNewCredentials(
        testData.password
      );
      patientPage.verifyPatientRegistrationPageUrl();
      patientPage.clickEnterPetInfo();
      patientPage.verifyPetInformationPopupIsDisplayed();
      patientPage.clickAddBtn(0);
      patientPage.clickAddButton(2);
      patientPage.verifyPopupDisplays("Add Medical Conditions");
    }
  );

  specify(
    "Verify Primary Patient able to Add 'Surgeries' Medical Conditions",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterPetInfo();
      patientPage.verifyPetInformationPopupIsDisplayed();
      patientPage.clickAddBtn(0);
      patientPage.clickAddBtn(2);
      patientPage.verifyPopupDisplays("Add Surgeries");
    }
  );

  specify(
    "PP: Edit Medical Information - Verify Patient Registration page is displayed",
    () => {
      loginPage.enterValidMemberDetails();
      patientPage.selectPrefferedLanguageDropdown();
      studentPage.enterUserDetailsForms();
      patientPage.clickContinueBtn();
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.verifyPatientRegistrationPageUrl();
    }
  );

  specify(
    "PP: Medical Information - Verify Medical Information >> Add Primary Care Providers page is displayed",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterMedicalInfoTab();
      patientPage.clickAddButton(0);
      patientPage.verifyPopupDisplays("Add Primary Care Providers");
    }
  );

  specify(
    "PP: Medical Information - Add Medical Conditions - Verify Add Medical Conditions PopUp is displayed",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterMedicalInfoTab();
      patientPage.clickAddButton(1);
      patientPage.verifyPopupDisplays("Add Medical Conditions");
    }
  );

  specify(
    "PP: Medical Information - Add Medical Conditions - Verify Add Family Medical History PopUp is displayed",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterMedicalInfoTab();
      patientPage.clickAddButton(2);
      patientPage.verifyPopupDisplays("Add Family Medical History");
    }
  );

  specify(
    "PP: Medical Information - Surgeries - Verify Surgeries PopUp is displayed",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterMedicalInfoTab();
      patientPage.clickAddButton(3);
      patientPage.verifyPopupDisplays("Add Surgeries");
    }
  );

  specify(
    "PP: Medical Information - Allergies - Verify Surgeries PopUp is displayed",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterMedicalInfoTab();
      patientPage.clickAddButton(4);
      patientPage.verifyPopupDisplays("Add Allergies");
    }
  );

  specify(
    "PP: Medical Information - Medications - Verify Medications PopUp is displayed",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterMedicalInfoTab();
      patientPage.clickAddButton(5);
      patientPage.verifyPopupDisplays("Add Medications");
    }
  );

  specify(
    "PP: Dependent Information - Verify user navigates to Add Dependent page",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickEnterDependentInfoTab();
      patientPage.clickAddDependentButton();
      patientPage.verifyDependentRegistrationPageUrl(
        testData.verifyDependentRegistrationPageUrl
      );
    }
  );

  specify(
    "PP: Member Verification - Verify user able to login with new credentials",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.memberID,
        testData.Member_FirstName,
        testData.Member_LastName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.verifyVisibilityOfRegistrationComplete();
    }
  );

  ////////................Verify the validations on the MEMBER REGISTRATION FIELDS TESTS.............../////////

  specify("PP: Verify Validation message appears for Member ID Field", () => {
    loginPage.verifyValidationOfMemberField();
    loginPage.verifyValidationMsg(" Please Enter Your Member ID ");
  });

  specify(
    "PP: Verify Validation message appears for Member First Field",
    () => {
      loginPage.verifyValidationOfMemberFirstField();
      loginPage.verifyValidationMsg("Please Enter Your First Name");
    }
  );

  specify("PP: Verify Validation message appears for Member Last Field", () => {
    loginPage.verifyValidationOfMemberLastField();
    loginPage.verifyValidationMsg(
      "Please enter your last name. Special characters or numeric values are not allowed."
    );
  });

  specify(
    "PP: Verify validations on FirstName field on PATIENT REGISTRATION Field",
    () => {
      loginPage.enterValidMemberDetails();
      loginPage.removeContactInfoInputField(0);
      loginPage.verifyValidationMsg("Please Enter Your First Name");
    }
  );

  specify(
    "PP: Verify validations on LastName field on PATIENT REGISTRATION Field",
    () => {
      loginPage.enterValidMemberDetails();
      loginPage.removeContactInfoInputField(1);
      loginPage.verifyValidationMsg("Please Enter Your Last Name");
    }
  );

  specify(
    "PP: Verify validations on Address1 field on PATIENT REGISTRATION Field",
    () => {
      loginPage.enterValidMemberDetails();
      loginPage.verifyValidationMsg("Please Enter Your Address");
    }
  );

  specify(
    "PP: Verify validations on City field on PATIENT REGISTRATION Field",
    () => {
      loginPage.enterValidMemberDetails();
      loginPage.clearInputData(2);
      loginPage.verifyValidationMsg("Please Enter Your City");
    }
  );

  specify(
    "PP: Verify validations on Zip field on PATIENT REGISTRATION Field",
    () => {
      loginPage.enterValidMemberDetails();
      loginPage.clearInputData(3);
      loginPage.verifyValidationMsg("Please Enter Your Zip Code");
    }
  );

  specify(
    "PP: Verify validations on Email field on PATIENT REGISTRATION Field",
    () => {
      loginPage.enterValidMemberDetails();
      loginPage.clearInputData(4);
      loginPage.verifyValidationMsg("Please Enter Your Email Address");
    }
  );

  specify(
    "PP: Verify validations on Phone Number field on PATIENT REGISTRATION Field",
    () => {
      loginPage.enterValidMemberDetails();
      loginPage.clearInputData(5);
      loginPage.verifyValidationMsg("Please Enter Your Phone Number");
    }
  );
});
