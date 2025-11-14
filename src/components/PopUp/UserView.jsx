import Modal from "react-bootstrap/Modal";
import { uiContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { fetchUser } from "../../api/usersService";
import { Placeholder, Spinner } from "react-bootstrap";
function UserView() {
  const { showPopUpUserView, setShowPopUpUserView } = useContext(uiContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const responce = await fetchUser(showPopUpUserView);
      setUserData(responce);
    })();
  }, [showPopUpUserView]);

  const handleClose = () => setShowPopUpUserView(false);
  if (!userData) {
    return (
      <Modal show={showPopUpUserView} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>More about users</p>
          </Modal.Title>
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
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <>
      <Modal show={showPopUpUserView} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>More about users (ID {userData.id})</Modal.Title>
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
