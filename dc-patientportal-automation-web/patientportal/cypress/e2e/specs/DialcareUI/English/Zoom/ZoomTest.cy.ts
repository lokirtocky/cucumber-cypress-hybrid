import BaseClass from "../../../../pages/BaseClass/BasePage";
import testData from "../../../../../fixtures/testData.json";
import commonPage from "../../../../pages/Common/CommonPage";
import ZoomPageObj from "../../../../pages/Zoom/ZoomPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";

const basePage = new BaseClass();
const commonPageObj = new commonPage();
const zoomPageObj = new ZoomPageObj();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

//skipped because functionality removed from UI
context.skip("ZOOM TEST CASES", () => {
  beforeEach(() => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
  });

  beforeEach(() => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
  });

  specify(
    "ZOOM > END VISIT - Verify user navigates to Dashboard page after click on End Visit button",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      commonPageObj.clickHamburgerMenuLogo();
      zoomPageObj.clickZoomTab();
      zoomPageObj.verifyZoomPageUrl();
      zoomPageObj.clickEndVisitButton();
      commonPageObj.clickOnButton("End Visit");
      commonPageObj.verifyDashboardPageUrlToBeDisplayed(
        testData.dashboardPageUrl
      );
    }
  );

  specify(
    "ZOOM > END VISIT - Verify user navigates to Dashboard page after click on End Visit button",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      commonPageObj.clickHamburgerMenuLogo();
      zoomPageObj.clickZoomTab();
      zoomPageObj.verifyZoomPageUrl();
      zoomPageObj.clickEndVisitButton();
      commonPageObj.clickOnButton("End Visit");
      commonPageObj.verifyDashboardPageUrlToBeDisplayed(
        testData.dashboardPageUrl
      );
    }
  );

  specify(
    "ZOOM > CANCEL VISIT - Verify user remains on Dashboard page after click on Cancel Visit button",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      commonPageObj.clickHamburgerMenuLogo();
      zoomPageObj.clickZoomTab();
      zoomPageObj.verifyZoomPageUrl();
      zoomPageObj.clickEndVisitButton();
      commonPageObj.clickOnButton("Cancel");
      zoomPageObj.verifyZoomPageUrl();
    }
  );
});
