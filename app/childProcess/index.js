'use strict';

const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const passport = require('passport');
const bodyParser = require('body-parser');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello World' };

// Initialize express Server
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(passport.initialize());
app.enable('trust proxy');

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const connectedIP = (ip === '::1' ? '127.0.0.1' : ip);

  req.start = util.milli();
  req.userIp = connectedIP;
  next();
});

app.get('/', (req, res, next) => {
  const arr = ['ww'];
  arr.forEach((name) => {
    console.log('1');
  });

  res.send('asd');
})

app.listen(4000, () => {
  console.log('Now process to localhost:4000/graphql');
});

exports.app = app;