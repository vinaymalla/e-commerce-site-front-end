// import React from 'react';
// import axios from 'axios';
// import url from '../url';
// import './SignupComponent.css'; // Import custom CSS file

// export default class SignupComponent extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             status: ''
//         };
//     }

//     render() {
//         return (
//             <div className='signup-container'>
//                 <div className='card shadow-lg p-4 mb-5 bg-white rounded'>
//                     <div className='card-body'>
//                         <form onSubmit={this.signup} className='w-100'>
//                             <h3 className='text-center text-primary mb-4'>Signup User</h3>
//                             <div className='form-group my-3'>
//                                 <label className='form-label'>User ID</label>
//                                 <input type='text' placeholder='Enter User ID' className='form-control' name='userid' required />
//                             </div>
//                             <div className='form-group my-3'>
//                                 <label className='form-label'>User Name</label>
//                                 <input type='text' placeholder='Enter User Name' className='form-control' name='uname' required />
//                             </div>
//                             <div className='form-group my-3'>
//                                 <label className='form-label'>Password</label>
//                                 <input type='password' placeholder='Enter Password' className='form-control' name='upwd' required />
//                             </div>
//                             <div className='form-group my-3'>
//                                 <label className='form-label'>User Email</label>
//                                 <input type='email' placeholder='Enter User Email' className='form-control' name='email' required />
//                             </div>
//                             <div className='form-group my-3'>
//                                 <label className='form-label'>User Address</label>
//                                 <input type='text' placeholder='Enter User Address' className='form-control' name='address' required />
//                             </div>
//                             <div className='form-group my-3'>
//                                 <label className='form-label'>Contact</label>
//                                 <input type='text' placeholder='Enter Contact' className='form-control' name='contact' required />
//                             </div>
//                             <div className='form-group text-center mt-4'>
//                                 <input type='submit' className='btn btn-primary btn-lg' value='Signup' />
//                                 <h5 className='text-success mt-3'>{this.state.status}</h5>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     signup = (e) => {
//         e.preventDefault();
//         let obj = {
//             "userid": e.target.userid.value,
//             "uname": e.target.uname.value,
//             "upwd": e.target.upwd.value,
//             "email": e.target.email.value,
//             "address": e.target.address.value,
//             "contact": e.target.contact.value
//         };
//         axios.post(url + "/insert/createUser", obj)
//             .then((posRes) => {
//                 console.log(posRes.data);
//                 this.setState({
//                     status: posRes.data.userInsert
//                 });
//             }, (errRes) => {
//                 console.log(errRes);
//             });
//     }
// }


import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import url from '../url';
import './SignupComponent.css'; // Import custom CSS file

const SignupComponent = () => {
  const [status, setStatus] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const handleLoginSignupToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleAuthSuccess = () => {
    if (product) {
      // Add the product to cart
      console.log('Product added to cart after login:', product);
    }
    navigate('/'); // Redirect to another page after login/signup
  };

  const login = (e) => {
    e.preventDefault();
    let obj = {
      "uname": e.target.uname.value,
      "upwd": e.target.upwd.value,
    };
    axios.post(url + "/fetch/auth", obj)
      .then((posRes) => {
        console.log(posRes.data);
        setStatus(posRes.data.userInsert);
        localStorage.setItem('token', posRes.data.token); // Example token storage
        handleAuthSuccess();
      }, (errRes) => {
        console.log(errRes);
      });
  };

  const signup = (e) => {
    e.preventDefault();
    let obj = {
      "userid": e.target.userid.value,
      "uname": e.target.uname.value,
      "upwd": e.target.upwd.value,
      "email": e.target.email.value,
      "address": e.target.address.value,
      "contact": e.target.contact.value
    };
    axios.post(url + "/insert/createUser", obj)
      .then((posRes) => {
        console.log(posRes.data);
        setStatus(posRes.data.userInsert);
        localStorage.setItem('token', posRes.data.token); // Example token storage
        handleAuthSuccess();
      }, (errRes) => {
        console.log(errRes);
      });
  };

  return (
    <div className='signup-container'>
      <div className='card shadow-lg p-4 mb-5 bg-white rounded'>
        <div className='card-body'>
          <form onSubmit={isLogin ? login : signup} className='w-100'>
            <h3 className='text-center text-primary mb-4'>{isLogin ? 'Login User' : 'Signup User'}</h3>
            {!isLogin && (
              <div className='form-group my-3'>
                <label className='form-label'>User ID</label>
                <input type='text' placeholder='Enter User ID' className='form-control' name='userid' required />
              </div>
            )}
            <div className='form-group my-3'>
              <label className='form-label'>User Name</label>
              <input type='text' placeholder='Enter User Name' className='form-control' name='uname' required />
            </div>
            <div className='form-group my-3'>
              <label className='form-label'>Password</label>
              <input type='password' placeholder='Enter Password' className='form-control' name='upwd' required />
            </div>
            {!isLogin && (
              <>
                <div className='form-group my-3'>
                  <label className='form-label'>User Email</label>
                  <input type='email' placeholder='Enter User Email' className='form-control' name='email' required />
                </div>
                <div className='form-group my-3'>
                  <label className='form-label'>User Address</label>
                  <input type='text' placeholder='Enter User Address' className='form-control' name='address' required />
                </div>
                <div className='form-group my-3'>
                  <label className='form-label'>Contact</label>
                  <input type='text' placeholder='Enter Contact' className='form-control' name='contact' required />
                </div>
              </>
            )}
            <div className='form-group text-center mt-4'>
              <input type='submit' className='btn btn-primary btn-lg' value={isLogin ? 'Login' : 'Signup'} />
              <h5 className='text-success mt-3'>{status}</h5>
              <button type='button' className='btn btn-link mt-3' onClick={handleLoginSignupToggle}>
                {isLogin ? 'Need to Signup?' : 'Already have an account? Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
