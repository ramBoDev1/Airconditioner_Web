import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import {connection} from "../connection";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import icon from "./images/me.jpg";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/Login" />;
  }

  console.log(connection.auth().currentUser.email);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="text-secondary navbar navbar-expand-sm bg-light navbar-light fixed-top">
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
            <Nav className="me-auto">
            <Nav.Link href="/product">สินค้า</Nav.Link>
            </Nav>
              <Nav>
                <Nav.Link href="./Dashboard">
                <h6><img
                    src={user.photoURL}
                    className="rounded-circle"
                    alt="..."
                    width="30"
                    height="30"
                  />{" "}{user.displayName}</h6>
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  onClick={() => connection.auth().signOut()}
                ><h6 className="mt-1 ">ออกจากระบบ</h6>
                </Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr className="mt-5 text-light" />
      <hr className="mt-5 text-light" />
      <div className="col-6 mt-5 mx-auto card">
        <div className="card-body text-center">
          <img
            src={user.photoURL}
            className="rounded-circle"
            alt="..."
            width="75"
            height="75"
          />
          <h2 className="text-center mt-3">{user.displayName}</h2>
          <p className="text-center"> อีเมล์ : {user.email}</p>
          <div className="text-center mt-5">
            <button className="btn btn-warning mb-3" type="submit">
              แก้ไขโปรไฟล์
            </button>{" "}
            <button
              onClick={() => connection.auth().signOut()}
              className="btn btn-primary mb-3"
              type="submit"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
