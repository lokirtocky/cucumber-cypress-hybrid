import testData from "../../../fixtures/testData.json";
import WaitUtils from "cypress/support/utils/WaitUtils";

class requestVirtualVisitPage {
  private hamburgerMenuLogo =
    "app-dashboard app-menu-items-web ion-fab-button ion-icon";
  private virtualVistRdoBtn =
    '//ion-content[@id="layout"]/app-request-virtual-layout/ion-content/ion-grid/ion-row[2]/ion-col//ion-grid/ion-row/ion-col/ion-row/ion-col[1]/app-visit-for-mobile/form/ion-card[1]/ion-card-content/ion-radio-group[@role="radiogroup"]/ion-list[@role="list"]/div[2]/ion-radio[@role="radio"]/ion-label[.="Amanda Parsons "]';
  private requestAVirtualVisitInHamburgerMenu =
    "ion-item:nth-of-type(3) > .hydrated.ion-text-wrap.md.sc-ion-label-md-h.sc-ion-label-md-s";
  private hamburgerMenuBackBtn =
    'app-menu-items ion-list[role="list"] ion-item:nth-of-type(1) ion-icon[role="img"]';
  private virtualVisitStateDropDown = "//app-dropdown//form//ion-select";
  private requestAVirtualVisitNextBtn = '//*[contains(text(),"NEXT")]';
  private selectOneOfFollowingHeaderTxt =
    ".hydrated.md > .following-text.hydrated.ion-text-center.md";
  private virtualVisitCostTxt = "app-virtual-visit-cost ion-col:nth-child(1)";
  private reasonForYourVisitTxt = "app-virtual-visit-reason ion-label";
  private reasonForYourVisitDropDown =
    "app-virtual-visit-reason form ion-select";
  private pharmacyChangeBtn = "app-virtual-visit-preferred-pharmacy ion-button";
  private pharmacySearchHeaderTxt =
    "//ion-title[contains(text(),'Pharmacy Search')]";
  private pharmacySearchBtn = "//ion-button[contains(text(),'Search')]/.";
  private pharmacySearchZipTxtBx =
    "app-patient-pharmacy-search app-search ion-input input";
  private pharmacySearchPharmacyNameTxtBx =
    "app-patient-pharmacy-search ion-input input";
  private noPharmacyFoundErrMsg =
    '//ion-content[@id="layout"]/app-request-virtual-layout/ion-content/ion-grid/ion-row[2]/ion-col/app-pharmacy-search/ion-grid/ion-row/ion-col//ion-label[.="No Pharmacy Found"]';
  private pharmacyNameErrMsg =
    '//ion-content[@id="layout"]/app-request-virtual-layout/ion-content/ion-grid/ion-row[2]/ion-col/app-pharmacy-search/ion-grid/ion-row/ion-col//ion-grid/div/ion-row[2]/ion-col[2]/span[@class="validation-error"]';
  private pharmacyDataList =
    ".hydrated.justify-content-start.md > ion-col:nth-of-type(n)";
  private pharmacyNextBtn = '//*[contains(text(),"NEXT")]';
  private yourVisitConfirmBtn =
    "app-virtual-visit-preferred-pharmacy ion-button";
  private yourVisitNextBtn = '//*[contains(text(),"NEXT")]';
  private kathyRdoBtn =
    '//ion-content[@id="layout"]/app-request-virtual-layout/ion-content/ion-grid/ion-row[2]/ion-col//ion-grid/ion-row/ion-col/ion-row/ion-col[1]/app-visit-for-mobile/form/ion-card[1]/ion-card-content/ion-radio-group[@role="radiogroup"]/ion-list[@role="list"]/div[1]/ion-radio[@role="radio"]/ion-label[.="Kathy Flores "]';
  private medicationYesRdoBtn =
    'ion-col:nth-of-type(1) > ion-radio[role="radio"]';
  private medicationNoRdoBtn =
    'ion-col:nth-of-type(2) > ion-radio[role="radio"]';
  private describeYourConcernTxtBx =
    '//*[@id="layout"]/app-request-virtual-layout/ion-content/ion-grid/ion-row[2]/ion-col/app-intake-questions/form/ion-grid/ol/app-question-answer[2]/form/ion-grid/ion-row/ion-col[2]/ion-row/ion-col/ion-textarea/label/div[3]/div[2]';
  private xqvptunasaTxtBx = 'textarea[name="ion-textarea - 1"]';
  private newProviderRdoBtn =
    "ion-radio:nth-of-type(2) > .hydrated.ion-color.ion-color-gray.md.sc-ion-label-md-h.sc-ion-label-md-s";
  private changeBtn = "//ion-button[contains(text(), 'Change')]/.";
  private setAsPreferredPharmacyBtn = "app-preferred-content";
  private searchForPharmacyBtn =
    "//ion-button[contains(text(),'Search for pharmacy')]";
  private updatePreferredPharmacyBtn =
    "//ion-button[contains(text(),' Update Preferred Pharmacy ')]/.";
  private cancelBtn = "//ion-button[contains(text(),'CANCEL')]/.";
  private confirmBtn = '//*[contains(text(),"CONFIRM")]/.';
  private selectAmandaParsonUser = 'ion-radio[role="radio"]';
  private selectState = "//ion-radio[contains(text(), 'California')]";
  private informedConsent_Paragraph = "app-informed-consent ion-card-content";
  private NextBtnOnInformedConsentPage = "//*[contains(text(),'NEXT')]";
  private firstNameField = 'form input[type="text"]';
  private lastNameField = 'form input[type="text"]';
  private dOBField = 'form input[type="text"]';
  private signatureField =
    "ion-card-content > ion-list > ion-row:nth-child(4) > ion-col > div > canvas";
  private selectTeleDentConsultType =
    "//app-visit-type//ion-label[contains(text(),' teledentistry ')]/.";
  private reasonForVisitDropdown = "form ion-select";
  private selectReasonForVisitOption = "//*[contains(text(),'Bad Breath ')]";
  private therapyVirtualVisit = "//*[contains(text(),' therapy ')]/.";
  private cardTxt = ".card-content-md.consent-text.hydrated.md";
  private nextButton = "//ion-button[contains(text(), 'NEXT')]/.";
  private IAgreeTermsAndConditionsCheckbox =
    'app-consent-to-treat [mode="md"]:nth-child(2)';
  private nextBtn_InSpanish = "//ion-button[contains(text(),' PRÓXIMO ')]";
  private confirmBtn_InSpanish = "//ion-button[contains(text(),'CAMBIAR ')]/.";
  private inputSearchField = "app-search ion-input";
  private click_BuscarBtn =
    "//ion-button[contains(text(),'Buscar')]/.";
  private proximoBtnOnSearchPage =
    "//ion-button//ion-label[contains(text(),'PRÓXIMO')]/..";
  private soliciteUnaVisitaVirtualTab =
    "ion-item:nth-of-type(3) > .hydrated.ion-text-wrap.md.sc-ion-label-md-h.sc-ion-label-md-s";
  private intakeRadioBtn = "app-question-answer form ion-radio";
  private consent_To_Treat_Paragraph = "app-consent-to-treat ion-card-content";
  private consentToTreat_checkbox = "app-consent-to-treat ion-checkbox";
  private paymentInputFields = "app-payment-form form input";
  private refundPolicyCheckbox =
    "app-refund-policy-agreement-check ion-checkbox";
  private selectTerryDog = "app-visit-for-web ion-radio ion-label";
  private backIcon =
    "app-drawer > ion-menu > ion-content > ion-item > ion-label > ion-icon";
  private selectProvider = "app-provider-list ion-card-content ion-grid";
  private scheduleBtn = "app-provider-schedule-date-time-web ion-button";
  private time =
    "app-provider-schedule-date-time-web ion-toolbar:nth-child(4) ion-chip:nth-child(1)";
  private enterBillingAddress = "app-billing-address form ion-input input";
  private urgentCareProductType =
    "//ion-label[contains(text(),' urgent care ')]";
  private virtualVetProductType =
    "//ion-label[contains(text(),' Virtual VET ')]";
  private virtualVetPet = "//ion-label[contains(text(),'Misty')]/.";
  private therapyVirtualVisitType =
    "//app-visit-for-web//ion-label[contains(text(),' therapy ')]/..";
  private requestForVirtulVisitDiv = "//ion-content[@id='layout']//div[@class='dashboard-menu']/ion-grid/ion-row[1]/ion-col[2]/ion-card/ion-row/ion-col[2]";
  private proximoButton = "//ion-button[contains(text(),'PRÓXIMO')]/. ";

