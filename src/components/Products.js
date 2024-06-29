import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import url from '../url';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      status: 'Loading...',
      showCart: false,
      isLoggedIn: !!localStorage.getItem('token'),
      navigateTo: null,
      addedToCart: {},
    };
  }

  componentDidMount() {
    this.fetchProducts();

    if (this.state.isLoggedIn) {
      this.fetchCart();
    }
  }

  fetchProducts = () => {
    axios.get(`${url}/fetch`)
      .then((posRes) => {
        this.setState({ products: posRes.data, status: '' });
      })
      .catch((errRes) => {
        console.log(errRes);
        this.setState({ status: 'Error fetching data' });
      });
  };

  fetchCart = () => {
    axios.post(url + "/fetch/fetchCart", { "uname": window.sessionStorage.getItem('user') })
      .then((posRes) => {
        this.setState({ cart: posRes.data, status: '' });
      })
      .catch((errRes) => {
        console.log(errRes);
      });
  };

  handleAddToCart = (item) => {
    if (!this.state.isLoggedIn) {
      this.setState({ navigateTo: '/signup' });
      return;
    }

    const { cart, addedToCart } = this.state;
    const existingItem = cart.find(e => e.p_id === item.p_id);

    if (existingItem) {
      const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
      axios.post(url + "/update/updateCart", updatedItem)
        .then((posRes) => {
          this.setState({
            cart: cart.map(e => e.p_id === updatedItem.p_id ? updatedItem : e),
            status: 'Updated ' + posRes.statusText,
            addedToCart: { ...addedToCart, [item.p_id]: true }
          });
          setTimeout(() => {
            this.setState({ addedToCart: { ...addedToCart, [item.p_id]: false } });
          }, 2000);
        })
        .catch((errRes) => {
          console.log(errRes);
          this.setState({ status: errRes.message });
        });
    } else {
      const newItem = {
        "uname": window.sessionStorage.getItem('user'),
        "p_name": item.p_name,
        "p_id": item.p_id,
        "qty": 1,
        "p_cost": item.p_cost,
        "p_img": item.p_img
      };
      axios.post(url + "/insert/cartInsert", newItem)
        .then((posRes) => {
          this.setState({
            cart: [...cart, newItem],
            status: 'Added ' + posRes.statusText,
            addedToCart: { ...addedToCart, [item.p_id]: true }
          });
          setTimeout(() => {
            this.setState({ addedToCart: { ...addedToCart, [item.p_id]: false } });
          }, 2000);
        })
        .catch((errRes) => {
          console.log(errRes);
        });
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    this.setState({ isLoggedIn: false });
  };

  handleReduce = (item) => {
    const { cart } = this.state;
    if (item.qty === 1) {
      axios.post(url + "/delete/deleteCart", { "uname": window.sessionStorage.getItem('user'), "p_id": item.p_id })
        .then((posRes) => {
          this.setState({
            cart: cart.filter(e => e.p_id !== item.p_id),
            status: 'Deleted ' + posRes.statusText
          });
        })
        .catch((errRes) => {
          console.log(errRes);
          this.setState({ status: errRes.message });
        });
    } else {
      const updatedItem = { ...item, qty: item.qty - 1 };
      axios.post(url + "/update/updateCart", updatedItem)
        .then((posRes) => {
          this.setState({
            cart: cart.map(e => e.p_id === updatedItem.p_id ? updatedItem : e),
            status: 'Updated ' + posRes.statusText
          });
        })
        .catch((errRes) => {
          console.log(errRes);
          this.setState({ status: errRes.message });
        });
    }
  };

  handleBuyNow = () => {
    const { cart } = this.state;
    alert('Thank you for your purchase! Total amount: ' + this.calculateTotal());

    const promises = cart.map(item =>
      axios.post(url + "/delete/deleteCart", { "uname": window.sessionStorage.getItem('user'), "p_id": item.p_id })
    );

    Promise.all(promises)
      .then(() => {
        this.setState({ cart: [], status: 'All items removed from cart' });
      })
      .catch((errRes) => {
        console.log(errRes);
        this.setState({ status: errRes.message });
      });
  };

  calculateTotal = () => {
    return this.state.cart.reduce((total, item) => total + item.qty * item.p_cost, 0);
  };

  render() {
    if (this.state.navigateTo) {
      return <Navigate to={this.state.navigateTo} />;
    }

    const { products, cart, showCart, status, addedToCart } = this.state;

    const productCards = products.map(product => (
      <div className="col-md-3 mb-4" key={product._id}>
        <div className="card h-100 product-card">
          <img src={product.p_img} className="card-img-top" alt={product.p_name} />
          <div className="card-body">
            <h5 className="card-title">{product.p_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{product.p_cat}</h6>
            <p className="card-text">{product.p_desc}</p>
          </div>
          <div className="card-footer">
            <button
              onClick={() => this.handleAddToCart(product)}
              className={`btn btn-sm ${addedToCart[product.p_id] ? 'btn-success' : 'btn-outline-success'}`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ));

    const cartItems = cart.map(item => (
      <div className="card mb-2 cart-item" key={item.p_id}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <img src={item.p_img} alt={item.p_name} className="img-thumbnail cart-item-img" />
          <div className="cart-item-name">{item.p_name}</div>
          <div>Quantity: {item.qty}</div>
          <div>Cost: {item.p_cost}</div>
          <button onClick={() => this.handleReduce(item)} className="btn btn-outline-warning btn-sm">Reduce</button>
        </div>
      </div>
    ));

    return (
      <div className="container mt-5">
        <div className="header">
          <h1>Welcome to Vinay Mart</h1>
          <p>Find the best products here</p>
        </div>
        <div className="d-flex justify-content-between mb-5">
          <div>
            <button onClick={() => this.setState({ showCart: !showCart })} className="btn btn-outline-info mr-2 view-cart-button">
              {showCart ? 'View Products' : 'View Cart'}
            </button>
            <button onClick={this.handleLogout} className="btn btn-outline-danger">Logout</button>
          </div>
        </div>
        {status && <p>{status}</p>}
        {showCart ? (
          <div>
            <h2 className="text-center">Cart Items</h2>
            {cartItems.length ? (
              <div className="d-flex flex-column align-items-center">
                {cartItems}
                <h3 className="mt-4">Total: {this.calculateTotal()}</h3>
                <button onClick={this.handleBuyNow} className="btn btn-outline-success mt-3">Buy Now</button>
              </div>
            ) : (
              <p className="text-center">No items in cart.</p>
            )}
          </div>
        ) : (
          <div className="row">
            {productCards}
          </div>
        )}
      </div>
    );
  }
}

export default Products;
