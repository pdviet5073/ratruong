import React, { useEffect, useState } from "react";

import Account from "./account";
import Order from "./order";
import Review from "./review";
import Dashboard from "./dashboard";
import Voucher from "./voucher";
import { BiCalendarCheck, BiUserPin } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { FaGifts } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";

import "./styles.css";

function Profile({setIsActive,isActive}) {
  const changeStyleLi = (number) => {
    setIsActive(number);
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-container ">
          <div className="profile-nav">
            <ul className="profile-list">
              <li
                onClick={() => changeStyleLi(0)}
                className={
                  isActive === 0
                    ? `profile-nav-item-active`
                    : "profile-nav-item "
                }
              >
                <RiDashboardFill></RiDashboardFill>Dashboard
              </li>
              <li
                onClick={() => changeStyleLi(1)}
                className={
                  isActive === 1
                    ? `profile-nav-item-active`
                    : "profile-nav-item "
                }
              >
                <FaGifts></FaGifts>Voucher của bạn
              </li>
              <li
                onClick={() => changeStyleLi(2)}
                className={
                  isActive === 2
                    ? `profile-nav-item-active`
                    : "profile-nav-item "
                }
              >
                <BiCalendarCheck></BiCalendarCheck>Đặt chỗ của tôi
              </li>
              <li
                onClick={() => changeStyleLi(3)}
                className={
                  isActive === 3
                    ? `profile-nav-item-active`
                    : "profile-nav-item "
                }
              >
                <MdAssessment></MdAssessment>Đánh giá
              </li>
              <li
                onClick={() => changeStyleLi(4)}
                className={
                  isActive === 4
                    ? `profile-nav-item-active`
                    : "profile-nav-item "
                }
              >
                <BiUserPin></BiUserPin>Tài khoản
              </li>
              <li style={{ top: `calc(${isActive} * 6rem)` }}></li>
            </ul>
          </div>
          <div className="profile-content">
            <div className="profile-item">
              {isActive === 0 ? (
                <Dashboard></Dashboard>
              ) : isActive === 1 ? (
                <Voucher></Voucher>
              ) : isActive === 2 ? (
                <Order></Order>
              ) : isActive === 3 ? (
                <Review></Review>
              ) : (
                <Account></Account>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
