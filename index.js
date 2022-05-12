const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

const logins = [
  {
    id: uuidv4(),
    email: "vikas.jyani@clouwood.com",
    password: "123456",
  },
  {
    id: uuidv4(),
    email: "vishal@clouwood.com",
    password: "123456",
  },
  {
    id: uuidv4(),
    email: "mayank@clouwood.com",
    password: "123456",
  },
];

//CRUD Operations

// app.get();
// app.post();
// app.put();
// app.delete();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/logins", (req, res) => {
  res.send(logins);
});

app.get("/api/logins/:id", (req, res) => {
  const login = logins.find((login) => login.id === parseInt(req.params.id));
  if (!login) {
    res.status(404).send("User not found with id " + req.params.id);
  }
  res.send(login);
});

app.post(
  "/api/logins",
  body("email").isEmail().normalizeEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    res.status(200).json({
      success: true,
      message: "Login Successful",
    });
    const login = {
      id: uuidv4(),
      email: req.body.email,
    };
    logins.push(login);
    res.send(login);
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
