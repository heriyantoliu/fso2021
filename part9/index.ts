/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import calculateBmi from './calculateBMI';
import { calculateExercise } from './exerciseCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  if (isNaN(Number(req.body.target))) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const exercise: Array<number> = [];
  console.log(req.body.daily_exercises);

  for (let i = 0; i < req.body.daily_exercises.length; i++) {
    if (!isNaN(Number(req.body.daily_exercises[i]))) {
      exercise.push(Number(req.body.daily_exercises[i]));
    } else {
      res.status(400).json({
        error: 'malformatted parameters',
      });
    }
  }

  const target: number = req.body.target;

  if (!exercise || !target) {
    res.status(400).json({
      error: 'missing parameters',
    });
  }

  if (isNaN(Number(req.body.target))) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  res.json(calculateExercise(exercise, target));
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
