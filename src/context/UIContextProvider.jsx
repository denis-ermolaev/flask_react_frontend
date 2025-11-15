// eslint-disable-next-line no-unused-vars
import { uiContext } from "./context";
import { useState } from "react";

function UIContextProvider({ children }) {
  // Pop up
  const [showPopUpUserView, setShowPopUpUserView] = useState(false); // false or user id

  const [showPopUpUserAdd, setShowPopUpUserAdd] = useState(false);

  return (
    <uiContext.Provider
      value={{
        showPopUpUserView,
        setShowPopUpUserView,
        showPopUpUserAdd,
        setShowPopUpUserAdd,
      }}
    >
      {children}
    </uiContext.Provider>
  );
}

export default UIContextProvider;
