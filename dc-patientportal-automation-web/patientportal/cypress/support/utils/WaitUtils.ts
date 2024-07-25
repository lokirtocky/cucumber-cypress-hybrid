import "cypress-wait-until";

class WaitUtils {
  static MAX_WAIT_TIME: number =
    Cypress.env("maxWaitForElementInSeconds") || 45;

  private static isXPath(selector: string): boolean {
    return selector.startsWith("/") || selector.startsWith("(");
  }

  private static getElement(selector: string, options = {}): Cypress.Chainable {
    if (this.isXPath(selector)) {
      return cy.xpath(selector, options);
    } else {
      return cy.get(selector, options);
    }
  }

  // Wait for an element to appear and be visible
  static waitForElementToAppear(
    selector: string,
    waitForLoadingSpinnerToDisappear: boolean = true
  ): Cypress.Chainable {
    if (waitForLoadingSpinnerToDisappear) {
      this.waitForLoadingSpinnerToDisappear();
    }
    return this.getElement(selector, {
      timeout: this.MAX_WAIT_TIME * 1000,
    }).should("be.visible");
  }

  // Wait for an element to be clickable
  static waitForElementToBeClickable(
    selector: string,
    waitForLoadingSpinnerToDisappear: boolean = true
  ): Cypress.Chainable {
    if (waitForLoadingSpinnerToDisappear) {
      this.waitForLoadingSpinnerToDisappear();
    }
    return this.getElement(selector, { timeout: this.MAX_WAIT_TIME * 1000 })
      .should("be.visible")
      .and("be.enabled");
  }

  // Wait for an element to disappear
  static waitForElementToDisappear(selector: string): Cypress.Chainable {
    return this.getElement(selector, { timeout: 120 * 1000 }).should(
      "not.exist"
    );
  }

  static waitForLoadingSpinnerToDisappear(): Cypress.Chainable {
    return this.getElement(
      "/html/body/app-root/app-custom-spinner/div/ion-spinner",
      { timeout: this.MAX_WAIT_TIME * 1000 }
    ).should("not.exist");
  }

  // Wait for text to appear within an element
  static waitForTextToAppear(
    selector: string,
    expectedText: string,
    options: { timeout?: number; interval?: number; errorMsg?: string } = {}
  ): Cypress.Chainable {
    const {
      timeout = this.MAX_WAIT_TIME * 1000,
      errorMsg = "Expected text did not appear within timeout",
      interval = 500,
    } = options;

    const uncaughtExceptionHandler = (err: any, runnable: any) => {
      console.error("Uncaught exception detected:", err);
      return false;
    };

    cy.on("uncaught:exception", uncaughtExceptionHandler);

    return cy
      .waitUntil(
        () =>
          this.getElement(selector).then(($el) =>
            $el.text().trim().includes(expectedText)
          ),
        {
          errorMsg,
          timeout,
          interval,
        }
      )
      .then(() => {
        cy.off("uncaught:exception", uncaughtExceptionHandler);
      });
  }

  // Wait for text to disappear from an element
  static waitForTextToDisappear(
    selector: string,
    textToDisappear: string,
    options: { timeout?: number; interval?: number; errorMsg?: string } = {}
  ): Cypress.Chainable {
    const {
      timeout = this.MAX_WAIT_TIME * 1000,
      errorMsg = "Expected text did not disappear within timeout",
    } = options;
    return cy.waitUntil(
      () =>
        this.getElement(selector).then(
          ($el) => !$el.text().trim().includes(textToDisappear)
        ),
      {
        errorMsg,
        timeout,
      }
    );
  }
}

export default WaitUtils;
