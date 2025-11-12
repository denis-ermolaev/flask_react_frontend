import Modal from "react-bootstrap/Modal";
import { userContext, uiContext } from "../../context/context";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { addUser } from "../../api/usersService";
import Alert from "react-bootstrap/Alert";

function UserAdd() {
  const { handlerUsersDisplay } = useContext(userContext);
  const { showPopUpUserAdd, setShowPopUpUserAdd } = useContext(uiContext);

  const [message, setMessage] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null); // error | success
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function submitAddUser(event) {
    event.preventDefault();
    if (!name | !email) {
      setMessage("Fill in your name and email");
      setStatusMessage("error");
    } else {
      (async () => {
        const responce = await addUser(name, email);
        if (responce.error) {
          setMessage(responce.error);
          setStatusMessage("error");
        } else {
          setMessage(
            `Successfully added user, Name: ${responce.name}, Email ${responce.email}`
          );
          setStatusMessage("success");
          setName("");
          setEmail("");
          await handlerUsersDisplay(); // Обновить отображение пользователей
          console.log(responce);
        }
      })();
    }
  }

  const handleClose = () => setShowPopUpUserAdd(false);
  return (
    <>
      <Modal show={showPopUpUserAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitAddUser}>
          <Modal.Body>
            {message &&
              (statusMessage === "error" ? (
                <Alert key={statusMessage} variant="danger">
                  {message}
                </Alert>
              ) : (
                <Alert key={statusMessage} variant="success">
                  {message}
                </Alert>
              ))}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UserAdd;
