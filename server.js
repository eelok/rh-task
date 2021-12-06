const app = require("./app");

const port = process.env.PORT || 5555;
// app.listen(port, () => console.log(`listening on port ${port}`));
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
