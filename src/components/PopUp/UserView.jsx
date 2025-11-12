import Modal from "react-bootstrap/Modal";
import { uiContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { fetchUser } from "../../api/usersService";
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
    return null;
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
