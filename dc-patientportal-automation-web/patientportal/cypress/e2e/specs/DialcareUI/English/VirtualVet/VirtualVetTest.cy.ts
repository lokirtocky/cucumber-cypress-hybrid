import BaseClass from "../../../../pages/BaseClass/BasePage";
import testData from "../../../../../fixtures/testData.json";
import commonPage from "../../../../pages/Common/CommonPage";
import VirtualVetPageObj from "../../../../pages/VirtualVet/VirtualVetPage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";

const basePage = new BaseClass();
const commonPageObj = new commonPage();
const virtualVisitObj = new VirtualVetPageObj();
const patientPageObj = new PatientPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("VIRTUAL VET TEST CASE", () => {
  beforeEach(() => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
  });

  specify("TC_01 : Verify Virtual Vet data is displayed properly", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    virtualVisitObj.clickVirtualVisitTab();
    virtualVisitObj.verifyVirtualVisitPageUrl();
    virtualVisitObj.verifyDataDisplayedProperly(" Virtual Visit History ");
  });

  specify("TC_02 : Verify Virtual Vet History POPUP displays properly on click filter icon", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    virtualVisitObj.clickVirtualVisitTab();
    virtualVisitObj.verifyVirtualVisitPageUrl();
    virtualVisitObj.clickOnButton("Filter");
    patientPageObj.verifyPopupDisplays("Virtual Visit History");
  });

  specify('TC_03 : Verify Document Preview popup enables on clicking Consult Summary', () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    virtualVisitObj.clickVirtualVisitTab();
    virtualVisitObj.verifyVirtualVisitPageUrl();
    virtualVisitObj.clickConsentSummaryLink(0);
    patientPageObj.verifyPopupDisplays('Document Preview');
  });
});
