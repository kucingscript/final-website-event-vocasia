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
import {
  Calendar2PlusFill,
  PencilFill,
  TrashFill,
} from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ordersEvColumns } from "../../../constants";

const TableDataEvents = () => {
  const [events, setEvents] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(DB, "events"), orderBy("event_title")),
      (snapshot) => {
        const eventLists = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(eventLists);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        ShowNotification({
          title: "Error fetching events",
          text: error.message,
          icon: "error",
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (id, title) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Delete Event",
        text: `Are you sure want to delete ${title} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!shouldDelete.isConfirmed) {
        return;
      }

      await deleteDoc(doc(DB, "events", id));
      ShowNotification({
        title: "Event Deleted",
        text: `${title} deleted successfully`,
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

  const handleUpdate = (id) => {
    navigate(`/admin/events/update/${id}`);
  };

  const table = useReactTable({
    data: events,
    columns: ordersEvColumns,
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

      <button
        className="btn btn-primary my-2"
        onClick={() => navigate("/admin/events/create")}
      >
        <Calendar2PlusFill /> Create Event
      </button>
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
              <th>Event Images</th>
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
                <td>
                  <a href={events[row.id].event_images}>
                    <img
                      src={events[row.id].event_images}
                      alt={events[row.id].event_title}
                      width={70}
                      className="img-thumbnail"
                    />
                  </a>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleUpdate(events[row.id].id)}
                    >
                      <PencilFill /> Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(
                          events[row.id].id,
                          events[row.id].event_title
                        )
                      }
                    >
                      <TrashFill /> Delete
                    </button>
                  </div>
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

export default TableDataEvents;
