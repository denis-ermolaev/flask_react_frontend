import Modal from "react-bootstrap/Modal";
import { userContext, uiContext } from "../../context/context";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { addUser } from "../../api/usersService";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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
        try {
          const responce = await addUser(name, email);
          setMessage(
            `Successfully added user, Name: ${responce.name}, Email ${responce.email}`
          );
          setStatusMessage("success");
          setName("");
          setEmail("");
          await handlerUsersDisplay(); // Обновить отображение пользователей
          console.log(responce);
        } catch (error) {
          if (error.response) {
            setStatusMessage("error");
            setMessage(error.response.data.error || "An error occurred.");
          } else {
            setStatusMessage("error");
            setMessage(error.message || "An error occurred.");
          }
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
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </FloatingLabel>
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
