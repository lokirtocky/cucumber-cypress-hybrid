import testData from "../../../fixtures/testData.json";

class upcomingVirtualVisitPage {
  private editVistButton = 'ion-button[class*="edit-visit text-uppercase"]';
  private cancelVisitButton =
    'ion-button[class*="cancel-visit text-uppercase"]';
  private editUpcomingVisitsPopup = "ion-menu ion-content";
  private editUpcomingVisitsTitle =
    "//ion-title[contains(text(),'Edit Upcoming Visits')]";
  private cancelUpcomingVisitTitle =
    "//ion-title[contains(text(),'Cancel Upcoming Visit')]";
  private upcomingVirtualVisitsData = "app-upcoming-virtual-cancel-web";
  private schedulingConflictButton =
    "app-upcoming-virtual-cancel-web ion-card-content ion-col";
  private cancelVisit_Btn = "//ion-button[contains(text(), 'Cancel Visit')]";
  private decideToSeekInPerson_Btn =
    "app-upcoming-virtual-cancel-web ion-card-content ion-col";
  private noLongerNeeded_Btn =
    "app-upcoming-virtual-cancel-web ion-card-content ion-col";

  public verifyUpcomingVirtualVisitPageUrl(): void {
    cy.verifyPageUrl(testData.upcomingVirtualVisitPageUrl);
  }

  public verifyEditVisitData(): void {
    cy.isVisible(this.editVistButton);
    cy.get(this.editVistButton).eq(0).click();
    cy.get(this.editUpcomingVisitsPopup).eq(1).should("be.visible");
    cy.isVisible(this.editUpcomingVisitsTitle, { method: "xpath" });
  }

  public verifyCancelVisitData(): void {
    cy.isVisible(this.cancelVisitButton);
    cy.get(this.cancelVisitButton).eq(0).click();
    cy.isVisible(this.upcomingVirtualVisitsData);
    cy.isVisible(this.cancelUpcomingVisitTitle, { method: "xpath" });
  }

  public clickSchedulingConflictReasonForCancelling(): void {
    cy.get(this.schedulingConflictButton).eq(1).click();
  }

  public clickCancelVisitBtn(): void {
    cy.xpath(this.cancelVisit_Btn).should("be.visible");
    cy.xpath(this.cancelVisit_Btn).click({ force: true });
  }

  public clickDecideToSeekInPersonBtn(): void {
    cy.get(this.decideToSeekInPerson_Btn).eq(2).should("be.visible");
    cy.get(this.decideToSeekInPerson_Btn).eq(2).click();
  }

  public clickNoLongerNeededBtn(): void {
    cy.get(this.noLongerNeeded_Btn).eq(3).should("be.visible");
    cy.get(this.noLongerNeeded_Btn).eq(3).click();
  }
}

export default upcomingVirtualVisitPage;
