import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [productID, setProductId] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [produceName, setProductName] = useState(null);
  const [totalWorth, setTotalWorth] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedData = Object.keys(localStorage).map((key) =>
      localStorage.getItem(key)
    );
    setProducts(storedData);

    const total = storedData.reduce((acc, item) => {
      const [, price] = item.split("-");
      return acc + parseInt(price);
    }, 0);
    setTotalWorth(total);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productID || !sellingPrice || !produceName) return;

    const data = productID + "-" + sellingPrice + "-" + produceName;
    localStorage.setItem(productID, data);

    setProducts([...products, data]);
    setTotalWorth(totalWorth + parseInt(sellingPrice));

  };

  const handleDelete = (id, price) => {
    localStorage.removeItem(id);
    setProducts(products.filter((product) => product.split("-")[0] !== id));
    setTotalWorth(totalWorth - parseInt(price));
  };

  return (
    <div className="body">
      <form className="input" onSubmit={handleSubmit}>
        <label className="lable">Product ID:</label>
        <input
          onChange={(e) => setProductId(e.target.value)}
          type="number"
        ></input>
        <label className="label">Selling Price:</label>
        <input
          onChange={(e) => setSellingPrice(e.target.value)}
          type="number"
        ></input>
        <label className="label">Product Name:</label>
        <input
          onChange={(e) => setProductName(e.target.value)}
          type="text"
        ></input>
        <button className="submit-btn" type="submit">Add Product</button>
      </form>
      <div className="products">
        <h1>Procuts</h1>
        <ul>
          {products.map((product, index) => {
            const [id, price, name] = product.split("-");
            return (
              <li key={index}>
                <span>
                  {name} - ₹{price}
                </span>
                <button className="delete-btn" onClick={() => handleDelete(id, price)}>
                  Delete Item
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="total_worth">
        <h2>Total value of the products: {totalWorth}</h2>
      </div>
    </div>
  );
};

export default Admin;
