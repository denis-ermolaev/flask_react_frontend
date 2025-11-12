import Table from "react-bootstrap/Table";
import { userContext, uiContext } from "../../context/context";
import { useContext } from "react";
import PaginationCast from "./Pagination";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function UsersDisplay() {
  const { users, isLoading, error } = useContext(userContext);
  const { setShowPopUpUserView, setShowPopUpUserAdd } = useContext(uiContext);
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading users...</p>
      </div>
    );
  }
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
      {users && users.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((value) => {
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
            </tbody>
          </Table>
          <PaginationCast />
        </>
      ) : (
        <Alert variant="info" className="mt-4">
          <p className="mb-0">
            No users have been added yet. Click the button below to add the
            first one!
          </p>
        </Alert>
      )}

      <Button
        variant="dark"
        onClick={() => {
          setShowPopUpUserAdd(true);
        }}
      >
        Add a new user
      </Button>
    </>
  );
}

export default UsersDisplay;
