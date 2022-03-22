describe("Check profile", () => {
  const username = "testusername";
  const password = 'testpassword'
  const searchString = 'test'

  const friend = "testusername2";


  beforeEach(() => {
    cy.visit("http://localhost:8001/index.html");

    cy.contains("Log in").click();

    cy.get("[name=username]").type(username);

    cy.get("[name=password]").type(password);

    cy.get("[id=btn-login]").click().wait(1000);
  });

  it("Search for user and check profile", () => {
    cy.visit("http://localhost:8001/friends.html").wait(1000);

    cy.get('[id=search]').type(searchString)

    cy.contains(username).click().wait(1000);

    cy.contains(username);
  });

  it("Test add friend", () => {
    cy.visit("http://localhost:8001/friends.html").wait(1000);

    cy.get('[id=search]').type(searchString)

    cy.contains(friend).click().wait(1000);

    cy.get("[id=btn-add-friend]").click().wait(1000)

    cy.visit("http://localhost:8001/friends.html").wait(1000);

    cy.get("[id=div-content-friends]").contains(friend)

  });
});
