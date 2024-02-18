import { useState, useEffect } from "react";
import logo from "./logo.png"
import {API_BASE} from "./constants"
import "./indexPage.css"

const footStyle = {
    marginTop: "25px",
    padding: "25px 0",
    width: "100%",
    textAlign: "center"
}

const linkStyle = {
    "&:hover": {
        borderBottom: "#333 solid 1px",
        fontSize: "1.07em"
    },
    marginRight: "1em",
    color: "#333 !important",
    borderBottom: "#333 dotted 1px",
    fontSize: "1.05em",

}

const loadM = () => {
    const link = window.document.createElement('link');
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
    link.rel = "stylesheet";
    window.document.getElementsByTagName('head')[0].appendChild(link);
}
// loadM()

const handleLogin = (e)=>{
    e.preventDefault()
    fetch(API_BASE + "/auth/google")
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })

}
export default function Landing() {

    return (
        <>
            <div className="container login-container">
                <header className="center">
                    <nav className="grey darken-3">
                        {/* <ul>
                            <li><Link to="/">index</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="/profile">prof</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                        </ul> */}
                    </nav>
                    <h1 className="hide">Movie Rank</h1>
                    <div className="logos">
                    </div>
                </header>
                <div className="card center">
                    <div className="card-content">
                        <img className="mainLogo" src={logo} alt="Movie Rank logo" />
                        <section className="section">
                            <h5> <p className="lead">Help Rank your favorite movies and create a collection of your personal favorites</p></h5>
                        </section>
                        <div className="divider"></div>
                        <section className="section ">
                            <a href={API_BASE + "/auth/google"} className="btn red darken-1" >
                                <i className="fa-brands fa-google left"></i>Login with Google
                            </a>
                        </section>
                        {/* <!-- <section className="section ">
                                <a href="/auth/email" className="btn blue darken-1">
                                    <i className="fas fa-envelope left"></i>Login with Email
                                </a>
                            </section> --> */}

                    </div>
                </div>

            </div>

            <footer id="footer" className="page-footer center container transparent black-text"
                style={footStyle}
            >
                <p className="copyright">&copy; <a href="https://hendersonsargeant.netlify.app" target="_blank" className="profile"
                    style={linkStyle}
                >Henderson Sargeant</a>All rights reserved.</p>
            </footer>
        </>

    )
}
