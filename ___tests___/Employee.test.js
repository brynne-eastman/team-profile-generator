const Employee = require("../lib/Employee");

test("Ability to set name using constructor function", () => {
    const name = "Brynne";
    const employee = new Employee(name);
    expect(employee.name).toBe(name);
  });

test("Ability to set the employee ID using constructor function", () => {
    const id = "1";
    const employee = new Employee("Brynne", id, "brynne.eastman@gmail.com");
    expect(employee.id).toBe(id);
  });

test("Running getEmail() should return the supplied email", () => {
    const email = "brynne.eastman@gmail.com";
    const employee = new Employee("Brynne", 1, email);
    expect(employee.getEmail()).toBe(email);
  });

test("Running getRole() should return 'Employee'", () => {
    const role = "Employee";
    const employee = new Employee("Brynne", 1, "brynne.eastman@gmail.com");
    expect(employee.getRole()).toBe("Employee");
  });