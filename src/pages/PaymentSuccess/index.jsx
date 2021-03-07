import React from "react";
import success from "../../images/Success/check.svg";
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
import history from "../../util/history";

import "./styles.css";

function PaymentSuccess() {
  return (
    <div className="success">
      <div className="modal ">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <img src={success} alt="success" />
              <h4 className="modal-title">Đặt phòng thành công!</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
              </p>
            </div>
            <div className="modal-footer">
              <Button
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => history.push("/profile")}
              >
                Quản lý
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
