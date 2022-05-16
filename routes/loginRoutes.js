const express = require("express");
const { Collection } = require("mongoose");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { default: mongoose } = require("mongoose");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

router.post("/", (req, res) => {
  //res.status(200).json({ message: "Set goals" });
  let email = req.body.email;
  let id = req.body.id;
  //Mongo Select with email and id

  // write down a mongobdb find query
  const document = database
    .collection("users")
    .findOne({ email: email, id: id });

  if (document) {
    const seed = uuidv4();
    //Update mongo document, set seed = seed where id = id
    res.status(200).json({ success: true, seed: seed });
  } else res.status(200).json({ success: false });
});

module.exports = router;
