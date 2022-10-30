/// <reference types="cypress" />

describe("Sign In to an account", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  it("Can see isPublic items in secret page", () => {
    cy.get("a").contains("Secret").click();
    cy.get(".card").should("be.visible");
  });

  it("Can sign in with email and password and sign out", () => {
    const email = "makje0110@gmail.com";
    const password = "password";

    cy.get("form input[type=email]").type(email);
    cy.get("form input[type=password]").type(password);

    cy.get("form button").contains("Sign In").click();
    cy.get(`.navbar a[href="/food"]`).click();
    cy.location("pathname").should("include", "/food");
    cy.get(".avatar_button").click();
    cy.get(".sign-out_button").click();
    cy.location("pathname").should("include", "/sign-in");
  });

  it("Can create post", () => {
    const email = "makje0110@gmail.com";
    const password = "password";

    cy.get("form input[type=email]").type(email);
    cy.get("form input[type=password]").type(password);

    cy.get("form button").contains("Sign In").click();
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
  });
});
