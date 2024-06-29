import React from 'react';
import axios from 'axios';
import url from '../url';
import './SignupComponent.css'; // Import custom CSS file

export default class SignupComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            status: ''
        };
    }

    render() {
        return (
            <div className='signup-container'>
                <div className='card shadow-lg p-4 mb-5 bg-white rounded'>
                    <div className='card-body'>
                        <form onSubmit={this.login} className='w-100'>
                            <h3 className='text-center text-primary mb-4'>Login User</h3>
                           
                            <div className='form-group my-3'>
                                <label className='form-label'>User Name</label>
                                <input type='text' placeholder='Enter User Name' className='form-control' name='uname' required />
                            </div>
                            <div className='form-group my-3'>
                                <label className='form-label'>Password</label>
                                <input type='password' placeholder='Enter Password' className='form-control' name='upwd' required />
                            </div>
                           
                            <div className='form-group text-center mt-4'>
                                <input type='submit' className='btn btn-primary btn-lg' value='login' />
                                <h5 className='text-success mt-3'>{this.state.status}</h5>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    login = (e) => {
        e.preventDefault();
        let obj = {
            "userid": e.target.userid.value,
            "uname": e.target.uname.value,
            "upwd": e.target.upwd.value,
           
        };
        axios.post(url + "/fetch/auth", obj)
            .then((posRes) => {
                console.log(posRes.data);
                this.setState({
                    status: posRes.data.userInsert
                });
            }, (errRes) => {
                console.log(errRes);
            });
    }
}
