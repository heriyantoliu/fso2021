import React from 'react';
import { CoursePart } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <i>{part.description}</i>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <i>{part.description}</i>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
  }
};

export default Part;
