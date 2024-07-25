import testData from "../../../../../fixtures/testData.json";
import PatientPage from "../../../../pages/Patient/PatientPage";
import commonPage from "../../../../pages/Common/CommonPage";
import { faker } from "@faker-js/faker";
import BaseClass from "../../../../pages/BaseClass/BasePage";
import StudentPage from "../../../../pages/MemberRegister/MemberRegisterPage";
import contactInformationPage from "../../../../pages/MyAccount/ContactInformationPage";

const commonPageObj = new commonPage();
const patientPage = new PatientPage();
const baseClassObj = new BaseClass();
const studentPage = new StudentPage();
const contactInformationPageObj = new contactInformationPage();

context("MEMBER VERIFICATION TEST CASES", () => {
  const selectors = {
    memberIdLbl:
      ".grid-width-res .hydrated:nth-of-type(1) .hydrated:nth-of-type(1) .hydrated:nth-of-type(1) > .hydrated:nth-of-type(1) .sc-ion-label-md-s",
    firstNameLbl:
      "app-verifymemberaccount form ion-label",
    lastNameLbl:
      ".grid-width-res .hydrated:nth-of-type(1) .hydrated:nth-of-type(1) .hydrated:nth-of-type(1) > .hydrated:nth-of-type(3) .sc-ion-label-md-s",
    verifyBtn: ".grid-width-res .hydrated:nth-of-type(4) ion-col",
    verifyYourAccountParagraphTxt: "ion-grid.verify-below-grid.md.hydrated > ion-row:nth-child(2) > ion-col > ion-label",
    firstName_Lbl: "app-name-info .ion-input",
    contactFirstNameTxtBx:
      'app-name-info ion-input[formcontrolname="firstName"] input',
    ContactInformationHeaderTxt:
      ".desktop-margin-left.hydrated.in-toolbar.md.toolbar-background.toolbar-label > .contact-text.hydrated.md.sc-ion-label-md-h.sc-ion-label-md-s.text-blue",
    contactFirstNameErrMsg: "app-name-info form em",
    contactLastNameLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[1]/ion-row/ion-col[1]/ion-card/app-name-info/form/ion-row[2]/ion-col/ion-label',
    lastNameTxtBx: 'app-name-info ion-input[formcontrolname="lastName"] input',
    contactLastNameErrMsg: "app-name-info .validation-error",
    ContactInformationHeader_Txt:
      ".desktop-margin-left.hydrated.in-toolbar.md.toolbar-background.toolbar-label > .contact-text.hydrated.md.sc-ion-label-md-h.sc-ion-label-md-s.text-blue",
    middleInitialLbl:
      '//ion-content[@id="layout"]//div[@class="ion-page"]/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[1]/ion-row/ion-col[1]//app-name-info/form/ion-row[3]/ion-col[1]/ion-label[.="Inicial del segundo nombre"]',
    suffixLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[1]/ion-row/ion-col[1]/ion-card/app-name-info/form/ion-row[3]/ion-col[2]/ion-label',
    dateOfBirthLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[1]/ion-row/ion-col[2]/ion-card/app-dob-info/div/ion-row[1]/ion-col/ion-label',
    PreferredLangaguge:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[1]/ion-row/ion-col[2]/ion-card/app-dob-info/div/ion-row[2]/ion-col/ion-label',
    address1Lbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[1]/ion-col/ion-label',
    address1TxtBx: "app-address-auto-complete ion-input input",
    address1ErrMsg: "app-address-info em",
    address2Lbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[2]/ion-col/ion-label',
    verifyButton:
      '//*[@id="main-content"]/ion-content/form/ion-grid/ion-row/ion-col/ion-grid[2]/ion-row[3]/ion-col/ion-button',
    cityLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[3]/ion-col/ion-label',
    cityTxtBx: 'ion-input[formcontrolname="city"] input',
    cityErrMsg:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[3]/ion-col/em',
    stateLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[4]/ion-col[1]/ion-label',
    zipcodeLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[4]/ion-col[2]/ion-label',
    zipcodeTxtBx: 'ion-input[formcontrolname="zipCode"] input',
    zipcodeErrMsg:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[4]/ion-col[2]/em',
    emailLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[5]/ion-col/ion-label',
    emailTxtBx: 'ion-input[formcontrolname="email"] input',
    emailErrMSg:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[5]/ion-col/em',
    phoneNumberLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[6]/ion-col/ion-label',
    phoneNumberTxtBx: 'ion-input[formcontrolname="phoneNumber"] input',
    phoneNumberErrMsg:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-card/app-address-info/form/ion-row[6]/ion-col/em',
    usernameLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[3]/ion-row[1]/ion-col/ion-card/app-password-info/form/ion-row[1]/ion-col/ion-label',
    usernameTxtBx: 'ion-input[formcontrolname="userName"] input',
    usernameErrMsg:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[3]/ion-row[1]/ion-col/ion-card/app-password-info/form/ion-row[1]/ion-col/em',
    passwordLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[3]/ion-row[1]/ion-col/ion-card/app-password-info/form/ion-row[2]/ion-col/ion-label',
    passwordTxtBx: 'ion-input[formcontrolname="password"] input',
    passwordErrMsg:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[3]/ion-row[1]/ion-col/ion-card/app-password-info/form/ion-row[2]/ion-col/em',
    confirmPasswordTxtBx: 'ion-input[formcontrolname="confirmPassword"] input',
    confirmPasswordErrMsg:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[3]/ion-row[1]/ion-col/ion-card/app-password-info/form/ion-row[3]/ion-col/em',
    confrimPasswordLbl:
      '//*[@id="layout"]/app-patient/div/ion-content/ion-grid/ion-row[2]/ion-col/app-patient-web/ion-grid/ion-row/ion-col[3]/ion-row[1]/ion-col/ion-card/app-password-info/form/ion-row[3]/ion-col/ion-label',
    continueBtn:
      "//ion-button[contains(text(),'Continuar')]",
    hamburgIcon: "app-menu-items-web ion-icon",
    app_informed_ConcentParagraph: "app-informed-consent",
    termsAndConditionText: "app-terms-and-conditions ion-card ion-card-content",
    atras_button: "//ion-label[contains(text(),' atrás ')]",
    IAgreeTermsAndConditionsCheckbox: "app-terms-and-conditions ion-checkbox"
  };

  let url = Cypress.env("url"),
    redirectUrl = Cypress.env("redirectUrl");
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(url);
    cy.origin(redirectUrl, () => {
      let verifyYourAccountLnk = "a#verifyAccount";
      cy.get(verifyYourAccountLnk).click();
    });
    cy.wait(1000);
    commonPageObj.changeLanguageDropdown("Español");
  });

  specify("TC_01: SPANISH - Verify Add Medical Conditions page is displayed", () => {
    const username = faker.internet.userName();
    baseClassObj.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("La verificación se completó con éxito");
    patientPage.selectPrefferedLanguage("Spanish");
    patientPage.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    cy.xpath('//ion-button[contains(text(),"Continuar")]').scrollIntoView();
    commonPageObj.clickOnButton("Continuar");
    cy.get(selectors.termsAndConditionText)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.get(selectors.IAgreeTermsAndConditionsCheckbox).click();
    commonPageObj.clickOnButton("PRÓXIMO");
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickAddMedicalInformationType("Ingrese información médica");
    patientPage.verifyPatientMedicalInfoPageUrl();
  }
  );

  specify('TC_02: SPANISH - Verify user able to save "Add Medical Conditions"', () => {
    const username = faker.internet.userName();
    baseClassObj.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("La verificación se completó con éxito");
    patientPage.selectPrefferedLanguage("Spanish");
    patientPage.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    commonPageObj.clickOnButton("Continuar");
    cy.get(selectors.termsAndConditionText)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.get(selectors.IAgreeTermsAndConditionsCheckbox).click();
    commonPageObj.clickOnButton("PRÓXIMO");
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickAddMedicalInformationType("Ingrese información médica");
    patientPage.verifyPatientMedicalInfoPageUrl();
    contactInformationPageObj.clickAnadirBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed(
      " AÑADIR   Condiciones médicas"
    );
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    commonPageObj.clickOnButton("AHORRAR");
    patientPage.verifyNoMedicalInformationAdded(" Arthritis ");
  }
  );

  specify('TC_03: SPANISH - Verify user able to delete the added "Add Medical Conditions"', () => {
    const username = faker.internet.userName();
    baseClassObj.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("La verificación se completó con éxito");
    patientPage.selectPrefferedLanguage("Spanish");
    patientPage.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    commonPageObj.clickOnButton("Continuar");
    cy.get(selectors.termsAndConditionText)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.get(selectors.IAgreeTermsAndConditionsCheckbox).click();
    commonPageObj.clickOnButton("PRÓXIMO");
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickAddMedicalInformationType("Ingrese información médica");
    patientPage.verifyPatientMedicalInfoPageUrl();
    contactInformationPageObj.clickAnadirBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed(
      "AÑADIR   Condiciones médicas"
    );
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    commonPageObj.clickOnButton("AHORRAR");
    patientPage.deleteAddedMedicalInformation();
    patientPage.verifyNoMedicalInformationAdded(
      "No se agregaron condiciones médicas"
    );
  }
  );

  specify('TC_04: SPANISH - Verify user able to add multiple "Medical Conditions"', () => {
    const username = faker.internet.userName();
    baseClassObj.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("La verificación se completó con éxito");
    patientPage.selectPrefferedLanguage("Spanish");
    patientPage.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    commonPageObj.clickOnButton("Continuar");
    cy.get(selectors.termsAndConditionText)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.get(selectors.IAgreeTermsAndConditionsCheckbox).click();
    commonPageObj.clickOnButton("PRÓXIMO");
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickAddMedicalInformationType("Ingrese información médica");
    patientPage.verifyPatientMedicalInfoPageUrl();
    contactInformationPageObj.clickAnadirBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed(
      "AÑADIR   Condiciones médicas"
    );
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    commonPageObj.clickOnButton("GUARDAR Y AGREGAR OTRO");
    patientPage.selectMedicalConditionDropdown("Asthma ");
    commonPageObj.clickOnButton("AHORRAR");
    patientPage.verifyMedicalConditionsAreSaved(["Arthritis", "Asthma"]);
    patientPage.deleteAddedMedicalInformation();
    patientPage.verifyNoMedicalInformationAdded(
      "No se agregaron condiciones médicas"
    );
  }
  );

  specify('TC_05: SPANISH - Verify user able to delete all added "Medical Conditions"', () => {
    const username = faker.internet.userName();
    baseClassObj.verifyPatientRegistration(
      testData.member_Id,
      testData.member_FName,
      testData.member_LName
    );
    studentPage.verifySuccessfullyVerifiedMsg("La verificación se completó con éxito");
    patientPage.selectPrefferedLanguage("Spanish");
    patientPage.enterPatientDetailsForRegistrationInSpanish(
      username,
      testData.password,
      testData.password
    );
    commonPageObj.clickOnButton("Continuar");
    cy.get(selectors.termsAndConditionText)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.get(selectors.IAgreeTermsAndConditionsCheckbox).click();
    commonPageObj.clickOnButton("PRÓXIMO");
    patientPage.verifyPatientRegistrationPageUrl();
    patientPage.clickAddMedicalInformationType("Ingrese información médica");
    patientPage.verifyPatientMedicalInfoPageUrl();
    contactInformationPageObj.clickAnadirBtn(2);
    patientPage.verifyMedicalInformationIsDisplayed(
      "AÑADIR   Condiciones médicas"
    );
    patientPage.selectMedicalConditionDropdown("Arthritis ");
    commonPageObj.clickOnButton("GUARDAR Y AGREGAR OTRO");
    patientPage.selectMedicalConditionDropdown("Asthma ");
    commonPageObj.clickOnButton("AHORRAR");
    patientPage.verifyMedicalConditionsAreSaved(["Arthritis", "Asthma"]);
    patientPage.deleteAddedMedicalInformation();
    patientPage.verifyNoMedicalInformationAdded(
      "No se agregaron condiciones médicas"
    );
  }
  );

  specify("TC_06: SPANISH - MEMBER VERIFICATION PAGE CONTENT Identificación de miembro", () => {
    cy.get(selectors.memberIdLbl).should(
      "have.text",
      "Identificación de miembro"
    );
  }
  );

  specify("TC_07: SPANISH - MEMBER VERIFICATION PAGE CONTENT Identificación de miembro", () => {
    cy.get(selectors.firstNameLbl).eq(0).should("have.text", "Identificación de miembro");
  });

  specify("TC_08: SPANISH - MEMBER VERIFICATION PAGE CONTENT Ingrese su apellido. No se permiten caracteres especiales ni valores numéricos.", () => {
    cy.get(selectors.lastNameLbl).should("have.text", "Ingrese su apellido. No se permiten caracteres especiales ni valores numéricos.");
  });

  specify("TC_09: SPANISH - MEMBER VERIFICATION PAGE CONTENT VERIFICAR", () => {
    cy.get(selectors.verifyBtn).should("have.text", "VERIFICAR");
  });

  specify("TC_10: SPANISH - MEMBER VERIFICATION PAGE CONTENT Si forma parte del programa", () => {
    cy.get(selectors.verifyYourAccountParagraphTxt).should(
      "have.text",
      "Si forma parte del programa de escuela intermedia o secundaria DialCare, verifique su cuenta a continuación."
    );
  }
  );

  specify("TC_11: SPANISH - MEMBER VERIFICATION ERROR MESSAGE Ingrese su ID de miembro", () => {
    patientPage.getLastNameTxtBx().eq(0).type("first", { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type("last", { force: true });
    patientPage.getMemeberIDTxtBx().eq(0).type("123", { force: true });
    patientPage.getMemeberIDTxtBx().eq(0).clear();
    patientPage.getLastNameTxtBx().eq(0).clear();
    patientPage.getFirstNameTxtBx().eq(0).clear();
    patientPage.getLastNameTxtBx().eq(0).type("first", { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type("last", { force: true });
    patientPage
      .getErrMsg()
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s\s+/g, " ").trim();
        expect(trimmedText).to.equal("Ingrese su ID de miembro");
      });
  }
  );

  specify("TC_12: SPANISH - MEMBER VERIFICATION ERROR MESSAGE El nombre es obligatorio", () => {
    patientPage.getLastNameTxtBx().eq(0).type("first", { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type("last", { force: true });
    patientPage.getMemeberIDTxtBx().eq(0).type("123", { force: true });
    patientPage.getLastNameTxtBx().eq(0).type("first", { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type("last", { force: true });
    patientPage.getMemeberIDTxtBx().eq(0).clear();
    patientPage.getLastNameTxtBx().eq(0).clear();
    patientPage.getFirstNameTxtBx().eq(0).clear();
    patientPage.getMemeberIDTxtBx().eq(0).type("123", { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type("last", { force: true });
    patientPage
      .getErrMsg()
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s\s+/g, " ").trim();
        expect(trimmedText).to.equal("Ingrese su nombre");
      });
  }
  );

  specify("TC_13: SPANISH - MEMBER VERIFICATION ERROR MESSAGE Apellido obligatorio", () => {
    patientPage.getLastNameTxtBx().eq(0).type("first", { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type("last", { force: true });
    patientPage.getMemeberIDTxtBx().eq(0).type("123", { force: true });
    patientPage.getLastNameTxtBx().eq(0).type("first", { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type("last", { force: true });
    patientPage.getMemeberIDTxtBx().eq(0).clear();
    patientPage.getLastNameTxtBx().eq(0).clear();
    patientPage.getFirstNameTxtBx().eq(0).clear();
    patientPage.getMemeberIDTxtBx().eq(0).type("123", { force: true });
    patientPage.getLastNameTxtBx().eq(0).type("first", { force: true });
    patientPage
      .getErrMsg()
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s\s+/g, " ").trim();
        expect(trimmedText).to.equal("Ingrese su apellido. No se permiten caracteres especiales ni valores numéricos.");
      });
  });

  specify("TC_14: SPANISH - MEMBER VERIFICATION SUCCESS MESSAGE Verificado con éxito", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.contains("La verificación se completó con éxito").should("be.visible");
  }
  );

  specify.skip("TC_15: SPANISH - MEMBER VERIFICATION Validate Header Text Información del contacto",() => {
      // Skip beacuse contact us header text is not any more in the UI
      patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id);
      patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName);
      patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName);
      patientPage.getVerifyBtn().eq(0).click();
      patientPage
        .getContactInformationHeaderTxt()
        .invoke("text")
        .then((text) => {
          const trimmedText = text.replace(/\s\s+/g, " ").trim();
          expect(trimmedText).to.equal("Informacion personal");
        });
    }
  );

  specify("TC_16: SPANISH - MEMBER VERIFICATION Validate first name label Nombre de pila", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.firstNameLbl).eq(0).should("have.text", "Nombre de pila");
  }
  );

  specify("TC_17: SPANISH - MEMBER VERIFICATION Validate first name error message El nombre es obligatorio", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.contactFirstNameTxtBx).clear();
    patientPage
      .getErrMsg().eq(0)
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s+/g, " ").trim();
        expect(trimmedText).to.equal("Ingrese su nombre");
      })
  }
  );

  specify("TC_18: SPANISH - MEMBER VERIFICATION Validate last name label Apellido", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.firstNameLbl).eq(1).should("have.text", "Apellido");
  });

  specify("TC_19: SPANISH - MEMBER VERIFICATION Validate last name error message Apellido obligatorio", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.lastNameTxtBx).clear();
    // cy.get(selectors.ContactInformationHeaderTxt).click();
    patientPage
      .getErrMsg().eq(0)
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s+/g, " ").trim();
        expect(trimmedText).to.equal("Ingrese su apellido");
      })
  }
  );

  specify("TC_20: SPANISH - MEMBER VERIFICATION Validate middle Initial Lbl label Inicial del segundo nombre", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.middleInitialLbl).should(
      "have.text",
      "Inicial del segundo nombre"
    );
  }
  );

  specify("TC_21: SPANISH - MEMBER VERIFICATION Validate Suffix label Sufijo", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.suffixLbl).should("have.text", "Sufijo");
  });

  specify("TC_22: SPANISH - MEMBER VERIFICATION Validate date of birth label Fecha de nacimiento", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.dateOfBirthLbl).should(
      "have.text",
      "Fecha de nacimiento"
    );
  }
  );

  specify("TC_23: SPANISH - MEMBER VERIFICATION Validate Preferred Language label Idioma preferido", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.PreferredLangaguge).should(
      "have.text",
      "Idioma preferido"
    );
  }
  );

  specify("TC_24: SPANISH - MEMBER VERIFICATION Validate address 1 label Dirección Línea 1", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.address1Lbl).should("have.text", "Dirección Línea 1");
  }
  );

  specify("TC_25: SPANISH - MEMBER VERIFICATION Validate address 1 error message Dirección1 es obligatoria", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.address1TxtBx).type("t").clear();
    cy.get(selectors.address1ErrMsg).eq(0).should(($el) => {
      const text = $el.text(); // Trim leading and trailing whitespace
      expect(text).to.equal("Ingrese su dirección");
    });
  }
  );

  specify("TC_26: SPANISH - MEMBER VERIFICATION Validate adddress 2 label Línea de dirección 2", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.address2Lbl).should(
      "have.text",
      "Línea de dirección 2"
    );
  }
  );

  specify("TC_27: SPANISH - MEMBER VERIFICATION Validate city label Ciudad", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.cityLbl).should("have.text", "Ciudad");
  });

  specify("TC_28: SPANISH - MEMBER VERIFICATION Validate city error message Ingrese su ciudad", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.cityTxtBx).clear();
    cy.get(selectors.ContactInformationHeaderTxt).click();
    cy.xpath(selectors.cityErrMsg).should("have.text", "Ingrese su ciudad");
  }
  );

  specify("TC_29: SPANISH - MEMBER VERIFICATION Validate state label Estado", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.stateLbl).should("have.text", "Estado");
  });

  specify("TC_30: SPANISH - MEMBER VERIFICATION Validate zipcode label Código postal", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.zipcodeLbl).should("have.text", "Código postal");
  }
  );

  specify("TC_31: SPANISH - MEMBER VERIFICATION Validate zipcode error message El código postal es obligatorio", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.zipcodeTxtBx).clear();
    cy.get(selectors.ContactInformationHeaderTxt).click();
    cy.xpath(selectors.zipcodeErrMsg).should(
      "have.text",
      "Ingrese su código postal"
    );
  }
  );

  specify("TC_32: SPANISH - MEMBER VERIFICATION Validate email label Correo electrónico", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.emailLbl).should("have.text", "Correo electrónico");
  }
  );

  specify("TC_33: SPANISH - MEMBER VERIFICATION Validate email error message Correo electronico es requerido", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.emailTxtBx).clear();
    cy.get(selectors.ContactInformationHeaderTxt).click();
    cy.xpath(selectors.emailErrMSg).should(
      "have.text",
      "Ingrese su dirección de correo electrónico"
    );
  }
  );

  specify("TC_34: SPANISH - MEMBER VERIFICATION Validate phone number label Número de teléfono", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.phoneNumberLbl).should(
      "have.text",
      "Número de teléfono"
    );
  }
  );

  specify("TC_35: SPANISH - MEMBER VERIFICATION Validate phone number error message Ingrese su número de teléfono", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.phoneNumberTxtBx).clear();
    cy.get(selectors.ContactInformationHeaderTxt).click();
    cy.xpath(selectors.phoneNumberErrMsg).should(
      "have.text",
      "Ingrese su número de teléfono"
    );
  }
  )

  specify("TC_36: SPANISH - verify patient portal username Label Nombre de usuario", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.usernameLbl).should("have.text", "Nombre de usuario");
  });

  specify("TC_37: SPANISH - verify patient portal username error message Ingrese su nombre de usuario", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.usernameTxtBx).type("user");
    cy.get(selectors.usernameTxtBx).clear();
    cy.get(selectors.ContactInformationHeaderTxt).click();
    cy.xpath(selectors.usernameErrMsg).should(
      "have.text",
      "Ingrese su nombre de usuario"
    );
  }
  );

  specify("TC_38: SPANISH - verify patient portal password label Contraseña", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.passwordLbl).should("have.text", "Contraseña");
  });

  specify("TC_39: SPANISH - verify patient portal password error message Se requiere contraseña", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.passwordTxtBx).type("password");
    cy.get(selectors.passwordTxtBx).clear();
    cy.get(selectors.ContactInformationHeaderTxt).click();
    cy.xpath(selectors.passwordErrMsg).should(
      "have.text",
      "Ingrese su contraseña"
    );
  }
  );

  specify("TC_40: SPANISH - verify patent portal confirm password label Confirmación de contraseña", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.confrimPasswordLbl).should(
      "have.text",
      "Confirmación de contraseña"
    );
  }
  );

  specify("TC_41: SPANISH - verify patent portal confirm password error message Confirmar contraseña requerida", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(selectors.confirmPasswordTxtBx).type("password");
    cy.get(selectors.confirmPasswordTxtBx).clear();
    cy.get(selectors.ContactInformationHeaderTxt).click();
    cy.xpath(selectors.confirmPasswordErrMsg).should(
      "have.text",
      "Confirme su contraseña"
    );
  }
  );

  specify("TC_42: SPANISH - verify patent portal continue button visible Continuar", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.xpath(selectors.continueBtn)
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s\s+/g, " ").trim();
        expect(trimmedText).to.equal("Continuar");
      });
  });

  specify("TC_43: SPANISH - verify patent portal password validation error messages", () => {
    let passwordValidationsMsg = "[class] .password-text:nth-of-type(n)";
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    patientPage.getVerifyBtn().eq(0).click();
    cy.get(passwordValidationsMsg).should(
      "contain",
      "Debe tener al menos 8 caracteres."
    );
    cy.get(passwordValidationsMsg).should(
      "contain",
      "Debe contener letras mayúsculas y minúsculas."
    );
    cy.get(passwordValidationsMsg).should(
      "contain",
      "Debe contener al menos un número"
    );
    cy.get(passwordValidationsMsg).should(
      "contain",
      "Debe contener al menos un símbolo."
    );
  });

  specify("TC_44: SPANISH - verify patent portal validate first name label Nombre de pila", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let verifyAccountHeaderTxt = '//*[contains(text(),"Verificar Cuenta")]';
    let firstNameLbl = '//*[contains(text(),"Nombre de pila")]';
    cy.xpath(verifyAccountHeaderTxt)
      .eq(1)
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s\s+/g, " ").trim();
        expect(trimmedText).to.eq('Verificar Cuenta');
        cy.xpath(firstNameLbl).eq(1).should("have.text", "Nombre de pila");
      })
  }
  );

  specify("TC_45: SPANISH - verify patent portal validate verify header text Verificar Cuenta", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let verifyAccountHeaderTxt = '//*[contains(text(),"Verificar Cuenta")]';
    cy.xpath(verifyAccountHeaderTxt)
      .eq(1)
      .invoke("text")
      .then((text) => {
        const trimmedText = text.replace(/\s\s+/g, " ").trim();
        expect(trimmedText).to.eq('Verificar Cuenta');
      });
  }
  );

  specify("TC_46: SPANISH - verify patent portal validate last name label Apellido", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let lastNameLbl = '//*[contains(text(),"Apellido")]';
    cy.xpath(lastNameLbl).eq(1).should("have.text", "Apellido");
  });

  specify("TC_47: SPANISH - verify patent portal validate date of birth label Fecha de nacimiento", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let dateOfBirth = '//*[contains(text(),"Fecha de nacimiento")]';
    cy.xpath(dateOfBirth).should("have.text", "Fecha de nacimiento");
  }
  );

  specify("TC_48: SPANISH - verify patent portal validate student id Identificación del Estudiante", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let studentId = '//*[contains(text(),"Identificación del Estudiant")]';
    cy.xpath(studentId).should("have.text", "Identificación del Estudiante");
  }
  );

  specify("TC_49: SPANISH - verify patent portal validate state label Estado", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let State = '//*[contains(text(),"Estado")]';
    cy.xpath(State).should("have.text", "Estado");
  });

  specify("TC_50: SPANISH - verify patent portal validate student grade Grado del estudiante", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let studentGrade = '//*[contains(text(),"Grado del estudiante")]';
    cy.xpath(studentGrade).should("have.text", "Grado del estudiante");
  }
  );

  specify("TC_51: SPANISH - verify patent portal validate Distrito escolar", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let schoolDistrict = '//*[contains(text(),"Distrito escolar")]';
    cy.xpath(schoolDistrict).should("have.text", "Distrito escolar");
  });

  specify("TC_52: SPANISH - verify patent portal validate nameof school Nombre de Escuela", () => {
    patientPage.getMemeberIDTxtBx().eq(0).type(testData.member_Id, { force: true });
    patientPage.getLastNameTxtBx().eq(0).type(testData.member_FName, { force: true });
    patientPage.getFirstNameTxtBx().eq(0).type(testData.member_LName, { force: true });
    cy.xpath(selectors.verifyButton).eq(0).click();
    let nameOfSchool = '//*[contains(text(),"Nombre de Escuela")]';
    cy.xpath(nameOfSchool).should("have.text", "Nombre de Escuela");
  }
  );
});
