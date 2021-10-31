const path = require("path");
const fs = require("fs");
const Intern = require("./Intern");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
    const html = [];

    html.push(...employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(manager => renderManager(engineer))
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Intern")
        .map(manager => renderManager(Intern))
    );

    return renderMain(html.join(""));
};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getofficeNumber());
    return template;
};

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesDir, "enginer.html"), "utf8");
    template = replacePlaceholders(template, "name", enginer.getName());
    template = replacePlaceholders(template, "role", enginer.getRole());
    template = replacePlaceholders(template, "email", enginer.getEmail());
    template = replacePlaceholders(template, "id", enginer.getId());
    template = replacePlaceholders(template, "github", enginer.getGithub());
    return template;
};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "github", intern.getGithub());
    return template;
};

const renderMain = html => {
    const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{" + placeholder + "}}", "gm");
    return template.replace(pattern, value);
};

module.exports = render;
