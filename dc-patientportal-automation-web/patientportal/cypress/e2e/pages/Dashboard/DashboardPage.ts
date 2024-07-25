import WaitUtils from "cypress/support/utils/WaitUtils";
import testData from "../../../fixtures/testData.json";

class Dashboard {
  /*
   * Initialise the selectors of Dashboard page
   */
  private logoutLink = "div.ion-float-right ion-label:nth-child(2)";
  private dashboardData = "div.forDesktop";
  private confirmButton = "//*[contains(text(),'CONFIRM')]/..";
  private upcomingVirtualVisit_Tab =
    "app-menu-items ion-list ion-item:nth-child(5)";
  private collapseIcon =
    "app-menu-items ion-menu ion-item:nth-child(1) ion-icon";
  private myAccountTab =
    "app-menu-items ion-list ion-item:nth-child(4) ion-label:nth-child(1)";
  private myAccountBtn = '.height-100-per.hydrated.margin-top-0.md > ion-col:nth-of-type(3) .display-flex.hydrated.margin-top-8.md';

  public clickMyAccountDiv(){
    cy.get(this.myAccountBtn).should("be.visible").click();
  }

  public logOutUser(): void {
    cy.get("body").should("be.visible");
    cy.isVisible(this.dashboardData, { method: "get" }); // Verify visibility of 'Dashboard' data
    cy.isVisible(this.logoutLink, { method: "get" }); // Verify visibility of Logout link
    cy.clickButton(this.logoutLink, { method: "get" }); // Click 'logout' button
    cy.isVisible(this.confirmButton, { method: "xpath" }); // Verify visibility of Confirm button
    cy.clickButton(this.confirmButton, { method: "xpath" }); // click on Confirm button
  }

  // Handles the Cross origin
  public verifyUserNavigatesToSignInPageUrl(
    expectedSignInPageUrl: string
  ): void {
    cy.interceptRequest("POST", testData.interceptURL, "perftraceRequest");

    cy.wait("@perftraceRequest").then((interception) => {
      if (interception.response) {
        // Assertion on the request
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.url).to.include(expectedSignInPageUrl);
      } else {
        cy.log("Warning: Response is undefined for the intercepted request");
      }
    });
  }

  // Verify user navigates to Dashboard page
  public verifyDashboardPageUrl(): void {
    cy.url().should("include", "dashboard"); // Verify user navigates to the Dashboard page URL
    cy.isVisible(this.dashboardData, { method: "get" }); // Verify Dashboard page data is visible
    cy.isVisible(this.logoutLink, { method: "get" }); // Verify logout link is displayed on dashboard page
  }

  public clickUpcomingVirtualVisitTab(): void {
    cy.clickButton(this.upcomingVirtualVisit_Tab);
    cy.get("app-menu-items ion-menu ion-icon").click();
  }
  public clickCloseNavBarTab(): void {
    WaitUtils.waitForElementToAppear(this.collapseIcon);
    cy.get(this.collapseIcon).click();
  }

  public clickMyAccountTab(): void {
    cy.get('body app-menu-items ion-content').should('be.visible');
    cy.get(this.myAccountTab).should("be.visible").click();
  }
}

export default Dashboard;
