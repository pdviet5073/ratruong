import React, { useEffect, useState } from "react";

import { Form, Input, Button, Select, Switch } from "antd";
import {connect} from "react-redux";
import history from '../../../util/history';
import {editProfile} from "../../../redux/actions"
import "./styles.css";

function Account({
  editProfile,
  userDataEdited,
  
}) {
  const { Option } = Select;

  const [formName,formPhone,formPassword] = Form.useForm();
  const [activeEditName, setActiveEditName] = useState(false);
  const [activeEditPhone, setActiveEditPhone] = useState(false);
  const [activeEditPassword, setActiveEditPassword] = useState(false);
  const [checkNotificationBooking, setCheckNotificationBooking] = useState(false);
  const [checkNotificationEmail, setCheckNotificationEmail] = useState(false);
  const [checkNotificationTrip, setCheckNotificationTrip] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {

  }, []);
  const onEditProfile = (value, type) => {
    editProfile({
      id:user.id,
      ...value.firstName && {firstName: value.firstName},
      ...value.password && {password: value.password},
      ...value.lastName && {lastName: value.lastName},
      ...value.phone && {phone: value.phone}
    
    })
  };
  
  return (
    <div className="account">
      <h1>Thông tin người dùng</h1>

      <div className={`account-item ${activeEditName && "account-item-edit"}`}>
        <div
          className={` ${
            activeEditName ? "account-item-hidden" : "account-name"
          } `}
        >
          <div className="account-item-left">
            <div className="first-character">
              <span>{user.firstName.slice(0, 1)}</span>
            </div>
            <div className="account-item-name">
              <h2 className="account-item-title">Họ &#38; tên</h2>
              <p className="account-item-content">
                {user.firstName + " " + user.lastName}
              </p>
            </div>
          </div>
          <div
            className="account-item-right"
            onClick={() => setActiveEditName(!activeEditName)}
          >
            <span>Chỉnh sửa</span>
          </div>
        </div>
        <div
          className={`  ${
            activeEditName ? "account-edit-active" : "account-edit"
          }`}
        >
          <Form
            layout="vertical"
            form={formName}
            className="edit-name"
            name="edit-name"
            onFinish={(values) => onEditProfile(values, "name")}
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
            }}
            preserve={false}
            requiredMark={false}
            scrollToFirstError
          >
            <Form.Item
              name="firstName"
              label="Họ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Tên và tên đệm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                className="btn cancel"
                onClick={() => setActiveEditName(!activeEditName)}
              >
                Huỷ
              </Button>
              <Button className="btn " htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="account-item">
        <div className="account-email">
          <h2 className="account-item-title">Email</h2>
          <p className="account-item-content">
            {user.email} <span>Đã xác nhận</span>
          </p>
        </div>
      </div>
      <div className={`account-item ${activeEditPhone && "account-item-edit"}`}>
        <div
          className={` ${
            activeEditPhone ? "account-item-hidden" : "account-phone"
          } `}
        >
          <div>
            <h2 className="account-item-title">Số điện thoại</h2>
            <p className="account-item-content">{user.phone} </p>
          </div>
          <div
            className="account-item-right"
            onClick={() => setActiveEditPhone(!activeEditPhone)}
          >
            Chỉnh sửa
          </div>
        </div>
        <div
          className={` ${
            activeEditPhone ? "account-edit-active" : "account-edit "
          }`}
        >
          <Form
            layout="vertical"
            form={formPhone}
            className="edit-phone"
            name="edit-phone"
            onFinish={(values) => onEditProfile(values, "phone")}
            initialValues={{
              phone: user.phone,
            }}
            preserve={false}
            requiredMark={false}

            scrollToFirstError
          >
            <Form.Item
              name="prefix"
              label="Mã điện thoại quốc gia"
              style={{ width: "43rem" }}
            >
              <Select
                label="Mã điện thoại quốc gia"
                size="large"
                defaultValue="--Vui lòng chọn mã số quốc gia--"
              >
                <Option value="84">+84</Option>
                <Option value="87">+87</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  pattern: "(09|03|08[2|6|8|9])+([0-9]{7})",
                  len: 10,
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                className="btn cancel"
                onClick={() => setActiveEditPhone(!activeEditPhone)}
              >
                Huỷ
              </Button>
              <Button className="btn " htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        className={` account-item ${activeEditPassword && "account-item-edit"}`}
      >
        <div
          className={` ${
            activeEditPassword ? "account-item-hidden" : "account-password"
          } `}
        >
          <div>
            <h2 className="account-item-title">Mật khẩu</h2>
            <p className="account-item-content account-item-content-password">
              &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;
            </p>
          </div>
          <div
            className="account-item-right"
            onClick={() => setActiveEditPassword(!activeEditPassword)}
          >
            Chỉnh sửa
          </div>
        </div>
        <div
          className={` account-edit   ${
            activeEditPassword && "account-edit-password-active"
          }`}
        >
          <Form
            layout="vertical"
            form={formPassword}
            className="edit-password"
            name="edit-password"
            onFinish={(values) => onEditProfile(values,"password")}
            preserve={false}
            scrollToFirstError
            requiredMark={false}
          >
            <Form.Item
              name="currentPassword"
              label="Mật khẩu hiện tại"
              style={{ width: "43rem" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu không được nhỏ hơn 6 kí tự",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu mới"
              style={{ width: "43rem" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu không được nhỏ hơn 6 kí tự",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("currentPassword") !== value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "Mật khẩu mới không được trùng với mật khẩu hiện tại!"
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Nhập lại mật khẩu mới"
              style={{ width: "43rem" }}
              onFinish={(values) => onEditProfile(values)}
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại!",
                },
                {
                  min: 6,
                  message: "Mật khẩu không được nhỏ hơn 6 kí tự",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "Mật khẩu đó không khớp.Hãy thử lại!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                className="btn cancel"
                onClick={() => setActiveEditPassword(!activeEditPassword)}
              >
                Huỷ
              </Button>
              <Button className="btn " htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="account-item-check">
        <div className="account-notifications">
          <div className="account-item-left">
            <h2 className="account-item-title">
              Tôi muốn nhận thông tin nhắc nhở hỗ trợ đặt phòng.
            </h2>
          </div>
          <div className="account-item-right">
            <span>{checkNotificationBooking ? "Có" : "Không"}</span>
            <Switch
              onChange={(value) => setCheckNotificationBooking(value)}
            ></Switch>
          </div>
        </div>
      </div>

      <div className="account-item-check">
        <div className="account-notifications">
          <div className="account-item-left">
            <h2 className="account-item-title">
              Tôi muốn nhận email về khuyến mãi Arya.
            </h2>
          </div>
          <div className="account-item-right">
            <span>{checkNotificationEmail ? "Có" : "Không"}</span>
            <Switch
              onChange={(value) => setCheckNotificationEmail(value)}
            ></Switch>
          </div>
        </div>
      </div>
      <div className="account-item-check">
        <div className="account-notifications">
          <div className="account-item-left">
            <h2 className="account-item-title">
              Tôi muốn biết thông tin và ưu đãi liên quan đến chuyến đi sắp tới
              của mình.
            </h2>
          </div>
          <div className="account-item-right">
            <span>{checkNotificationTrip ? "Có" : "Không"}</span>
            <Switch
              onChange={(value) => setCheckNotificationTrip(value)}
            ></Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const {userDataEdited} = state.editProfileReducer
  return {
    userDataEdited
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    editProfile: (params) => dispatch(editProfile(params))
  } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);
