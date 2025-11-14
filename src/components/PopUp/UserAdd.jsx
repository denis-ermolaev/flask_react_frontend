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
  const [isLoading, setIsLoading] = useState(false);

  async function submitAddUser(event) {
    event.preventDefault();
    if (!name || !email) {
      setMessage("Fill in your name and email");
      setStatusMessage("error");
    } else {
      setIsLoading(true);
      try {
        const response = await addUser(name, email);
        setMessage(
          `Successfully added user, Name: ${response.name}, Email ${response.email}`
        );
        setStatusMessage("success");
        setName("");
        setEmail("");
        await handlerUsersDisplay(); // Обновить отображение пользователей
      } catch (error) {
        if (error.response) {
          setStatusMessage("error");
          setMessage(error.response.data.error || "An error occurred.");
        } else {
          setStatusMessage("error");
          setMessage(error.message || "An error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleClose = () => {
    setShowPopUpUserAdd(false);
    setMessage(null);
    setStatusMessage(null);
    setName("");
    setEmail("");
  };
  return (
    <>
      <Modal show={showPopUpUserAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitAddUser}>
          <Modal.Body>
            {message && (
              <Alert
                key={statusMessage}
                variant={statusMessage === "error" ? "danger" : "success"}
              >
                {message}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel controlId="Name" label="Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(event) => {
                    setName(event.target.value);
                    if (statusMessage || message) {
                      setMessage(null);
                      setStatusMessage(null);
                    }
                  }}
                  value={name}
                  disabled={isLoading} // Блокируем поле во время загрузки
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="Email address"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (statusMessage || message) {
                      setMessage(null);
                      setStatusMessage(null);
                    }
                  }}
                  value={email}
                  disabled={isLoading} // Блокируем поле во время загрузки
                />
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Close
            </Button>
            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UserAdd;
