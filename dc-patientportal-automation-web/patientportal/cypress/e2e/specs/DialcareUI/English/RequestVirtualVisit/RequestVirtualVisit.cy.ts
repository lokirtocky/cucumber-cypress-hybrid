import LoginPage from "../../../../pages/BaseClass/BasePage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import commonPage from "../../../../pages/Common/CommonPage";
import testData from "../../../../../fixtures/testData.json";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

const loginPage = new LoginPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();
const commonPageObj = new commonPage();

context("PP: REQUEST VIRTUAL VISIT TEST CASES", () => {
  beforeEach(() => {
    loginPage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
  });

  specify("TC_01: Verify About Me functionality", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    // requestVirtualVisitPageObj.selectAmandaParson();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/pharmacy-detail"
    );
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth ");
    requestVirtualVisitPageObj.clickOnPharmacyChangeBtn();
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
    requestVirtualVisitPageObj.getYourVisitConfirmBtn(0);
    requestVirtualVisitPageObj.clickYourVisitConfirmBtn(0);
    requestVirtualVisitPageObj.clickYourVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/intake-questions"
    );
    commonPageObj.logoutApplication();
  });

  specify("TC_02: Verify Select Visit type and Consult type for Virtual Visit", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    // requestVirtualVisitPageObj.selectAmandaParson();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj
      .getVirtualVisitNextBtn()
      .should("be.visible")
      .and("not.be.hidden");
    requestVirtualVisitPageObj
      .getVirtualVisitNextBtn()
      .should("be.visible")
      .and("not.be.disabled");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/pharmacy-detail"
    );
    commonPageObj.getBackBtn().should("be.visible");
    commonPageObj.getBackBtn().should("contain", "back");
    commonPageObj.clickBackBtn();
    commonPageObj.getBackBtn().should("be.visible");
    commonPageObj.getBackBtn().should("contain", "back");
    commonPageObj.clickBackBtn();
    // commonPageObj.cancelParentalConsentForm();
    requestVirtualVisitPageObj
      .getSelectOneOfFollowingHeaderTxt()
      .should("be.visible");
    requestVirtualVisitPageObj
      .getSelectOneOfFollowingHeaderTxt()
      .should("contain", "Select One of the Following");
    commonPageObj.logoutApplication();
  });

  specify.skip("TC_03: Verify Review Pricing, Choose Reason & No Preferred Pharmacy Selected", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    // requestVirtualVisitPageObj.selectAmandaParson();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj
      .getVirtualVisitNextBtn()
      .should("be.visible")
      .and("not.be.hidden");
    requestVirtualVisitPageObj
      .getVirtualVisitNextBtn()
      .should("be.visible")
      .and("not.be.disabled");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/pharmacy-detail"
    );
    requestVirtualVisitPageObj.getVirtualVisitCostTxt().should("be.visible");
    requestVirtualVisitPageObj
      .getVirtualVisitCostTxt()
      .should("contain", "Virtual visit cost:");
    requestVirtualVisitPageObj
      .getReasonForYourVisitTxt()
      .should("be.visible");
    requestVirtualVisitPageObj
      .getReasonForYourVisitTxt()
      .should("contain", "What is the reason for your visit?");
    requestVirtualVisitPageObj
      .getReasonForYourVisitDropDown()
      .should("be.visible");
    requestVirtualVisitPageObj
      .getReasonForYourVisitDropDown()
      .should("not.be.selected");
    requestVirtualVisitPageObj.clickOnPharmacyChangeBtn();
    requestVirtualVisitPageObj
      .getPharmacySearchHeaderTxt()
      .should("be.visible");
    requestVirtualVisitPageObj
      .getPharmacySearchHeaderTxt()
      .should("contain", "Pharmacy Search");
    requestVirtualVisitPageObj.getPharmacySearchBtn().should("be.visible");
    requestVirtualVisitPageObj
      .getPharmacySearchBtn()
      .should("contain", "Search");
    requestVirtualVisitPageObj
      .getPharmacySearchZipTxtBx()
      .should("be.visible");
    requestVirtualVisitPageObj.getPharmacySearchPharmacyNameTxtBxIsVisible();
    requestVirtualVisitPageObj.getPharmacySearchBackBtn().click();
    commonPageObj.logoutApplication();
  }
  );

  specify("TC_04: Verify Preferred Pharmacy Search functionality", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    // requestVirtualVisitPageObj.selectAmandaParson();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/pharmacy-detail"
    );
    requestVirtualVisitPageObj.clickOnPharmacyChangeBtn();
    requestVirtualVisitPageObj.inputPharmacySearchPharmacyName("invalid");
    requestVirtualVisitPageObj.inputPharmacySearchZip("54321");
    requestVirtualVisitPageObj.clickPharmacySearchBtn();
    requestVirtualVisitPageObj.getNoPharmacyFoundErrMsg().should("be.visible");
    requestVirtualVisitPageObj
      .getNoPharmacyFoundErrMsg()
      .should("contain", "No Pharmacy Found");
    requestVirtualVisitPageObj.getPharmacySearchZipTxtBx().clear();
    requestVirtualVisitPageObj.getClearPharmacySerachNameTxtBxField();
    requestVirtualVisitPageObj.inputPharmacySearchPharmacyName("er");
    // requestVirtualVisitPageObj.getPharmacyNameErrMsg().should("be.visible");
    // requestVirtualVisitPageObj
    //   .getPharmacyNameErrMsg()
    //   .should("contain", "Minimum 3 characters required");
    //validate single record
    requestVirtualVisitPageObj.getPharmacySearchZipTxtBx().clear();
    requestVirtualVisitPageObj.getClearPharmacySerachNameTxtBxField();
    requestVirtualVisitPageObj.inputPharmacySearchZip("12345");
    requestVirtualVisitPageObj.inputPharmacySearchPharmacyName("BC Pharmacy");
    requestVirtualVisitPageObj.clickPharmacySearchBtn();
    requestVirtualVisitPageObj.getPharmacyDataList().should("have.length", "1");
    // requestVirtualVisitPageObj
    //   .getpharmacyNextBtn()
    //   .should("be.visible")
    //   .and("not.be.hidden");
    // requestVirtualVisitPageObj
    //   .getpharmacyNextBtn()
    //   .should("be.visible")
    //   .and("not.be.disabled");
    //validate all records
    requestVirtualVisitPageObj.getPharmacySearchZipTxtBx().clear();
    requestVirtualVisitPageObj.getClearPharmacySerachNameTxtBxField();
    requestVirtualVisitPageObj.inputPharmacySearchZip("12345");
    requestVirtualVisitPageObj.getPharmacySearchBtn().should("be.visible");
    requestVirtualVisitPageObj
      .getPharmacySearchBtn()
      .should("be.visible")
      .and("not.be.disabled");
    requestVirtualVisitPageObj.clickPharmacySearchBtn();
    requestVirtualVisitPageObj.getPharmacyDataList().should("have.length", "1");
    requestVirtualVisitPageObj
      .getPharmacyDataList()
      .contains("BC Pharmacy")
      .click();
    requestVirtualVisitPageObj.clickPharmacyNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/pharmacy-detail"
    );
    requestVirtualVisitPageObj.getReasonForYourVisitTxt().should("be.visible");
    requestVirtualVisitPageObj
      .getReasonForYourVisitTxt()
      .should("contain", "What is the reason for your visit?");
    commonPageObj.clickBackBtn();
    commonPageObj.logoutApplication();
  });

  specify.skip("TC_05: Verify New Provider Selection (only Therapy-MW)", () => {
    //TODO:- failed due to user deleted
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    requestVirtualVisitPageObj.clickHamburgerMenuBackBtn();
    requestVirtualVisitPageObj.clickHamburgerMenuBackBtn();
    requestVirtualVisitPageObj.clickKathyRdoBtn();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/pharmacy-detail"
    );
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Fear");
    requestVirtualVisitPageObj.clickYourVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/intake-questions"
    );
    requestVirtualVisitPageObj.clickMedicationYesRdoBtn();
    requestVirtualVisitPageObj.inputDescribeYourConcern("your Concern");
    requestVirtualVisitPageObj.clickYourVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/select-provider"
    );
    requestVirtualVisitPageObj.clickNewProviderRdoBtn();
    commonPageObj.logoutApplication();
  });

  specify("TC_06: Request Virtual Visit - Update Preferred Pharmacy >> Verify update preferred Pharmacy pop is displayed", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    // requestVirtualVisitPageObj.selectAmandaParson();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth ");
    // requestVirtualVisitPageObj.click_searcForPharmacyBtn();
    requestVirtualVisitPageObj.clickChangeButton();
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
    requestVirtualVisitPageObj.getPharmacyDataList().contains("Beta").click();
    requestVirtualVisitPageObj.clickPharmacyNextBtn();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.clickSetAsPreferredPharmacyBtn();
    requestVirtualVisitPageObj.verifySetAsPreferredPharmacyPopUpIsDisplayed();
  }
  );

  specify("TC_07: Request Virtual Visit - UPDATED PREFERRED PHARMACY >> verify preferred pharmacy updated after click on UPDATED PREFERRED PHARMACY button", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    // requestVirtualVisitPageObj.selectAmandaParson();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectTelDentConsultType();
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth");
    // requestVirtualVisitPageObj.click_searcForPharmacyBtn();
    requestVirtualVisitPageObj.clickChangeButton();
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
    requestVirtualVisitPageObj.getPharmacyDataList().contains("Beta").click();
    requestVirtualVisitPageObj.clickPharmacyNextBtn();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.clickSetAsPreferredPharmacyBtn();
    requestVirtualVisitPageObj.clickUpdatedPreferredPharmacyBtn();
  }
  );

  specify("TC_08: Request Virtual Visit - CANCEL PREFERRED PHARMACY >> verify updated preferred pharmacy popup hides after click on CANCEL button", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    // requestVirtualVisitPageObj.selectAmandaParson();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.selectTelDentConsultType();
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth");
    // requestVirtualVisitPageObj.click_searcForPharmacyBtn();
    requestVirtualVisitPageObj.clickChangeButton();
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
    requestVirtualVisitPageObj.getPharmacyDataList().contains("Beta").click();
    requestVirtualVisitPageObj.clickPharmacyNextBtn();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.clickSetAsPreferredPharmacyBtn();
    requestVirtualVisitPageObj.clickCancelBtn();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.verifyConfirmBtnIsDisabled();
    requestVirtualVisitPageObj.verifyChangeBtnAsEnabled();
  }
  );

  specify("TC_09: REQUEST VIRTUAL VISIT - Verify User able to request for THERAPY consultation", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    requestVirtualVisitPageObj.selectVirtualVisitType(2);
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectTherapyVirtualVisit();
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.verifyInformedConsentParagraph();
    requestVirtualVisitPageObj.clickNextBtnOnInformedConsent();
    requestVirtualVisitPageObj.enterInformedConsentFormFields(
      firstName,
      lastName,
      testData.informedConsentDOB,
      'NEXT'
    );
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Anger ");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.clickIntakeRadioQuestion();
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/select-provider"
    );
    requestVirtualVisitPageObj
      .clickToSelectTheProviderForConsultation()
      .first()
      .click();
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.clickOnAvailablityDateOfProvider(0);
    requestVirtualVisitPageObj.clickScheduleBtn().click();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/confirm-payment"
    );
    requestVirtualVisitPageObj.enterPaymentDetails(
      firstName,
      lastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
    commonPageObj.clickOnButton("Confirm & Pay");
    requestVirtualVisitPageObj.paymentApprovedMsg("Payment Approved");
  }
  );

  specify("TC_10: REQUEST VIRTUAL VISIT - Verify user able to request for TELE DENTENTISTRY consultation", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectTelDentConsultType();
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth ");
    requestVirtualVisitPageObj.clickChangeButton();
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
    requestVirtualVisitPageObj.getYourVisitConfirmBtn(0);
    requestVirtualVisitPageObj.clickYourVisitConfirmBtn(0);
    requestVirtualVisitPageObj.clickYourVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/intake-questions"
    );
    requestVirtualVisitPageObj.enterTeledentistryIntakeQuestions();
    requestVirtualVisitPageObj.clickYourVisitNextBtn();
    requestVirtualVisitPageObj.selectConsentToTreatParagraph();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/confirm-payment"
    );
    requestVirtualVisitPageObj.enterPaymentDetails(
      firstName,
      lastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
    commonPageObj.clickOnButton("Confirm & Pay");
    requestVirtualVisitPageObj.paymentApprovedMsg("Payment Approved");
    requestVirtualVisitPageObj.getUrlEndPoint(
      "upcoming-virtual-visits/waiting-room"
    );
  }
  );

  specify("TC_11: REQUEST VIRTUAL VISIT - Verify user able to request for URGENT CARE consultation", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Cold ");
    requestVirtualVisitPageObj.clickChangeButton();
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
    requestVirtualVisitPageObj.getYourVisitConfirmBtn(0);
    requestVirtualVisitPageObj.clickYourVisitConfirmBtn(0);
    requestVirtualVisitPageObj.clickYourVisitNextBtn();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/intake-questions"
    );
    requestVirtualVisitPageObj.clickIntakeRadioQuestion();
    requestVirtualVisitPageObj.clickYourVisitNextBtn();
    requestVirtualVisitPageObj.selectConsentToTreatParagraph();
    requestVirtualVisitPageObj.getUrlEndPoint(
      "/request-virtual/confirm-payment"
    );
    requestVirtualVisitPageObj.enterPaymentDetails(
      firstName,
      lastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
    commonPageObj.clickOnButton("Confirm & Pay");
    requestVirtualVisitPageObj.paymentApprovedMsg("Payment Approved");
    requestVirtualVisitPageObj.getUrlEndPoint(
      "upcoming-virtual-visits/waiting-room"
    );
  }
  );

  specify("TC_12: REQUEST VIRTUAL VISIT - Verify user able to request for VIRTUAL VET consultation", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
    requestVirtualVisitPageObj.clickHamburgerMenuBackBtn();
    requestVirtualVisitPageObj.selectTerryDogCheckbox();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectVirtualVisitType(1);
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Decreased Eating ");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    commonPageObj.clickOnButton("CONFIRM");
    requestVirtualVisitPageObj.getUrlEndPoint(
      "upcoming-virtual-visits/waiting-room"
    );
  }
  );
});
