import React from 'react'

interface ContentsProps {
  name: string,
  exerciseCount: number
}

const Contents = ({courseParts}:{courseParts: Array<ContentsProps>}) => {
 return <div>
   {courseParts.map(course=><p key={course.name}>{course.name} {course.exerciseCount}</p>)}
 </div>
}

export default Contents