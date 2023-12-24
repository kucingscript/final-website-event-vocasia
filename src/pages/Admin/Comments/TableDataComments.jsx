import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
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
import { HouseDoorFill, TrashFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const TableDataComments = () => {
  const [comments, setComments] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(DB, "comments")),
      (snapshot) => {
        const commentLists = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComments(commentLists);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        ShowNotification({
          title: "Error fetching comments",
          text: error.message,
          icon: "error",
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClick = async (id, userComment) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Delete Comment",
        text: `Are you sure want to delete comment from ${userComment}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!shouldDelete.isConfirmed) {
        return;
      }

      await deleteDoc(doc(DB, "comments", id));
      ShowNotification({
        title: "Comment Deleted",
        text: `Comment deleted successfully`,
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
    { header: "Email", accessorKey: "userEmail" },
    { header: "Comment", accessorKey: "userComment" },
  ];

  const table = useReactTable({
    data: comments,
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
              <th>Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4">Fetching Comments...</td>
            </tr>
          ) : comments.length === 0 ? (
            <tr>
              <td colSpan="4">
                No comments found. Please wait for users to submit their
                comments
              </td>
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
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleClick(
                        comments[row.id].id,
                        comments[row.id].userEmail
                      )
                    }
                    data-tooltip-id="delete"
                    data-tooltip-content="Delete Comment"
                    data-tooltip-place="bottom"
                  >
                    <TrashFill />
                    <Tooltip id="delete" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex gap-1 my-2 flex-wrap">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/admin/dashboard")}
        >
          <HouseDoorFill className="mb-1" /> Back to Admin
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </button>
        <button
          className={`btn btn-primary btn-sm ${
            !table.getCanPreviousPage() ? "disabled" : ""
          }`}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          className={`btn btn-primary btn-sm ${
            !table.getCanNextPage() ? "disabled" : ""
          }`}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </Container>
  );
};

export default TableDataComments;
