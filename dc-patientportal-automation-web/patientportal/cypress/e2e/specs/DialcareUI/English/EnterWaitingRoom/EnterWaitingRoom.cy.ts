import BaseClass from "../../../../pages/BaseClass/BasePage";
import commonPage from "../../../../pages/Common/CommonPage";
import testData from "../../../../../fixtures/testData.json";
import EnterWaitingRoomPageObj from "../../../../pages/EnterWaitingRoom/EnterWaitingRoomPage";
import PatientPage from "../../../../pages/Patient/PatientPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";

const basePage = new BaseClass();
const commonPageObj = new commonPage();
const enterWaitingRoomObj = new EnterWaitingRoomPageObj();
const patientPageObj = new PatientPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("ENTER WAITING ROOM TEST CASES", () => {
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
    "Verify chat Icon is displayed on the Enter waiting room tab on Dashboard",
    () => {
      enterWaitingRoomObj.verifyChatIconIsDispalyed();
    }
  );

  specify("Verify user navigates to Enter Waiting Room page", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    enterWaitingRoomObj.clickEnterWaitingRoomTab();
    enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
  });

  specify(
    "Verify CHAT IN PROGRESS button is displayed on Enter Waiting Room page",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      enterWaitingRoomObj.clickEnterWaitingRoomTab();
      enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
      enterWaitingRoomObj.verifyButtonsDisplayedOnEnterWaitingRoom(
        "Chat In Progress"
      );
    }
  );

  specify(
    "Verify CANCEL VISIT button is displayed on ENTER WAITING ROOM page",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      enterWaitingRoomObj.clickEnterWaitingRoomTab();
      enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
      enterWaitingRoomObj.verifyButtonsDisplayedOnEnterWaitingRoom(
        "Cancel Visit"
      );
    }
  );

  specify(
    "Verify CANCEL VISIT popup displays successfully after clicking on CANCEL VISIT button",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      enterWaitingRoomObj.clickEnterWaitingRoomTab();
      enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
      enterWaitingRoomObj.verifyButtonsDisplayedOnEnterWaitingRoom(
        "Cancel Visit"
      );
      commonPageObj.clickOnButton("Cancel Visit");
      patientPageObj.verifyPopupDisplays("Cancel Visit");
    }
  );
});
