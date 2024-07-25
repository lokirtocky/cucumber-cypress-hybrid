import WaitUtils from "cypress/support/utils/WaitUtils";

class commonPage {
  private logoutLnk =
    ".cursor-pointer.cursor-underline.hydrated.ion-margin.ios.sc-ion-label-ios-h.sc-ion-label-ios-s.z-index-top";
  private confirmLogoutBtn = "//ion-button[contains(text(),'CONFIRM')]";
  private cancelLogoutBtn =
    "ion-col:nth-of-type(2) > .button.button-solid.cancel-btn.font-17.font-web-btn.hydrated.ion-activatable.ion-color.ion-color-skyblue.ion-text-uppercase.md";
  private backBtn =
    '//*[@id="layout"]/app-request-virtual-layout/ion-content/ion-grid/ion-row[1]/ion-col/app-page-header/ion-grid/ion-row/ion-col[2]/ion-label';
  private dependentBackBtn = '.ion-color-voilet.flip-rtl';
  private spinnerLoader =
    "/html/body/app-root/app-custom-spinner/div/ion-spinner";
  private hamburgerMenuLogo = "app-menu-items-web ion-fab-button ion-icon";
  private hamburgerMenuBackBtn = "app-menu-items ion-item ion-icon";
  private langagueBtn = '//*[@id="language-selectbox"]';
  private langageIcon = "app-header-menu ion-icon";
  private backkIcon = "//ion-label[contains(text(),' back ')]/.";
  private cancelButtonOnParentaConcentForm =
    "//ion-button[contains(text(),'Cancel')]";
  private closeButton = "//ion-button[contains(text(),'CLOSE')]";
  private chatIconOnEnterWaitingRoomTab = "app-dashboard ion-img";
  private menuIcon = "app-patient-login-info ion-fab ion-icon";
  private logOutTab = "app-menu-items ion-menu ion-item:nth-child(9)";
  private petNameInList =
    "app-account-information ion-card-content ion-list ion-item ion-label";

    clickDependentBackBtn(){
      cy.get(this.dependentBackBtn).click();
    }

  getHamburgerMenuLogo() {
    WaitUtils.waitForElementToAppear(this.hamburgerMenuLogo);
    cy.waitUntil(
      () => {
        return cy
          .get("app-dashboard ion-card")
          .should("not.be.disabled")
          .and("be.visible");
      },
      { interval: 200 }
    );

    cy.waitUntil(
      () => {
        return cy.get(this.hamburgerMenuLogo).should("exist").and("be.visible");
      },
      { interval: 200 }
    );
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.chatIconOnEnterWaitingRoomTab).should("be.visible");
    cy.get(this.hamburgerMenuLogo).should("exist").click();
  }

  clickHamburgerMenuBackBtn() {
    WaitUtils.waitForElementToAppear(this.hamburgerMenuBackBtn);
    cy.get(this.hamburgerMenuBackBtn).should("be.visible").click();
  }

  clickMenuIconAfterStudentRegistration(): void {
    cy.get(this.menuIcon).should("be.visible").click();
  }

  clickHamburgerMenuLogo() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.hamburgerMenuLogo).should("exist").should("be.visible").click();
  }

  logoutApplication() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.get(this.logoutLnk).click();
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.confirmLogoutBtn).click();
    cy.wait(8000);
  }

  clickBackBtn() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.backBtn).scrollIntoView().click({ force: true });
  }

  getBackBtn() {
    return cy.xpath(this.backBtn).scrollIntoView();
  }

  isSpinnerLoaderVisible() {
    return cy.xpath(this.spinnerLoader).should("be.visible");
  }

  isSpinnerLoaderNotVisible() {
    return cy.xpath(this.spinnerLoader).should("not.be.visible");
  }

  selectLangageInDDL(langage: string) {
    cy.xpath(this.langagueBtn).trigger("mouseover").click();
    cy.xpath(`//*[contains(text(),"${langage}")]`).eq(1).click({ force: true });
  }

  changeLanguageDropdown(language: string): void {
    cy.get(this.langageIcon).trigger("mouseover").click();
    cy.xpath(`//ion-radio[contains(text()," ${language} ")]`)
      .should("be.visible")
      .click({ force: true });
  }

  clickOnButton(button: string): void {
    cy.xpath(`//ion-button[contains(text(),"${button}")]`).click();
  }

  clickBackIcon(): void {
    cy.xpath(this.backkIcon).click({ force: true });
  }

  verifyDashboardPageUrlToBeDisplayed(dashboardPageUrl: string): void {
    cy.reload();
    cy.verifyPageUrl(dashboardPageUrl);
  }

  cancelParentalConsentForm() {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.cancelButtonOnParentaConcentForm).click();
    cy.xpath(this.cancelButtonOnParentaConcentForm).click();
    cy.xpath(this.closeButton).click();
  }

  verifyCompletingRegistrationPageDisplayed() {
    cy.contains(
      "Thank you for completing your registration. You can login or continue to add additional information."
    ).should("be.visible");
    cy.get(this.menuIcon).should("exist").and("be.visible").click();
  }

  clickAnadirButton(buttonName: string, index: number) {
    cy.xpath(`//ion-button[contains(text(),'${buttonName}')]/.`)
      .eq(index)
      .click();
  }

  clickSaveButton(buttonText: string) {
    cy.xpath(`(//ion-button[contains(text(),"${buttonText}")])[2]`)
      .should("be.visible")
      .click();
  }

  clickLogoutFromHamburgTabs(): void {
    cy.get(this.logOutTab).should("exist").should("be.visible").click();
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.xpath(this.confirmLogoutBtn).click();
  }

  verifyConfirmationMessage(confirmationMsg: string) {
    cy.contains(confirmationMsg).should("be.visible");
  }
}

export default commonPage;
