import Table from "react-bootstrap/Table";
import { userContext, uiContext } from "../../context/context";
import { useContext } from "react";
import UsersPagination from "./UsersPagination";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { range } from "../../hooks/usePagination";
import { Placeholder } from "react-bootstrap";
import { Container } from "react-bootstrap";

function UsersDisplay() {
  const { users, isLoading, error } = useContext(userContext);
  const { setShowPopUpUserView, setShowPopUpUserAdd } = useContext(uiContext);

  // Кнопка добавить пользователя и пагинация
  const PgBut = (
    <div className="d-flex flex-column align-items-center gap-3 mt-4">
      <UsersPagination />
      <Button
        variant="dark"
        onClick={() => {
          setShowPopUpUserAdd(true);
        }}
      >
        Add a new user
      </Button>
    </div>
  );

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Error!</Alert.Heading>
        <p>{typeof error === "string" ? error : error.message}</p>
      </Alert>
    );
  }
  if (users?.length === 0) {
    return (
      <>
        <Alert variant="secondary" className="mt-4">
          <Alert.Heading>
            There are no users yet. Add the first one.!
          </Alert.Heading>
        </Alert>
        {PgBut}
      </>
    );
  }
  return (
    <>
      <Container>
        <Table
          striped
          bordered
          hover
          responsive
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Name</th>
              <th style={{ width: "60%" }}>Email</th>
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
      </Container>
      {PgBut}
    </>
  );
}

export default UsersDisplay;
