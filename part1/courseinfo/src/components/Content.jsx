
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index}>
          <p>{part.name}  {part.exercises}</p>
        </div>
      ))}
    </div>
  );
};
  

export default Content;
