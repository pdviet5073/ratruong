import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import history from "../../../util/history";
import {
  Pagination,
  Rate,
  Input,
  DatePicker,
  Button,
  Checkbox,
  Slider,
  Radio,
  Select,
  Tooltip,
} from "antd";
import { getBooking } from "../../../redux/actions";
import iconmaps from "../../../images/listHotel/iconmaps.svg";

import "./styles.css";

function Order({ getBooking, bookingData }) {
  const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getBooking({
      userId: userData.id,
    });
  }, []);
  //render  list khách sạn
  const renderHotelList = () => {
    return bookingData.map((item, index) => (
      <div
        key={`hotel-${item.id}-${index}`}
        className="hotel-wrapper oder-wrapper"
      >
        <div className="hotel-wrapper-left">
          <img src={item.imageHotel} alt={item.hotelName}/>
        </div>
        <div className="hotel-wrapper-right ">
          <div className="hotel-wrapper-right-items oder-wrapper-middle-items">
            <div className="oder-wrapper-title">
              <h2>{item.hotelName}</h2>
              <div className="hotel-wrapper-right-item oder-wrapper-rate">
              <Rate disabled allowHalf defaultValue={item.rate}></Rate>
              </div>
            </div>
            <div className="oder-wrapper-address">
              <Tooltip
                placement="topRight"
                title={item.address}
                color="#ff9633"
              >
                <div className=" text-clamp">
                  <img src={iconmaps} alt="iconmaps" />
                  <span>{item.address}</span>
                </div>
              </Tooltip>
            </div>
            <div className="oder-wrapper-item">
              <span>Mã đặt phòng:</span><span className="oder-wrapper-code">{item.code}</span>
            </div>
            <div className="oder-wrapper-item">
              <span>Ngày đặt:</span><span>{item.dateBooking}</span>
            </div>
            <div className="oder-wrapper-item">
              <span>Nhận phòng:</span><span>{item.checkIn}</span>
            </div>
            <div className="oder-wrapper-item">
              <span>Trả phòng:</span><span>{item.checkOut}</span>
            </div>
            <div className="oder-wrapper-item">
              <span>Tình trạng:</span><span className={item.status? "oder-wrapper-status-true": "oder-wrapper-status-false"}>{item.status ? "Thành công" : "Thất bại"}</span>
            </div>
          </div>
          <div className="oder-wrapper-right">
            <div className="oder-wrapper-price"><p>Tổng cộng</p><p>{item.price.toLocaleString()}đ</p></div>
            <Button className="btn-lg btn-primary">Quản lý</Button>
          </div>
        </div>
      </div>
    ));
  };
  return <div>{renderHotelList()}</div>;
}
const mapStateToProps = (state) => {
  const { bookingData } = state.bookingReducer;
  return {
    bookingData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBooking: (params) => dispatch(getBooking(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
