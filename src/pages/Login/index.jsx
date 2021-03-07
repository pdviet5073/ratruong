import React, { useState, useEffect } from "react";
import history from "../../util/history";
import { connect } from "react-redux";

import { Form, Input, Button, Modal } from "antd";
import signuppanner from "../../images/headerImages/signuppanner.svg";
import googlelogo from "../../images/headerImages/googlelogo.png";
import facebooklogo from "../../images/headerImages/facebooklogo.png";
import applelogo from "../../images/headerImages/applelogo.png";

import { getUserAccount } from "../../redux/actions";
import { ToastContainer, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

function Login({
  showLogin,
  hidePageLogin,
  showPageLogin,
  account,
  getUserAccount,
  setCheckLoginHeader,
  showPageSignUp,
}) {
  useEffect(() => {
    if (account) {
      hidePageLogin();
      setCheckLoginHeader(true);
    }
  }, [account]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    getUserAccount({
      email: values.email,
      password: values.password,
    });
  };

  const renderFormLogin = () => {
    return (
      <Form
        layout="vertical"
        form={form}
        name="register"
        onFinish={(value) => onFinish(value)}
        initialValues={{
          email: "",
          password: "",
        }}
        scrollToFirstError
        preserve={false}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Định dạng địa chỉ email không hợp lệ.!",
            },
            {
              required: true,
              message: "Yêu cầu nhập địa chỉ email!",
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

        <div className="forgot-password">
          <a href="">Quên Mật Khẩu?</a>
        </div>
        <Form.Item>
          <Button
            type="primary"
            className="login-button login-button"
            htmlType="submit"
          >
            Đăng nhập
          </Button>
          <div className="loginContainer-body-title">
            Khi đăng nhập, tôi đồng ý với các <a href=""> Điều khoản sử dụng</a>{" "}
            và <a href=""> Chính sách bảo mật</a> của Arya.
          </div>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div>
      <Modal
        className="loginModal"
        maskClosable="true"
        visible={showLogin}
        width={840}
        onCancel={hidePageLogin}
        onOk={showPageLogin}
        centered="true"
        destroyOnClose={true}
      >
        <div className="loginModal-container">
          <div className="loginModal-content ">
            <div className="left-panner">
              <div className="loginContainer">
                <div className="loginContainer-header">
                  <h3>Đăng nhập</h3>
                </div>
                <div className="loginContainer-body">{renderFormLogin()}</div>
                <div className="loginContainer-social">
                  <div className="loginContainer-social-note" offset={2}>
                    <div className="horizontal-line"> </div>
                    <span>Hoặc tiếp tục với</span>
                    <div className="horizontal-line"> </div>
                  </div>
                  <div className="loginContainer-social-button">
                    <div className="social-google-button social-button" > 
                      <div className="social-button-item">
                        <img src={googlelogo} alt="googlelogo" />
                        <span>Google</span>
                      </div>
                    </div>
                    <div className="facebook-apple-button">
                      <div className="login-social-facebook-button social-button">
                        <div className="social-button-item">
                          <img src={facebooklogo} alt="facebooklogo" />
                          <span>Facebook</span>
                        </div>
                      </div>
                      <div className="login-social-apple-button social-button">
                        <div className="social-button-item">
                          <img src={applelogo} alt="applelogo" />
                          <span>Apple</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="loginContainer-footer">
                    <div className="footer-horizontal-line "></div>
                    <div className="loginContainer-footer-item">
                      <div span>Chưa có tài khoản?</div>
                      <div>
                        <Button
                          type="primary"
                          onClick={() => {
                            hidePageLogin();
                            showPageSignUp();
                          }}
                        >
                          Tạo tài khoản
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="login-right-panner">
              <div className="login-right-panner-container">
                <div className="right-panner-container-image">
                  <img src={signuppanner} alt="loginpanner" />
                </div>
                <div className="logIn-right-panner-text">
                  <p>
                    RẺ HƠN đến <span>30%</span> với Ưu đãi nội bộ của Arya!Giá
                    giảm ngay khi bạn đăng nhập, quy trình đặt phòng nhanh hơn,
                    và trải nghiệm tuyệt vời hơn.
                  </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
