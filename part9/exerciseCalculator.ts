interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface exercisesValues {
//   hours: Array<number>;
// }

export const calculateExercise = (
  hours: Array<number>,
  target: number
): result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;

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

// const parseArgumentsExercise = (args: Array<string>): exercisesValues => {
//   if (args.length < 3) throw new Error('Not enought arguments');

//   const hours: Array<number> = [];

//   for (let i = 2; i < args.length; i++) {
//     if (!isNaN(Number(args[i]))) {
//       hours.push(Number(args[i]));
//     } else {
//       throw new Error('Provide values were not number');
//     }
//   }

//   return { hours };
// };

// try {
//   const { hours } = parseArgumentsExercise(process.argv);
//   console.log(calculateExercise(hours));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', (e as Error).message);
// }
