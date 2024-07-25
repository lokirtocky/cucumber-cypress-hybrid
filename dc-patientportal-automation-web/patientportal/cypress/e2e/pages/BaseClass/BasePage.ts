import testData from "../../../fixtures/testData.json";
import "../../../support/commands";

class BaseClass {
  private validation_Msg = "form em";
  private contactInfoinputField = "app-name-info ion-input input";
  private addressInfoInputField = "app-address-info form ion-input input";
  private yesBtn = "//ion-button[contains(text(),'Yes')]";

  public viewPort(x: number, y: number): void {
    cy.viewport(x, y);
  }

  public loginPatient(email: string, password: string): void {
    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(
      redirectUrl,
      { args: { email, password } },
      ({ email, password }) => {
        let emailAddressTxtBx = "#signInName";
        let passwordFieldTxtBx = "input#password";
        let signInBtn = "button#next";
        let dialCareLogo = 'img[alt="logo"]';
        let rememberMeChkBx = "input#rememberMe";
        cy.get(dialCareLogo).should("be.visible");
        cy.get(emailAddressTxtBx).should("be.visible").type(email);
        cy.get(passwordFieldTxtBx).should("be.visible").type(password);
        cy.get(rememberMeChkBx).click();
        cy.get(rememberMeChkBx).should("be.checked");
        cy.get(signInBtn).should("be.visible").click();
      }
    );

    // cy.intercept('https://patients.stage.dctelemedplatform.com/existing-session').as('existingSession');
    // cy.url().should('include', 'existing-session');
    // cy.xpath(this.yesBtn).click();
    // cy.url().should('include', testData.dashboardPageUrl);
  }

