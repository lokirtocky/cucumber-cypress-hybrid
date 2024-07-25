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

context("SPANISH: VIRTUAL VET TEST CASE", () => {
  beforeEach(() => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    commonPageObj.changeLanguageDropdown(" Español ");
  });

  beforeEach(() => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    commonPageObj.changeLanguageDropdown(" Español ");
  });

  specify("Verify Virtual Vet data is displayed properly", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    virtualVisitObj.clickVeteraninarioVirtualTab();
    virtualVisitObj.verifyVirtualVisitPageUrl();
    virtualVisitObj.verifyDataDisplayedProperly(
      " Historial de visitas virtuales "
    );
  });

  specify(
    "Verify Virtual Vet History POPUP displays properly on click filter icon",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      virtualVisitObj.clickVeteraninarioVirtualTab();
      virtualVisitObj.verifyVirtualVisitPageUrl();
      virtualVisitObj.clickOnButton("Filtrar");
      patientPageObj.verifyPopupDisplays("Historial de visitas virtuales");
    }
  );
});
