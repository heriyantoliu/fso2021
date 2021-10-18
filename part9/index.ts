import express from 'express';
import calculateBmi from './calculateBMI';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(400).json({
      error: 'malformmated parameters',
    });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.json({ height, weight, bmi: calculateBmi(height, weight) });
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
