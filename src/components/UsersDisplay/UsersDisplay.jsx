import Table from "react-bootstrap/Table";
import { userContext, uiContext } from "../../context/context";
import { useContext } from "react";
import PaginationCast from "./Pagination";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { range } from "../../hooks/usePagination";
import { Placeholder } from "react-bootstrap";

function UsersDisplay() {
  const { users, isLoading, error } = useContext(userContext);
  const { setShowPopUpUserView, setShowPopUpUserAdd } = useContext(uiContext);

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Error!</Alert.Heading>
        <p>{typeof error === "string" ? error : error.message}</p>
      </Alert>
    );
  }
  return (
    <>
      <Table
        striped
        bordered
        hover
        responsive
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "70%" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            range(1, 5).map((value) => {
              return (
                <tr key={value}>
                  <td>
                    <Placeholder as="div" animation="glow">
                      <p style={{ height: "0.5rem" }}>
                        <Placeholder xs={8} />
                      </p>
                    </Placeholder>
                  </td>
                  <td>
                    <Placeholder as="div" animation="glow">
                      <p style={{ height: "0.5rem" }}>
                        <Placeholder xs={3} />
                      </p>
                    </Placeholder>
                  </td>
                </tr>
              );
            })}
          {!isLoading &&
            users?.map((value) => {
              return (
                <tr
                  key={value.id}
                  className="clickable-row"
                  onClick={() => {
                    setShowPopUpUserView(value.id);
                  }}
                >
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                </tr>
              );
            })}
          {!isLoading &&
            users?.length < 5 &&
            range(1, 5 - users?.length).map((value) => {
              return (
                <tr key={value}>
                  <td colSpan={2}>
                    <p style={{ height: "0.5rem" }}></p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {/* // <Alert variant="info" className="mt-4">
        //   <p className="mb-0">
        //     No users have been added yet. Click the button below to add the
        //     first one!
        //   </p>
        // </Alert> */}
      <div className="d-flex justify-content-center">
        <PaginationCast />
      </div>
      <div className="d-flex justify-content-center">
        <Button
          variant="dark"
          onClick={() => {
            setShowPopUpUserAdd(true);
          }}
        >
          Add a new user
        </Button>
      </div>
    </>
  );
}

export default UsersDisplay;
