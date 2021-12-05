const app = require("./app");

//TEST
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`listening on port ${port}`));