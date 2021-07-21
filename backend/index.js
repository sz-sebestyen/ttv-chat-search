require("dotenv").config();
const app = require("./app");
require("./database/connect");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
