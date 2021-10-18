import React from 'react'

interface TotalProps {
  name: string,
  exerciseCount: number
}

const Total = ({courseParts}:{courseParts: Array<TotalProps>}) => {
  return <p>
  Number of exercises{" "}
  {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
</p>
 }
 
 export default Total
