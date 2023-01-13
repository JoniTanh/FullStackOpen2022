describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Joni Kala",
      username: "JoniKala",
      password: "JoniKala",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#username");
    cy.get("#password");
    cy.get("#login-button");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("JoniKala");
      cy.get("#password").type("JoniKala");
      cy.get("#login-button").click();
      cy.contains("logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");
    });
  });
});

describe("When logged in", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("JoniKala");
    cy.get("#password").type("JoniKala");
    cy.get("#login-button").click();
  });

  it("A blog can be created", function () {
    cy.contains("create blog").click();
    cy.get("#title").type("Cypress Title Test");
    cy.get("#author").type("Cypress Author");
    cy.get("#url").type("www.google.fi");
    cy.get("#create-button").click();

    cy.contains("Cypress Title Test");
    cy.contains("Cypress Author");
  });

  it("A blog can be liked", function () {
    cy.contains("Cypress Title Test Cypress Author").contains("view").click();
    cy.contains("Cypress Title Test Cypress Author")
      .parent()
      .find("button")
      .contains("like")
      .click();
  });

  it("A blog can be removed by owner", function () {
    cy.contains("Cypress Title Test").contains("view").click();
    cy.contains("Cypress Title Test")
      .parent()
      .find("button")
      .contains("remove")
      .click();
  });
});

describe("blogs are sorted by likes", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("JoniKala");
    cy.get("#password").type("JoniKala");
    cy.get("#login-button").click();
  });

  it("sorting blogs by likes", function () {
    // creating blogs
    cy.contains("create blog").click();
    cy.get("#title").type("Junk #1");
    cy.get("#author").type("Cypress Author");
    cy.get("#url").type("www.google.fi");
    cy.get("#create-button").click();

    cy.contains("create blog").click();
    cy.get("#title").type("Junk #2");
    cy.get("#author").type("Cypress Author");
    cy.get("#url").type("www.google.fi");
    cy.get("#create-button").click();

    cy.contains("create blog").click();
    cy.get("#title").type("Junk #3");
    cy.get("#author").type("Cypress Author");
    cy.get("#url").type("www.google.fi");
    cy.get("#create-button").click();

    // liking blogs
    cy.contains("Junk #3").contains("view").click();
    cy.contains("Junk #3")
      .parent()
      .find("button")
      .contains("like")
      .click()
      .wait(500)
      .click()
      .wait(500)
      .click();

    cy.contains("Junk #1").contains("view").click();
    cy.contains("Junk #1")
      .parent()
      .find("button")
      .contains("like")
      .click()
      .wait(500)
      .click();

    cy.contains("Junk #2").contains("view").click();
    cy.contains("Junk #2").parent().find("button").contains("like").click();

    // checking right order
    cy.get(".blog").eq(0).should("contain", "Junk #3");
    cy.get(".blog").eq(1).should("contain", "Junk #1");
    cy.get(".blog").eq(2).should("contain", "Junk #2");
  });
});
