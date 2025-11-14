import "./App.css";
import UsersDisplay from "./components/UsersDisplay/UsersDisplay";
import PopUp from "./components/PopUp/PopUp";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              alt="React Logo"
              src="/react.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Тестовое задание для "Digital агентство Победа"
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h1 className="my-4">User Management</h1>
        <div className="my-4">
          <UsersDisplay />
          <PopUp />
        </div>
      </Container>
    </>
  );
}

export default App;
