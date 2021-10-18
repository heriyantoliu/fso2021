import React from 'react';
import Header from './component/Header';
import Contents from './component/Contents';
import Total from './component/Total';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseTwo extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseTwo {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseTwo {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseTwo {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const App = () => {
  const courseName = 'Half Stack application development';

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Contents courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
