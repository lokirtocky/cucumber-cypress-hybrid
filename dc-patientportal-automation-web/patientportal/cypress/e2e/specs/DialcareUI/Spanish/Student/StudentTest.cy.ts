import Dashboard from "../../../../pages/Dashboard/DashboardPage";
import BaseClass from "../../../../pages/BaseClass/BasePage";
import commonPage from "../../../../pages/Common/CommonPage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import StudentPage from "../../../../pages/MemberRegister/MemberRegisterPage";
import testData from "../../../../../fixtures/testData.json";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.firstName();

const loginPage = new BaseClass();
const patientPageObj = new PatientPage();
const commonPageObj = new commonPage();
const studentPageObj = new StudentPage();
const dashboardPageObj = new Dashboard();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("SPANISH: STUDENT VERIFICATION TESTS", () => {
  beforeEach(() => {
    loginPage.clickVerifyYourAccountTab();
    studentPageObj.verifyMemberAccountPage();
    commonPageObj.changeLanguageDropdown("Español");
  });

  specify('TC_01: SPANISH - Verify Validation appears for "FIRST NAME" field', () => {
    patientPageObj.verifyValidationOfFirstNameField("Ingrese su ID de miembro");
  });

  specify('TC_02: SPANISH - Verify Validation appears for "LAST NAME" field', () => {
    patientPageObj.verifyValidationOfLastNameField("Ingrese su apellido. No se permiten caracteres especiales ni valores numéricos.");
  });

  specify('TC_03: SPANISH - Verify validation appears for "STUDENT - FIRSTNAME" field', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifyStudentFirstNameFieldValidation(
      "Ingrese su nombre"
    );
  }
  );

  specify('TC_04: SPANISH - Verify validation appears for "STUDENT - LASTNAME" field', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifyStudentLastNameFieldValidation(
      "Ingrese su apellido"
    );
  }
  );

  specify('TC_05: SPANISH - Verify validation appears for "STUDENT - DOB" field', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifyStudentDOBFieldValidation(
      "Ingrese su fecha de nacimiento"
    );
  }
  );

  specify('TC_06: SPANISH - Verify validation appears for "STUDENT - STUDENTID" field', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifyStudentIDFieldValidation(
      "Ingrese un valor numérico"
    );
  }
  );

  specify('TC_07: SPANISH - Verify "Successfull Verification" message appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
  });

  specify('TC_08: SPANISH - Verify validation appears for "Student Registration - USERNAME" field', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyStudentUserNameFieldValidation(
      "Ingrese su nombre de usuario"
    );
  }
  );

  specify('TC_09: SPANISH - Verify validation appears for "Student Registration - PASSWORD" fields', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyStudentPasswordFieldValidation(
      "Ingrese su contraseña"
    );
  }
  );

  specify('TC_10: SPANISH - Verify "Student Registration - FIRSTNAME" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyStudentFirstNameFieldValidation(
      "Confirme su contraseña"
    );
  }
  );

  specify('TC_11: SPANISH - Verify "Student Registration - LASTNAME" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyStudentLastNameFieldValidation(
      "Ingrese su apellido"
    );
  }
  );

  specify('TC_12: SPANISH - Verify "Student Registration - PREFERRED LANGUAGE" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyPreferredLanguageFieldValidation(
      "Seleccione el idioma de preferencia"
    );
  }
  );

  specify('TC_13: SPANISH - Verify "Student Registration - ADDRESS1 FIELD" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyAddress1FieldValidation("Ingrese su dirección");
  }
  );

  specify('TC_14: SPANISH - Verify "Student Registration - CITY FIELD" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyCityFieldValidation("Ingrese su ciudad");
  }
  );

  specify('TC_15: SPANISH - Verify "Student Registration - ZIPCODE FIELD" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyZipCodeFieldValidation(
      "Ingrese su código postal"
    );
  }
  );

  specify('TC_16: SPANISH - Verify "Student Registration - EMAIL FIELD" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyEmailFieldValidation(
      "Ingrese su dirección de correo electrónico"
    );
  }
  );

  specify('TC_17: SPANISH - Verify "Student Registration - PHONE NUMBER FIELD" field validation appears', () => {
    patientPageObj.clickVerificarBtn(1);
    patientPageObj.verifySuccessfullyVerifiedToastMessageAppears(
      "La verificación se completó con éxito"
    );
    patientPageObj.verifyPhoneNumberFieldValidation(
      "Ingrese su número de teléfono"
    );
  }
  );
});

