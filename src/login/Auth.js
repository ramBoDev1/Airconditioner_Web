//เช็คการเข้าสู่ระบบ
import React, { useState, useEffect } from "react";
import {connection} from "../connection";
import "bootstrap/dist/css/bootstrap.min.css";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    connection.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
        <div className="d-flex justify-content-center">
        <div className="spinner-grow text-warning m-5" style={{width: "6rem" , height: "6rem"}}  role="status">
          <span className="visually-hidden">กำลังโหลด...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
