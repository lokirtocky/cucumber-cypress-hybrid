import commonPage from "../../../../pages/Common/CommonPage";
import contactInformationPage from "../../../../pages/MyAccount/ContactInformationPage";
import testData from "../../../../../fixtures/testData.json";
import Dashboard from "../../../../pages/Dashboard/DashboardPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import BaseClass from "../../../../pages/BaseClass/BasePage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import StudentPage from "cypress/e2e/pages/MemberRegister/MemberRegisterPage";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const phoneNumber = faker.phone.number();

const commonPageObj = new commonPage();
const contactInformationPageObj = new contactInformationPage();
const dashboardPage = new Dashboard();
const baseClassObj = new BaseClass();
const patientPage = new PatientPage();
const studentPage = new StudentPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("MY ACCOUNT TEST CASES", () => {
  let url = Cypress.env("url"),
    redirectUrl = Cypress.env("redirectUrl");

  beforeEach(() => {
    cy.visit(url);
    baseClassObj.loginPatient(
      testData.automation_TestUser,
      testData.patient_Password
    );

    commonPageObj.changeLanguageDropdown("Español");
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    contactInformationPageObj.clickMiCuentaTab();
    // dashboardPage.clickCloseNavBarTab();
  });

  specify("TC_01: SPANISH - MY ACCOUNT - verify user able to navigate My Account page", () => {
    contactInformationPageObj.verifyAccountsPageUrl();
  });

  specify("TC_02: SPANISH - MY ACCOUNT - PERSONAL INFORMATION - Verify user able to edit the personal details", () => {
    contactInformationPageObj.clickInformaciónDelContactoTab();
    contactInformationPageObj.verifyPersonalPageUrl();
    contactInformationPageObj.clickEditorBtn();
    patientPage.verifyMedicalInformationIsDisplayed(
      "Editar información personal"
    );
  });

  specify("TC_03: SPANISH - MY ACCOUNT - PERSONAL INFORMATION - Edit personal information and save the data", () => {
    contactInformationPageObj.clickInformaciónDelContactoTab();
    contactInformationPageObj.verifyPersonalPageUrl();
    contactInformationPageObj.clickEditorBtn();
    contactInformationPageObj.editPersonalDetailsField();
  });

  specify("TC_04: SPANISH - MY ACCOUNT - PERSONAL INFORMATION - Verify user able to edit the personal details", () => {
    contactInformationPageObj.clickInformaciónDelContactoTab();
    contactInformationPageObj.verifyPersonalPageUrl();
    contactInformationPageObj.clickEditorBtn();
    patientPage.verifyMedicalInformationIsDisplayed(
      "Editar información personal"
    );
  });

  specify("TC_05: SPANISH - MY ACCOUNT - PERSONAL INFORMATION - Edit personal information and save the data", () => {
    contactInformationPageObj.clickInformaciónDelContactoTab();
    contactInformationPageObj.verifyPersonalPageUrl();
    contactInformationPageObj.clickEditorBtn();
    contactInformationPageObj.editPersonalDetailsField();
  });

  specify("TC_06: SPANISH - MY ACCOUNT - DEPENDENT(s) - verify ADD DEPENDENT popup appears after clicking on ANADIR button", () => {
    contactInformationPageObj.clickDependentTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.dependentInformationPageUrl
    );
    commonPageObj.clickOnButton("AÑADIR");
    patientPage.verifyPopupDisplays("Agregar información dependiente");
  });

  specify("TC_07: Verify primary patient able to add OVERAGED Dependent", () => {
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
    contactInformationPageObj.clickDependentTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.dependentInformationPageUrl
    );
    commonPageObj.clickOnButton("AÑADIR");
    patientPage.verifyPopupDisplays("Agregar información dependiente");
    contactInformationPageObj.enterOverAgedDependent(overAgedDependentDetails);
    commonPageObj.clickOnButton("AHORRAR");
    const fullName = `${overAgedDependentDetails.depFirstName} ${overAgedDependentDetails.depLastName}`;
    cy.verifyDependentAdded(fullName);
  });

  specify("TC_08: Verify primary patient able to add UNDERAGED Dependent", () => {
    const underAgedDependent = {
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
    contactInformationPageObj.clickDependentTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.dependentInformationPageUrl
    );
    commonPageObj.clickOnButton(" AÑADIR ");
    patientPage.verifyPopupDisplays("Agregar información dependiente");
    contactInformationPageObj.enterUnderAgedDependent(underAgedDependent);
    commonPageObj.clickOnButton("AHORRAR");
    const fullName = `${underAgedDependent.depFirstName} ${underAgedDependent.depLastName}`;
    cy.verifyDependentAdded(fullName);
  });

  specify("TC_09: SPANISH: Verify primary patient able to Edit Pharmacy Details", () => {
    contactInformationPageObj.clickInformacionMedica();
    contactInformationPageObj.verifyMedicalInformationPageUrl();
    commonPageObj.clickAnadirButton("AÑADIR", 0);
    patientPage.verifyPopupDisplays("Búsqueda de farmacias");
    requestVirtualVisitPageObj.inputSearchFieldInSpanish("12345");
    requestVirtualVisitPageObj.clickBuscarBtn();
    requestVirtualVisitPageObj
      .getPharmacyDataList()
      .should("have.length", "18");
    requestVirtualVisitPageObj
      .getPharmacyDataList()
      .contains("BC Pharmacy")
      .click();
    requestVirtualVisitPageObj.clickProximoBtnInSpanish();
  }
  );

  specify.skip("TC_10: SPANISH: Verify primary patient able to Edit Primary Dentist", () => {
    contactInformationPageObj.clickInformacionMedica();
    contactInformationPageObj.verifyMedicalInformationPageUrl();
    commonPageObj.clickAnadirButton("Editar", 1);
    patientPage.verifyPopupDisplays(
      "Editar  Proveedores de atención primaria"
    );
    contactInformationPageObj.editPrimaryCareField(
      "Dr." + firstName,
      phoneNumber
    );
    commonPageObj.clickOnButton("AHORRAR");
  }
  );

  specify.skip("TC_11: SPANISH: Verify primary patient able to ADD and DELETE Medical Conditions", () => {
    contactInformationPageObj.clickInformacionMedica();
    contactInformationPageObj.verifyMedicalInformationPageUrl();
    commonPageObj.clickAnadirButton("Editar", 2);
    patientPage.verifyPopupDisplays("Condiciones médicas");
    commonPageObj.clickAnadirButton("AÑADIR", 2);
    contactInformationPageObj.selectMedicalConditionFromDropdown("Anemia");
    commonPageObj.clickOnButton("AHORRAR");
    contactInformationPageObj.clickDeleteIcon();
    contactInformationPageObj.clickConfirmarBtn();
    contactInformationPageObj.verifyMedConditionsRemovedFromList(["Anemia"]);
  }
  );

  specify.skip("TC_12: SPANISH: Verify primary patient able to edit FAMILY MEDICAL HISTORY", () => {
    contactInformationPageObj.clickInformacionMedica();
    contactInformationPageObj.verifyMedicalInformationPageUrl();
    commonPageObj.clickAnadirButton("Editar", 3);
    patientPage.verifyPopupDisplays("Historia médica familiar");
    commonPageObj.clickAnadirButton("AÑADIR", 2);
    contactInformationPageObj.selectFamilyMedicalConditionsDropdown(
      "Cancer ",
      "Daughter "
    );
    commonPageObj.clickOnButton("AHORRAR");
    contactInformationPageObj.clickDeleteIcon();
    contactInformationPageObj.clickConfirmarBtn();
    contactInformationPageObj.verifyMedConditionsRemovedFromList(["Cancer "]);
  }
  );

  specify.skip("TC_13: SPANISH: Verify primary patient able to edit and Delete SURGERY", () => {
    contactInformationPageObj.clickInformacionMedica();
    contactInformationPageObj.verifyMedicalInformationPageUrl();
    commonPageObj.clickAnadirButton("Editar", 4);
    patientPage.verifyPopupDisplays("Alergias");
    commonPageObj.clickAnadirButton("AÑADIR", 1);
    contactInformationPageObj.selectMedicalConditionFromDropdown("Codeine ");
    commonPageObj.clickOnButton("AHORRAR");
    contactInformationPageObj.clickDeleteIcon();
    contactInformationPageObj.clickConfirmarBtn();
    contactInformationPageObj.verifyMedConditionsRemovedFromList([
      "Codeine ",
    ]);
  }
  );

  specify("TC_14: SPANISH - MY ACCOUNT - DEPENDENT(s) - verify user navigates to dependent page url", () => {
    contactInformationPageObj.clickDependentTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.dependentInformationPageUrl
    );
  }
  );

  specify("TC_15: SPANISH - MY ACCOUNT - DEPENDENT(s) - verify ADD DEPENDENT popup appears after clicking on ANADIR button", () => {
    contactInformationPageObj.clickDependentTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.dependentInformationPageUrl
    );
    commonPageObj.clickOnButton("AÑADIR");
    patientPage.verifyPopupDisplays("Agregar información dependiente");
  }
  );

  specify("TC_16: SPANISH: Verify primary patient able to ADD,  EDIT and DELETE the PET information", () => {
    const catName = faker.animal.cat();
    contactInformationPageObj.clickMoscototab();
    commonPageObj.clickOnButton("AÑADIR");
    patientPage.verifyPopupDisplays("Agregar información de mascota");
    contactInformationPageObj.enterPetsInformation(catName);
    commonPageObj.clickOnButton(" Continuar ");
    commonPageObj.verifyConfirmationMessage("Mascota agregada con éxito");
  }
  );

  specify("TC_17: Verify primary patient able to edit and delete the pet information", () => {
    const animalName = faker.animal.dog();
    contactInformationPageObj.clickMoscototab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.petsPageUrl
    );
    contactInformationPageObj.clickOnListOfExistingPets(1);
    patientPage.verifyPopupDisplays("Información sobre mascotas");
    commonPageObj.clickOnButton("Editar información de mascota");
    contactInformationPageObj.updatePetNameInputBx(animalName);
    commonPageObj.clickOnButton("Continuar ");
    commonPageObj.verifyConfirmationMessage("Mascota actualizada con éxito");
    contactInformationPageObj.verifyPetInfoUpdated(animalName);
    contactInformationPageObj.clickOnListOfExistingPets(1);
    commonPageObj.clickOnButton(" Borrar");
    contactInformationPageObj.clickConfirmarBtn();
    commonPageObj.verifyConfirmationMessage('Deleted Successfully');
  }
  );

  context('Student Tests', () => {

    specify("TC_18: SPANISH: Verify student able to update PERSONAL INFORMATION from MYACCOUNT", () => {
      const username = faker.internet.userName();
      patientPage.verifyStudentVerification(
        testData.studentFirstName,
        testData.studentLastName,
        testData.studentDateOfBirthField,
        testData.studentID
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistrationInSpanish(
        username,
        testData.password,
        testData.password
      );
      studentPage.clickContinuarBtn();
      studentPage.verifyParentDetailsPageURl();
      studentPage.enterParentInformationFields();
      commonPageObj.clickOnButton('Ir al panel de control');
      commonPageObj.logoutApplication();
      patientPage.loginWithRegisteredPatientWithNewCredentials(testData.password);
      commonPageObj.changeLanguageDropdown("Español");
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      contactInformationPageObj.clickMiCuentaTab();
      contactInformationPageObj.clickInformaciónDelContactoTab();
      contactInformationPageObj.verifyPersonalPageUrl();
      contactInformationPageObj.clickEditorBtn();
      contactInformationPageObj.updatePersonalInformationDetails();
      commonPageObj.clickOnButton('AHORRAR');
      contactInformationPageObj.verifyUpdatedSuccessfullyMsgIsDisplayed(
        "Updated successfully!"
      );
    });
  
    specify("TC_19: SPANISH: Verify Student able to change the password post registration", () => {
      const username = faker.internet.userName();
      patientPage.verifyStudentVerification(
        testData.studentFirstName,
        testData.studentLastName,
        testData.studentDateOfBirthField,
        testData.studentID
      );
      patientPage.selectPrefferedLanguageDropdown();
      patientPage.enterPatientDetailsForRegistrationInSpanish(
        username,
        testData.password,
        testData.password
      );
      studentPage.clickContinuarBtn();
      studentPage.verifyParentDetailsPageURl();
      studentPage.enterParentInformationFields();
      commonPageObj.clickOnButton('Ir al panel de control');
      commonPageObj.logoutApplication();
      patientPage.loginWithRegisteredPatientWithNewCredentials(testData.password);
      commonPageObj.changeLanguageDropdown("Español");
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      contactInformationPageObj.clickMiCuentaTab();
      contactInformationPageObj.clickInformacionPersonalTab();
      contactInformationPageObj.verifyPersonalPageUrl();
      contactInformationPageObj.clickCambiarLaContrasena();
      contactInformationPageObj.verifyMyAccountEndPointUrl(
        testData.changePasswordPageUrl
      );
      contactInformationPageObj.enterFieldToChangePassword();
      commonPageObj.clickOnButton(" Cambiar la contraseña ");
      contactInformationPageObj.loginWithUpdatedPassword();
      commonPageObj.verifyDashboardPageUrlToBeDisplayed(
        testData.dashboardPageUrl
      );
    });
  });
  
  // Skipping the test because student is underaged so unable to add their dependent
  specify("TC_20: Verify Student able to see the Add Dependent page post registration", () => {
    const username = faker.internet.userName();
    patientPage.verifyStudentVerification(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    studentPage.clickContinuarBtn();
    studentPage.verifyParentDetailsPageURl();
    studentPage.enterParentInformationFields();
    commonPageObj.clickOnButton("ACCESO");
    patientPage.loginWithRegisteredPatientWithNewCredentials(testData.password);
    commonPageObj.clickMenuIconAfterStudentRegistration();
    contactInformationPageObj.clickMiCuentaTab();
    contactInformationPageObj.clickInformacionPersonalTab();
    contactInformationPageObj.verifyPersonalPageUrl();
    contactInformationPageObj.clickInformacionPersonalTab();
    contactInformationPageObj.clickDependentTab();
    contactInformationPageObj.verifyMyAccountEndPointUrl(
      testData.dependentInformationPageUrl
    );
    commonPageObj.clickOnButton("AÑADIR");
    patientPage.verifyPopupDisplays("Agregar información dependiente");
  }
  );
  
  // Skipping the test because student is underaged so unable to add their PETs
  specify("TC_21: Verify Student able to see the Add PET Information page post registration", () => {
    const username = faker.internet.userName();
    patientPage.verifyStudentVerification(
      testData.studentFirstName,
      testData.studentLastName,
      testData.studentDateOfBirthField,
      testData.studentID
    );
    patientPage.selectPrefferedLanguageDropdown();
    patientPage.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    studentPage.clickContinuarBtn();
    studentPage.verifyParentDetailsPageURl();
    studentPage.enterParentInformationFields();
    commonPageObj.clickOnButton("ACCESO");
    patientPage.loginWithRegisteredPatientWithNewCredentials(testData.password);
    commonPageObj.clickMenuIconAfterStudentRegistration();
    contactInformationPageObj.clickMiCuentaTab();
    contactInformationPageObj.clickInformacionPersonalTab();
    contactInformationPageObj.verifyPersonalPageUrl();
    contactInformationPageObj.clickMascotasLabel();
    contactInformationPageObj.verifyAddPetsPageUrl();
    contactInformationPageObj.clickAnadirBtn(0);
    patientPage.verifyPopupDisplays("Agregar información de mascota");
  }
  );
});