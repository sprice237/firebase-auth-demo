import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.json({message: 'hello'});
});

app.listen(process.env['PORT'] ?? 8080, () => {
  console.log('server started');
});

