/* eslint-disable no-unused-vars */
import { uiContext } from "../../context/context";
import { useContext } from "react";
import UserView from "./UserView";
import UserAdd from "./UserAdd";

function PopUp() {
  const {
    showPopUpUserView,
    setShowPopUpUserView,
    showPopUpUserAdd,
    setShowPopUpUserAdd,
  } = useContext(uiContext);

  if (showPopUpUserView) {
    return <UserView />;
  } else if (showPopUpUserAdd) {
    return <UserAdd />;
  }
}

export default PopUp;
