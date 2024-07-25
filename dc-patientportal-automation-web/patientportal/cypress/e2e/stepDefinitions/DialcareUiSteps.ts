import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import commonPage from "../pages/Common/CommonPage";
import BaseClass from "../pages/BaseClass/BasePage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import WaitUtils from "cypress/support/utils/WaitUtils";

const commonPageObj = new commonPage();
const baseClass = new BaseClass();
const dashboardPage = new DashboardPage();

Given(
  "Enter the {string} and {string} fields",
  (email: string, password: string) => {
    baseClass.loginPatient(email, password);
  }
);

Then("User verify dasboard page url {string} is visible", (url: string) => {
  commonPageObj.verifyDashboardPageUrlToBeDisplayed(url);
});

Then(
  "Verify user invalid {string} and invalid password {string} and validate get error {string} message",
  (email: string, password: string, errorMsg: string) => {
    cy.viewport(1920, 1080);
    const url = Cypress.env("url");
    cy.visit(url);
    const redirectUrl = Cypress.env("redirectUrl");
    cy.origin(
      redirectUrl,
      { args: { email, password, errorMsg } },
      ({ email, password, errorMsg }) => {
        const emailAddressTxtBx = "#signInName";
        const passwordFieldTxtBx = "input#password";
        const signInBtn = "button#next";
        const dialCareLogo = 'img[alt="logo"]';
        const rememberMeChkBx = "input#rememberMe";
        const invalidErrMsg = 'form#localAccountForm > div[role="alert"] > p';
        cy.get(dialCareLogo).should("be.visible");
        cy.get(emailAddressTxtBx).should("be.visible").type(email);
        cy.get(passwordFieldTxtBx).should("be.visible").type(password);
        cy.get(rememberMeChkBx).click();
        cy.get(rememberMeChkBx).should("be.checked");
        cy.get(signInBtn).should("be.visible").click();
        cy.get(invalidErrMsg).should("be.visible");
        cy.get(invalidErrMsg).should("contain", errorMsg);
      }
    );
  }
);

When("User Logout the application", () => {
  dashboardPage.logOutUser();
});

Then("User verify the {string} url", (url: string) => {
  dashboardPage.verifyUserNavigatesToSignInPageUrl(url);
});
