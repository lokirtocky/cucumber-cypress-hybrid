context("VERIFICATION TEST CASE", () => {
  let url = Cypress.env("url"),
    redirectUrl = Cypress.env("redirectUrl");
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  specify("TC_01 : verify user redirect to verification page", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let verificationLblTxt =
        "div#emailVerificationSSPRControl_success_message";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(forgotEmailTxtBx).should("have.value", uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(verificationLblTxt).should("be.visible");
      cy.get(verificationLblTxt).should(
        "contain",
        "Verification code has been sent to your inbox. Please copy it to the input box below."
      );
    });
  });

  specify("TC_02 : verify verification label in verification page", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let verificationHeaderLblTxt = "label#VerificationCode_label";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(forgotEmailTxtBx).should("have.value", uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(verificationHeaderLblTxt).should("be.visible");
      cy.get(verificationHeaderLblTxt).should("contain", "Verification Code");
    });
  });

  specify("TC_03 : verify verification text box should be visible ", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let verificationTxtBx = "input#VerificationCode";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(verificationTxtBx).should("be.visible");
      cy.get(verificationTxtBx).should("be.empty");
    });
  });

  specify("TC_04 : verify verification code button is visible", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let VerifyCodeBtn = "button#emailVerificationSSPRControl_but_verify_code";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(VerifyCodeBtn).should("be.visible");
      cy.get(VerifyCodeBtn).should("contain", "Verify code");
    });
  });

  specify("TC_05 : verify code not recevied text is visible", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let codeNoReceviedTxt =
        "button#emailVerificationSSPRControl_but_send_new_code > span";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(codeNoReceviedTxt).should("be.visible");
      cy.get(codeNoReceviedTxt).should("contain", "Code Not Recevied?");
    });
  });

  specify("TC_06 : verify resend link is visible", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let resendLnk =
        "button#emailVerificationSSPRControl_but_send_new_code > a";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(resendLnk).should("be.visible");
      cy.get(resendLnk).should("contain", "Resend");
    });
  });

  specify("TC_07 : verify continue button is visible", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let continueBtn = "button#continue";
      let verificationTxtBx = "input#VerificationCode";
      let VerifyCodeBtn = "button#emailVerificationSSPRControl_but_verify_code";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(verificationTxtBx).should("be.visible");
      cy.get(verificationTxtBx).should("be.empty");
      cy.get(verificationTxtBx).type("12345");
      cy.get(VerifyCodeBtn).click();
      cy.get(continueBtn).should("be.visible");
      cy.get(continueBtn).should("contain", "Continue");
    });
  });

  specify("TC_08 : verify information is required error message", () => {
    cy.origin(redirectUrl, () => {
      let uniqueEmail = `mehako@mailinator.com`;
      let forgotPasswordLnk = "a#forgotPassword";
      let forgotEmailTxtBx = "input#email";
      let sendCodeBtn = "button#emailVerificationSSPRControl_but_send_code";
      let informationErrMsg =
        '.TextBox.VerificationCode > .attrEntry > div[role="alert"]';
      let VerifyCodeBtn = "button#emailVerificationSSPRControl_but_verify_code";
      cy.get(forgotPasswordLnk).click();
      cy.get(forgotEmailTxtBx).type(uniqueEmail);
      cy.get(sendCodeBtn).should("contain", "Send code");
      cy.get(sendCodeBtn).click();
      cy.get(VerifyCodeBtn).click();
      cy.get(informationErrMsg).should("be.visible");
      cy.get(informationErrMsg).should(
        "contain",
        "This information is required."
      );
    });
  });
});
