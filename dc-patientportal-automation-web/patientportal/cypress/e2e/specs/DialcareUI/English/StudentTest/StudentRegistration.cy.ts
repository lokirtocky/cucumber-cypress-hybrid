import BaseClass from "../../../../pages/BaseClass/BasePage";
import StudentPage from "../../../../pages/MemberRegister/MemberRegisterPage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import testData from "../../../../../fixtures/testData.json";
import { faker } from "@faker-js/faker";
import commonPage from "../../../../pages/Common/CommonPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const phoneNumber = faker.phone.number();

const patientPage = new PatientPage();
const studentPage = new StudentPage();
const loginPage = new BaseClass();
const commonPageObj = new commonPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("STUDENT TEST CASE", () => {
  specify("TC_01: STUDENT REGISTRATION PAGE", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
  });

  specify("TC_02: STUDENT GUARDIAN TEST CASE", () => {
    loginPage.enterStudentVerificationDetails(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );

    patientPage.selectPrefferedLanguageDropdown();
    studentPage.enterUserDetailsForms();
    studentPage.verifyParentDetailsPageURl();
    studentPage.enterParentGuardianInformation(
      firstName,
      lastName,
      email,
      phoneNumber,
      testData.studentDateOfBirthField
    );
  });

  specify(
    "TC_03: Student Verification - Verify validation appears for the incorrect details",
    () => {
      loginPage.verifyStudentVerificationIncorrectDetails();
      loginPage.verificationFailedErrorMsg("Verification failed. Please try again.");
    }
  );

  specify(
    "TC_04: Verify Student able to logout from Dashboard page post registration",
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

      commonPageObj.logoutApplication();
      patientPage.loginWithRegisteredPatientWithNewCredentials(
        testData.password
      );
    }
  );

  // Skipping test as the student can schedule appointment after parental consent
  specify.skip(
    "TC_05: Verify Student able to request for virtual Visit for URGENT CARE post Registration",
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
      commonPageObj.logoutApplication();
      patientPage.loginWithRegisteredPatientWithNewCredentials(
        testData.password
      );
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
      requestVirtualVisitPageObj.verifyVirtualVisitPageUrl();
      requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
      requestVirtualVisitPageObj.selectVirtualVisitType(1);
      requestVirtualVisitPageObj.clickPhoneBtn(" Phone ");
      requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
      requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
      requestVirtualVisitPageObj.selectReasonForVisitInDDL("Cold ");
      requestVirtualVisitPageObj.getUrlEndPoint(
        "/request-virtual/pharmacy-detail"
      );
      commonPageObj.clickOnButton("Search for pharmacy");
      requestVirtualVisitPageObj.inputPharmacySearchZip("12345");
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
      requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
      requestVirtualVisitPageObj.selectReasonForVisitInDDL("Cold ");
      requestVirtualVisitPageObj.getYourVisitConfirmBtn(0);
      requestVirtualVisitPageObj.clickYourVisitConfirmBtn(0);
      requestVirtualVisitPageObj.clickYourVisitNextBtn();
      requestVirtualVisitPageObj.getUrlEndPoint(
        "/request-virtual/intake-questions"
      );
    }
  );

  // Skipping test as the student can schedule appointment after parental consent
  specify.skip(
    "TC_06: Verify Student able to request for virtual Visit for VIRTUAL VET post Registration",
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
      commonPageObj.logoutApplication();
      patientPage.loginWithRegisteredPatientWithNewCredentials(
        testData.password
      );
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
      requestVirtualVisitPageObj.verifyVirtualVisitPageUrl();
      requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
      requestVirtualVisitPageObj.selectVirtualVisitType(2);
      requestVirtualVisitPageObj.clickPhoneBtn(" Phone ");
      requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
      requestVirtualVisitPageObj.getUrlEndPoint(
        "/request-virtual/pharmacy-detail"
      );
      requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
      requestVirtualVisitPageObj.selectReasonForVisitInDDL("Fever ");
      requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    }
  );
});
