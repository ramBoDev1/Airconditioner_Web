import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import {connection} from "../connection";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import icon from "./images/me.jpg";
import "./Login.css";

const Login = () => {
  const handlerSummits = (even) => {
    even.preventDefault();
    const email = even.target.email;
    const password = even.target.password;

    try {
      connection
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      alert("กำลังเข้าสู่ระบบ...");
    } catch (error) {
      alert(error);
    }
  };

  const { user } = useContext(AuthContext);
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="text-secondary">
        <Container>
          <Navbar.Brand href="/" className="text-primary">
            <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top rounded"
            />{" "}
            MANACHAI ELECTIC
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link eventKey={2} href="./Register">
                <button type="button" class="btn btn-outline-primary">
                  สมัครสมาชิก
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
          <div class="col-12 col-sm-10 col-md-12 col-lg-11 col-xl-10">
            <div class="card d-flex mx-auto my-5">
              <div class="row">
                <div class="col-md-7 col-sm-12 col-xs-12 c2 px-5 pt-5">
                  <form onSubmit={handlerSummits} className="px-5 pb-5">
                    <div class="d-flex">
                      <h3 class="font-weight-bold">เข้าสู่ระบบ</h3>
                    </div>{" "}
                    <input
                      type="text"
                      id="email"
                      placeholder="อีเมล์"
                      name="email"
                    ></input>{" "}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="รหัสผ่าน"
                    />{" "}
                    <br />
                    <button
                      className="btn btn-warning text-white text-weight-bold bt"
                      type="submit"
                    >
                      ยืนยัน
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
};
export default Login;
