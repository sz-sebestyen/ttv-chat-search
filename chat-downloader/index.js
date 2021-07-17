const app = require("./app");
require("dotenv").config();
require("./database/connect");

const Test = require("./models/Test");

const findTest = async () => {
  const test = await Test.find({ comment: "can't touch this" });

  console.log("found: ", test);
};

findTest();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
