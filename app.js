const express = require("express");
const app = express();
const passport = require("passport");
// const manufacturersRouter = require("./routes/manufacturer");
// const phonesRouter = require("./routes/phone");
// const userRouter = require("./routes/user");
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const schema = require('./schema/schema');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
// app.use("/manufacturer", manufacturersRouter);
// app.use("/phone", phonesRouter);
// app.use("/user", userRouter);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

module.exports = app;