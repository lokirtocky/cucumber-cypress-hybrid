import "cypress-xpath";
import "cypress-plugin-tab";
import "cypress-wait-until";
import "@shelex/cypress-allure-plugin";

const app = window.top;
if (app) {
  const head = app.document.head;
  if (!head.querySelector("[data-hide-command-log-request]")) {
    const style = app.document.createElement("style");
    style.innerHTML =
      ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");
    head.appendChild(style);
  }
}

Cypress.Commands.add(
  "clickButton",
  (selector: string, options: { method?: "get" | "xpath" } = {}) => {
    const { method = "get" } = options;

    if (method === "get") {
      cy.get(selector).should("be.visible").click();
    } else if (method === "xpath") {
      cy.xpath(selector).should("be.visible").click();
    } else {
      throw new Error("Invalid method. Use 'get' or 'xpath'.");
    }
  }
);

Cypress.Commands.add("setValue", (selector: string, value: string) => {
  cy.get(selector).type(value);
});

Cypress.Commands.add(
  "isVisible",
  (selector: string, options: { method?: "get" | "xpath" } = {}) => {
    const { method = "get" } = options;

    if (method === "get") {
      cy.get(selector).should("be.visible");
    } else if (method === "xpath") {
      cy.xpath(selector).should("be.visible");
    } else {
      throw new Error("Invalid method. Use 'get' or 'xpath'.");
    }
  }
);

Cypress.Commands.add(
  "interceptRequest",
  (method: string, url: string, alias: string) => {
    cy.intercept(method, url).as(alias);
  }
);

Cypress.Commands.add("verifyPageUrl", (object: string) => {
  cy.url().should("include", object);
});

Cypress.Commands.add("sendRequestWithBody", (url, body, headers, method) => {
  cy.log(`Sending request to ${url} with body and headers`);
  return cy.wrap(null).then(() => {
    return cy.request({
      method: method,
      url: url,
      body: body,
      headers: headers,
      failOnStatusCode: false,
    });
  });
});

Cypress.Commands.add("sendRequestWithOutBody", (url, headers, method) => {
  cy.log(`Sending request to ${url} with headers only`);
  return cy.wrap(null).then(() => {
    return cy.request({
      method: method,
      url: url,
      headers: headers,
      failOnStatusCode: false,
    });
  });
});

Cypress.Commands.add("sendRequestWithOutHeaderAndBody", (url, method) => {
  cy.log(`Sending request to ${url} without headers and body`);
  return cy.wrap(null).then(() => {
    return cy.request({
      method: method,
      url: url,
      failOnStatusCode: false,
    });
  });
});

Cypress.Commands.add("verifyDependentAdded", (fullName) => {
  cy.get(
    "app-account-information ion-card-content ion-list:nth-child(1) ion-label"
  )
    .contains(fullName)
    .should("exist");
});

Cypress.Commands.add("sendRequestWithOutHeader", (url, body, method) => {
  cy.log(`Sending request to ${url} with body only`);
  return cy.wrap(null).then(() => {
    return cy.request({
      method: method,
      url: url,
      body: body,
      failOnStatusCode: false,
    });
  });
});

Cypress.Commands.add(
  "waitForTextToAppear",
  (
    selector: string,
    expectedText: string,
    options: { timeout?: number; interval?: number; errorMsg?: string } = {}
  ) => {
    const MAX_WAIT_TIME: number =
      Cypress.env("maxWaitForElementInSeconds") || 45; // Default to 45 seconds if not specified
    const {
      timeout = MAX_WAIT_TIME,
      interval = 500,
      errorMsg = "Expected text did not appear within timeout",
    } = options;
    // Using cy.waitUntil to wait for the condition
    cy.waitUntil(
      () => cy.get(selector).then(($el) => $el.text().trim() === expectedText),
      { errorMsg, timeout, interval }
    );
  }
);
