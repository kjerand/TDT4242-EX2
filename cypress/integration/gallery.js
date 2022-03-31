import "cypress-file-upload";

const makeStringWithGivenLength = (length) => {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

describe("Check gallery.js ", () => {
  const username = "testusername";
  const password = "testpassword";
  const fixtureFile = "./pic.png";

  const exercise = makeStringWithGivenLength(5)
  const description = 'desc'
  const unit = 'Reps'
  const info = 'Weigth'
  const durationValue = 1
  const calories = 1

  const workoutName = makeStringWithGivenLength(5);
  const workoutDate = "2022-03-15T10:00";
  const workoutNotes = "note";
  const sets = 1
  const number = 1
  const infoNumber = 1

  it("Upload and check picture", () => {
    cy.visit("http://localhost:8001/index.html");

    cy.contains("Log in").click();

    cy.get("[name=username]").type(username);

    cy.get("[name=password]").type(password);

    cy.get("[id=btn-login]").click().wait(1000);

    cy.visit("http://localhost:8001/exercise.html");

    cy.get("[name=name]").type(exercise);
    cy.get('[name=description]').type(description)
    cy.get("[name=unit]").type(unit);
    cy.get("[name=info]").type(info);
    cy.get("[name=duration]").type(durationValue);
    cy.get("[name=calories]").type(calories);

    cy.get("[id=btn-ok-exercise]").click().wait(1000);

    cy.visit("http://localhost:8001/workout.html").wait(1000);

    cy.get("[name=name]").type(workoutName, { force: true });

    cy.get("[name=date]").type(workoutDate, { force: true });

    cy.get("[name=notes]").type(workoutNotes);

    cy.get("[id=customFile]").attachFile(fixtureFile);

    cy.get("[name=sets]").type(sets)
    cy.get("[name=number]").type(number)
    cy.get("[name=info]").type(infoNumber)

    cy.get("[id=btn-ok-workout]").click().wait(1000);

    cy.contains(workoutName).click().wait(1000);

    cy.get("[id=btn-gallery-workout]").click({force: true}).wait(1000);

    cy.get('img')

  });
});
