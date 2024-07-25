import testData from "../../../fixtures/testData.json";

class ZoomPageObj {
  zoomTab = "app-menu-items ion-menu ion-item:nth-child(10) ion-label";
  endVisitTab = "app-zoom-footer-web ion-row ion-col:nth-child(11) img";

  clickZoomTab(): void {
    cy.get(this.zoomTab).should("be.visible").trigger("click", { force: true });
  }

  verifyZoomPageUrl(): void {
    cy.url().should("include", testData.zoomPageURL);
  }

  clickEndVisitButton(): void {
    cy.get(this.endVisitTab).should("be.visible").click();
  }

  clickFinalizerVisitaBtn(): void {
    cy.get(this.endVisitTab).should("be.visible").click();
  }
}

export default ZoomPageObj;
