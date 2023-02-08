import React, { useContext} from "react";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { AuthContext } from "./Auth";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import icon from "./images/me.jpg";
import cartIcon from "../icons/shopping-trolley.svg";
import addCartIcon from "../icons/add-cart.svg";
import { connection } from "../connection";
import { Redirect } from "react-router-dom";
import { ProductsContext } from "../products/ProductsContext";
import { CartContext } from "../products/CartContext";

import facebook from "./images/facebook.png";
import instagram from "./images/instagram.png";
import youtube from "./images/youtube.png";
import home from "./images/home.png";
import email from "./images/email.png";
import phone from "./images/phone.png";
import empty from "../icons/empty.png";
const ProductAir = () => {
  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const { totalQty } = useContext(CartContext);

  if (!user) {
    alert("กรุณาLOGIN...");
    return <Redirect to="/Login" />;
  }

  return (
    <div >
      <Navbar
        collapseOnSelect
        expand="lg"
        className="text-secondary navbar navbar-expand-sm bg-light navbar-light fixed-top"
      >
        <Container>
          <Navbar.Brand href="/" className="text-dark ">
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
            <Nav.Link/>
              <Link to="/product"><h6 className="mt-3">สินค้า{" "}</h6></Link>
            <Nav.Link/>
            </Nav>
            <Nav>
              <Link to="/cartproducts">
                <button
                  type="button"
                  class="btn btn-outline-warning position-relative btn-sm mt-3"
                >
                  <img
                    src={cartIcon}
                    className="rounded-circle"
                    alt="..."
                    width="25"
                    height="25"
                  />{" "}
                  ตะกร้าสินค้า
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalQty}
                    <span class="visually-hidden"> </span>
                  </span>
                </button>
              </Link>

              <Nav.Link href="./Dashboard">
                <h6>
                  <img
                    src={user.photoURL}
                    className="rounded-circle"
                    alt="..."
                    width="30"
                    height="30"
                  />{" "}
                  {user.displayName}
                </h6>
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                onClick={() => connection.auth().signOut()}
              >
                <h6 className="mt-1">ออกจากระบบ</h6>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <hr />
      </Navbar>
      <hr className="mt-5 text-light" />
      <hr className="mt-5 text-light" />
      <br />
      {products.length === 0 && (
        console.log(products),
        <div className="text-center">
          <button class="btn btn-warning text-light" type="button" disabled>
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            กำลังโหลดคลัง...
          </button>
        </div>
      )}
      <div className="text-center mt-5">
        <h3>ติดต่อสอบถาม</h3>
        <p className="mt-3">
          Facebook : ล้างแอร์ราคาห้าร้อยบาท มานะชัย บำรุงกิจ
        </p>
        <p className="mb-5">โทร : 0810640438 (ช่างนาย)</p>
      </div>

      <div className="row row-cols-2 row-cols-md-5 g-2 d-flex justify-content-center">
        {products.map((product) => (
          
          <div className="col ms-3 " key={product.id}>
            <div className="card">
              <img
                src={product.img}
                className="card-img-top mt-5"
                alt="..."
                
              />
              <div className="card-body">
                <h5 className="card-title">{product.details}</h5>
                <p className="card-text"> 
                  BTU : {product.BTU} BTU/hr
                  Brand : {product.brand}
                </p>
                <p className="text-end">ราคา {product.price}.- บาท</p>
              </div>
              {product.price !== "N/A" && (
                console.log(products),
                <button
                className="btn btn-outline-primary mb-3"
                onClick={() =>
                  dispatch({
                    type: "ADD_GALLERY_TO_CART",
                    id: product.id,
                    product,
                  })
                }>
                <img
                  src={addCartIcon}
                  className="rounded"
                  alt="..."
                  style={{ height: "30px" }}
                />{" "}
                ใส่ตะกร้า
              </button>
              )}
              
            </div>
          </div>
        ))}
      </div>
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

export default ProductAir;
