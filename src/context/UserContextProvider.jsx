import { useState, useEffect } from "react";

import { fetchUsers } from "../api/usersService";
// eslint-disable-next-line no-unused-vars
import { userContext } from "./context";

function UserContextProvider({ children }) {
  // Данные пользователей
  const [users, setUsers] = useState(null);
  // Работа с пагинацией и страницами
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  async function handlerUsersDisplay() {
    const response = await fetchUsers(currentPage, 5);
    console.log(response);
    setUsers(response.data);
    setTotalPages(response.meta.total_pages);
  }
  useEffect(() => {
    handlerUsersDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <userContext.Provider
      value={{
        handlerUsersDisplay,
        users,
        setUsers,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
