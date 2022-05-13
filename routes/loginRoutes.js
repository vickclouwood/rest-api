const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post("/", (req, res) => {
  //res.status(200).json({ message: "Set goals" });
  let email = req.body.email;
  let id = req.body.id;
  //Mongo Select with email and id

  if (document) {
    const seed = uuidv4();
    //Update mongo document, set seed = seed where id = id
    res.status(200).json({ success: true, seed: seed });
  } else res.status(200).json({ success: false });
});

module.exports = router;
