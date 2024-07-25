import loginPage from "../../../../pages/BaseClass/BasePage";
import testData from "../../../../../fixtures/testData.json";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import commonPage from "../../../../pages/Common/CommonPage";
import { faker } from "@faker-js/faker";
import WaitUtils from "cypress/support/utils/WaitUtils";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

const loginpage = new loginPage();
const commonPageObj = new commonPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("SPANISH: REQUEST VIRTUAL VISIT", () => {
  // Define selectors as constants
  const selectors = {
    langageIcon: "app-header-menu ion-icon",
    hamburgIcon: "app-menu-items-web ion-icon",
    requestVirtualVisitTab: "app-menu-items ion-item:nth-child(3)",
    backIcon:
      "app-menu-items > ion-menu > ion-content > ion-list > ion-item:nth-child(1) > ion-label > ion-icon",
    nextBtn: "//ion-button[contains(text(),' PRÓXIMO ')]",
    estableCercomoFarmaciaPreferida_Tab:
      "//ion-text[contains(text(),' Establecer como farmacia preferida ')]/..",
    actualizarFarmaciaPreferidaBtn:
      "//ion-button[contains(text(),' Actualizar farmacia preferida ')]/..",
    intakeFormDropdownField: "app-dropdown form ion-select",
    intakeFormDropdownOption:
      "ion-select-popover ion-list ion-radio-group ion-item:nth-child(1)",
    intakeFormtextArea: "form ion-textarea textarea",
    proximoBtn: "//ion-button[contains(text(),'PRÓXIMO')]/.",
    consentimientoParaTratar_Text:
      "//ion-title[contains(text(),'Consentimiento para tratar')]",
    consentToTreat_checkbox: "app-consent-to-treat ion-checkbox",
    confrimarBtn: "//ion-button[contains(text(),' CONFIRMAR ')]/.",
    consent_To_Treat_Paragraph: "app-consent-to-treat ion-card-content",
    app_informed_ConcentParagraph: "app-informed-consent ion-card-content",
    nombre_de_pila_InputField: "form ion-input input",
    select_AmandaPersons:
      "//ion-radio//ion-label[contains(text(), 'Amanda Parsons ')]/.",
    selectPET:
      "//ion-radio//ion-label[contains(text(),'Misty ')]",
    intakeQuestion_RadioBtn: "app-question-answer form ion-radio",
    intake_textareaField: "app-question-answer ion-textarea textarea",
    cambiar_Btn: "//ion-button[contains(text(),' CAMBIAR ')]/.",
    establecer_como_farmacia_preferida_Btn:
      "//ion-text[contains(text(),' Establecer como farmacia preferida ')]/..",
    actualizar_farmacia_preferida_Btn:
      "//ion-button[contains(text(), 'Actualizar farmacia preferida')]/.",
    walgreens_Text: "app-virtual-visit-preferred-pharmacy ion-list ion-label",
    clickProximo_Btn: "//ion-button//ion-label[contains(text(),'PRÓXIMO')]/..",
    informed_consentToTreatCheckbox: "app-question-answer ion-checkbox",
    anadir_Btn: "//ion-button[contains(text(),'AÑADIR')]",
    reviewMedicalHistoryTitles: "//ion-button[contains(text(),'AÑADIR')]",
    signature_TextArea: "form canvas",
    selectProvider_Tab: "app-provider-list ion-grid",
    select_Timezone: "app-provider-schedule-date-time-web ion-chip",
    schedule_Btn: "//ion-button[contains(text(),'Cronograma')]/.",
  };

  let url = Cypress.env("url"),
    redirectUrl = Cypress.env("redirectUrl");
  beforeEach(() => {
    loginpage.loginPatient(
      testData.automation_TestUser,
      testData.password
    );

    cy.origin(redirectUrl, () => { });
    commonPageObj.changeLanguageDropdown("Español");
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    cy.clickButton(selectors.requestVirtualVisitTab, { method: "get" });
    cy.get(selectors.backIcon).should("be.visible").click();
    cy.verifyPageUrl(testData.requestVirtualVisitPageUrl);
  });

  specify("TC_01: SPANISH - Request Virtual Visit - Verify user able to request for TELEDENTISTRY Consultation", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType("Teleodontología");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth ");
    requestVirtualVisitPageObj.clickConfirmBtnInSpanish();
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
    cy.clickButton(selectors.confrimarBtn, { method: "xpath" });
    cy.clickButton(selectors.proximoBtn, { method: "xpath" });
    requestVirtualVisitPageObj.enterTeledentistryIntakeQuestions();
    cy.clickButton(selectors.proximoBtn, { method: "xpath" });
    cy.get(selectors.consent_To_Treat_Paragraph)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    WaitUtils.waitForElementToAppear(selectors.consentToTreat_checkbox);
    cy.clickButton(selectors.consentToTreat_checkbox, { method: "get" });
    cy.xpath(selectors.proximoBtn).eq(1).click();
    cy.verifyPageUrl(testData.confirmPaymentPageUrl);
    requestVirtualVisitPageObj.enterPaymentDetails(
      firstName,
      lastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
    commonPageObj.clickOnButton('Confirmar y pagar')
    commonPageObj.logoutApplication();
  }
  );

  specify("TC_02: SPANISH - Request Virtual Visit - Verify user able to UPDATE PREFERRED PHARMACY", () => {
    const pharmacy = [
      "BC Pharmacy",
      "Beta",
      "Darmouth Test Lab",
      "gowtest",
      "TestPharmacy",
      "Walgreens",
      "Welldyne Colorado",
    ];
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType(" Teleodontología ");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    commonPageObj.clickOnButton('Continuar');
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth");
    cy.clickButton(selectors.cambiar_Btn, { method: "xpath" });
    requestVirtualVisitPageObj.inputSearchFieldInSpanish("12345");
    requestVirtualVisitPageObj.clickBuscarBtn();
    requestVirtualVisitPageObj
      .getPharmacyDataList()
      .should("have.length", "18");
    requestVirtualVisitPageObj.getPharmacyDataList().then(($list) => {
      const randomIndex = Math.floor(Math.random() * $list.length);
      cy.wrap($list[randomIndex]).click();
    });
    cy.xpath(selectors.clickProximo_Btn).click({ force: true });
    cy.xpath(selectors.establecer_como_farmacia_preferida_Btn).click();
    cy.clickButton(selectors.actualizar_farmacia_preferida_Btn, {
      method: "xpath",
    });
    WaitUtils.waitForElementToAppear(selectors.walgreens_Text);
    cy.get(selectors.walgreens_Text).then(($el) => {
      const updatedPharmacyLoc = $el
        .text()
        .trim()
        .replace(/&nbsp;/g, " ");
      cy.log(updatedPharmacyLoc);

      // Assert that the updated pharmacy location matches one of the pharmacies in the array
      expect(pharmacy.includes(updatedPharmacyLoc));
    });
    commonPageObj.logoutApplication();
  }
  );

  specify("TC_03: SPANISH - Request Virtual Visit - Allergies - Verify Review Medical History popup displays properly", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType("Teleodontología");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    WaitUtils.waitForElementToAppear(selectors.reviewMedicalHistoryTitles);
    cy.xpath(selectors.reviewMedicalHistoryTitles).eq(3).should(
      "have.text",
      "AÑADIR"
    ).click();
    const verifyMedicalInformation = "//ion-label[contains(text(),'AÑADIR   Alergias')]";
    cy.xpath(verifyMedicalInformation)
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim().replace(/\s+/g, ' ');
        expect(trimmedText).to.contain('AÑADIR   Alergias');
      });
  }
  );

  // Skipping the test for now as per the UI has removed from page
  specify.skip("TC_04: SPANISH - Request Virtual Visit - Notes - Verify Review Medical History popup displays properly", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType("Teleodontología");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    const editarButton = selectors.anadir_Btn.length;
    cy.xpath(selectors.anadir_Btn).eq(3).click({ force: true });
    WaitUtils.waitForElementToAppear(selectors.reviewMedicalHistoryTitles);
    cy.xpath(selectors.reviewMedicalHistoryTitles).should(
      "have.text",
      "AÑADIR"
    );
  }
  );

  specify("TC_05: SPANISH - Request Virtual Visit - Family Medical History - Verify Review Medical History popup displays properly", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType("Teleodontología");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    WaitUtils.waitForElementToAppear(selectors.reviewMedicalHistoryTitles);
    cy.xpath(selectors.reviewMedicalHistoryTitles).eq(1).should(
      "have.text",
      "AÑADIR"
    ).click();
    const verifyMedicalInformation = "//ion-label[contains(text(),' AÑADIR   Historia médica familiar')]";
    cy.xpath(verifyMedicalInformation)
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim().replace(/\s+/g, ' ');
        expect(trimmedText).to.contain('AÑADIR Historia médica familiar');
      });
  }
  );

  specify("TC_06: SPANISH - Request Virtual Visit - Medical Conditions  - Verify Review Medical History popup displays properly", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType("Teleodontología");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    WaitUtils.waitForElementToAppear(selectors.reviewMedicalHistoryTitles);
    cy.xpath(selectors.reviewMedicalHistoryTitles).eq(0).should(
      "have.text",
      "AÑADIR"
    ).click();
    const verifyMedicalInformation = "//ion-label[contains(text(),' AÑADIR   Condiciones médicas')]";
    cy.xpath(verifyMedicalInformation)
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim().replace(/\s+/g, ' ');
        expect(trimmedText).to.contain('AÑADIR Condiciones médicas');
      });
  }
  );

  specify("TC_07: SPANISH - Request Virtual Visit - Surgery - Verify Review Medical History popup displays properly", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType("Teleodontología");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    WaitUtils.waitForElementToAppear(selectors.reviewMedicalHistoryTitles);
    cy.xpath(selectors.reviewMedicalHistoryTitles).eq(2).should(
      "have.text",
      "AÑADIR"
    );
    const verifyMedicalInformation = "//ion-label[contains(text(),'AÑADIR   Cirugías')]";
    cy.xpath(verifyMedicalInformation)
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim().replace(/\s+/g, ' ');
        expect(trimmedText).to.contain(' AÑADIR   Cirugías');

      }
      );
  });

  specify("TC_08: SPANISH - Request Virtual Visit - Verify user able to request THERAPY consultation", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType(" terapia ");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    requestVirtualVisitPageObj.clickNextBtnInSpanish();
    cy.get(selectors.app_informed_ConcentParagraph)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.xpath(selectors.proximoBtn).last().click();
    cy.get(selectors.nombre_de_pila_InputField).eq(0).type(firstName);
    cy.get(selectors.nombre_de_pila_InputField).eq(1).type(lastName);
    cy.get(selectors.nombre_de_pila_InputField)
      .eq(2)
      .type(testData.informedConsentDOB);
    cy.get(selectors.signature_TextArea).click({ force: true });
    cy.xpath(selectors.proximoBtn).eq(1).click({ force: true });
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Depression ");
    cy.xpath(selectors.proximoBtn).click({ force: true });
    cy.verifyPageUrl(testData.intakeQuestionPageUrl);
    requestVirtualVisitPageObj.enterTeledentistryIntakeQuestions();
    cy.clickButton(selectors.proximoBtn, { method: "xpath" });
    cy.verifyPageUrl(testData.selectProviderPageUrl);
    requestVirtualVisitPageObj.clickOnAvailablityDateOfProvider(0);
    requestVirtualVisitPageObj.clickScheduleBtn().click();
    requestVirtualVisitPageObj.enterPaymentDetails(
      firstName,
      lastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
    commonPageObj.clickOnButton('Confirmar y pagar');
    requestVirtualVisitPageObj.getUrlEndPoint(
      "upcoming-virtual-visits/waiting-room"
    ); // Verifies user navigates to Enter waiting room post consultation and verifies dosespot and payment is working.
    commonPageObj.logoutApplication();
  });

  specify("TC_09: SPANISH - Request Virtual Visit - Verify user able to request URGENT CARE Consultation", () => {
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.select_VirtualVisitType(
      "atención de urgencias"
    );
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    cy.xpath(selectors.proximoBtn).click({ force: true });
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Cough ");
    cy.clickButton(selectors.cambiar_Btn, { method: "xpath" });
    requestVirtualVisitPageObj.inputSearchFieldInSpanish("12345");
    requestVirtualVisitPageObj.clickBuscarBtn();
    requestVirtualVisitPageObj
      .getPharmacyDataList()
      .should("have.length", "18");
    requestVirtualVisitPageObj
      .getPharmacyDataList()
      .contains("Walgreens")
      .click();
    cy.xpath(selectors.clickProximo_Btn).click({ force: true });
    cy.xpath(selectors.proximoBtn).click({ force: true });
    cy.get(selectors.intakeQuestion_RadioBtn).each(($el, index, $list) => {
      cy.wrap($el).click();
    });
    // cy.setValue(selectors.intake_textareaField, "test");
    cy.clickButton(selectors.proximoBtn, { method: "xpath" });
    cy.get(selectors.consent_To_Treat_Paragraph)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.clickButton(selectors.consentToTreat_checkbox, { method: "get" });
    cy.xpath(selectors.proximoBtn).eq(1).click();
    cy.verifyPageUrl(testData.confirmPaymentPageUrl);
    commonPageObj.logoutApplication();
  });

  specify("TC_10: SPANISH - Request Virtual Visit - Verify user able to request for VIRTUAL VET consultation", () => {
    cy.clickButton(selectors.selectPET, { method: "xpath" });
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.clickPhoneBtn("Video");
    cy.xpath(selectors.proximoBtn).click({ force: true });
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Dry Skin");
    cy.xpath(selectors.proximoBtn).click({ force: true });
    cy.get(selectors.intakeQuestion_RadioBtn).eq(0).click();
    cy.xpath(selectors.proximoBtn)
      .should("have.text", " PRÓXIMO ")
      .click({ force: true });
    cy.verifyPageUrl(testData.confirmPaymentPageUrl);
    requestVirtualVisitPageObj.enterPaymentDetails(
      firstName,
      lastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
    commonPageObj.clickOnButton('Confirmar y pagar');
    requestVirtualVisitPageObj.getUrlEndPoint(
      "upcoming-virtual-visits/waiting-room"
    );
    commonPageObj.logoutApplication();
  });
});
