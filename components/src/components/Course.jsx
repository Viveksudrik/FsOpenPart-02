// Header component - displays course name
const Header = ({ course }) => {
  return <h2>{course}</h2>
}

// Part component - displays a single part with its exercises
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

// Content component - renders all parts dynamically (Exercise 2.1)
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

// Total component - calculates sum using reduce (Exercise 2.2 & 2.3)
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

// Course component - combines Header, Content, and Total
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
