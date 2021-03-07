import React, { useState, useEffect } from "react";
import { Radio, Button } from "antd";
import history from "../../util/history";
import { connect } from "react-redux";

import { getRoomBooking,setPayment } from "../../redux/actions";

import "./styles.css";
function Payment({ setCheckPagePay , match, setPayment, payment,setBookingData}) {
  const roomId = match.params.idRoom;
  const place = match.params.place;
  const hotelId = match.params.idHotel;
  const [showCardVisa, setShowCardVisa] = useState(false);
  const [showCardATM, setShowCardATM] = useState(false);

  useEffect(() => {
    return () => {
      setCheckPagePay(false);
    };
  }, []);
  const arrImage = [
    "VTB",
    "VCB",
    "SCB",
    "VTB",
    "BIDV",
    "DAB",
    "ACB",
    "VTB",
    "TPB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
    "VTB",
  ];
  const onChangeRadio = (e) => {
    if (e.target.value === 2) {
      setShowCardVisa(true);
      setShowCardATM(false);
    } else if (e.target.value === 3) {
      setShowCardATM(true);
      setShowCardVisa(false);
    } else {
      setShowCardATM(false);
      setShowCardVisa(false);
    }
  };
  const onSubmitPayment = () => {
    setPayment({
      bookRoomId: setBookingData.id
    })
    history.push(`/booking/${place}/${hotelId}/${roomId}/step-3`)

  }
  return (
    <div className="pay-room">
      <div className="pay-room-container">
        <h1>Chọn hình thức thanh toán</h1>
        <div className="pay-room-content">
          <Radio.Group
            name="radiogroup"
            defaultValue={1}
            onChange={onChangeRadio}
          >
            <div className="pay-room-item">
              <Radio value={1}> Thanh toán trực tiếp tại khách sạn</Radio>
            </div>
            <div className="pay-room-item">
              <Radio value={2}>
                <img
                  src="https://statics.vntrip.vn/images/checkout/i-visa.png"
                  alt=""
                />{" "}
                Thanh toán bằng thẻ quốc tế Visa, Master, JCB
              </Radio>
              {showCardVisa && (
                <div className="visa">
                  <Radio>Nhập số thẻ mới</Radio>
                  <div>
                    <img
                      src="https://salt.tikicdn.com/ts/upload/a9/0a/02/f9998a79412e57041d77f92745e797ec.png"
                      alt=""
                    />
                    <img
                      src="https://salt.tikicdn.com/ts/upload/3b/63/a8/b48c8ea6f5eef4aecdd6e96028600067.png"
                      alt=""
                    />
                    <img
                      src="https://salt.tikicdn.com/ts/upload/a4/29/bd/789096005df664678e28e541b1332ce2.png"
                      alt=""
                    />
                    <img
                      src="https://salt.tikicdn.com/ts/upload/64/dd/13/7e66c599912fdfd723f3db61b0f9ec8b.png"
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="pay-room-item">
              <Radio value={3}>
                <img
                  src="https://statics.vntrip.vn/images/checkout/i-domestic.png"
                  alt=""
                />
                Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)
              </Radio>
              {showCardATM && (
                <div className="pay-room-item-hide">
                  <div className="atm">
                    {arrImage.map((item, index) => (
                      <span key={`atm-${index}`}>
                        <img
                          src={`https://salt.tikicdn.com/assets/img/zalopaygw/${item}.jpg`}
                          alt="vtb"
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="pay-room-item">
              <Radio value={4}>
                <img
                  src="https://statics.vntrip.vn/images/checkout/i-momo.png"
                  alt="anhmomo"
                />
                Thanh toán bằng ví MoMo
              </Radio>
            </div>
            <div className="pay-room-item">
              <Radio value={5}>
                <img
                  src="https://statics.vntrip.vn/images/checkout/i-zalopay.png"
                  alt="anhmomo"
                />
                Thanh toán bằng ZaloPay
              </Radio>
            </div>
          </Radio.Group>
          <div
            className="pay-room-content-button"
            onClick={() => onSubmitPayment()}
          >
            <Button>Thanh toán</Button>
          </div>
        </div>
      </div>
      
    
    </div>
  );
}

const mapStateToProps = (state) => {
  const { roomBooking,setBookingData } = state.bookingReducer;
  const { payment } = state.paymentReducer;

  return {
    roomBooking,
    setBookingData,
    payment
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRoomBooking: (params) => dispatch(getRoomBooking(params)),
    setPayment: (params) => dispatch(setPayment(params)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
