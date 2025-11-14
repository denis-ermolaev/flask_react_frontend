import Pagination from "react-bootstrap/Pagination";
import { useContext } from "react";
import { userContext } from "../../context/context";
import { usePagination } from "../../hooks/usePagination";

export default function PaginationCast() {
  const { currentPage, totalPages, setCurrentPage } = useContext(userContext);

  const arrayPaginationView = usePagination({ totalPages, currentPage });

  if (!totalPages || totalPages < 2) {
    return <></>;
  } else {
    return (
      <>
        <Pagination>
          <Pagination.First
            className="d-none d-sm-block"
            onClick={() => {
              setCurrentPage(1);
            }}
          />
          <Pagination.Prev
            className="d-none d-sm-block"
            onClick={() => {
              setCurrentPage((prev) => prev - 1 || 1);
            }}
          />
          {arrayPaginationView.map((value, index) => {
            if (value == "...") {
              return <Pagination.Ellipsis key={`dot-${index}`} />;
            } else if (value === currentPage) {
              return (
                <Pagination.Item active key={value}>
                  {value}
                </Pagination.Item>
              );
            } else {
              return (
                <Pagination.Item
                  key={value}
                  onClick={() => {
                    setCurrentPage(value);
                  }}
                >
                  {value}
                </Pagination.Item>
              );
            }
          })}
          <Pagination.Next
            className="d-none d-sm-block"
            onClick={() => {
              setCurrentPage((prev) => {
                if (prev + 1 <= totalPages) {
                  return prev + 1;
                } else {
                  return prev;
                }
              });
            }}
          />
          <Pagination.Last
            className="d-none d-sm-block"
            onClick={() => {
              setCurrentPage(totalPages);
            }}
          />
        </Pagination>
      </>
    );
  }
}
