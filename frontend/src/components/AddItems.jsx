import  { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import '../css/AddItem.css'

const AddItems = () => {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = { itemName, description, price, quantity };

    try {
      const response = await axios.post("http://localhost:3000/additems", body);
      console.log(response);
      alert("Item Added Successfully");
      toast.success("Item Added Successfully");
      // Clear input fields after successful submission
      setDescription("");
      setItemName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const handleDisplay = () => {
    navigate("/allitems");
  };

  const handleBuy = () =>{
    navigate('/buy')
  }

  return (
    <div className="add-items-container">
      <h1>Add Items</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
          <div className="button-group">
            <button type="submit">Add Item</button>
            <button type="button" onClick={handleDisplay}>
              View All Items
            </button>
            <button type="submit" onClick={handleBuy}>Buy Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
