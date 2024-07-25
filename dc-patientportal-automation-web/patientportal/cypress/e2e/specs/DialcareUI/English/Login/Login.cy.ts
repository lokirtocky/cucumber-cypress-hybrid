import BasePage from "../../../../pages/BaseClass/BasePage";
import Dashboard from "../../../../pages/Dashboard/DashboardPage";
import testData from "../../../../../fixtures/testData.json";
import commonPage from "../../../../pages/Common/CommonPage";

const basePage = new BasePage();
const dashboardPage = new Dashboard();
const commonPageObj = new commonPage();

context("PP: LOGIN TEST CASE", () => {
  let url = Cypress.env("url"),
    redirectUrl = Cypress.env("redirectUrl");
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  specify("Verifies Login with Valid Credentials", () => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    commonPageObj.verifyDashboardPageUrlToBeDisplayed(
      testData.dashboardPageUrl
    );
  });

  specify("PP: Logout User", () => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    dashboardPage.logOutUser();
    dashboardPage.verifyUserNavigatesToSignInPageUrl(testData.signInPageURl);
  });

  specify("Verifies error message for invalid email format", () => {
    cy.origin(redirectUrl, () => {
      const invalidEmail = "invalidemail";
      const password = "Test@1234";
      let emailTxtBx = "input#signInName";
      let passwordTxtBx = "input#password";
      let signInBtn = "button#next";
      let dialCareLogo = '.mx-auto.navbar-brand > img[alt="logo"]';
      let invalidErrMsg = 'form#localAccountForm > div[role="alert"] > p';
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailTxtBx).should("be.empty");
      cy.get(emailTxtBx).should("be.visible").type(invalidEmail);
      cy.get(passwordTxtBx).should("be.empty");
      cy.get(passwordTxtBx).should("be.visible").type(password);
      cy.get(signInBtn).should("be.visible").click();
      cy.get(invalidErrMsg).should("be.visible");
      cy.get(invalidErrMsg).should(
        "contain",
        "We can't seem to find your account."
      );
    });
  });

  specify("Verifies error message for incorrect password", () => {
    cy.origin(redirectUrl, () => {
      const email = "sherrie@mailinator.com";
      const incorrectPassword = "wrongpassword";
      let emailTxtBx = "input#signInName";
      let passwordTxtBx = "input#password";
      let signInBtn = "button#next";
      let dialCareLogo = '.mx-auto.navbar-brand > img[alt="logo"]';
      let invalidErrMsg = 'form#localAccountForm > div[role="alert"] > p';
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailTxtBx).should("be.empty");
      cy.get(emailTxtBx).should("be.visible").type(email);
      cy.get(passwordTxtBx).should("be.empty");
      cy.get(passwordTxtBx).should("be.visible").type(incorrectPassword);
      cy.get(signInBtn).should("be.visible").click();
      cy.get(invalidErrMsg).should("be.visible");
      cy.get(invalidErrMsg).should("contain", "Your password is incorrect.");
    });
  });

  specify("Verifies error messages for empty fields", () => {
    cy.origin(redirectUrl, () => {
      let signInBtn = "button#next";
      let dialCareLogo = '.mx-auto.navbar-brand > img[alt="logo"]';
      let emailErrMsg = 'div:nth-of-type(1) > div[role="alert"] > p';
      let passwordErrMsg = '.error.itemLevel > p[role="alert"]';
      cy.get(dialCareLogo).should("be.visible");
      cy.get(signInBtn).should("be.visible").click();
      cy.get(emailErrMsg).should("be.visible");
      cy.get(emailErrMsg).should("contain", "Please enter your Email Address");
      cy.get(passwordErrMsg).should("be.visible");
      cy.get(passwordErrMsg).should("contain", "Please enter your password");
    });
  });

  specify("Verifies dial care Login page content", () => {
    cy.origin(redirectUrl, () => {
      let alreadyAMemberTxt = "#existingPatient div:nth-of-type(1)";
      let verifyAccountLnk = "a#verifyAccount";
      let telemedicineSimplifiedTxt = ".custom-letter-spacing";
      let dialCareLogo = '.mx-auto.navbar-brand > img[alt="logo"]';
  
      cy.get(dialCareLogo).should("be.visible");
      cy.get(alreadyAMemberTxt).should("be.visible");
      cy.get(alreadyAMemberTxt)
        .invoke("text")
        .then((text) => {
          const trimmedText = text.replace(/\s\s+/g, " ").trim();
          expect(trimmedText).to.equal(
            "Already a member, but need to complete registration?"
          );
        });
      cy.get(verifyAccountLnk).should("be.visible");
      cy.get(verifyAccountLnk)
        .invoke("text")
        .then((text) => {
          const trimmedText = text.replace(/\s\s+/g, " ").trim();
          expect(trimmedText).to.equal("Verify Your Account");
        });
      cy.get(telemedicineSimplifiedTxt).should("be.visible");
      cy.get(telemedicineSimplifiedTxt).should(
        "contain",
        "TELEMEDICINE SIMPLIFIED"
      );
    });
  });

  specify.skip('Verifies "Remember Me" functionality', () => {
    basePage.loginPatient(
      testData.patient_Sherrie_Email,
      testData.patient_Password
    );
    dashboardPage.logOutUser();
    cy.origin(redirectUrl, () => {
      let emailTxtBx = "input#signInName";
      let rememberMeChkBx = "a#verifyAccount";
      cy.get(emailTxtBx).should("be.visible");
      cy.get(rememberMeChkBx).should("be.visible");
    });
  });
});
