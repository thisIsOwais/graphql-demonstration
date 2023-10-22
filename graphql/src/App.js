import logo from "./logo.svg";
import { gql, useQuery } from "@apollo/client";


function App() {
  
const query = gql`
query GetTodosWithUser {
  getTodos {
    id
    title
    completed
    user {
      id
      name
    }
  }
}
`;
  const { data, loading } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
