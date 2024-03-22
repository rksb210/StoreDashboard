// import React from 'react'
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

const DisplayAllItems = () => {
  const navigate = useNavigate();

  const [allItem, setAllItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [item_id, setItem_id] = useState("");

  useEffect(() => {
    fetchAllItems();
  }, []);
  const fetchAllItems = async () => {
    const data = await axios.get("http://localhost:3000/getallitems");
    console.log("data:", data.data);
    setAllItem(data.data);
  };

  const handleDelete = (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          result = await axios.delete(
            `http://localhost:3000/deleteitem/${rowData.item_id}`
          );
          if (result.status) {
            Swal.fire("Deleted!", "Job has been deleted.", "success");
            fetchAllItems();
          } else {
            Swal.fire("Deleted!", "Fail to delete job", "error");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ///////////////////////////////////////////////
  const handleOpen = (rowData) => {
    setOpen(true);
    setItemName(rowData.itemName);
    setDescription(rowData.description);
    setPrice(rowData.price);
    setQuantity(rowData.quantity);
    setItem_id(rowData.item_id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const showItemForm = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{AddItemForm()}</DialogContent>
        <DialogActions className="button-group">
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    );
  };

  const AddItemForm = () => {
    return (
      <>
        <h1>Add Items</h1>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="item">Item Name:</label>
            <input
              type="text"
              placeholder="Enter Item Name"
              id="item"
              name="item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              placeholder="Enter Description"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              placeholder="Enter Price"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              placeholder="Enter Quantity"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>
      </>
    );
  };

  const handleEdit = async () => {
    console.log("rowdata:", item_id);
    let body = {
      itemName: itemName,
      description: description,
      price: price,
      quantity: quantity,
    };

    const response = await axios.patch(
      `http://localhost:3000/updateitem/${item_id}`,
      body
    );
    if (response.status) {
      alert("Data Updated Successfully");
      fetchAllItems();
      navigate("/");
    } else {
      alert("Data Updation Failed");
    }
  };

  ////////////////////////////////////////////

  console.log("allItem", allItem);
  function DisplayItems() {
    return (
      <MaterialTable
        title="All Items List"
        columns={[
          { title: "Item Name", field: "itemName" },
          { title: "Description", field: "description" },
          { title: "Price", field: "price" },
          { title: "Quantity", field: "quantity" },
        ]}
        data={allItem}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Item",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Item",
            onClick: (event, rowData) => handleDelete(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Job",
            isFreeAction: true,
            onClick: () => navigate("/"),
          },
        ]}
      />
    );
  }
  return (
    <div>
      <div>
        <h1>Display All Items</h1>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {DisplayItems()}
        {showItemForm()}
      </div>
    </div>
  );
};

export default DisplayAllItems;
