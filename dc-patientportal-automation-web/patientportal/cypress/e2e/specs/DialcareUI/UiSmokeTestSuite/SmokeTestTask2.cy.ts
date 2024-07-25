import BaseClass from "../../../pages/BaseClass/BasePage";
import testData from "../../../../fixtures/testData.json";
import commonPage from "../../../pages/Common/CommonPage";
import requestVirtualVisitPage from "../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import contactInformationPage from "../../../pages/MyAccount/ContactInformationPage";
import DatabaseQuery from "../../../../fixtures/DatabaseQuerys.json";
import SecretName from "../../../../fixtures/secretName.json";

const basePageObj = new BaseClass();
const commonPageObj = new commonPage();
const contactInformationPageObj = new contactInformationPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("SMOKE TESTS", () => {
  specify('TASK_TC_01: Verify "Azure Database" is working', () => {
    basePageObj.loginPatient(Cypress.env("user4"), Cypress.env("password"));
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    contactInformationPageObj.clickMyAccountDiv();
    contactInformationPageObj.verifyAccountsPageUrl();
    commonPageObj.logoutApplication();
  });

  specify('TASK_TC_02: Verify "CORS Policy" is working', () => {
    basePageObj.loginPatient(Cypress.env("user4"), Cypress.env("password"));
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
     commonPageObj.logoutApplication();
  });

  specify('TASK_TC_03 - Verify "DoseSpot - Pharmacy Search"  and "Payment" is Working', () => {
    const query =
      DatabaseQuery.UpdateCancelConsultation + 8045;
    cy.task("runQuery", {
      secretName: SecretName.ConsultationDatabase,
      query,
    }).then((result: any) => {
      console.log("Query result Consultation Database :", result);
    });
    basePageObj.loginPatient(Cypress.env("user4"), Cypress.env("password"));
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    requestVirtualVisitPageObj.clickRequestForVirtulVisitDiv();
    requestVirtualVisitPageObj.selectTelDentConsultType();
    requestVirtualVisitPageObj.selectVirtualVisitStateDropDown("California");
    requestVirtualVisitPageObj.selectTelDentConsultType();
    requestVirtualVisitPageObj.clickPhoneBtn("Phone");
    requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
    requestVirtualVisitPageObj.verifyPharmacyDetailsPageUrl();
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL("Black Teeth ");
    requestVirtualVisitPageObj.clickChangeButton();
    requestVirtualVisitPageObj.inputPharmacySearchZip("12345");
    requestVirtualVisitPageObj.clickPharmacySearchBtn();
    requestVirtualVisitPageObj
      .getPharmacyDataList()
      .should("have.length", "18");
    requestVirtualVisitPageObj.getPharmacyDataList().contains("BC Pharmacy").click();
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
      testData.CardFirstName,
      testData.CardLastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
    commonPageObj.clickOnButton("Confirm & Pay");
    requestVirtualVisitPageObj.paymentApprovedMsg("Payment Approved");
    requestVirtualVisitPageObj.getUrlEndPoint(
      "upcoming-virtual-visits/waiting-room"
    );
    commonPageObj.logoutApplication();
  });
});