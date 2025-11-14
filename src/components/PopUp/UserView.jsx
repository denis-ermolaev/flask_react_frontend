import Modal from "react-bootstrap/Modal";
import { uiContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { fetchUser } from "../../api/usersService";
import { Placeholder, Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";
function UserView() {
  const { showPopUpUserView, setShowPopUpUserView } = useContext(uiContext);

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchUser(showPopUpUserView);
        setUserData(response);
      } catch {
        setError(
          "Connection to the server has been lost. Please reload the page."
        );
      }
    })();
  }, [showPopUpUserView]);

  const handleClose = () => setShowPopUpUserView(false);
  if (!userData | error) {
    return (
      <Modal show={showPopUpUserView} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>More about user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder as="div" animation="glow">
            <p>
              Name: <Placeholder xs={6} />
            </p>
            <p>
              E-mail: <Placeholder xs={8} />
            </p>
          </Placeholder>
          {error && (
            <Alert variant="danger" className="mt-4">
              {typeof error === "string" ? error : error.message}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <>
      <Modal show={showPopUpUserView} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>More about user (ID {userData.id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {userData.name}</p>
          <p>E-mail: {userData.email}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserView;
