import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import bearerToken from 'express-bearer-token';
import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error
}

const app = express()
  .use(express.json())
  .use(cors())
  .use(bearerToken());

app.get('/', (req, res) => {
    res.send('no');
})

connect(process.env.MONGO_URI ?? 'err', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to database');
  app.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${process.env.PORT}`);
  });
});