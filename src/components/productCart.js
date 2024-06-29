import React from 'react'
import axios from 'axios'
import url from '../url'
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default class Products extends React.Component{
    constructor(){
      super()
      this.state = {
        products: [],
        status: ''
      }
    }
    componentDidMount(){
      this.setState({
          status: 'Loading'
      })
      axios.get(url + '/fetch')
          .then((posRes) => {
              this.setState({
                  products: posRes.data,
                  status: 'fetched'
              })
          }, (errRes) => {
              console.log(errRes)
          })
    }

    addToCart = (productId) => {
      axios.post(url + '/cart/add', { productId })
        .then((res) => {
          console.log('Product added to cart:', res.data);
        })
        .catch((err) => {
          console.error('Error adding product to cart:', err);
        });
    }

      render() {
    return (
      <div className='container mt-5'>
        <div className='row g-3'>
          {this.state.products.map((product, index) => (
            <div className='col-3' key={index}>
              <div className="card">
                <div className="image-container">
                  <img src={product.p_img} className="card-img-top" alt={product.p_desc} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.p_name}</h5>
                  <p className="card-text">{product.p_desc}</p>
                  {/* <div hidden={this.login}> */}
                    <button onClick={() => this.addToCart(product.id)} className="btn btn-primary">Add to Cart</button>
                    <button onClick={() => this.addToCart(product.id)} className="btn btn-dark">learnmore</button>
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}