  public enterStudentVerificationDetails(
    studentFName: string,
    studentLName: string,
    studDob: string,
    studID: string
  ): void {
    let firstNameField = 'ion-input input[inputmode="text"]';
    let lastNameField = 'ion-input input[inputmode="text"]';
    let dateOfBirthTxtBox = "app-custom-date input";
    let studentIdField = 'ion-input[formcontrolname="studentId"] input';
    let verifyButton = "(//form//ion-button[contains(text(),'VERIFY')])[2]";
    let verifyBtnForStudentRegistration =
      "(//ion-button[contains(text(), 'VERIFY')])[3]";
    let verifiedSuccessfully = "Verified Successfully";
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    cy.viewport(1920, 1080);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {
      let emailAddressField = "#signInName";
      let passwordField = "input#password";
      let signInButton = "button#next";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";

      cy.get("body").should("exist");
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressField).should("be.visible");
      cy.get(passwordField).should("be.visible");
      cy.get(signInButton).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });
    cy.clickButton(verifyButton, { method: "xpath" });
    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(firstNameField).eq(0).type(studentFName);
    cy.get(lastNameField).eq(1).type(studentLName);
    cy.get(dateOfBirthTxtBox).type(studDob);
    cy.get(studentIdField).type(studID);
    cy.xpath(verifyBtnForStudentRegistration).click();
    cy.contains(verifiedSuccessfully).should("be.visible");
  }

  public memberAccountVerification(): void {
    let memberID = 'ion-input[formcontrolname="memberId"] input';
    let memberFNameTxtBox = 'ion-input[formcontrolname="firstName"] input';
    let memberLNameTxtBox = 'ion-input[formcontrolname="lastName"] input';
    let verifyButton = 'ion-button[type="submit"]';
    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {
      let emailAddressTxtBx = "#signInName";
      let passwordFieldTxtBx = "input#password";
      let signInBtn = "button#next";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressTxtBx).should("be.visible");
      cy.get(passwordFieldTxtBx).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });
    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(memberID).eq(0).type(testData.member_Id);
    cy.get(memberFNameTxtBox).eq(0).type(testData.member_FName);
    cy.get(memberLNameTxtBox).eq(0).type(testData.member_LName);
    cy.get(verifyButton).eq(0).click();
  }

  public enterInvalid_PatientDetails(email: string, password: string): void {
    let memberID = 'ion-input[formcontrolname="memberId"] input';
    let memberFNameTxtBox = 'ion-input[formcontrolname="firstName"] input';
    let memberLNameTxtBox = 'ion-input[formcontrolname="lastName"] input';
    let verifyButton = 'ion-button[type="submit"]';

    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(
      redirectUrl,
      { args: { email, password } },
      ({ email, password }) => {
        let emailAddressTxtBx = "#signInName";
        let passwordFieldTxtBx = "input#password";
        let dialCareLogo = 'img[alt="logo"]';
        let verifyYourAccount_Tab = "a#verifyAccount";
        cy.get(dialCareLogo).should("be.visible");
        cy.get(emailAddressTxtBx).should("be.visible").type(email);
        cy.get(passwordFieldTxtBx).should("be.visible").type(password);
        cy.get(verifyYourAccount_Tab).click();
      }
    );

    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(memberID).eq(0).type(testData.memberID);
    cy.get(memberFNameTxtBox).eq(0).type(testData.Invalid_Member_FirstName);
    cy.get(memberLNameTxtBox).eq(0).type(testData.Member_LastName);
    cy.get(verifyButton).eq(0).click({ force: true });
  }

  public enterValidMemberDetails(): void {
    let memberID = 'ion-input[formcontrolname="memberId"] input';
    let memberFNameTxtBox = 'ion-input[formcontrolname="firstName"] input';
    let memberLNameTxtBox = 'ion-input[formcontrolname="lastName"] input';
    let verifyButton = 'ion-button[type="submit"]';

    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {
      let emailAddressTxtBx = "#signInName";
      let passwordFieldTxtBx = "input#password";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressTxtBx).should("be.visible");
      cy.get(passwordFieldTxtBx).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });

    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(memberID).eq(0).type(testData.member_Id);
    cy.get(memberFNameTxtBox).eq(0).type(testData.member_FName);
    cy.get(memberLNameTxtBox).eq(0).type(testData.member_LName);
    cy.get(verifyButton).eq(0).click({ force: true });
  }

  public verifyValidationMessageForInvalidPatientDetails(
    validationMessage: string
  ): void {
    cy.contains(validationMessage).should("be.visible");
  }

  public verifyValidationMsg(validationMsg: string): void {
    cy.get(this.validation_Msg).then(($el) => {
      const errorMsgText = $el.text();
      cy.log(errorMsgText);

      expect(errorMsgText).to.include(validationMsg);
    });
  }

  public verifyValidationOfMemberField(): void {
    let memberID = 'ion-input[formcontrolname="memberId"] input';
    let memberFNameTxtBox = 'ion-input[formcontrolname="firstName"] input';

    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {
      let emailAddressTxtBx = "#signInName";
      let passwordFieldTxtBx = "input#password";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressTxtBx).should("be.visible");
      cy.get(passwordFieldTxtBx).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });

    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(memberID).eq(0).type(testData.memberID).clear();
    cy.get(memberFNameTxtBox).eq(0).click();
  }

  public verifyValidationOfMemberFirstField(): void {
    let memberID = 'ion-input[formcontrolname="memberId"] input';
    let memberFNameTxtBox = 'ion-input[formcontrolname="firstName"] input';
    let memberLNameTxtBox = 'ion-input[formcontrolname="lastName"] input';

    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {
      let emailAddressTxtBx = "#signInName";
      let passwordFieldTxtBx = "input#password";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressTxtBx).should("be.visible");
      cy.get(passwordFieldTxtBx).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });

    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(memberID).eq(0).type(testData.memberID);
    cy.get(memberFNameTxtBox).eq(0).type(testData.Invalid_Member_FirstName);
    cy.get(memberFNameTxtBox).eq(0).clear();
    cy.get(memberLNameTxtBox).eq(0).click();
  }

  public verifyValidationOfMemberLastField(): void {
    let memberID = 'ion-input[formcontrolname="memberId"] input';
    let memberLNameTxtBox = 'ion-input[formcontrolname="lastName"] input';

    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {
      let emailAddressTxtBx = "#signInName";
      let passwordFieldTxtBx = "input#password";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressTxtBx).should("be.visible");
      cy.get(passwordFieldTxtBx).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });

    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(memberLNameTxtBox).eq(0).type(testData.Member_LastName);
    cy.get(memberLNameTxtBox).eq(0).clear();
    cy.get(memberID).eq(0).type(testData.memberID).clear();
  }

  public removeContactInfoInputField(index: number): void {
    cy.get(this.contactInfoinputField)
      .eq(index)
      .type("{selectAll}{backspace}", { delay: 200 });
    cy.get(this.contactInfoinputField).eq(2).click();
  }

  public removeaddressInfoInputField(index: number): void {
    cy.get(this.addressInfoInputField).eq(index).type("t");
  }

  public clearInputData(index: number) {
    cy.get(this.addressInfoInputField).eq(index).clear();
  }

  public verifyStudentVerificationIncorrectDetails(): void {
    let firstName_Field = 'ion-input input[inputmode="text"]';
    let lastName_Field = 'ion-input input[inputmode="text"]';
    let dateOfBirthTxtBox = "app-custom-date input";
    let studentIdField = 'ion-input[formcontrolname="studentId"] input';
    let verifyButton = "(//form//ion-button[contains(text(),'VERIFY')])[2]";
    let verifyBtnForStudentRegistration =
      "(//ion-button[contains(text(), 'VERIFY')])[3]";
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    cy.viewport(1920, 1080);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, () => {
      let emailAddressField = "#signInName";
      let passwordField = "input#password";
      let signInButton = "button#next";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get("body").should("be.visible");
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressField).should("be.visible");
      cy.get(passwordField).should("be.visible");
      cy.get(signInButton).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });
    cy.xpath(verifyButton).click();
    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(firstName_Field).eq(0).type(testData.studentInvalidFirstName);
    cy.get(lastName_Field).eq(1).type(testData.studentLastName);
    cy.get(dateOfBirthTxtBox).type(testData.studentDateOfBirthField);
    cy.get(studentIdField).type(testData.studentID);
    cy.xpath(verifyBtnForStudentRegistration).click();
  }

  public verificationFailedErrorMsg(verificationMsg: string): void {
    cy.contains(verificationMsg).should("be.visible");
  }

  clickVerifyYourAccountTab(): void {
    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, (): void => {
      let emailAddressTxtBx = "#signInName";
      let passwordFieldTxtBx = "input#password";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressTxtBx).should("be.visible");
      cy.get(passwordFieldTxtBx).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });

    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
  }

  public verifyPatientRegistration(
    member_ID: string,
    first_Name: string,
    last_Name: string
  ): void {
    let memberID = 'ion-input[formcontrolname="memberId"] input';
    let memberFNameTxtBox = 'ion-input[formcontrolname="firstName"] input';
    let memberLNameTxtBox = 'ion-input[formcontrolname="lastName"] input';
    let verifyButton = 'ion-button[type="submit"]';
    cy.viewport(1920, 1080);
    let url, redirectUrl;
    url = Cypress.env("url");
    cy.visit(url);
    redirectUrl = Cypress.env("redirectUrl");
    cy.origin(redirectUrl, (): void => {
      let emailAddressTxtBx = "#signInName";
      let passwordFieldTxtBx = "input#password";
      let dialCareLogo = 'img[alt="logo"]';
      let verifyYourAccount_Tab = "a#verifyAccount";
      cy.get(dialCareLogo).should("be.visible");
      cy.get(emailAddressTxtBx).should("be.visible");
      cy.get(passwordFieldTxtBx).should("be.visible");
      cy.get(verifyYourAccount_Tab).click();
    });

    cy.verifyPageUrl(testData.verifyAccountMemberPageUrl);
    cy.get(memberID).eq(0).type(member_ID);
    cy.get(memberFNameTxtBox).eq(0).type(first_Name);
    cy.get(memberLNameTxtBox).eq(0).type(last_Name);
    cy.get(verifyButton).eq(0).click();
  }

  public removeAddressInfoInputField(index: number): void {
    cy.get(this.addressInfoInputField).eq(index).clear();
  }

  verifyFormFieldsValidations(
    index: number,
    formFieldValidation: string
  ): void {
    cy.get(this.validation_Msg)
      .eq(index)
      .then(($el) => {
        const errorMsgText = $el.text();
        cy.log(errorMsgText);
        expect(errorMsgText).to.include(formFieldValidation);
      });
  }

  verifyVerificationCodeAppearedToUpdatePassword(email: string) {
    cy.visit("https://www.mailinator.com");
    cy.origin(
      "https://www.mailinator.com",
      { args: { email } },
      ({ email }) => {
        const mailinatorSearchField = "input#search";
        const clickFirstIndexToRegisterDependent =
          'table[class="table-striped jambo_table"] tbody tr:nth-child(1) td:nth-child(2)';
        const verificationCodeText =
          "table:nth-child(3) tbody tr:nth-child(3) td:nth-child(1) strong:nth-child(1)";
        const iframeId = "iframe#html_msg_body";
        const verificationCodeRegex = /Your verification code is: (\d{6})/;

        cy.on("uncaught:exception", (e) => {
          if (e.message.includes("Things went bad")) {
            return false; // Prevent Cypress from failing the test
          }
        });
        const address = Cypress.env("Patient Forgot Password Email");
        cy.get(mailinatorSearchField).type(address).type("{enter}");
        cy.get(clickFirstIndexToRegisterDependent).first().click();

        cy.get(iframeId, { timeout: 60000 })
          .should("be.visible")
          .then(($iframe) => {
            const $body = $iframe.contents();
            cy.wrap($body)
              .find(verificationCodeText)
              .first()
              .should("be.visible");
            cy.wrap($body)
              .find("body")
              .invoke("text")
              .then((text) => {
                const match = text.match(verificationCodeRegex);
                if (match && match[1]) {
                  const verificationCode = match[1];
                  cy.wrap(verificationCode).as("verificationCode"); // Save the verification code for later use
                  cy.log(`Verification code found: ${verificationCode}`);
                } else {
                  throw new Error("Verification code not found");
                }
              });
          });
      }
    );
  }
}
export default BaseClass;
