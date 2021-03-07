import React, { useEffect, useState } from 'react';
import history from "../../util/history";
import { connect } from 'react-redux';
import { getRoomBooking, getHotelDetail, setBooking } from "../../redux/actions";
import { Pagination, Rate, Form, Input, DatePicker, Button, Checkbox, Select } from 'antd';
import moment from "moment";

import "./styles.css";

function InformationBooking({
  setCheckPagePay,
  setBooking,
  match,
  infoBooking
}) {
  const [checkPersonCheckIn, setCheckPersonCheckIn] = useState(true)
  
  const [form] = Form.useForm();
  const roomId = match.params.idRoom;
  const place = match.params.place;
  const hotelId = match.params.idHotel;



  const informationUser = JSON.parse(localStorage.getItem("user"));
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="84">+84</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );
  const prefixName = (
    <Form.Item name="prefixName" noStyle>
      <Select
        style={{
          width: 80,
        }}
      >
        <Select.Option value="Anh">Anh</Select.Option>
        <Select.Option value="Chị">Chị</Select.Option>
        <Select.Option value="Khác">Khác</Select.Option>

      </Select>
    </Form.Item>
  );
  const handelCheckPersonCheckIn = (value) => {
    setCheckPersonCheckIn(!checkPersonCheckIn)
  }
  const submitInformationUser = (value) => {
    const infoUserBooking = {
      email: value.email,
      userName: value.name,
      phone: value.phone,
      remember: value.remember,
      cmnd: value.cmnd,
      namePersonCheckIn: (checkPersonCheckIn ? value.name :value.namePersonCheckIn),
      phonePersonCheckIn: (checkPersonCheckIn ? value.phone :value.phonePersonCheckIn)
    }
    
      setBooking({
        userId: informationUser.id,
        ...infoBooking,
      ...infoUserBooking,
      dateBooking:moment().startOf("day").format("L"),
      status: false
      })
    const infoUser = JSON.stringify(infoUserBooking);
    sessionStorage.setItem("infoUserBooking", infoUser);

    setCheckPagePay(true)
    history.push(`/booking/${place}/${hotelId}/${roomId}/step-2`)
  }
  return (
    <>
      <div className="information-booking">
        <h1>Thông tin đặt phòng</h1>
        <div >
          <div>
            <h3>Thông tin người đặt phòng</h3>
          </div>
          <div className="information-user">
            <Form
              layout="vertical"
              form={form}
              name="formInfoUser"
              onFinish={submitInformationUser}
              initialValues={{
                name: informationUser.firstName + " " + informationUser.lastName,
                phone: informationUser.phone,
                cmnd: "",
                email: informationUser.email,
                prefix: "+84",
                prefixName: "Anh",
                remember: true,
                namePersonCheckIn: "",
                phonePersonCheckIn: ""
              }}
              scrollToFirstError
            >
              <div className="information-user-line-1th">

                <Form.Item
                  name="name"

                  span={6}
                  label="Họ và tên"
                  rules={[

                    {
                      required: true,
                      message: 'Hãy nhập họ tên của bạn!',
                    },
                  ]}
                >
                  <Input addonBefore={prefixName} />
                </Form.Item>
                <Form.Item
                  name="cmnd"

                  label="CMND/Căn cước công dân"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>


              <div className="information-user-line-2th">
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  span={6}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}

                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Địa chỉ email"
                  rules={[

                    {
                      required: true,
                      message: 'Yêu cầu nhập địa chỉ email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="person-check-in-room">
                <Form.Item name="remember" valuePropName="checked" noStyle  >
                  <Checkbox onChange={handelCheckPersonCheckIn}>Tôi là người nhận phòng</Checkbox>
                </Form.Item>
                {checkPersonCheckIn != true && (
                  <div className="person-check-in-room-info">
                    <h3>Thông tin người nhận phòng</h3>
                    <div >


                      <Form.Item
                        name="namePersonCheckIn"

                        span={6}
                        label="Họ và tên"
                        rules={[

                          {
                            required: true,
                            message: 'Hãy nhập họ tên người nhận phòng!',
                          },
                        ]}
                      >
                        <Input addonBefore={prefixName} />
                      </Form.Item>
                      <Form.Item
                        name="phonePersonCheckIn"
                        label="Số điện thoại"
                        span={6}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại người nhận phòng!",
                          },
                        ]}
                      >
                        <Input
                          addonBefore={prefixSelector}

                        />
                      </Form.Item>
                    </div>
                  </div>
                )}
              </div>
              <div className="information-user-btn">
                <Form.Item>
                  <Button
                  >
                    Quay lại
                  </Button>
                  <Button

                    htmlType="submit"

                  >
                    Tiếp tục
                  </Button>
                </Form.Item>
              </div>

            </Form>
          </div>
          <div className="checkIn-person">
                          
          </div>
        </div>
      </div>
    </>
  );
}


const mapStateToProps = (state) => {
  const { roomBookingData,  } = state.bookingReducer;
  return {
    roomBookingData,
    
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRoomBooking: (params) => dispatch(getRoomBooking(params)),
    setBooking: (params) => dispatch(setBooking(params)),


  };
}
export default connect(mapStateToProps, mapDispatchToProps)(InformationBooking);
