describe("Check profile", () => {
  const username = "testusername";
  const password = 'testpassword'
  const searchString = 'test'


  before(() => {
    cy.visit("http://localhost:8001/index.html");

    cy.contains("Log in").click();

    cy.get("[name=username]").type(username);

    cy.get("[name=password]").type(password);

    cy.get("[id=btn-login]").click().wait(1000);
  });

  it("Tests weight input", () => {
    cy.visit("http://localhost:8001/index.html");

    cy.contains("Log in").click();

    cy.get("[name=username]").type(username);

    cy.get("[name=password]").type(password);

    cy.get("[id=btn-login]").click().wait(1000);

    cy.visit("http://localhost:8001/friends.html").wait(1000);

    cy.get('[id=search]').type(searchString)

    cy.contains(username).click().wait(1000);

    cy.contains(username);
  });
});
