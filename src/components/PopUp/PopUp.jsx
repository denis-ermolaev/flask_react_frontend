import { uiContext } from "../../context/context";
import { useContext } from "react";
import UserView from "./UserView";
import UserAdd from "./UserAdd";

function PopUp() {
  const { showPopUpUserView, showPopUpUserAdd } = useContext(uiContext);

  if (showPopUpUserView) {
    return <UserView />;
  } else if (showPopUpUserAdd) {
    return <UserAdd />;
  }
  return null;
}

export default PopUp;
