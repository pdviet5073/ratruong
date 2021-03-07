import React, {  useEffect } from "react";
import { connect } from "react-redux";
import history from '../../util/history';

import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Modal,
} from "antd";
import signuppanner from "../../images/headerImages/signuppanner.svg";
import googlelogo from "../../images/headerImages/googlelogo.png";
import facebooklogo from "../../images/headerImages/facebooklogo.png";
import applelogo from "../../images/headerImages/applelogo.png";

import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createUserAccount } from "../../redux/actions";


import "./styles.css";
const { Option } = Select;

function SignUp({
  createAccount,
  createUserAccount,
  showSignUp,
  hidePageSignUp,
  showPageSignUp,
  showPageLogin,
  setCheckLoginHeader
}) {
  const [form] = Form.useForm();
  useEffect(()=>{
    if(createAccount){
      setCheckLoginHeader(true)
      hidePageSignUp()
    }
  },[createAccount])

  const onFinish = (values) => {
    createUserAccount({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    });
    history.push("/")
    
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const renderFormSignUp = () => {
    return (
      <Form
        layout="vertical"
        form={form}
        name="register"
        onFinish={(values) => onFinish(values)}
        initialValues={
          (showSignUp === true ?{
            prefix: "+84",
            email: "",
            password: "",
            confirmPassword:"",
            firstName: "",
            lastName: "",
            agreement: false
          } : {prefix: "+84"}
            )
        }
        preserve={false}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              max: 80,
              message: "Email không được vượt quá 80 ký tự!",
            },
            {
              type: "email",
              message: "Định dạng địa chỉ email không hợp lệ.",
            },
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              max: 20,
              message: "Mật khẩu không được quá 20 ký tự!",
            },
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 6,
              message: "Mật khẩu không được nhỏ hơn 6 kí tự.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              max: 20,
              message: "Mật khẩu không được quá 20 ký tự!",
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

                return Promise.reject("Mật khẩu không khớp.Hãy thử lại!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="Họ"
          rules={[
            {
              max: 20,
              message: "Họ không được quá 20 ký tự!",
            },

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
              max: 20,
              message: "Tên và tên đệm không được quá 20 ký tự!",
            },
            {
              required: true,
              message: "Vui lòng nhập tên và tên đệm !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          span={6}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
            {
              pattern: (/(03|05|07|08|09)+([0-9]{8})\b/),
              message: 'Số điện thoại không hợp lệ!'
          }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Vui lòng hoàn tất việc kiểm tra (ở trên)!"),
            },
          ]}
        >
          <Checkbox>
            Nhận email về các khuyến mãi độc quyền từ Arya. Tôi có thể bỏ đăng
            ký bất kỳ lúc nào như đã nêu trong Chính sách Bảo mật.
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button className="signUp-button" htmlType="submit">
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div>
      <Modal
        maskClosable="true"
        title="Đăng ký"
        visible={showSignUp}
        width={840}
        onCancel={hidePageSignUp}
        onOk={showPageSignUp}
        centered="true"
        className="SignUpModal"
        destroyOnClose={true}
      >
        <div className="SignUpModal-container">
          <div className="SignUpModal-content">
            <div className="left-panner">
              <div className="SignUpContainer">
                <div className="SignUpContainer-header">
                  <h3>Tạo tài khoản</h3>
                </div>
                <div className="SignUpContainer-body">{renderFormSignUp()}</div>
                <div className="SignUpContainer-social">
                  <div className="SignUpContainer-social-note" offset={2}>
                    <div className="horizontal-line"> </div>
                    <span>Hoặc tiếp tục với</span>
                    <div className="horizontal-line"> </div>
                  </div>
                  <div className="SignUpContainer-social-button">
                    <div className="social-google-button social-button">
                      <div className="social-button-item">
                        <img src={googlelogo} alt="googlelogo" />
                        <span>Google</span>
                      </div>
                    </div>
                    <div className="facebook-apple-button">
                      <div className="social-facebook-button social-button">
                        <div className="social-button-item">
                          <img src={facebooklogo} alt="facebooklogo" />
                          <span>Facebook</span>
                        </div>
                      </div>
                      <div className="social-apple-button social-button">
                        <div className="social-button-item">
                          <img src={applelogo} alt="applelogo" />
                          <span>Apple</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="SignUpContainer-footer">
                    <div className="footer-horizontal-line"> </div>
                    <div className="SignUpContainer-footer-item">
                      <div span>Bạn đã có tài khoản?</div>
                      <div>
                        <Button type="primary" onClick={() => {
                          hidePageSignUp()
                          showPageLogin()
                        }}>Đăng nhập</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-panner">
              <div className="right-panner-container">
                <div className="right-panner-container-image">
                  <img src={signuppanner} alt="signuppanner" />
                </div>
                <div className="right-panner-container-text">
                  <p>
                    RẺ HƠN đến <span>30%</span> với Ưu đãi nội bộ của Arya!
                  </p>
                  <p> Giá giảm ngay khi bạn đăng ký.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
const mapStateToProps = (state) => {
  const { createAccount } = state.authReducer;
  return {
    createAccount
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUserAccount: (params) => dispatch(createUserAccount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
