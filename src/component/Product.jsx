import React, { useState, useEffect } from 'react'; 

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      if (prevCart[id] === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[id];
        return updatedCart;
      }
      return { ...prevCart, [id]: prevCart[id] - 1 };
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Page</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '300px', objectFit: 'contain' }} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                {cart[product.id] ? (
                  <div className="d-flex align-items-center">
                    <button className="btn btn-danger" onClick={() => decreaseQuantity(product.id)}>-</button>
                    <span className="mx-2">{cart[product.id]}</span>
                    <button className="btn btn-success" onClick={() => increaseQuantity(product.id)}>+</button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to Cart</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
