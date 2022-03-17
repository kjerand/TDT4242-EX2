import "cypress-file-upload";

const makeStringWithGivenLength = (length) => {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

describe("Check profile", () => {
  const username = "testusername";
  const password = "testpassword";
  const fixtureFile = "./testWorkoutFile";
  const fixtureFileName = 'testWorkoutFile'

  const workoutName = makeStringWithGivenLength(5);
  const workoutDate = "2022-03-15T10:00";
  const workoutNotes = "note";
  const comment = "Bad workout";

  const username2 = "testusername2";
  const password2 = "testpassword2";

  it("Create workout with file and comment", () => {
    cy.visit("http://localhost:8001/index.html");

    cy.contains("Log in").click();

    cy.get("[name=username]").type(username);

    cy.get("[name=password]").type(password);

    cy.get("[id=btn-login]").click().wait(1000);

    cy.visit("http://localhost:8001/workout.html").wait(1000);

    cy.get("[name=name]").type(workoutName, { force: true });

    cy.get("[name=date]").type(workoutDate, { force: true });

    cy.get("[name=notes]").type(workoutNotes);

    cy.get("[id=customFile]").attachFile(fixtureFile);

    cy.get("[id=btn-ok-workout]").click().wait(1000);

    cy.contains(workoutName).click().wait(1000);

    cy.get("[id=comment-area]").type(comment);

    cy.contains("Post").click().wait(1000);

    //cy.get("[id=btn-logout]").click({ force: true }).wait(1000)
  });

  it("Check workout comment and file", () => {
    cy.visit("http://localhost:8001/login.html");

    cy.get("[name=username]").type(username2);

    cy.get("[name=password]").type(password2);

    cy.get("[id=btn-login]").click().wait(1000);

    cy.contains(workoutName).click().wait(1000);

    cy.get("[name=name]").should("have.value", workoutName);

    cy.get("[name=date]").should("have.value", workoutDate);

    cy.get("[name=notes]").should("have.value", workoutNotes);

    cy.contains(fixtureFileName);

    cy.contains(comment);
  });
});
