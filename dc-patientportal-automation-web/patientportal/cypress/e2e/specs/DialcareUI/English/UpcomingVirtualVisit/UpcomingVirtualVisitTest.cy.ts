import BaseClass from "../../../../pages/BaseClass/BasePage";
import Dashboard from "../../../../pages/Dashboard/DashboardPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import upcomingVirtualVisitPage from "../../../../pages/UpcomingVirtualVisit/UpcomingVirtualVisitPage";
import testData from "../../../../../fixtures/testData.json";

const loginPage = new BaseClass();
const dashboardPage = new Dashboard();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();
const upcomingVirtualVisitPageObj = new upcomingVirtualVisitPage();

context("UPCOMING VIRTUAL VISIT TESTS", () => {
  beforeEach(() => {
    loginPage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    dashboardPage.clickUpcomingVirtualVisitTab();
    upcomingVirtualVisitPageObj.verifyUpcomingVirtualVisitPageUrl();
  });

  specify("TC_01: Upcoming Virtual Visit - EDIT VISIT", () => {
    upcomingVirtualVisitPageObj.verifyEditVisitData();
  });

  specify("TC_02: Upcoming Virtual Visit - CANCEL VISIT", () => {
    upcomingVirtualVisitPageObj.verifyCancelVisitData();
  });

  specify("TC_03: CANCEL VISIT - Reason OF Cancelling >> SCHEDULING CONFLICTS", () => {
    upcomingVirtualVisitPageObj.verifyCancelVisitData();
    upcomingVirtualVisitPageObj.clickSchedulingConflictReasonForCancelling();
    upcomingVirtualVisitPageObj.clickCancelVisitBtn();
  });

  specify(
    "TC_04: CANCEL VISIT - Reason OF Cancelling >> DECIDED TO SEEK IN PERSON",
    () => {
      upcomingVirtualVisitPageObj.verifyCancelVisitData();
      upcomingVirtualVisitPageObj.clickDecideToSeekInPersonBtn();
      upcomingVirtualVisitPageObj.clickCancelVisitBtn();
    }
  );

  specify("TC_05: CANCEL VISIT - Reason OF Cancelling >> NO LONGER NEEDED", () => {
    upcomingVirtualVisitPageObj.verifyCancelVisitData();
    upcomingVirtualVisitPageObj.clickNoLongerNeededBtn();
    upcomingVirtualVisitPageObj.clickCancelVisitBtn();
  });
});
