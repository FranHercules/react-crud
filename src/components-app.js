//Consumo de un arreglo de objetos complejos map() y reduce()
const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  const Name = ({titulo})=>{
    return (<h2>{titulo}</h2>)
  };

  const Part = ({parts})=> {
    return(
      <li>
        <p>{parts.name} {parts.exercises}</p>
      </li>
    )
  };
  
  function App() {
  
    return (
      <div className="App">
        <h1>Hola mundo react</h1>
        <ul>
          {
            //recorrer cada objeto
            courses.map(
              (course) => {
  
                //Variable con la suma del numero de ejercicios en cada objeto
                const suma = course.parts.reduce((acumulador, curr, i, arr) => {
                  acumulador.exercises = acumulador.exercises + curr.exercises;
                  //otra forma de hacerlo
                  //const acum = {...acumulador, exercises: acumulador.exercises + curr.exercises};
                  return(acumulador);
                },{
                  name: '',
                  exercises: 0,
                  id: 0,
                });
  
                //Return de cada mapppeo
                return (
                  <li key={course.id}>
                    <Name key={course.id} titulo={course.name}/>
  
                    <ul>
                      {
                        //Recorrer cada objeto dentro del arreglo interior "parts"
                        course.parts.map(
                          (parts) => {
  
                            //Return de cada mappeo
                            return (
                              <Part key={parts.id} parts={parts}/>
                            )
                          }
                        )
                      }
                    </ul>
                    <p>total of {suma.exercises} exercises</p>
                  </li>
                )
              }
            )
          }
        </ul>
      </div>
    );
  }
  
  export default App;  