  clickRequestForVirtulVisitDiv():void {
    cy.xpath(this.requestForVirtulVisitDiv).click();
  }
  selectTherapyVirtualVisit(): void {
    cy.xpath(this.therapyVirtualVisit).click();
  }

  selectReasonForVisit(): void {
    cy.get(this.reasonForVisitDropdown).eq(1).click();
    WaitUtils.waitForElementToAppear(this.selectReasonForVisitOption);
    cy.xpath(this.selectReasonForVisitOption).eq(1).click({ force: true });
  }

  selectTelDentConsultType(): void {
    cy.xpath(this.selectTeleDentConsultType).should("be.visible");
    cy.xpath(this.selectTeleDentConsultType).click();
  }

  verifyInformedConsentParagraph(): void {
    cy.get(this.informedConsent_Paragraph).should("be.visible");
  }


  clickInformedConsentParagraph() {
    cy.get(this.informedConsent_Paragraph).should("be.visible")
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.xpath(this.proximoButton).last().click({ force: true });
  }

  clickNextBtnOnInformedConsent(): void {
    cy.xpath(this.NextBtnOnInformedConsentPage).eq(1).click({ force: true });
  }

  enterInformedConsentFormFields(
    PatientfirstName: string,
    PatientLastName: string,
    PatientDob: string,
    NextBtn: string
  ): void {
    cy.get(this.firstNameField).eq(0).type(PatientfirstName);
    cy.get(this.lastNameField).eq(1).type(PatientLastName);
    cy.get(this.dOBField).eq(2).type(PatientDob);
    cy.get(this.dOBField).eq(2).type(testData.informedConsentDOB);
    cy.get(this.signatureField).click();
    cy.xpath(`//*[contains(text(),'${NextBtn}')]`).eq(1).click();
  }

