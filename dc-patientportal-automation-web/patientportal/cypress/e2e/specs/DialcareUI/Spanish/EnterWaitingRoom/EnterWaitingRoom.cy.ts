import BaseClass from "../../../../pages/BaseClass/BasePage";
import commonPage from "../../../../pages/Common/CommonPage";
import testData from "../../../../../fixtures/testData.json";
import EnterWaitingRoomPageObj from "../../../../pages/EnterWaitingRoom/EnterWaitingRoomPage";
import PatientPage from "../../../../pages/Patient/PatientPage";

const basePage = new BaseClass();
const commonPageObj = new commonPage();
const enterWaitingRoomObj = new EnterWaitingRoomPageObj();
const patientPageObj = new PatientPage();

context("SPANISH: ENTER WAITING ROOM TEST CASES", () => {
  beforeEach(() => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    commonPageObj.changeLanguageDropdown("Español");
  });

  beforeEach(() => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
    commonPageObj.changeLanguageDropdown("Español");
  });

  specify("SPANISH: Verify user navigates to Enter Waiting Room page", () => {
    commonPageObj.getHamburgerMenuLogo();
    enterWaitingRoomObj.clickIngresarSalaDeEsperaTab();
    enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
  });

  specify(
    "SPANISH: Verify Chat en curso button is displayed on Enter Waiting Room page",
    () => {
      commonPageObj.getHamburgerMenuLogo();
      enterWaitingRoomObj.clickIngresarSalaDeEsperaTab();
      commonPageObj.clickHamburgerMenuBackBtn();
      enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
      enterWaitingRoomObj.verifyButtonsDisplayedOnEnterWaitingRoom(
        "Chat en curso"
      );
    }
  );

  specify(
    "SPANISH: Verify Cancelar visita button is displayed on ENTER WAITING ROOM page",
    () => {
      commonPageObj.getHamburgerMenuLogo();
      enterWaitingRoomObj.clickIngresarSalaDeEsperaTab();
      commonPageObj.clickHamburgerMenuBackBtn();
      enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
      enterWaitingRoomObj.verifyButtonsDisplayedOnEnterWaitingRoom(
        "Cancelar visita"
      );
    }
  );

  specify(
    "SPANISH: Verify Cancelar visita popup displays successfully after clicking on CANCEL VISIT button",
    () => {
      commonPageObj.getHamburgerMenuLogo();
      enterWaitingRoomObj.clickIngresarSalaDeEsperaTab();
      commonPageObj.clickHamburgerMenuBackBtn();
      enterWaitingRoomObj.verifyEnterWaitingRoomPageURL();
      enterWaitingRoomObj.verifyButtonsDisplayedOnEnterWaitingRoom(
        "Cancelar visita"
      );
      commonPageObj.clickOnButton("Cancelar visita");
      patientPageObj.verifyPopupDisplays("Cancelar visita");
    }
  );
});
