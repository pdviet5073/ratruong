import React, { useEffect, useState } from "react";
import history from "../../util/history";
import { connect } from "react-redux";
import { getRoomBooking, setBooking } from "../../redux/actions";
import { Rate, Input } from "antd";

import iconmaps from "../../images/listHotel/iconmaps.svg";

import "./styles.css";

function InfoRoomBooking({
  checkPagePay,
  match,
  tempBooking,
  setBooking,
  roomBookingData,
  getRoomBooking,
  setInfoBooking
}) {
  const dateTime = JSON.parse(sessionStorage.getItem("date"));
  const infoUserBooking = JSON.parse(sessionStorage.getItem("infoUserBooking"));
  // const [idHotel, setIdHotel] = useState(() => {
  //   const id = JSON.parse(sessionStorage.getItem("idHotel"))
  //   return id.id
  // })
  const hotelsId = match.params.idHotel;
  const roomId = match.params.idRoom;

  useEffect(() => {
    getRoomBooking({
      idHotel: hotelsId,
      idRoom: roomId,
    });
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("infoUserBooking");
    };
  }, []);
  const infoHotel = roomBookingData.slice(0, 1);
  const room = roomBookingData.slice(1);

  //tính lệch ngày
  const diffDays = () => {
    let dateCheckIn = new Date(`${dateTime.checkIn}`);
    let dateCheckOut = new Date(`${dateTime.checkOut}`);
    let diffTime = Math.abs(dateCheckOut - dateCheckIn);
    const countDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const tempCountDay = countDay === 0 ? 1 : countDay;
    return tempCountDay;
  };

  const renderInformationRoom = () => {
    return room.map((item, index) => (
      <div
        className="information-room-content"
        key={`information-room-${item.id}-${index}`}
      >
        <h2>Thông tin đơn đặt phòng</h2>
        <div className="information-room-image">
          <img src={item.image[0].src} alt={item.image[0].alt} />
        </div>
        <div className="info-hotel">
          {infoHotel.map((itemHotel) => {
            setInfoBooking({
              roomId: item.id,
              hotelId:itemHotel.id,
              hotelName: itemHotel.name,
              address:itemHotel.address,
              roomName: item.name,
              rate:itemHotel.rate,
              imageHotel: item.image[0].src,
              checkIn: dateTime.checkIn,
              checkOut: dateTime.checkOut,
              price:  ( item.price * diffDays() + item.price * diffDays() * 0.05 + 10).toLocaleString(),
            })
            return (
              <>
                <div className="information-room-title">
                  <span>{itemHotel.name}</span>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={itemHotel.rate}
                    className="information-room-rate"
                  ></Rate>
                </div>
                <div className="information-room-address">
                  <img src={iconmaps} alt="iconmaps" />
                  <span>{itemHotel.address}</span>
                </div>
              </>
            );
          })}
        </div>

        <div className="space-between">
          <span>Loại phòng</span>
          <span>{item.name}</span>
        </div>
      

        <div className="date-check-in space-between">
          <span>Ngày nhận phòng</span>
          <span>{dateTime.checkIn}</span>
        </div>
        <div className="date-check-out space-between">
          <span>Ngày trả phòng</span>
          <span>{dateTime.checkOut}</span>
        </div>
        <div className="space-between">
          <span>Giá phòng</span>
          <span>{item.price.toLocaleString()} đ/1 đêm</span>
        </div>
        <div className="number-nights space-between">
          <span>Số đêm</span>
          <span>{diffDays()}</span>
        </div>
        <div>
          <div className="space-between">
            <span></span>
            <a href="#">Sửa</a>
          </div>
        </div>
        <div className="price-room space-between">
          <span>Giá từ khách sạn</span>
          <span>{(item.price * diffDays()).toLocaleString()} đ</span>
        </div>
        <div className="vat space-between">
          <span>VAT và dịch vụ khách sạn</span>
          <span>
            {Math.ceil(item.price * diffDays() * 0.05 + 10).toLocaleString()} đ
          </span>
        </div>
        <div className="total-price space-between">
          <h2>Tổng tiền:</h2>
          <span>
            {(
              item.price * diffDays() +
              item.price * diffDays() * 0.05 +
              10
            ).toLocaleString()}{" "}
            đ
          </span>
        </div>
      </div>
    ));
  };
  return (
    <div className="information-room">
      <div className="information-room-container">
        {renderInformationRoom()}
      </div>
      {checkPagePay === true && (
        <>
          <div className="information-room-code-discount">
            <div>
              <Input.Search
                placeholder="Nhập mã giảm giá"
                allowClear
                enterButton="Áp dụng"
                size="large"
              />
            </div>
          </div>

          <div className="information-room-user">
            <div>
              <h3>Thông tin đặt phòng</h3>
            </div>
            <div className="space-between">
              <span>Người đặt phòng</span>
              <span>{infoUserBooking.name}</span>
            </div>
            <div className="space-between">
              <span>Số điện thoại</span>
              <span>{infoUserBooking.phone}</span>
            </div>
            <div className="space-between">
              <span>Email</span>
              <span>{infoUserBooking.email}</span>
            </div>
            <div className="space-between">
              <span>CMND</span>
              <span>{infoUserBooking.cmnd}</span>
            </div>
            <div className="space-between">
              <span>Người nhận phòng</span>
              <span>{infoUserBooking.namePersonCheckIn}</span>
            </div>
            {infoUserBooking.phone != infoUserBooking.phonePersonCheckIn && (
              <div className="space-between">
                <span>Số điện thoại</span>
                <span>{infoUserBooking.phonePersonCheckIn}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { roomBookingData,  } = state.bookingReducer;
  return {
    roomBookingData,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRoomBooking: (params) => dispatch(getRoomBooking(params)),
    setBooking: (params) => dispatch(setBooking(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoRoomBooking);
