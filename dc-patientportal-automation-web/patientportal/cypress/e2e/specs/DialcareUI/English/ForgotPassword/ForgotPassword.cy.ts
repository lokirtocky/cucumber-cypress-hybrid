context("PP: FORGOT PASSWORD PAGE TEST CASES", () => {
  let url = Cypress.env("url"),
    redirectUrl = Cypress.env("redirectUrl");
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  specify("Verifies forgot password page visible", () => {
    cy.origin(redirectUrl, () => {
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotPasswordHeaderTxt = ".panel-head > h2";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotPasswordHeaderTxt).should("be.visible");
      cy.get(forgotPasswordHeaderTxt).should(
        "contain",
        "Forgot Your Password?"
      );
    });
  });

  specify("Verifies email entered in forgot password page", () => {
    cy.origin(redirectUrl, () => {
      const testData = Cypress.require("../../../../../fixtures/testData.json");
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(testData.patient_Sherrie_Email);
      cy.get(forgotEmailTxtBx).should(
        "have.value",
        testData.patient_Sherrie_Email
      );
    });
  });

  specify(
    "Verifies enter invalid email entered in forgot password page",
    () => {
      cy.origin(redirectUrl, () => {
        const invalidEmail = "invalidEmail";
        let forgotPasswordLnk = "a#forgotPassword";
        let forgotEmailTxtBx = "input#email";
        let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
        let emailErrMsg =
          '#emailVerificationSSPRControl [aria-hidden="false"]:nth-of-type(1) [role]';
        cy.get(forgotPasswordLnk).click();
        cy.get(forgotEmailTxtBx).should("be.visible");
        cy.get(forgotEmailTxtBx).should("be.empty");
        cy.get(forgotEmailTxtBx).type(invalidEmail);
        cy.get(sendCodeBtn).should("contain", "Send code");
        cy.get(sendCodeBtn).click();
        cy.get(emailErrMsg).should(
          "contain",
          "Please enter a valid email address."
        );
      });
    }
  );

  specify(
    "Verifies error messages for empty fields in forgot password page",
    () => {
      cy.origin(redirectUrl, () => {
        let forgotPasswordLnk = "a#forgotPassword";
        let forgotEmailTxtBx = "input#email";
        let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
        let emailErrMsg =
          '#emailVerificationSSPRControl [aria-hidden="false"]:nth-of-type(1) [role]';
        cy.get(forgotPasswordLnk).click();
        cy.get(forgotEmailTxtBx).should("be.visible");
        cy.get(forgotEmailTxtBx).should("be.empty");
        cy.get(sendCodeBtn).should("contain", "Send code");
        cy.get(sendCodeBtn).click();
        cy.get(emailErrMsg).should("contain", "This information is required.");
      });
    }
  );

  specify("Verifies forgot Password page content", () => {
    cy.origin(redirectUrl, () => {
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let forgotPasswordHeaderTxt = ".panel-head > h2";
      let DontWorryItHappens = ".panel-sub-heading h5:nth-of-type(1)";
      let pleaseEnterRegisteredEmail = ".panel-sub-heading h5:nth-of-type(2)";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let teleMedicineTxt = ".text-center.fixed-bottom > h1";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).should("be.visible");
      cy.get(forgotEmailTxtBx).should("be.empty");
      cy.get(forgotPasswordHeaderTxt).should("be.visible");
      cy.get(forgotPasswordHeaderTxt).should(
        "contain",
        "Forgot Your Password?"
      );
      cy.get(DontWorryItHappens).should("be.visible");
      cy.get(DontWorryItHappens).should("contain", "Don't worry, it happens!");
      cy.get(pleaseEnterRegisteredEmail).should("be.visible");
      cy.get(pleaseEnterRegisteredEmail).should(
        "contain",
        "Please enter registered email"
      );
      cy.get(sendCodeBtn).should("be.visible");
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(teleMedicineTxt).should("be.visible");
      cy.get(teleMedicineTxt).should("contain", "TELEMEDICINE SIMPLIFIED");
    });
  });
});
