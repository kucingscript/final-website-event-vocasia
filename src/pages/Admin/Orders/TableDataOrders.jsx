import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
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
import { CheckLg, HouseDoorFill, TrashFill, XLg } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TableDataOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(DB, "orders"), orderBy("timestamp")),
      (snapshot) => {
        const orderLists = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(orderLists);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        ShowNotification({
          title: "Error fetching orders",
          text: error.message,
          icon: "error",
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Delete Order",
        text: `Are you sure want to delete this order?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!shouldDelete.isConfirmed) {
        return;
      }

      await deleteDoc(doc(DB, "orders", id));
      ShowNotification({
        title: "Order Deleted",
        text: `Order deleted successfully`,
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

  const handleToggleComplete = async (id, orderPurchased) => {
    try {
      await updateDoc(doc(DB, "orders", id), {
        isPurchased: !orderPurchased,
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
    { header: "Title", accessorKey: "title" },
    { header: "Place", accessorKey: "place" },
    { header: "Price", accessorKey: "price" },
    { header: "Time", accessorKey: "time" },
    { header: "Date", accessorKey: "date" },
    { header: "Order By", accessorKey: "name" },
    { header: "Order Email", accessorKey: "email" },
  ];

  const table = useReactTable({
    data: orders,
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
              <th>isPurchased</th>
              <th>Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="10">Fetching Orders...</td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="10">
                No orders have been placed yet. Please wait for customers to
                submit their orders.
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
                  <div className="d-flex justify-content-between">
                    {orders[row.id].isPurchased ? "true" : "false"}
                    <button
                      onClick={() =>
                        handleToggleComplete(
                          orders[row.id].id,
                          orders[row.id].isPurchased
                        )
                      }
                      className={`btn btn-sm ${
                        orders[row.id].isPurchased
                          ? "btn-secondary"
                          : "btn-primary"
                      }`}
                    >
                      {orders[row.id].isPurchased ? (
                        <>
                          <XLg
                            data-tooltip-id="close"
                            data-tooltip-content="Mark as not Purchased"
                            data-tooltip-place="bottom"
                          />
                          <Tooltip id="close" />
                        </>
                      ) : (
                        <>
                          <CheckLg
                            data-tooltip-id="check"
                            data-tooltip-content="Mark as Purchased"
                            data-tooltip-place="bottom"
                          />
                          <Tooltip id="check" />
                        </>
                      )}
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(orders[row.id].id)}
                  >
                    <TrashFill
                      data-tooltip-id="delete"
                      data-tooltip-content="Delete Order"
                      data-tooltip-place="bottom"
                    />
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

export default TableDataOrders;
