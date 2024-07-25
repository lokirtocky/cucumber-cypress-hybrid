import WaitUtils from "cypress/support/utils/WaitUtils";
import testData from "../../../fixtures/testData.json";

class EnterWaitingRoomPageObj {
  enterWaitingRoomTab =
    "app-menu-items ion-menu ion-item:nth-child(8) ion-label";
  chatIconOnEnterWaitingRoomTab = "app-dashboard ion-img";
  ingresarSalaDeEsperaTab =
    "app-menu-items ion-menu ion-item:nth-child(8) ion-label";

  clickEnterWaitingRoomTab(): void {
    cy.get(this.enterWaitingRoomTab).click();
  }

  clickIngresarSalaDeEsperaTab(): void {
    cy.get(this.ingresarSalaDeEsperaTab).click();
  }

  verifyEnterWaitingRoomPageURL(): void {
    cy.verifyPageUrl(testData.enterWaitingRoomPageUrl);
  }

  verifyChatIconIsDispalyed(): void {
    WaitUtils.waitForLoadingSpinnerToDisappear();
    cy.isVisible(this.chatIconOnEnterWaitingRoomTab, { method: "get" });
  }

  verifyButtonsDisplayedOnEnterWaitingRoom(buttonText: string): void {
    cy.xpath(`//ion-button[contains(text(),'${buttonText}')]`).should(
      "be.visible"
    );
  }
}

export default EnterWaitingRoomPageObj;
