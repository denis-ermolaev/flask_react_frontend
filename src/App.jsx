import "./App.css";
import UsersDisplay from "./components/UsersDisplay/UsersDisplay";
import PopUp from "./components/PopUp/PopUp";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Container>
        <h1 className="my-4">Users</h1>
        <div className="my-4">
          <UsersDisplay />
          <PopUp />
        </div>
      </Container>
    </>
  );
}

export default App;