  selectStateOption(): void {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.virtualVisitStateDropDown).click({ force: true });
    cy.xpath(this.selectState).should("be.visible").click();
  }

  enterTeledentistryIntakeQuestions(): void {
    cy.get(this.intakeRadioBtn).first().click();
    // cy.get(this.intakeQsn_ChkBox).eq(1).click();
    // cy.get(this.intakeQsn_Dropdown).click();
    // cy.xpath(this.intakeQsn_DropdownOpt).click();
    // WaitUtils.waitForElementToAppear(this.intakeQsn_textArea);
    // cy.get(this.intakeQsn_textArea).type("Test");
  }

  clickNewProviderRdoBtn() {
    cy.get(this.newProviderRdoBtn).click();
  }

  inputDescribeYourConcern(concern: string) {
    cy.xpath(this.describeYourConcernTxtBx).type(concern);
  }

  selectTerryDogCheckbox(): void {
    cy.get(this.selectTerryDog).eq(1).click();
  }

  inputxqvptunasa(data: string) {
    cy.get(this.xqvptunasaTxtBx).type(data);
  }

  getHamburgerMenuLogo() {
    cy.reload();
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get("app-dashboard ion-fab-button ion-icon")
      .should("be.visible")
      .should("not.have.attr", "disabled");
    cy.get("app-dashboard ion-fab-button ion-icon").click();
  }

  clickHamburgerMenuBackBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.hamburgerMenuBackBtn).click();
  }

  clickHamburgerMenuLogo() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.hamburgerMenuBackBtn).should("be.visible").click();
  }

  clickRequestAVirtualVisitInHamburgerMenu() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.requestAVirtualVisitInHamburgerMenu)
      .should("be.visible")
      .click();
  }

  clickVirtualTypeRdoBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.virtualVistRdoBtn).click({ force: true });
  }

  selectVirtualVisitStateDropDown(state: string) {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.virtualVisitStateDropDown).click({ force: true });
    WaitUtils.waitForElementToAppear(`//*[contains(text(),"${state}")]`);
    cy.xpath(`//ion-radio[contains(text(),"${state}")]`).click({ force: true });
  }

  selectVirtualVisitType(index: number) {
    const virtualVisitType =
      "app-visit-type ion-card-content:nth-child(2) ion-item:nth-child(1)";
    WaitUtils.waitForLoadingSpinnerToDisappear();
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(virtualVisitType).eq(index).click();
  }

  clickVideoBtn(video: string) {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    const videoBtn = `//ion-content[@id="layout"]/app-request-virtual-layout/ion-content/ion-grid/ion-row[2]/ion-col//ion-grid/ion-row/ion-col/ion-row/ion-col[2]/app-visit-type/ion-card[2]/ion-card-content/ion-list[@role="list"]/div[2]/ion-item[@role="listitem"]/ion-label[. = " ${video} "]`;
    cy.xpath(videoBtn).should("be.visible").click();
  }

  clickPhoneBtn(phoneVisit: string) {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    const phoneBtn = `//app-visit-for-web//app-visit-type//ion-label[contains(text(),' ${phoneVisit} ')]`;
    cy.xpath(phoneBtn).should("be.visible").click();
  }

  clickOnVirtualVisitNextBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.requestAVirtualVisitNextBtn).should("be.visible").click();
  }

  public click_AgreeTermsAndConditionsCheckbox(): void {
    cy.get(this.cardTxt)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      })
      .trigger("mouseup");
    cy.get(this.IAgreeTermsAndConditionsCheckbox).click();
    cy.xpath(this.nextButton).eq(1).click({ force: true });
  }

  getVirtualVisitNextBtn() {
    return cy.xpath(this.requestAVirtualVisitNextBtn);
  }

  getUrlEndPoint(endpoint: string) {
    return cy.url().should("include", endpoint);
  }

  getSelectOneOfFollowingHeaderTxt() {
    return cy.get(this.selectOneOfFollowingHeaderTxt);
  }

  getVirtualVisitCostTxt() {
    return cy.get(this.virtualVisitCostTxt);
  }

  getReasonForYourVisitTxt() {
    return cy.get(this.reasonForYourVisitTxt);
  }

  clickReasonForYourVisitDropDown() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.reasonForYourVisitDropDown).click();
  }

  getReasonForYourVisitDropDown() {
    return cy
      .get(this.reasonForYourVisitDropDown)
      .shadow()
      .find("#select-label");
  }

  clickOnPharmacyChangeBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.pharmacyChangeBtn).eq(1).click();
  }

  getPharmacySearchHeaderTxt() {
    return cy.xpath(this.pharmacySearchHeaderTxt);
  }

  getPharmacySearchBtn() {
    return cy.xpath(this.pharmacySearchBtn);
  }

  clickPharmacySearchBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.pharmacySearchBtn).last().click();
  }

  getPharmacySearchZipTxtBx() {
    return cy.get(this.pharmacySearchZipTxtBx);
  }

  inputPharmacySearchZip(zipCode: string) {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.pharmacySearchZipTxtBx).first().type(zipCode);
  }

  getPharmacySearchPharmacyNameTxtBxIsVisible() {
    cy.get(this.pharmacySearchPharmacyNameTxtBx).last().should("be.visible");
  }

  getClearPharmacySerachNameTxtBxField() {
    cy.get(this.pharmacySearchPharmacyNameTxtBx).last().clear();
  }

  inputPharmacySearchPharmacyName(pharmacyName: string) {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.pharmacySearchPharmacyNameTxtBx).last().type(pharmacyName);
  }

  getNoPharmacyFoundErrMsg() {
    return cy.contains("No Pharmacy Found").last();
  }

  getPharmacyNameErrMsg() {
    return cy.xpath(this.pharmacyNameErrMsg);
  }

  getPharmacyDataList() {
    return cy.get(this.pharmacyDataList);
  }

  getpharmacyNextBtn() {
    return cy.xpath(this.pharmacyNextBtn);
  }

  getPharmacySearchBackBtn() {
    return cy.get(this.backIcon);
  }

  clickPharmacyNextBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.wait(3000);// static wait is required
    cy.xpath(this.pharmacyNextBtn).last().click();
  }

  selectReasonForVisitInDDL(reason: string) {
    cy.xpath(`//ion-radio[contains(text(),"${reason}")]`).click({
      force: true,
    });
  }

  getYourVisitConfirmBtn(index: number) {
    cy.get(this.yourVisitConfirmBtn)
      .eq(index)
      .should("be.visible")
      .and("not.be.disabled");
  }

  clickYourVisitConfirmBtn(index: number) {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.yourVisitConfirmBtn).eq(index).click();
  }

  clickYourVisitNextBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.yourVisitNextBtn).first().click();
  }

  getYourVisitNextBtn() {
    return cy.get(this.yourVisitNextBtn);
  }

  clickKathyRdoBtn() {
    cy.xpath(this.kathyRdoBtn).click({ force: true });
  }

  clickMedicationYesRdoBtn() {
    cy.get(this.medicationYesRdoBtn).click({ force: true });
  }

  clickMedicationNoRdoBtn() {
    cy.get(this.medicationNoRdoBtn).click({ force: true });
  }

  clickSearcForPharmacyBtn(): void {
    cy.clickButton(this.searchForPharmacyBtn, { method: "xpath" });
  }

  clickChangeButton(): void {
    cy.clickButton(this.changeBtn, { method: "xpath" });
  }

  verifyPharmacyPageUrl(): void {
    cy.verifyPageUrl(testData.pharmacySearchPage);
  }

  clickSetAsPreferredPharmacyBtn(): void {
    cy.clickButton(this.setAsPreferredPharmacyBtn, { method: "get" });
  }

  verifySetAsPreferredPharmacyPopUpIsDisplayed(): void {
    cy.xpath(this.updatePreferredPharmacyBtn).should("be.visible");
    cy.xpath(this.cancelBtn).should("be.visible");
    cy.clickButton(this.cancelBtn, { method: "xpath" });
  }

  clickUpdatedPreferredPharmacyBtn(): void {
    cy.xpath(this.updatePreferredPharmacyBtn).should("be.visible");
    cy.xpath(this.updatePreferredPharmacyBtn).click({ force: true });
  }

  clickCancelBtn(): void {
    cy.xpath(this.cancelBtn).should("be.visible");
    cy.clickButton(this.cancelBtn, { method: "xpath" });
  }

  verifyConfirmBtnIsDisabled(): void {
    cy.xpath(this.confirmBtn).should("not.be.enabled");
  }

  verifyChangeBtnAsEnabled(): void {
    cy.xpath(this.changeBtn).should("not.be.disabled");
  }

  selectAmandaParson(): void {
    cy.get(this.selectAmandaParsonUser).eq(1).click();
  }

  verifyPharmacyDetailsPageUrl(): void {
    cy.verifyPageUrl(testData.pharmacyDetailsPageUrl);
  }

  select_VirtualVisitType(visitType: string): void {
    cy.wait(1000);
    cy.xpath(
      `//app-visit-type//ion-list//ion-item//ion-label[contains(text(),"${visitType}")]`
    ).should('be.visible').click();
  }

  clickNextBtnInSpanish(): void {
    cy.xpath(this.nextBtn_InSpanish).click();
  }

  clickConfirmBtnInSpanish(): void {
    cy.xpath(this.confirmBtn_InSpanish).click();
  }

  inputSearchFieldInSpanish(search: string): void {
    cy.get(this.inputSearchField).eq(0).type(search);
  }

  clickBuscarBtn(): void {
    cy.xpath(this.click_BuscarBtn)
      .should("have.text", "Buscar")
      .click();
  }

  clickProximoBtnInSpanish(): void {
    cy.clickButton(this.proximoBtnOnSearchPage, { method: "xpath" });
  }

  verifyVirtualVisitPageUrl(): void {
    cy.verifyPageUrl(testData.requestVirtualVisitPageUrl);
  }

  clickSoliciteUnaVisitaVirtualTabFromHamburgMenu(): void {
    cy.get(this.soliciteUnaVisitaVirtualTab).click();
  }

  clickIntakeRadioQuestion(): void {
    cy.get(this.intakeRadioBtn).first().click();
  }

  clickToSelectTheProviderForConsultation() {
    return cy.get(this.selectProvider);
  }

  clickScheduleBtn() {
    return cy.get(this.scheduleBtn);
  }

  clickOnAvailablityDateOfProvider(index: number) {
    const proximoBtn = "//ion-button[contains(text(),'PRÓXIMO')]/.";
    cy.get("app-provider-list ion-card ion-card-content").eq(index).click();
    cy.xpath(proximoBtn).first().click({ force: true });
    cy.get('swiper-container swiper-slide ion-chip').first().click(); // Click on first available date
    cy.get(this.time).eq(0).click();
  }

  selectConsentToTreatParagraph(): void {
    cy.get(this.consent_To_Treat_Paragraph)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
      })
      .trigger("mouseup");
    cy.wait(3000);
    cy.get(this.consent_To_Treat_Paragraph)
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: 0, behavior: "instant" });
      });
    cy.wait(3000);
    cy.get(this.consent_To_Treat_Paragraph)
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
      })
      .trigger("mouseup");
    cy.wait(3000);
    cy.clickButton(this.consentToTreat_checkbox, { method: "get" });
    cy.xpath(this.NextBtnOnInformedConsentPage).last().click();
  }

  enterPaymentDetails(
    firstName: string,
    lastName: string,
    cardNumber: string,
    expiryDate: string,
    cvvNumber: string
  ): void {
    cy.viewport(1920, 1080);
    cy.get(this.paymentInputFields).eq(0).type(firstName);
    cy.get(this.paymentInputFields).eq(1).type(lastName);
    cy.get(this.paymentInputFields).eq(2).type(cardNumber);
    cy.get(this.paymentInputFields).eq(3).type(expiryDate);
    cy.get(this.paymentInputFields).eq(4).type(cvvNumber);
    cy.get(this.enterBillingAddress)
      .eq(0).should('be.visible').type("123").type("{enter}", { delay: 700 });
    cy.get(this.refundPolicyCheckbox).should('be.visible').click();
  }

  paymentApprovedMsg(paymentMsg: string) {
    return cy.contains(paymentMsg);
  }

  selectUrgentCareProductType() {
    cy.xpath(this.urgentCareProductType).should("be.visible").click();
  }

  selectVirtualVetProductType() {
    cy.xpath(this.virtualVetProductType).click();
  }

  selectVirtualVetPet() {
    cy.xpath(this.virtualVetPet).last().should("be.visible").click();
  }

  selectTherapyVirtualVisitType() {
    cy.xpath(this.therapyVirtualVisitType).click();
  }
}
export default requestVirtualVisitPage;
