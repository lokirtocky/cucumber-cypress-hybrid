export {};
declare global {
  namespace Cypress {
    interface Chainable {
      clickButton(
        selector: string,
        options?: { method?: "get" | "xpath" }
      ): Chainable<void>;
      setValue(selector: string, value: string): Chainable<Subject>;
      isVisible(
        selector: string,
        options?: { method?: "get" | "xpath" }
      ): Chainable<Subject>;
      interceptRequest(
        Method: string,
        url: string,
        alias: string
      ): Chainable<Subject>;
      verifyLoginPageElements(): Chainable<Subject>;
      verifyPageUrl(object: string): Chainable<void>;
      tab(opts?: { shift: boolean }): Chainable<Element>;
      waitForTextToAppear(
        selector: string,
        expectedText: string,
        options?: { timeout?: number; interval?: number; errorMsg?: string }
      ): Chainable<Element>;
      sendRequestWithBody(
        url: string,
        body: any,
        headers: Object,
        method: string
      ): Chainable<Response>;
      sendRequestWithOutBody(
        url: string,
        headers: Object,
        method: string
      ): Chainable<Response>;
      sendRequestWithOutHeaderAndBody(
        url: string,
        method: string
      ): Chainable<Response>;
      sendRequestWithOutHeader(
        url: string,
        body: any,
        method: string
      ): Chainable<Response>;
      uploadFile(fileName: string, selector: string): Chainable<Subject>;
      verifyDependentAdded(fullName: string): Chainable<Element>;
      handleExistingSession(): Chainable<void>;
      navigateToMailinatorPage(email: string): void;
    }
  }
}
