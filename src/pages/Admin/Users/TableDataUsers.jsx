import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { DB } from "../../../config/firebase";
import { ShowNotification } from "../../../components";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { TrashFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";

const TableDataUsers = () => {
  const [users, setUsers] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(DB, "users"), orderBy("firstname")),
      (snapshot) => {
        const userLists = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(userLists);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        ShowNotification({
          title: "Error fetching users",
          text: error.message,
          icon: "error",
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClick = async (id, firstname, lastname) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Delete User",
        text: `Are you sure want to delete ${firstname} ${lastname} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!shouldDelete.isConfirmed) {
        return;
      }

      await deleteDoc(doc(DB, "users", id));
      ShowNotification({
        title: "User Deleted",
        text: `${firstname} ${lastname} deleted successfully`,
        icon: "success",
      });
    } catch (error) {
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const ordersColumns = [
    { header: "Firstname", accessorKey: "firstname" },
    { header: "Lastname", accessorKey: "lastname" },
    { header: "Email", accessorKey: "email" },
  ];

  const table = useReactTable({
    data: users,
    columns: ordersColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <Container className="pt-3">
      <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon1">
          🔍
        </span>
        <input
          type="text"
          className="form-control border-primary"
          placeholder="Search Here..."
          aria-label="Search Here..."
          aria-describedby="basic-addon1"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>

      <Table responsive striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>NO</th>
              {headerGroup.headers.map((header) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th>Role</th>
              <th>Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6">Fetching Data...</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                <td>{+row.id + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>{users[row.id].role === 1 ? "Admin" : "User"}</td>
                <td>
                  <button
                    className={`btn btn-danger btn-sm ${
                      users[row.id].role === 1 ? "disabled" : ""
                    }`}
                    onClick={() =>
                      handleClick(
                        users[row.id].id,
                        users[row.id].firstname,
                        users[row.id].lastname
                      )
                    }
                  >
                    <TrashFill /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex gap-1 my-2">
        <button
          className="btn btn-primary btn-sm lg:btn-md"
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </button>
        <button
          className={`btn btn-primary btn-sm sm:btn-lg ${
            !table.getCanPreviousPage() ? "disabled" : ""
          }`}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          className={`btn btn-primary btn-sm sm:btn-lg ${
            !table.getCanNextPage() ? "disabled" : ""
          }`}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button
          className="btn btn-primary btn-sm sm:btn-lg"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </Container>
  );
};

export default TableDataUsers;
