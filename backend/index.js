require("dotenv").config();
const app = require("./app");
require("./database/connect");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

const Test = require("./models/Test");

new Test({ comment: "can't touch this" }).save();
