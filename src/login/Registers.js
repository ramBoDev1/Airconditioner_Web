import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {connection,db} from "../connection";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import icon from "./images/me.jpg";
import FileUploader from "react-firebase-file-uploader";

class Registers extends Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: icon,

      formElement: {
        username: {
          type: "text",
          value: "",
          validators: {
            required: true,
            minLength: 5,
            maxLength: 15,
          },
          touched: false,
          error: {
            status: true,
            message: "",
          },
        },
        email: {
          type: "email",
          value: "",
          validators: {
            required: true,
            pattern: "email",
          },
          touched: false,
          error: {
            status: true,
            message: "",
          },
        },
        password: {
          type: "password",
          value: "",
          validators: {
            required: true,
            minLength: 8,
          },
          touched: false,
          error: {
            status: true,
            message: "",
          },
        },
      },
      formValid: false,
    };
  }
  onFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let updateForm = {
      ...this.state.formElement,
    };
    updateForm[name].value = value;
    updateForm[name].touched = true;
    const validatorsObject = this.checkValidators(
      value,
      updateForm[name].validators
    );
    updateForm[name].error = {
      status: validatorsObject.status,
      message: validatorsObject.message,
    };
    let formState = true;
    for (let name in updateForm) {
      if (updateForm[name].validators.required === true) {
        formState = !updateForm[name].error.status && formState;
      }
    }
    this.setState({
      ...this.state,
      formElement: updateForm,
      formValid: formState,
    });
  };
  checkValidators = (value, rule) => {
    let valid = true;
    let message = "";
    if (value.trim().length === 0 && rule.required) {
      valid = false;
      message = "จำเป็นต้องกรอก";
      console.log(this.state.formElement.username.error.message);
    }
    if (value.length < rule.minLength && valid) {
      valid = false;
      message = `น้อยกว่า ${rule.minLength} ตัวอักษร`;
    }
    if (value.length > rule.maxLength && valid) {
      valid = false;
      message = `มากกว่า ${rule.maxLength} ตัวอักษร`;
    }
    if (rule.pattern === "email" && valid) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
        valid = false;
        message = "กรอกอีเมล์ไม่ถูกต้อง";
      }
    }
    return { status: !valid, message: message };
  };
  getInputClass = (name) => {
    const elementErrorStatus = this.state.formElement[name].error.status;
    return elementErrorStatus && this.state.formElement[name].touched
      ? "form-control is-invalid"
      : "form-control is-valid";
  };

  getErrorMessage = (name) => {
    return this.state.formElement[name].error.message;
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(
      this.state.formElement.email.value +
        " " +
        this.state.formElement.password.value
    );
    try {
      connection
        .auth()
        .createUserWithEmailAndPassword(
          this.state.formElement.email.value,
          this.state.formElement.password.value
        )
        .then((userCredentials) => {
          if (userCredentials.user) {
            db.collection('member_user').doc(userCredentials.user.uid).set({
              Name: this.state.formElement.username.value,
              Email: this.state.formElement.email.value,
              Password: this.state.formElement.password.value,
              PhotoURL : this.state.avatarURL,
          });
            userCredentials.user
              .updateProfile({
                displayName: this.state.formElement.username.value,
                photoURL: this.state.avatarURL
              })
              .then((s) => {
                this.props.history.push("/");
              });
          }
        })
        .catch(function (error) {
          alert(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = (progress) => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    connection
      .storage()
      .ref("member_image_user")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ avatarURL: url }));
  };

  render() {
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
                <Nav.Link href="./Login">
                  <button type="button" className="btn btn-outline-warning">
                    เข้าสู่ระบบ
                  </button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="row">
          <div className="col-sm-3 mt-5"></div>
          <div className="col-sm-6 mt-5 card ">
            <div className="card-body ms-3 me-3 mt-5 mb-1 ">
              <form onSubmit={this.onFormSubmit}>
                <h1 className="text-start">ME</h1>
                <h4 className="text-start  mt-3 mb-5 ">สมัครสมาชิก</h4>
                <div className="text-center">
                  <div className="col">
                  <img
                    className="rounded-circle text-center"
                    src={this.state.avatarURL}
                    alt=""
                    width="75"
                    height="75"
                  />
                   <p className="text-center">อัพโหลดภาพ: {this.state.progress}%</p>
                  </div>
                  <div className="text-start mt-5"> 
                  <FileUploader
                      accept="*"
                      name="avatar"
                      randomizeFilename
                      storageRef={connection.storage().ref("member_image_user")}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                    /></div>
                </div>
                <div className="form-group ">
                  <div>
                    <label htmlFor="username ">Username:</label>
                    <input
                      type="text"
                      className={this.getInputClass("username")}
                      id="username"
                      name="username"
                      onChange={this.onFormChange}
                    />
                  </div>
                  <div className="invalid-feedback">
                    {this.getErrorMessage("username")}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">อีเมล์ :</label>
                  <input
                    type="email"
                    className={this.getInputClass("email")}
                    id="email"
                    name="email"
                    onChange={this.onFormChange}
                  />
                  <div className="invalid-feedback">
                    {this.getErrorMessage("email")}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">รหัสผ่าน :</label>
                  <input
                    type="password"
                    className={this.getInputClass("password")}
                    id="password"
                    name="password"
                    onChange={this.onFormChange}
                  />
                  <div className="invalid-feedback">
                    {this.getErrorMessage("password")}
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!this.state.formValid}
                  >
                    สมัคร
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Registers;
