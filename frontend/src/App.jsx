import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddItems from "./components/AddItems";
import DisplayAllItems from "./components/DisplayAllItems";
import BuyComponent from "./components/BuyComponent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AddItems />} path="/" />
          <Route element={<DisplayAllItems />} path="allitems" />
          <Route element={<BuyComponent />} path="buy" />


        </Routes>
      </Router>
    </>
  );
}

export default App;
