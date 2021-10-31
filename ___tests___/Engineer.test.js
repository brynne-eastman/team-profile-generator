const Engineer = require("../lib/Engineer");

test("Ability to set GitHub username using constructor function", () => {
    const github = "brynne-eastman";
    const employee = new Engineer("Brynne", 1, "brynne.eastman@gmail.com", github);
    expect(employee.github).toBe(github);
});

test("getRole() should return Engineer as a role", () => {
    const role = "Engineer";
    const employee = new Engineer("Brynne", 1, "brynne.eastman@gmail.com", "brynne-eastman");
    expect(employee.getRole()).toBe(role);
});