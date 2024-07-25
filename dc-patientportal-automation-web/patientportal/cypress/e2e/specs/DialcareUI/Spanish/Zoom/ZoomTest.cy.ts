import BaseClass from "../../../../pages/BaseClass/BasePage";
import testData from "../../../../../fixtures/testData.json";
import commonPage from "../../../../pages/Common/CommonPage";
import ZoomPageObj from "../../../../pages/Zoom/ZoomPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";

const basePage = new BaseClass();
const commonPageObj = new commonPage();
const zoomPageObj = new ZoomPageObj();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

// Skipped because the page doesn't exist on UI
context.skip("ZOOM TEST CASE", () => {
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

  specify(
    "SPANISH: ZOOM > FINALIZAR VISITA > ANALIZER VISIT - Verify user navigates to Dashboard page after click on End Visit button",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      zoomPageObj.clickZoomTab();
      zoomPageObj.verifyZoomPageUrl();
      zoomPageObj.clickFinalizerVisitaBtn();
      commonPageObj.clickOnButton("Finalizar visita");
      commonPageObj.verifyDashboardPageUrlToBeDisplayed(
        testData.dashboardPageUrl
      );
    }
  );

  specify(
    "SPANISH: ZOOM > FINALIZAR VISITA > ANALIZER VISIT - Verify user navigates to Dashboard page after click on End Visit button",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      zoomPageObj.clickZoomTab();
      zoomPageObj.verifyZoomPageUrl();
      zoomPageObj.clickFinalizerVisitaBtn();
      commonPageObj.clickOnButton("Finalizar visita");
      commonPageObj.verifyDashboardPageUrlToBeDisplayed(
        testData.dashboardPageUrl
      );
    }
  );

  specify(
    "SPANISH: ZOOM > FINALIZAR VISITA > CANCELAR - Verify user navigates to Dashboard page after click on End Visit button",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      zoomPageObj.clickZoomTab();
      zoomPageObj.verifyZoomPageUrl();
      zoomPageObj.clickFinalizerVisitaBtn();
      commonPageObj.clickOnButton("Cancelar");
      zoomPageObj.verifyZoomPageUrl();
    }
  );
});
