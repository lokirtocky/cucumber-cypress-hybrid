import baseClass from "../../../../pages/BaseClass/BasePage";
import Dashboard from "../../../../pages/Dashboard/DashboardPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import testData from "../../../../../fixtures/testData.json";
import contactInformationPage from "../../../../pages/MyAccount/ContactInformationPage";
import commonPage from "../../../../pages/Common/CommonPage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import StudentPage from "../../../../pages/MemberRegister/MemberRegisterPage";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const phoneNumber = faker.phone.number();

const loginPage = new baseClass();
const dashboardPage = new Dashboard();
const requestVirtualvisitPageObj = new requestVirtualVisitPage();
const contactInformationPageObj = new contactInformationPage();
const commonPageObj = new commonPage();
const studentPage = new StudentPage();
const patientPage = new PatientPage();

context("MY ACCOUNT TEST CASES", () => {
  beforeEach(() => {
    loginPage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );

    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    requestVirtualvisitPageObj.getHamburgerMenuLogo();
    dashboardPage.clickMyAccountTab();
    contactInformationPageObj.verifyAccountsPageUrl();
  });

  specify(
    "MY ACCOUNT - PERSONAL INFORMATION - Verify user navigate to AccountInfo page after click on BACK button",
    () => {
      contactInformationPageObj.clickContactInformationTab();
      contactInformationPageObj.verifyPersonalPageUrl();
      contactInformationPageObj.clickBackButton();
      contactInformationPageObj.verifyAccountsPageUrl();
    }
  );

  specify(
    "MY ACCOUNT - MEDICAL INFORMATION - Verify user navigates to Medical Information page",
    () => {
      contactInformationPageObj.clickMedicalInformationTab();
      contactInformationPageObj.verifyMedicalInformationPageUrl();
      contactInformationPageObj.verifyMedicalInformationPageData();
    }
  );

  specify(
    "MY ACCOUNT - MEDICAL INFORMATION - Verify Primary Patient able to Edit PREFFERED PHARMACY",
    () => {
      const expectedPharmacy = "BC Pharmacy";
      contactInformationPageObj.clickMedicalInformationTab();
      contactInformationPageObj.verifyMedicalInformationPageUrl();
      contactInformationPageObj.clickEditMedicalConditionsButton(1);
      requestVirtualvisitPageObj.inputPharmacySearchZip("12345");
      requestVirtualvisitPageObj
        .getPharmacySearchBtn()
        .should("be.visible")
        .and("not.be.hidden");
      requestVirtualvisitPageObj
        .getPharmacySearchBtn()
        .should("be.visible")
        .and("not.be.disabled");
      requestVirtualvisitPageObj.clickPharmacySearchBtn();
      requestVirtualvisitPageObj
        .getPharmacyDataList()
        .should("have.length", "18");
      requestVirtualvisitPageObj
        .getPharmacyDataList()
        .contains("BC Pharmacy")
        .click();
      requestVirtualvisitPageObj.clickPharmacyNextBtn();
      contactInformationPageObj.verifyUpdatedPharmacyTextIsVisible(
        expectedPharmacy
      );
    }
  );

  specify(
    "MY ACCOUNT - MEDICAL INFORMATION - Verify Primary Patient able to Edit the PRIMARY DENTIST",
    () => {
      contactInformationPageObj.clickMedicalInformationTab();
      contactInformationPageObj.verifyMedicalInformationPageUrl();
      contactInformationPageObj.clickEditMedicalConditionsButton(2);
      patientPage.verifyPopupDisplays("  Edit  Primary Care Providers");
      contactInformationPageObj.editPrimaryCareField(
        "Dr." + firstName,
        phoneNumber
      );
      commonPageObj.clickOnButton("SAVE");
    }
  );

  specify.skip(
    "Verify Primary patient able to Edit PRIMARY CARE PHYSICIAN",
    () => {
      contactInformationPageObj.clickMedicalInformationTab();
      contactInformationPageObj.verifyMedicalInformationPageUrl();
      contactInformationPageObj.clickEditMedicalConditionsButton(2);
      patientPage.verifyPopupDisplays("  Edit  Primary Care Providers");
      contactInformationPageObj.editPrimaryCareField(
        "Dr." + firstName,
        phoneNumber
      );
      commonPageObj.clickOnButton("SAVE");
    }
  );

  specify(
    "Verify Primary patient able to Edit multiple MEDICAL CONDITIONS",
    () => {
      contactInformationPageObj.clickMedicalInformationTab();
      contactInformationPageObj.verifyMedicalInformationPageUrl();
      contactInformationPageObj.clickEditMedicalConditionsButton(3);
      patientPage.verifyPopupDisplays("Medical Conditions");
      commonPageObj.clickOnButton(" Add ");
      contactInformationPageObj.selectMedicalConditionFromDropdown("Anemia");
      commonPageObj.clickOnButton("SAVE & ADD ANOTHER");
      contactInformationPageObj.selectMedicalConditionFromDropdown("Asthma");
      commonPageObj.clickSaveButton("SAVE");
    }
  );

  specify("Verify primary patient able to EDIT and DELETE ALLEGIES", () => {
    contactInformationPageObj.clickMedicalInformationTab();
    contactInformationPageObj.verifyMedicalInformationPageUrl();
    contactInformationPageObj.clickEditMedicalConditionsButton(6);
    patientPage.verifyPopupDisplays(" Allergies");
    commonPageObj.clickOnButton(" Add ");
    contactInformationPageObj.selectMedicalConditionFromDropdown("Lipitor");
    commonPageObj.clickSaveButton("SAVE");
    contactInformationPageObj.clickDeleteIcon();
    contactInformationPageObj.clickConfirmButton();
  });

  specify("Verify Primary Patient able to EDIT and DELETE MEDICATION", () => {
    contactInformationPageObj.clickMedicalInformationTab();
    contactInformationPageObj.verifyMedicalInformationPageUrl();
    contactInformationPageObj.clickEditMedicalConditionsButton(7);
    patientPage.verifyPopupDisplays(" Medications");
    commonPageObj.clickOnButton(" Add ");
    contactInformationPageObj.selectMedicalConditionFromDropdown(
      "Ambien (Zolpidem or Zolpidem tartrate)"
    );
    commonPageObj.clickSaveButton("SAVE");
    contactInformationPageObj.clickDeleteIcon();
    contactInformationPageObj.clickConfirmButton();
  });

  specify(
    "Verify primary patient able to ADD and DELETE FAMILY MEDICAL CONDITION",
    () => {
      contactInformationPageObj.clickMedicalInformationTab();
      contactInformationPageObj.verifyMedicalInformationPageUrl();
      contactInformationPageObj.clickEditMedicalConditionsButton(4);
      patientPage.verifyPopupDisplays("Medical Conditions");
      commonPageObj.clickOnButton(" Add ");
      contactInformationPageObj.selectMedicalConditionFromDropdown(
        "Arthritis "
      );
      commonPageObj.clickSaveButton("SAVE");
      contactInformationPageObj.clickDeleteIcon();
      contactInformationPageObj.clickConfirmButton();
      contactInformationPageObj.verifyMedConditionsRemovedFromList([
        "Arthritis",
      ]);
    }
  );

  specify(
    "MY ACCOUNT - CONTACT INFORMATION - Verify user able to EDIT details under PERSONAL INFORMATION",
    () => {
      contactInformationPageObj.clickContactInformationTab();
      contactInformationPageObj.verifyPersonalPageUrl();
      contactInformationPageObj.clickEditButton();
      contactInformationPageObj.enterToEditPersonalDetailsFields();
      contactInformationPageObj.updatedPersonalInfomationData();
    }
  );

  specify(
    "MY ACCOUNT - DEPENDENT - Verify Add Dependent Popup displays after clicking on ADD button",
    () => {
      contactInformationPageObj.clickDependentsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.dependentInformationPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Dependent Information");
    }
  );

  specify(
    "MY ACCOUNT - DEPENDENT - Verify Primary patient able to add UNDERAGED DEPENDENT",
    () => {
      const dependentDetails = {
        depFirstName: firstName,
        depLastName: lastName,
        depDOB: "01/01/2010",
        preferredLanguage: "English",
        gender: "Female",
        ethnicity: "African American(non-Hispanic)",
        heightFeet: "5",
        heightInches: "5",
        heightFraction: "50",
        address: "123",
        accountHolder: "Dependent",
      };

      contactInformationPageObj.clickDependentsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.dependentInformationPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Dependent Information");
      contactInformationPageObj.enterUnderAgedDependent(dependentDetails);
      commonPageObj.clickOnButton("SAVE");
      const fullName = `${dependentDetails.depFirstName} ${dependentDetails.depLastName}`;
      cy.verifyDependentAdded(fullName);
    }
  );

  specify(
    "MY ACCOUNT - DEPENDENT - Verify primary patient able to add OVERAGED DEPENDENT",
    () => {
      const overAgedDependentDetails = {
        depFirstName: firstName,
        depLastName: lastName,
        emailField: email,
        phoneNo: "1234567890",
        depDOB: "05/01/1990",
        preferredLanguage: "English",
        gender: "Male",
        ethnicity: "African American(non-Hispanic)",
        heightFeet: "5",
        heightInches: "5",
        heightFraction: "70",
        address: "123",
        accountHolder: "Dependent",
      };

      contactInformationPageObj.clickDependentsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.dependentInformationPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Dependent Information");
      contactInformationPageObj.enterOverAgedDependent(
        overAgedDependentDetails
      );
      commonPageObj.clickOnButton("SAVE");
      const fullName = `${overAgedDependentDetails.depFirstName} ${overAgedDependentDetails.depLastName}`;
      cy.verifyDependentAdded(fullName);
    }
  );

  specify(
    "MY ACCOUNT - DEPENDENT - Verify Primary patient able to add SPOUSE",
    () => {
      const dependentDetails = {
        depFirstName: firstName,
        depLastName: lastName,
        depDOB: "01/01/2010",
        preferredLanguage: "English",
        gender: "Female",
        ethnicity: "Native American ",
        heightFeet: "5",
        heightInches: "5",
        heightFraction: "50",
        address: "123",
        accountHolder: "Spouse ",
      };

      contactInformationPageObj.clickDependentsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.dependentInformationPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Dependent Information");
      contactInformationPageObj.enterUnderAgedDependent(dependentDetails);
      commonPageObj.clickOnButton("SAVE");
    }
  );

  specify(
    'MY ACCOUNT - DEPENDENT - Verify user able to add "MyAccount - Add Dependent Information"',
    () => {
      contactInformationPageObj.clickDependentsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.dependentInformationPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Dependent Information");
    }
  );

  specify(
    "MY ACCOUNT - PETs - Verify user able to navigates Pets page url",
    () => {
      contactInformationPageObj.clickPetsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.petsPageUrl
      );
    }
  );

  specify(
    "MY ACCOUNT - PETs - Verify Add Pet Information pupup displays on clicking ADD button",
    () => {
      contactInformationPageObj.clickPetsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.petsPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Pet Information");
    }
  );

  specify(
    "MY ACCOUNT - CHANGE PASSWORD - Verify user navigates to change password page",
    () => {
      contactInformationPageObj.clickChangePasswordTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.changePasswordPageUrl
      );
    }
  );

  specify(
    "MY ACCOUNT - CHANGE PASSWORD - Verify validation appears for change password field",
    () => {
      contactInformationPageObj.clickChangePasswordTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.changePasswordPageUrl
      );
      contactInformationPageObj.verifyChangePasswordFieldValidation(
        "Password is Required"
      );
    }
  );

  specify("Verify Primary Patient able to ADD PET information", () => {
    const catName = faker.animal.cat();
    contactInformationPageObj.clickPetsTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(testData.petsPageUrl);
    commonPageObj.clickOnButton("Add");
    patientPage.verifyPopupDisplays("Add Pet Information");
    contactInformationPageObj.enterPetsInformation(catName);
    commonPageObj.clickOnButton("Continue");
    commonPageObj.verifyConfirmationMessage("Pet successfully added");
  });

  specify(
    "Verify primary patient able to Edit and DELETE PET Information",
    () => {
      const animalName = faker.animal.dog();
      contactInformationPageObj.clickPetsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.petsPageUrl
      );
      contactInformationPageObj.clickOnListOfExistingPets(1);
      commonPageObj.clickOnButton("Edit pet info");
      contactInformationPageObj.updatePetNameInputBx(animalName);
      commonPageObj.clickOnButton(" Continue ");
      commonPageObj.verifyConfirmationMessage("Pet successfully updated");
      contactInformationPageObj.verifyPetInfoUpdated(animalName);
      contactInformationPageObj.clickOnListOfExistingPets(1);
      commonPageObj.clickOnButton(" Delete");
      contactInformationPageObj.clickConfirmButton();
      commonPageObj.verifyConfirmationMessage("Deleted Successfully");
    }
  );

  specify(
    "Verify primary patient able to ADD Medical Information of PET",
    () => {
      contactInformationPageObj.clickPetsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.petsPageUrl
      );
      contactInformationPageObj.clickOnListOfExistingPets(1);
      commonPageObj.clickOnButton("Pet Information");
      commonPageObj.clickAnadirButton("Add", 1);
      commonPageObj.clickOnButton("Add");
      contactInformationPageObj.selectMedicalConditionFromDropdown("Lipitor");
      commonPageObj.clickSaveButton("SAVE");
    }
  );
});

