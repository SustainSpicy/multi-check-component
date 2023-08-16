import "./App.css";
import Todo from "./components/todo";

function App() {
  const todos = [
    { id: 1, title: "wash dishes", completed: false },
    { id: 2, title: "make dinner", completed: true },
  ];
  return (
    <div className="App">
      {todos.map((todo) => (
        <Todo todo={todo} />
      ))}
    </div>
  );
}

export default App;

// import React from "react";
// import { FC } from "react";
// import { MultiCheck } from "./components/multiCheck";
// import { Controller } from "./Controller";

// const App: FC = (): JSX.Element => {
//   return (
//     <Controller
//       render={(options, values, columns, onChange) => (
//         <MultiCheck
//           label="MultiCheck"
//           options={options}
//           values={values}
//           columns={columns}
//           onChange={onChange}
//         />
//       )}
//     ></Controller>
//   );
// };

// export default App;
