/// <reference types="cypress" />

describe("Sign In to an account", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  it("Render sign in header", () => {
    cy.get("h1").should("contain.text", "Sign In");
  });
  it("Render sign in form with email and password input and label", () => {
    cy.get("form label").should("contain.text", "Email");
    cy.get("form label").should("contain.text", "Password");
    cy.get("form input[type=email]").should("include.value", "");
    cy.get("form input[type=password]").should("include.value", "");
    cy.get("form button").should("contain.text", "Sign In");
  });

  it("Can see isPublic items in secret page", () => {
    cy.get("a").contains("Secret").click();
    cy.get(".card").should("be.visible");
  });

  it("Can sign in with email and password and show their favourite food", () => {
    const email = "parok30333@cadolls.com";
    const password = "password";

    cy.get("form input[type=email]").type(email);
    cy.get("form input[type=password]").type(password);

    cy.get("form button").contains("Sign In").click();
    cy.get(".Toastify__toast-body:last-child").contains(`Sign in as ${email}`);
    cy.get(`.navbar a[href="/food"]`).click();
    cy.location("pathname").should("include", "/food");
  });

  it("Can create post", () => {
    const email = "parok30333@cadolls.com";
    const password = "password";

    cy.get("form input[type=email]").type(email);
    cy.get("form input[type=password]").type(password);

    cy.get("form button").contains("Sign In").click();
    cy.get(".Toastify__toast-body:last-child").contains(`Sign in as ${email}`);
    cy.get(`.navbar a[href="/food"]`).click();
    cy.location("pathname").should("include", "/food");

    cy.get(".mantine-Button-label").contains("Add Food").click();
    cy.get("form input[name='title']").type("Cypress Title");
    cy.get("form textarea[name='description']").type("Cypress description");
    cy.get("form input[name='image']").type(
      "https://res.cloudinary.com/daswosnui/image/upload/v1665732396/bagnet_vqia4s.jpg"
    );
    cy.get("form input[name='rating']").type("{backspace}").type("3");
    cy.get("form input[name='isPublic']").click();
    cy.get("form .btn").click();
    cy.get(".card").contains("h2", "Cypress Title").should("be.visible");
  });
});
