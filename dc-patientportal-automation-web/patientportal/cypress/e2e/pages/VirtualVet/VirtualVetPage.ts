import testData from "../../../fixtures/testData.json";

class VirtualVisitPageObj {
  virtualVisitTab = "app-menu-items ion-menu ion-item:nth-child(6) ion-label";
  filtrarButton =
    "//app-page-inner-header-desktop//ion-button[contains(text(),'Filtrar')]/.";

  clickVirtualVisitTab(): void {
    cy.get(this.virtualVisitTab)
      .should("be.visible")
      .and("have.text", " Virtual Visit History ")
      .click();
  }

  clickVeteraninarioVirtualTab(): void {
    cy.get(this.virtualVisitTab).click();
  }

  verifyVirtualVisitPageUrl(): void {
    cy.verifyPageUrl(testData.virtualVisitPageURL);
  }

  verifyDataDisplayedProperly(title: string) {
    cy.contains(title).last().should("be.visible");
  }

  clickOnButton(button: string): void {
    cy.xpath(
      `//app-page-inner-header-desktop//ion-button[contains(text(),'${button}')]/.`
    ).click();
  }

  clickConsentSummaryLink(index: number){
    cy.contains('Consult Summary').eq(index).click();
  }
}

export default VirtualVisitPageObj;