context("STUDENT POST REGISTRATION TEST CASES", () => {

  specify("TC_01: SPANISH: Verify student able to LOGOUT from DASHBOARD post registration", () => {
    const username = faker.internet.userName();
    patientPageObj.verifyStudentVerification(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    patientPageObj.selectPrefferedLanguageDropdown();
    patientPageObj.enterStudentRegistrationFields(
      username,
      testData.password,
      testData.password
    );
    commonPageObj.clickOnButton("Continuar");
    studentPageObj.enterParentInformationFields();
    studentPageObj.verifyStudentRegistrationPage();
    commonPageObj.clickMenuIconAfterStudentRegistration();
    commonPageObj.clickLogoutFromHamburgTabs();
    dashboardPageObj.verifyUserNavigatesToSignInPageUrl(
      testData.signInPageURl
    );
  }
  );
});

context("STUDENT PATIENT REGISTRATION: REQUEST A VIRTUAL VET", () => {
  const selectors = {
    proximoBtn: "//ion-button[contains(text(),'PRÓXIMO')]/.",
    cambiar_Btn: "//ion-button[contains(text(),' CAMBIAR ')]/.",
    clickProximo_Btn: "//ion-button//ion-label[contains(text(),'PRÓXIMO')]/..",
  };

  specify("TC_02: SPANISH: Verify Student able to request for THERAPY Consultation post registration", () => {
    const username = faker.internet.userName();
    patientPageObj.verifyStudentVerification(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    patientPageObj.selectPrefferedLanguageDropdown();
    patientPageObj.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    studentPageObj.clickContinuarBtn();
    studentPageObj.verifyParentDetailsPageURl();
    studentPageObj.enterParentInformationFields();
    commonPageObj.clickMenuIconAfterStudentRegistration();
    requestVirtualVisitPageObj.clickSoliciteUnaVisitaVirtualTabFromHamburgMenu();
    requestVirtualVisitPageObj.verifyVirtualVisitPageUrl();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("Indiana");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    cy.xpath(selectors.proximoBtn).first().click({ force: true });
    requestVirtualVisitPageObj.clickInformedConsentParagraph();
    requestVirtualVisitPageObj.enterInformedConsentFormFields(
      firstName,
      lastName,
      testData.studentDateOfBirth,
      'PRÓXIMO'
    );
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Anger ");
    cy.xpath(selectors.proximoBtn).first().click({ force: true });
    requestVirtualVisitPageObj.clickIntakeRadioQuestion();
    cy.xpath(selectors.proximoBtn).first().click({ force: true });
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/select-provider"
    );
    requestVirtualVisitPageObj.clickOnAvailablityDateOfProvider(0);
    requestVirtualVisitPageObj.clickScheduleBtn().click();
    commonPageObj.clickOnButton(' CONFIRMAR ');
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/dashboard"
    );
  }
  );

  // Skipped test because student by default can create a Scheduled consultation
  specify.skip(
    "TC_04: SPANISH: Verify Student able to request for VIRTUAL VET Consultation post registration",
    () => {
      const username = faker.internet.userName();
      patientPageObj.verifyStudentVerification(
        testData.studentFirstName,
        testData.studentLastName,
        testData.studentDateOfBirthField,
        testData.studentID
      );
      patientPageObj.selectPrefferedLanguageDropdown();
      patientPageObj.enterPatientDetailsForRegistrationInSpanish(
        username,
        testData.password,
        testData.password
      );
      studentPageObj.clickContinuarBtn();
      studentPageObj.verifyParentDetailsPageURl();
      studentPageObj.enterParentInformationFields();
      commonPageObj.clickMenuIconAfterStudentRegistration();
      requestVirtualVisitPageObj.clickSoliciteUnaVisitaVirtualTabFromHamburgMenu();
      requestVirtualVisitPageObj.verifyVirtualVisitPageUrl();
      requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
      requestVirtualVisitPageObj.selectVirtualVisitType(2);
      requestVirtualVisitPageObj.clickPhoneBtn(" Phone ");
      cy.xpath(selectors.proximoBtn).click({ force: true });
      requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
      requestVirtualVisitPageObj.selectReasonForVisitInDDL("Dry Skin ");
      cy.xpath(selectors.proximoBtn).click({ force: true });
    }
  );
});
