import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { AuthContext } from "./Auth";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { connection } from "../connection";

import icon from "./images/me.jpg";

import bar1 from "./images/p1.PNG";
import bar2 from "./images/p2.PNG";
import bar3 from "./images/pomo_green.jpg";

import present1 from "./images/manachai.jpg";
import present2 from "./images/cer.jpg";
import present3 from "./images/ma1.jpg";
import present4 from "./images/ma2.jpg";

import facebook from "./images/facebook.png";
import instagram from "./images/instagram.png";
import youtube from "./images/youtube.png";
import home from "./images/home.png";
import email from "./images/email.png";
import phone from "./images/phone.png";
import empty from "../icons/empty.png";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [navbar, setNavbar] = useState(false);

  const navBg = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 500) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", navBg);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={
          navbar
            ? "navbar navbar-expand-sm bg-primary navbar-light fixed-top bg-black"
            : "navbar navbar-expand-sm  navbar-light fixed-top bg-black"
        }
      >
        <Container>
          <Navbar.Brand href="/" className={navbar ? "text-primary " : "text-light "}>
            <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top rounded"
            />
            
            {" "}
            MANACHAI ELECTIC
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            
              <Nav className="me-auto">
                <Nav.Link href="/product"><span className=" text-light ">สินค้า</span></Nav.Link>
              </Nav>
           
            {user ? (
              <Nav>
                <Nav.Link href="./Dashboard">
                  <h6 className="text-warning ">
                    <img
                      src={user.photoURL}
                      className="rounded-circle"
                      alt="..."
                      width="30"
                      height="30"
                    />
                    <span className=" p-1">
                      {" "}
                    {user.displayName}
                    </span>
                  </h6>
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  onClick={() => connection.auth().signOut()}
                >
                  <h6 className=" border border-danger p-1 text-danger">ออกจากระบบ</h6>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="./Login">
                  <button type="button" className="btn btn-outline-warning ">
                    เข้าสู่ระบบ
                  </button>
                </Nav.Link>
                <Nav.Link eventKey={2} href="./Register">
                  <button type="button" className="btn btn-outline-primary">
                    สมัครสมาชิก
                  </button>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
        <hr />
      </Navbar>
      <div className="justify-content-center">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner ">
            <div
              className="carousel-item active"
              style={{ height: "700px" }}
              data-bs-interval="5000"
            >
              <img src={bar1} className="d-block w-100" alt={bar1} />
              <div className="carousel-caption d-none d-md-block ">
                <h5>ยินดีต้อนรับ</h5>
                <p>
                 สู่เว็บไซต์ของเรา
                </p>
                
              </div>
            </div>
            <div
              className="carousel-item"
              style={{ height: "700px" }}
              data-bs-interval="5000"
            >
              <img src={bar2} className="d-block w-100" alt={bar2} />
              <div className="carousel-caption d-none d-md-block ">
                
                <h5>แอร์มากมายหลากหลาย Brand</h5>
                <p>
                 ครบจบในเว็บไซต์เดียว
                </p>
              </div>
            </div>
            <div className="carousel-item" style={{ height: "800px" }}>
              <img src={bar3} className="d-block w-100" alt={bar3} />
              <div className="carousel-caption d-none d-md-block ">
                <h5>บริการโดยช่าง นาย</h5>
                <p>ที่มีประสบการณ์มากกว่า 10 ปี และมีใบรับรอง</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <br />
      <div className="text-center mt-5">
        <h3 className="text-danger">โปรโมชั่น</h3>
        <p className="mt-3">
          เพียงช่วงนี้เท่านั้น ซื้อแอร์กับเรา ฟรีติดตั้งพร้อมอุปกรณ์เสริม
        </p>
        <p className="mb-5">รับประกัน 1 ปีเต็ม</p>
      </div>
      
      <div className="container mb-5 text-center">
        <figure class="figure ms-5  mt-2">
          <img
            src={present1}
            class="rounded"
            alt="..."
            style={{ height: "200px" }}
          />
          <figcaption class="figure-caption text-center">
            <h5 className="mt-2">รับประกันโดย</h5>
            <div className="text-wrap">
              <p className="mt-2 ">
                ช่างที่มีประสบการณ์ <br /> มากกว่า 10 ปี
              </p>
            </div>
          </figcaption>
        </figure>

        <figure class="figure ms-5  mt-2">
          <img
            src={present2}
            class="rounded"
            alt="..."
            style={{ height: "200px" }}
          />
          <figcaption class="figure-caption text-center">
            <h5 className="mt-2">ใบรับรอง</h5>
            <p className="mt-2">
              ที่การันตีถึงฝีมือ <br /> และความชำนาญ
            </p>
          </figcaption>
        </figure>

        <figure class="figure ms-5 mt-2">
          <img
            src={present3}
            class="rounded"
            alt="..."
            style={{ height: "200px" }}
          />
          <figcaption class="figure-caption text-center">
            <h5 className="mt-2">ฝีมือ</h5>
            <p className="mt-2">
              ที่มากมาย <br /> พร้อมอุปกรณ์ที่ทันสมัย
            </p>
          </figcaption>
        </figure>

        <figure class="figure ms-5 mt-2">
          <img
            src={present4}
            class="rounded"
            alt="..."
            style={{ height: "200px" }}
          />
          <figcaption class="figure-caption text-center text-wrap">
            <h5 className="mt-2">คุณภาพ</h5>
            <p className="mt-2">
              ที่สูงเก็บงาน <br /> ทุกรายละเอียด
            </p>
          </figcaption>
        </figure>
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
export default Home;
