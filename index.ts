import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bearerToken from 'express-bearer-token';

const port = process.env.PORT || 8080;


const app = express()
  .use(express.json())
  .use(cors())
  .use(bearerToken());

app.get('/', (req, res) => {
    res.send('no');
})

mongoose.connect(`mongodb://localhost:27017/hangman`)
.then(() => {
  console.log('Connected to database');
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
});