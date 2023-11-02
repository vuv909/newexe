import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Body from "../components/Body";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector , useDispatch } from "react-redux";
import {share} from '../redux/Share.js'
const Container = styled.div`
  position: relative;
`;
const Modal = styled.div`
  background-color: rgb(241, 192, 101);
  position: fixed;
  padding: 20px;
  border-radius: 2%;
  right: 0;
  z-index: 100;
`;
const Homepage = () => {
  const dispatch = useDispatch()
  const shareBoolean = useSelector( state => state.share.value )
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  console.log(shareBoolean);
  const notify = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const confirm = (text) => {
    if (text === "no") {
      setShow(false);
    } else if (text === "yes") {
      setShow(false);
      dispatch(share({payload : true}))
      notify("Chia sẻ vị trí thành công !!!");
    }
  };
  console.log(share);

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RiseLoader color={"orange"} size={30} loading={loading} />
        </Container>
      ) : (
        <Container>
          <Navbar />
          {!shareBoolean && (
          <Modal style={{ display: show ? "block" : "none" }}>
            <div>
              <div>
                <p style={{ fontWeight: "bolder" }}>
                  Bạn có muốn chia sẻ vị trí hiện tại của mình không ?
                </p>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    flexBasis: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => confirm("no")}
                    style={{
                      border: "none",
                      width: "40%",
                      backgroundColor: "red",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10%",
                    }}
                  >
                    No
                  </button>
                </div>
                <div
                  style={{
                    flexBasis: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => confirm("yes")}
                    style={{
                      border: "none",
                      width: "40%",
                      backgroundColor: "green",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10%",
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
             
            </div>
            
          </Modal> )}
          <Body />
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default Homepage;
