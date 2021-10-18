interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercise = (hours: Array<number>): result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const target = 3;
  const average = hours.reduce((total, hour) => total + hour) / hours.length;

  const rating = average > target ? 3 : average === target ? 2 : 1;
  const success = average >= target;
  const ratingDescription =
    rating === 3 ? 'Good job' : rating === 2 ? 'not too bad' : 'practice more';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1]));
