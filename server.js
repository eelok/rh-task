const app = require("./app");

const port = process.env.PORT || 5555;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
