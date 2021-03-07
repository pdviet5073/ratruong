import React, { useState, useEffect } from "react";
import history from "../../util/history";
import { connect } from "react-redux";

import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";

import iconhamburger from "../../images/headerImages/iconHumberger.png";
import logopage from "../../images/headerImages/logopage.png";
import iconthongbao from "../../images/headerImages/iconthongbao.svg";

import iconkhachsan from "../../images/headerImages/iconkhachsan.svg";
import iconcombotietkiem from "../../images/headerImages/iconcombotietkiem.svg";
import iconcamnang from "../../images/headerImages/iconcamnang.svg";
import iconsale from "../../images/headerImages/iconsale.svg";
import iconrestaurant from "../../images/headerImages/iconrestaurant.svg";

import icontrangchu from "../../images/headerImages/icontrangchu.svg";
import iconlienhe from "../../images/headerImages/iconlienhe.svg";
import icontrogiup from "../../images/headerImages/icontrogiup.svg";
import icondatchocuatoi from "../../images/headerImages/icondatchocuatoi.png";
import anhgai from "../../images/headerImages/anhgai.jpg";

import { Button } from "antd";
import { FcLike } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import "./styles.css";

import { getUserAccount } from "../../redux/actions";

function Header({ account, getUserAccount ,setIsActive}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showVerticalSidebar, setShowVerticalSidebar] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [checkLoginHeader, setCheckLoginHeader] = useState(false);
  useEffect(() => {
    if (account || localStorage.getItem("user")) {
      setCheckLoginHeader(true);
    } else setCheckLoginHeader(false);
  }, [account]);

  //bật tắt đăng nhập
  const showPageLogin = () => {
    setShowLogin(true);
  };
  const hidePageLogin = () => {
    setShowLogin(false);
  };
  const showPageSignUp = () => {
    setShowSignUp(true);
  };
  const hidePageSignUp = () => {
    setShowSignUp(false);
  };

  // log out
  const handelLogOut = () => {
    setCheckLoginHeader(false);
    localStorage.removeItem("user");
    setShowVerticalSidebar(false);
    history.push("/");
  };
  //bật tắt sider bar bên trái
  const showSidebarVertical = () => {
    setShowVerticalSidebar(true);
  };
  const hideSidebarVertical = () => {
    setShowVerticalSidebar(false);
  };

  return (
    <div className="header ">
      <div className="header-container ">
        <div className="header-container-top container">
          <div className="header-container-top-left">
            <img
              src={iconhamburger}
              alt="iconhamburger"
              className="icon-humburger pointer"
              onClick={() => showSidebarVertical()}
            />
            <div className="logo-page">
              <img
                src={logopage}
                alt="logopage"
                className=" pointer"
                onClick={() => history.push("/")}
              />
            </div>
          </div>
          <div className="header-container-top-right">
            <div className="header-container-top-right-icon pointer">
              <img src={iconthongbao} alt="inconthongbao" />
              <span>Thông báo</span>
            </div>
            <div className="header-container-top-right-icon pointer">
              {" "}
              <FcLike className="icon-love" /> <span>Yêu thích</span>
            </div>
            {checkLoginHeader != true ? (
              <div className="header-container-top-right-btn">
                <Button onClick={() => showPageLogin()}>Đăng nhập</Button>
                <Button onClick={() => showPageSignUp()}>Đăng ký </Button>
              </div>
            ) : (
              <div className="header-container-top-right-icon pointer">
                <FaUserCircle className="icon-love" />
                <span>
                  {JSON.parse(localStorage.getItem("user")).firstName}{" "}
                  {JSON.parse(localStorage.getItem("user")).lastName}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="header-container-nav">
          <div className="container">
            <div
              className="hotel pointer"
              onClick={() => {
                history.push("/");
              }}
            >
              <img src={iconkhachsan} alt="" />
              <p>Khách sạn</p>
            </div>
            <div className="restaurant pointer">
              <img src={iconrestaurant} alt="" />
              <p>Nhà hàng</p>
            </div>
            <div className="combo-cheap pointer">
              <img src={iconcombotietkiem} alt="" />
              <p>Combo tiết kiệm</p>
            </div>
            <div className="sale pointer">
              <img src={iconsale} alt="" />
              <p>Ưu đãi hôm nay</p>
            </div>
            <div className="handbook pointer ">
              <img src={iconcamnang} alt="" />
              <p>Cẩm nang</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tongle-sidebar-vertical">
        <div
          className={` ${
            showVerticalSidebar === true
              ? "show-sidebar-vertical"
              : "hide-sidebar-vertical"
          }`}
        >
          <div className="sidebar-vertical-profile pointer">
            <img src={anhgai} alt="anhgai" />
          </div>
          <div className="sidebar-vertical-item pointer">
            <img src={icontrangchu} alt="icontrangchu" />
            <p>Trang chủ</p>
          </div>
          {checkLoginHeader && (
            <div
              className="sidebar-vertical-item pointer"
              onClick={() => {
                setIsActive(2)
                history.push("/profile");
                hideSidebarVertical();
              }}
            >
              <img src={icondatchocuatoi} alt="icondatchocuatoi" />
              <p>Đặt chỗ của tôi</p>
            </div>
          )}

          <div className="sidebar-vertical-item pointer">
            <img src={iconlienhe} alt="iconlienhe" />
            <p>Liên hệ</p>
          </div>

          <div className="sidebar-vertical-item pointer">
            <img src={iconkhachsan} alt="" />
            <p>Khách sạn</p>
          </div>
          <div className="sidebar-vertical-item pointer">
            <img src={iconrestaurant} alt="" />
            <p>Nhà hàng</p>
          </div>
          <div className="sidebar-vertical-item pointer">
            <img src={iconcombotietkiem} alt="" />
            <p>Combo tiết kiệm</p>
          </div>
          <div className="sidebar-vertical-item pointer">
            <img src={iconsale} alt="" />
            <p>Ưu đãi hôm nay</p>
          </div>
          <div className="sidebar-vertical-item pointer ">
            <img src={iconcamnang} alt="" />
            <p>Cẩm nang</p>
          </div>

          <div className="sidebar-vertical-item pointer">
            <img src={icontrogiup} alt="icontrogiup" />
            <p>Hỗ trợ</p>
          </div>
          {checkLoginHeader && (
            <div
              className="sidebar-vertical-item pointer"
              onClick={() => handelLogOut()}
            >
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/1828/1828490.svg"
                alt="icontrogiup"
              />
              <p>Đăng xuất</p>
            </div>
          )}
        </div>
        <div
          className={`${
            showVerticalSidebar === true
              ? "showWith-show-sidebar-vertical "
              : "hideWith-show-sidebar-vertical "
          } `}
          onClick={() => hideSidebarVertical()}
        ></div>
      </div>
      <Login
        showLogin={showLogin}
        hidePageLogin={hidePageLogin}
        showPageLogin={showPageLogin}
        showPageSignUp={showPageSignUp}
        setCheckLoginHeader={setCheckLoginHeader}
      ></Login>
      <SignUp
        showSignUp={showSignUp}
        hidePageSignUp={hidePageSignUp}
        showPageSignUp={showPageSignUp}
        showPageLogin={showPageLogin}
        setCheckLoginHeader={setCheckLoginHeader}
      ></SignUp>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { account } = state.authReducer;
  return {
    account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAccount: (params) => dispatch(getUserAccount(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
