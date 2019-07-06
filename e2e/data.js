const randomstring = require("randomstring");

export default {
  email: "test@helloworld.pl",
  fullName: "Test Name",
  password: "123aaaAA31!",
  registerEmail: `${randomstring.generate()}@test.hello`,
  optionsName: `${randomstring.generate()} ${randomstring.generate()}`,
  projectName: `${randomstring.generate()}`,
  projectDesc: `${randomstring.generate()}`,
  taskName: `${randomstring.generate()}`
};
