import React from "react";
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Aboutus from "../aboutus";
import Contactus from "../contactus";
import SignupComponent from "./SignupComponent";
import MainComponent from "./MainComponent";
import './indexCom.css';
export default class IndexComponent extends React.Component {
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">MyWebsite</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/aboutus" className="nav-link" activeClassName="active">About Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contactus" className="nav-link" activeClassName="active">Contact Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/signup" className="nav-link" activeClassName="active">Signup</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mt-5">
                    <Routes>
                        <Route path="/aboutus" element={<Aboutus />} />
                        <Route path="/contactus" element={<Contactus />} />
                        <Route path="/signup" element={<SignupComponent />} />
                        <Route path="/login" element={<MainComponent />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}