context("UPDATE PROFILE SCENARIO", () => {
  specify(
    "MyAccount - Change Password - Verify user able to change the password",
    () => {
      const username = faker.internet.userName();
      loginPage.verifyPatientRegistration(
        testData.member_Id,
        testData.member_FName,
        testData.member_LName
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      patientPage.clickAgreeTermsAndConditionsCheckbox();
      patientPage.clickLoginBtn();
      commonPageObj.verifyDashboardPageUrlToBeDisplayed(
        testData.dashboardPageUrl
      );

      requestVirtualvisitPageObj.getHamburgerMenuLogo();
      dashboardPage.clickMyAccountTab();
      contactInformationPageObj.verifyAccountsPageUrl();
      contactInformationPageObj.clickChangePasswordTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.changePasswordPageUrl
      );
      contactInformationPageObj.enterFieldToChangePassword();
      commonPageObj.clickOnButton("Change Password");
      commonPageObj.logoutApplication();
      contactInformationPageObj.loginWithUpdatedPassword();
    }
  );

  specify(
    "Verify student able to update personal information post registration",
    () => {
      const username = faker.internet.userName();
      loginPage.enterStudentVerificationDetails(
        testData.studentFirstName,
        testData.studentLastName,
        testData.studentDateOfBirthField,
        testData.studentID
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      studentPage.verifyParentDetailsPageURl();
      studentPage.enterParentGuardianInformation(
        firstName,
        lastName,
        email,
        phoneNumber,
        testData.studentDateOfBirthField
      );
      patientPage.clickLoginBtn();
      commonPageObj.verifyDashboardPageUrlToBeDisplayed(
        testData.dashboardPageUrl
      );
      requestVirtualvisitPageObj.getHamburgerMenuLogo();
      dashboardPage.clickMyAccountTab();
      contactInformationPageObj.verifyAccountsPageUrl();
      contactInformationPageObj.clickContactInformationTab();
      contactInformationPageObj.verifyPersonalPageUrl();
      contactInformationPageObj.clickEditButton();
      contactInformationPageObj.enterToEditPersonalDetailsFields();
      contactInformationPageObj.verifyUpdatedSuccessfullyMsgIsDisplayed(
        "Updated successfully!"
      );
    }
  );

  specify("Verify student able to change password post registration", () => {
    const username = faker.internet.userName();
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistration(
      username,
      testData.password,
      testData.password
    );
    studentPage.verifyParentDetailsPageURl();
    studentPage.enterParentGuardianInformation(
      firstName,
      lastName,
      email,
      phoneNumber,
      testData.studentDateOfBirthField
    );
    patientPage.clickLoginBtn();
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    requestVirtualvisitPageObj.getHamburgerMenuLogo();
    dashboardPage.clickMyAccountTab();
    contactInformationPageObj.verifyAccountsPageUrl();
    contactInformationPageObj.clickContactInformationTab();
    contactInformationPageObj.verifyPersonalPageUrl();
    contactInformationPageObj.clickEditButton();
    contactInformationPageObj.enterToEditPersonalDetailsFields();
    contactInformationPageObj.verifyUpdatedSuccessfullyMsgIsDisplayed(
      "Updated successfully!"
    );
  });

  // Skipped because student has no rights to ADD DEPENDENT
  specify.skip(
    "Verify ADD DEPENDENT popup displays properly post Registration to Student",
    () => {
      const username = faker.internet.userName();
      loginPage.enterStudentVerificationDetails(
        testData.studentFirstName,
        testData.studentLastName,
        testData.studentDateOfBirthField,
        testData.studentID
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      studentPage.verifyParentDetailsPageURl();
      studentPage.enterParentGuardianInformation(
        firstName,
        lastName,
        email,
        phoneNumber,
        testData.studentDateOfBirthField
      );
      patientPage.clickLoginBtn();
      patientPage.loginWithRegisteredPatientWithNewCredentials(
        testData.password
      );
      patientPage.verifyStudentRegistrationPageUrl();
      commonPageObj.verifyCompletingRegistrationPageDisplayed();
      dashboardPage.clickMyAccountTab();
      contactInformationPageObj.verifyAccountsPageUrl();
      contactInformationPageObj.clickDependentsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.dependentInformationPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Dependent Information");
    }
  );

  // Skipping test because student has no right to save the Pet Information
  specify.skip(
    "Verify ADD PET INFORMATION popup displays post Registration to Student",
    () => {
      const username = faker.internet.userName();
      loginPage.enterStudentVerificationDetails(
        testData.studentFirstName,
        testData.studentLastName,
        testData.studentDateOfBirthField,
        testData.studentID
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistration(
        username,
        testData.password,
        testData.password
      );
      studentPage.verifyParentDetailsPageURl();
      studentPage.enterParentGuardianInformation(
        firstName,
        lastName,
        email,
        phoneNumber,
        testData.studentDateOfBirthField
      );
      patientPage.clickLoginBtn();
      patientPage.loginWithRegisteredPatientWithNewCredentials(
        testData.password
      );
      patientPage.verifyStudentRegistrationPageUrl();
      commonPageObj.verifyCompletingRegistrationPageDisplayed();
      dashboardPage.clickMyAccountTab();
      contactInformationPageObj.verifyAccountsPageUrl();
      contactInformationPageObj.clickPetsTab();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.petsPageUrl
      );
      commonPageObj.clickOnButton("Add");
      patientPage.verifyPopupDisplays("Add Pet Information");
    }
  );
});
