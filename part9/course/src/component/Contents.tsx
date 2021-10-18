import React from 'react';
import Part from './Part';
import { CoursePart } from '../App';

interface ContentsProps {
  courseParts: CoursePart[];
}

const Contents = ({ courseParts }: ContentsProps) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  );
};

export default Contents;
