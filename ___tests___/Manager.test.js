const Manager = require("../lib/Manager");

test("Ability to set officeNumber using constructor function", () => {
    const officeNumber = "2001"
    const employee = new Manager("Brynne", 1, "brynne.eastman@gmail.com", officeNumber);
    expect(employee.officeNumber).toBe(officeNumber);
});

test("getRole() should return Manager as a role", () => {
    const role = "Manager";
    const employee = new Manager("Brynne", 1, "brynne.eastman@gmail.com");
    expect(employee.getRole()).toBe(role);
});
