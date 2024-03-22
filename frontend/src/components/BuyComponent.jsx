import { useEffect, useState } from "react";
import "../css/buyNow.css";
import axios from "axios";

const BuyComponent = () => {
  const [allItem, setAllItem] = useState([]);

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getallitems");
      setAllItem(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleBuy1 = async (item) => {
    console.log("details:", item.quantity);
    if (item.quantity >= 1) {
      let body = {
        itemName: item.itemName,
        description: item.description,
        price: item.price,
        quantity: item.quantity - 1,
      };
      console.log("body:", body);
      await axios.patch(
        `http://localhost:3000/updateitem/${item.item_id}`,
        body
      );
      alert(`You Purchased 1 ${item.itemName}`);
    } else {
      alert("Not enough item left");
    }
    fetchAllItems();
  };
  const handleBuy2 = async (item) => {
    console.log("details:", item.quantity);
    if (item.quantity >= 2) {
      let body = {
        itemName: item.itemName,
        description: item.description,
        price: item.price,
        quantity: item.quantity - 2,
      };
      console.log("body:", body);
      await axios.patch(
        `http://localhost:3000/updateitem/${item.item_id}`,
        body
      );
      alert(`You Purchased 2 ${item.itemName}`);
    } else {
      alert("Not enough item left");
    }
    fetchAllItems();
  };

  const handleBuy3 = async (item) => {
    console.log("details:", item.quantity);
    if (item.quantity >= 3) {
      let body = {
        itemName: item.itemName,
        description: item.description,
        price: item.price,
        quantity: item.quantity - 3,
      };
      console.log("body:", body);
      await axios.patch(
        `http://localhost:3000/updateitem/${item.item_id}`,
        body
      );
      alert(`You Purchased 3 ${item.itemName}`);
    } else {
      alert("Not enough item left");
    }
    fetchAllItems();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Buy Items</h1>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allItem.map((item, index) => (
            <tr key={index}>
              <td>{item.item_id}</td>
              <td>{item.itemName}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td
                style={{ display: "flex", gap: "10px" }}
                className="button-group"
              >
                <button onClick={() => handleBuy1(item)}>Buy 1</button>
                <button onClick={() => handleBuy2(item)}>Buy 2</button>
                <button onClick={() => handleBuy3(item)}>Buy 3</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyComponent;
