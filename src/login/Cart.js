import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../products/CartContext";
import { Icon } from "react-icons-kit";
import facebook from "./images/facebook.png";
import instagram from "./images/instagram.png";
import youtube from "./images/youtube.png";
import home from "./images/home.png";
import email from "./images/email.png";
import phone from "./images/phone.png";
import empty from "./images/iconair.png";
import { trash2 } from "react-icons-kit/feather/trash2";
import { cloud_download } from "react-icons-kit/ikons/cloud_download";
import cartIcon from "../icons/cart.png";
import { logOut } from "react-icons-kit/feather/logOut";
import { iosPlus } from "react-icons-kit/ionicons/iosPlus";
import { images } from "react-icons-kit/entypo/images";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth } from "../connection";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import icon from "./images/me.jpg";
import { connection } from "../connection";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";

const Cart = () => {
  const CurrencyFormat = require("react-currency-format");
  const { user } = useContext(AuthContext);
  const { shoppingCart, dispatch, totalPrice, totalQty } =
    useContext(CartContext);

  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleShowDownload = () => {
    setShowDownload(true);
    setShow(false);
  };

  
  useEffect(() => {
    console.log(dispatch);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  });

  return (
    <div className="font-face-gm">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="text-secondary navbar navbar-expand-sm bg-light navbar-light fixed-top "
      >
        <Container>
          <Link to="/">
            <Navbar.Brand className="text-dark ">
              <img
                alt=""
                src={icon}
                width="30"
                height="30"
                className="d-inline-block align-top rounded"
              />{" "}
              MANACHAI ELECTIC
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
                <Nav.Link />
                <Link to="/product">
                <h6 className="mt-1 mt-3 ">
                  <button
                    type="button"
                    className="mt-1 ms-3 btn btn-dark rounded-pill"
                  >
                  {" "}
                    สินค้า
                  </button>
                  </h6>
                </Link>
              </Nav>
            <Nav>
              <Link to="/cartproducts">
                <button
                  type="button"
                  class="mt-3 ms-3 btn btn-warning position-relative btn-sm mt-2 rounded-pill"
                >
                  <img
                    src={cartIcon}
                    className="rounded-circle"
                    alt="..."
                    width="35"
                    height="35"
                  />{" "}
                  ตะกร้าสินค้า
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalQty}
                    <span class="visually-hidden"> </span>
                  </span>
                </button>
              </Link>
              <Link to="./Dashboard">
              <h6 className="ms-3 mt-3 ">
                    <button
                      type="button"
                      className="btn btn-info rounded-pill"
                    >
                      <img
                        src={user.photoURL}
                        className="rounded-circle"
                        alt="..."
                        width="30"
                        height="30"
                      />{" "}
                      {user.displayName}
                    </button>
                  </h6>
              </Link>
              <Nav.Link
                  eventKey={2}
                  onClick={() => connection.auth().signOut()}
                >
                  <h6 className="ms-2 mt-1">
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill"
                  >
                    <Icon icon={logOut} size={24} />{" "}
                    ออกจากระบบ
                  </button>
                  </h6>
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <>
        <hr className="mt-5 text-light" />
        <hr className="mt-5 text-light" />
        <hr className="mt-5 text-light" />
        <hr className="mt-5 text-light" />
        {shoppingCart.length !== 0 && (
          <div className="mt-5 text-start">
            <h3 className="ms-5">ราการสินค้าทั้งหมด {totalQty} รายการ</h3>
          </div>
        )}
        {shoppingCart.length === 0 && (
          <>
            <div className="text-center ms-5  me-5">
              <div class="col-sm">
                <img
                  className="rounded"
                  src={empty}
                  alt="not found"
                  style={{ height: "225px" }}
                />
              </div>
              <h4>ยังไม่มีสินค้าในตะกร้า กรุณาเลือกรายการสินค้า</h4>
              <Link to="/">
                <button
                  type="button"
                  class="btn btn-danger position-relative rounded-pill"
                >
                  <h6 className="mt-2">ไปยังหน้า รายการสินค้า</h6>
                </button>
              </Link>
            </div>
          </>
        )}

        {shoppingCart &&
          shoppingCart.map((cart) => (
            <div className="card mx-5 text-center mt-5">
              <div class="card-body row g-3 " key={cart.id}>
                <div class="col-sm-1">
                  <img
                    className="rounded"
                    src={cart.img}
                    alt="not found"
                    style={{ height: "125px" }}
                  />
                </div>
                <div class="col-sm-2">
                  <h6>{cart.model}</h6>
                </div>

                <div class="col-sm-2 ">
                  <h6>
                    ราคา{" "}
                    <CurrencyFormat
                      value={cart.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />{" "}
                    บาท
                  </h6>
                </div>
                <div
                  class="col-sm-1 mt-2 text-primary"
                  onClick={() => dispatch({ type: "INC", id: cart.id, cart })}
                >
                  +<h6 className="mt-1">เพิ่ม</h6>
                </div>
                <div class="col-sm-1 mt-2 mr-6">
                  <h6>{cart.qty}</h6>
                </div>
                <div
                  class="col-sm-1 mt-2 text-danger"
                  onClick={() => dispatch({ type: "DEC", id: cart.id, cart })}
                >
                  -<h6 className="mt-1 ">ลด</h6>
                </div>
                <div class="col-sm-1 ">
                  <h6>จำนวน {cart.qty} สินค้า</h6>
                </div>
                <div class="col-sm-1 text-success">
                  <h6>
                    ราคา {""}
                    <CurrencyFormat
                      value={cart.TotalProductPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                    />{" "}
                    บาท
                  </h6>
                </div>

                <div class="col-sm ms-2 text-center">
                  {" "}
                  <button
                    className="btn btn-danger mb-3 rounded-pill"
                    disabled={showDownload}
                    onClick={() =>
                      dispatch({ type: "DELETE", id: cart.id, cart })
                    }
                  >
                    ลบออกจากตะกร้า <Icon icon={trash2} size={24} />
                  </button>{" "}
                </div>
              </div>
            </div>
          ))}

        {shoppingCart.length !== 0 && (
          <div className="mx-5 mt-5 text-end me-5 mb-5 ">
            <div className="text div1">
              <h5>ทั้งหมด {totalQty} ชิ้น</h5>
              <h5 className="ms-5">
                รวม {""}
                <CurrencyFormat
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                />{" "}
                บาท
              </h5>
              <button
                className="btn btn-success mb-3 rounded-pill"
                onClick={handleShow}
              >
                สั่งซื้อ
              </button>
            </div>
          </div>
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันคำสั่งซื้อ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>คุณต้องการยืนยันคำสั่งซื้อจำนวน {totalQty} ชิ้นหรือไม่</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="rounded-pill"
              variant="secondary"
              onClick={handleClose}
            >
              ยกเลิก
            </Button>
            <Button
              className="rounded-pill"
              variant="primary"
              onClick={handleShowDownload}
            >
              ชำระเงิน
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <footer className="text-black nav3">
        <section>
          <div></div>
          <div class="container text-center text-md-start ">
            <div class="row ">
              <div class="col-md-6 col-lg-6 col-xl-6 mt-5 mtext-left">
                <h6 class="text-uppercase fw-bold mb-4">MANACHAI ELECTIC</h6>
                <p>
                  นายธีรภัทร  บำรุงกิจ
                  <br />
                  รหัสนักศึกษา 61322110043-2
                  <br />
                  ปริญญาตรี ปีที่ 4<br />
                  คณะครุศาสตร์อุตสาหกรรม สาขาเทคโนโลยีคอมพิวเตอร์
                  <br />
                  มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น
                </p>
              </div>

              <div class="col-md-6 col-lg-6  mx-auto mt-5 mb-md-5 ">
                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <img src={home} alt="..." width="25" height="25" /> 486/192 หมู่
                  9 ตำบลโพธิ์ อำเภอเมือง จังหวัดศรีสะเกษ 33000
                </p>
          
                <p>
                  <img src={email} alt="..." width="25" height="25" />{" "}
                  trn.38328@gmail.com
                </p>
                <p>
                  <img src={phone} alt="..." width="25" height="25" /> 064 313
                  3369
                </p>
                <button className="btn ">
                  <a
                    href="https://www.facebook.com/RamRTNF72HRs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={facebook} alt="..." width="50" height="50" />{" "}
                  </a>
                </button>
                
                <button className="btn">
                  <a
                    href="https://www.youtube.com/channel/UCO_T4rlF08NGe_PqvLePqyA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={youtube} alt="..." width="50" height="50" />{" "}
                  </a>
                </button>
              </div>
            </div>
          </div>
        </section>
        <div class="text-center p-4 nav1">
          © 2021 Copyright: Rajamangala University of Technology Isan Khonkaen
          Campus
        </div>
      </footer>
    </div>
  );
};
export default Cart;
