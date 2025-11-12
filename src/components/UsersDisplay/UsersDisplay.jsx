import Table from "react-bootstrap/Table";
import { userContext, uiContext } from "../../context/context";
import { useContext } from "react";
import PaginationCast from "./Pagination";
import { Button } from "react-bootstrap";

function UsersDisplay() {
  const { users } = useContext(userContext);
  const { setShowPopUpUserView, setShowPopUpUserAdd } = useContext(uiContext);
  return (
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
                style={{ cursor: "pointer" }}
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
