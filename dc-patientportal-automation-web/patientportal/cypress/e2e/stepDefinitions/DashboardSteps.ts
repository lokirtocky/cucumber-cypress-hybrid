import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import requestVirtualVisitPage from "../pages/RequestVirtualVisit/RequestVirtualVisitPage";
import Dashboard from "../pages/Dashboard/DashboardPage";
import BaseClass from "../pages/BaseClass/BasePage";
import testData from "../../fixtures/testData.json";

const requestVirtualVisitPageObj = new requestVirtualVisitPage();
const dashboardPage = new Dashboard();
const baseClassObj = new BaseClass();

When(
  "Enter the member verification {string} and {string} and  {string} details",
  () => {
    baseClassObj.verifyPatientRegistration(
      testData.memberID,
      testData.Member_FirstName,
      testData.Member_LastName
    );
  }
);

When("Click on Request a Visit Visit", () => {
  requestVirtualVisitPageObj.clickRequestAVirtualVisitInHamburgerMenu();
  requestVirtualVisitPageObj.clickHamburgerMenuBackBtn();
});

When("Click on Hamburger icon", () => {
  requestVirtualVisitPageObj.getHamburgerMenuLogo();
});

When("Click on My Account from hamburger", () => {
  dashboardPage.clickMyAccountTab();
});

When("User navigates to stage url and click Verify Your Account link", () => {
  baseClassObj.clickVerifyYourAccountTab();
});
