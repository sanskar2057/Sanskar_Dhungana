import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
//List of given packages
const products = [
  { name: 'Item 1', price: 10, weight: 200 },
  { name: 'Item 2', price: 100, weight: 20 },
  { name: 'Item 3', price: 30, weight: 300 },
  { name: 'Item 4', price: 20, weight: 500 },
  { name: 'Item 5', price: 30, weight: 250 },
  { name: 'Item 6', price: 40, weight: 10 },
  { name: 'Item 7', price: 200, weight: 10 },
  { name: 'Item 8', price: 120, weight: 500 },
  { name: 'Item 9', price: 130, weight: 790 },
  { name: 'Item 10', price: 20, weight: 100 },
  { name: 'Item 11', price: 10, weight: 340 },
  { name: 'Item 12', price: 4, weight: 800 },
  { name: 'Item 13', price: 5, weight: 200 },
  { name: 'Item 14', price: 240, weight: 20 },
  { name: 'Item 15', price: 123, weight: 700 },
  { name: 'Item 16', price: 245, weight: 10 },
  { name: 'Item 17', price: 230, weight: 20 },
  { name: 'Item 18', price: 110, weight: 200 },
  { name: 'Item 19', price: 45, weight: 200 },
  { name: 'Item 20', price: 67, weight: 20 },
  { name: 'Item 21', price: 88, weight: 300 },
  { name: 'Item 22', price: 10, weight: 500 },
  { name: 'Item 23', price: 17, weight: 250 },
  { name: 'Item 24', price: 19, weight: 10 },
  { name: 'Item 25', price: 89, weight: 10 },
  { name: 'Item 26', price: 45, weight: 500 },
  { name: 'Item 27', price: 99, weight: 790 },
  { name: 'Item 28', price: 125, weight: 100 },
  { name: 'Item 29', price: 198, weight: 340 },
  { name: 'Item 30', price: 220, weight: 800 },
  { name: 'Item 31', price: 249, weight: 200 },
  { name: 'Item 32', price: 230, weight: 20 },
  { name: 'Item 33', price: 190, weight: 700 },
  { name: 'Item 34', price: 45, weight: 10 },
  { name: 'Item 35', price: 12, weight: 20 },
  { name: 'Item 36', price: 5, weight: 200 },
  { name: 'Item 37', price: 2, weight: 200 },
  { name: 'Item 38', price: 90, weight: 20 },
  { name: 'Item 39', price: 12, weight: 300 },
  { name: 'Item 40', price: 167, weight: 500 },
  { name: 'Item 41', price: 12, weight: 250 },
  { name: 'Item 42', price: 8, weight: 10 },
  { name: 'Item 43', price: 2, weight: 10 },
  { name: 'Item 44', price: 9, weight: 500 },
  { name: 'Item 45', price: 210, weight: 790 },
  { name: 'Item 46', price: 167, weight: 100 },
  { name: 'Item 47', price: 23, weight: 340 },
  { name: 'Item 48', price: 190, weight: 800 },
  { name: 'Item 49', price: 199, weight: 200 },
  { name: 'Item 50', price: 12, weight: 20 },
];

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [packages, setPackages] = useState([]);

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/order', { products: selectedProducts });//Calls the order api
      setPackages(response.data.packages);
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  return (
    <div className="App">
      <h1>Place Your Order</h1>
      <div>
        {products.map((product, index) => (
          <p key={index}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(product)}
              />
              {`${product.name} || $${product.price} || ${product.weight}g`}
            </label>
          </p>
        ))}
      </div>
      <button onClick={placeOrder}>Place order</button>
      {packages.length > 0 && (
        <div>
          <h2>Package List:</h2>
          {packages.map((pkg, index) => (
            <div key={index}>
              <h3>Package No.{index + 1}</h3>
              <p>Items: {pkg.items.join(', ')}</p>
              <p>Total weight: {pkg.totalWeight}g</p>
              <p>Total price: ${pkg.totalPrice}</p>
              <p>Courier price: ${pkg.courierPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
