import "./commands";
import "cypress-wait-until";
import "cypress-plugin-tab";
import "cypress-iframe";
import "cypress-file-upload";
import "@shelex/cypress-allure-plugin";
import "cypress-mochawesome-reporter/register";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
