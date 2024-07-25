import { When } from "@badeball/cypress-cucumber-preprocessor";
import requestVirtualVisitPage from "../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import testData from "../../fixtures/testData.json";
import WaitUtils from "cypress/support/utils/WaitUtils";
import commonPage from "../pages/Common/CommonPage";
import { faker } from "@faker-js/faker";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

const requestVirtualVisitPageObj = new requestVirtualVisitPage();
const commonPageObj = new commonPage();

When("Select TELEDENTISTRY Vistual Visit type", () => {
  WaitUtils.waitForLoadingSpinnerToDisappear();
  requestVirtualVisitPageObj.selectTelDentConsultType();
});

When("Select Phone visit", () => {
  WaitUtils.waitForLoadingSpinnerToDisappear();
  requestVirtualVisitPageObj.clickPhoneBtn("Phone");
});

When("Click on NEXT button", () => {
  requestVirtualVisitPageObj.clickOnVirtualVisitNextBtn();
});

When("Click on Change button", () => {
  requestVirtualVisitPageObj.clickOnPharmacyChangeBtn();
});

When("Verify user navigates to {string} page url", (URL: string) => {
  requestVirtualVisitPageObj.getUrlEndPoint(URL);
});

When(
  "Select the Reason of Visit {string} from Dropdown",
  (reasonForVisit: string) => {
    requestVirtualVisitPageObj.clickReasonForYourVisitDropDown();
    requestVirtualVisitPageObj.selectReasonForVisitInDDL(reasonForVisit);
  }
);

When("Click on SEARCH FOR PHARMACY button", () => {
  requestVirtualVisitPageObj.clickSearcForPharmacyBtn();
});

When(
  "Enter the Zip code {string} and click on SEARCH button",
  (zipcode: string) => {
    requestVirtualVisitPageObj.inputPharmacySearchZip(zipcode);
  }
);

When("Select pharmacy from list and click NEXT", () => {
  requestVirtualVisitPageObj
    .getPharmacySearchBtn()
    .should("be.visible")
    .and("not.be.hidden");
  requestVirtualVisitPageObj
    .getPharmacySearchBtn()
    .should("be.visible")
    .and("not.be.disabled");
  requestVirtualVisitPageObj.clickPharmacySearchBtn();
  requestVirtualVisitPageObj.getPharmacyDataList().should("have.length", "18");
  requestVirtualVisitPageObj
    .getPharmacyDataList()
    .contains("BC Pharmacy")
    .click();
  requestVirtualVisitPageObj.clickPharmacyNextBtn();
});

When("Click on CONFIRM button", () => {
  requestVirtualVisitPageObj.getYourVisitConfirmBtn(0);
  requestVirtualVisitPageObj.clickYourVisitConfirmBtn(0);
});

When("Click on NEXT button on pharmacy Details page", () => {
  requestVirtualVisitPageObj.clickYourVisitNextBtn();
});

When(
  "Enter the card details for payment {string} and {string} and {string} payment page",
  (cardNumber: string, expiryDate: string, cvvNumber: string) => {
    requestVirtualVisitPageObj.enterPaymentDetails(
      firstName,
      lastName,
      testData.cardNumber,
      testData.expiryDate,
      testData.cvvNumber
    );
  }
);

When("Select State {string} from Dropdown", (state: string) => {
  requestVirtualVisitPageObj.selectVirtualVisitStateDropDown(state);
});

When("Fill the intake questions and Click Next Button", () => {
  requestVirtualVisitPageObj.enterTeledentistryIntakeQuestions();
  requestVirtualVisitPageObj.clickYourVisitNextBtn();
});

When("Submit the Consent To Treat form", () => {
  requestVirtualVisitPageObj.selectConsentToTreatParagraph();
});

When(
  "Verify {string} message should be displayed",
  (successMessage: string) => {
    requestVirtualVisitPageObj.paymentApprovedMsg(successMessage);
  }
);

When("Click on Confirm and Pay button", () => {
  commonPageObj.clickOnButton("Confirm & Pay");
});

When("Select URGENT CARE Vistual Visit type", () => {
  WaitUtils.waitForLoadingSpinnerToDisappear();
  requestVirtualVisitPageObj.selectUrgentCareProductType();
});

When("Select Virtual Visit Consultation", () => {
  WaitUtils.waitForLoadingSpinnerToDisappear();
  requestVirtualVisitPageObj.selectVirtualVetProductType();
});

When("Select the Pet radio button", () => {
  WaitUtils.waitForLoadingSpinnerToDisappear();
  requestVirtualVisitPageObj.selectVirtualVetPet();
});

When("Select THERAPY Vistual Visit type", () => {
  requestVirtualVisitPageObj.selectTherapyVirtualVisit();
});

When("Submit the Informed Consent form", () => {
  const informedConsentParagraph = "app-informed-consent ion-card-content";
  const nextButton = "//ion-button[contains(text(), 'NEXT')]/.";
  cy.get(informedConsentParagraph)
    .trigger("mousedown")
    .then(($el) => {
      const el = $el[0];
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    })
    .trigger("mouseup");
  cy.xpath(nextButton).eq(1).click({ force: true });
});

When(
  "Enter the Informed Consent form {string} input details",
  (dob: string) => {
    requestVirtualVisitPageObj.enterInformedConsentFormFields(
      firstName,
      lastName,
      dob,
      "NEXT"
    );
  }
);

When("Select Providers from the list", () => {
  const selectProvider =
    "app-provider-list > ion-card > ion-card-content > ion-grid > ion-row > ion-col.margin-left-18.md.hydrated";
  cy.get(selectProvider).first().click();
});

When("Select available time of provider", () => {
  requestVirtualVisitPageObj.clickOnAvailablityDateOfProvider(0);
  requestVirtualVisitPageObj.clickScheduleBtn().click();
});
