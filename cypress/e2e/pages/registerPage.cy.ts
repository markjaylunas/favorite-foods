/// <reference types="cypress" />

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Render create an account header", () => {
    cy.get("h1").should("contain.text", "Create an account");
  });
  it("Render register form with email and password input and label", () => {
    cy.get("form label").should("contain.text", "Email");
    cy.get("form label").should("contain.text", "Password");
    cy.get("form input[type=email]").should("include.value", "");
    cy.get("form input[type=password]").should("include.value", "");
    cy.get("form button").should("contain.text", "Register");
  });

  it("Can create an account with email and password", () => {
    const email = "parok30333@cadolls.com";
    const password = "password";

    cy.get("form input[type=email]").type(email);
    cy.get("form input[type=password]").type(password);

    cy.get("form button").contains("Register").click();
    cy.get(".Toastify__toast-body:last-child").contains(`Email sent!`);
  });
});
