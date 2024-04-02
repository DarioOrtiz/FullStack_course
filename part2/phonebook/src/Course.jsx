import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts ? parts.map(part => <Part key={part.id} part={part} />) : null}
    </div>
  );
};


const Part = ({ part }) => {
  return (
    <p>
      {part.name} : {part.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  // Calcular la suma de los ejercicios del curso
  const totalExercises = course.parts ? course.parts.reduce((total, part) => total + part.exercises, 0) : 0;


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <p>Total de ejercicios: {totalExercises}</p> {/* Mostrar la suma de los ejercicios */}
    </div>
  );
};

export default Course;
