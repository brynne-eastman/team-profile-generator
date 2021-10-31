const Intern = require("../lib/Intern");

test("Ability to set school using constructor function", () => {
    const school = "UCF";
    const employee = new Intern("Brynne", 1, "brynne.eastman@gmail.com", school);
    expect(employee.school).toBe(school);
});

test("getRole() should return Intern as a role", () => {
    const role = "Intern";
    const employee = new Intern("Brynne", 1, "brynne.eastman@gmail.com", "brynne-eastman");
    expect(employee.getRole()).toBe(role);
});