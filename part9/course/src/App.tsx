import React from 'react';
import Header from './component/Header'
import Contents from './component/Contents';
import Total from './component/Total'

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Contents courseParts={courseParts} />
      <Total courseParts={courseParts} />
      
    </div>
  );
};

export default App