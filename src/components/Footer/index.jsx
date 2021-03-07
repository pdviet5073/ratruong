import React from "react";
import { Input,Button } from 'antd';
import "./styles.css";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

function Footer() {
  const arrCity = ["Khách sạn An Giang","Khách sạn Bà Rịa - Vũng Tàu","Khách sạn Bạc Liêu",
                  "Khách sạn Bình Dương","Khách sạn Bình Thuận","Khách sạn Cà Mau","Khách sạn Cần Thơ",
                  "Khách sạn Đà Nẵng","Khách sạn Điện Biên","Khách sạn Đồng Nai","Khách sạn Hà Giang",
                  "Khách sạn Hà Nội","Khách sạn Hải Dương","Khách sạn Hải Phòng","Khách sạn Tp.Hồ Chí Minh",
                  "Khách sạn Khánh Hòa","Khách sạn Lai Châu","Khách sạn Lạng Sơn ",
                  "Khách sạn Lâm Đồng","Khách sạn Lào Cai","Khách sạn Nghệ An","Khách sạn Ninh Bình","Khách sạn Quảng Bình",
                  "Khách sạn Quảng Nam","Khách sạn Quảng Ngãi","Khách sạn Quảng Ninh","Khách sạn Quảng Trị",
                  "Khách sạn Sóc Trăng","Khách sạn Sơn La","Khách sạn Tây Ninh","Khách sạn Thái Bình",
                  "Khách sạn Thái Nguyên","Khách sạn Thanh Hóa","Khách sạn Thừa Thiên - Huế","Khách sạn Tiền Giang",
                  "Khách sạn Trà Vinh","Khách sạn Tuyên Quang","Khách sạn Vĩnh Long","Khách sạn Vĩnh Phúc",
                  "Khách sạn Yên Bái","Khách sạn Cao Bằng","Khách sạn Gia Lai" ];

  const renderCity = () => {
   return arrCity.map((item, index) => (
      <span key={`city-item-${item}-${index}`} 
        className={`pointer ${(item==="Khách sạn Đà Nẵng" || item==="Khách sạn Hà Nội" || item==="Khách sạn Tp.Hồ Chí Minh" 
        ||item==="Khách sạn Thanh Hóa" ||item==="Khách sạn Lâm Đồng" ||item==="Khách sạn Khánh Hòa" || item==="Khách sạn Hà Giang" ) 
                  && `city-item-both`}`}
      >
        {item}
      </span>
   ))}
  
  return (
    <div className="footer">
      <div className="footer-city container">
        <div className="footer-city-title">
        <h3><b>Khách sạn theo tỉnh thành phố</b></h3>
        <span></span>
        </div>
        <div className="footer-city-container">
          {renderCity()}
        </div>
      </div>
      <div className="footer-info container">
        <div className="footer-info-col-1">
          <div>
           <p>   Về Arya</p>
            <p> Liên hệ</p>
           <p>  Điều khoản sử dụng</p>
           <p>  Quy chế hoạt động</p>
            <p> Chính sách bảo mật</p>
            <p> Blog du lịch</p>
            <p> Tuyển dụng</p>
            <p> Hợp tác đại lý</p>
          </div>
        </div>
        <div className="footer-info-col-2">
          <img
            src="https://statics.vntrip.vn/images/logo/appStore.png"
            alt=""
          />
          <img
            src="https://statics.vntrip.vn/images/logo/googlePlay.png"
            alt=""
          />
        </div>
        <div className="footer-info-col-3">
          <span><b>Công ty TNHH ARYA OTA</b></span>
          <span><b>Tầng 5 Tòa nhà D</b></span>
          <span>Số 08 Hà Văn Tính, Liên Chiểu, Đà Nẵng</span>
          <span>Email: <span style={{color:"#0084cb"}}>cskh@arya.com</span></span>
          <span>Hotline: <span style={{color:"#ff8917"}}>0868869736</span></span>
        </div>
        <div className="footer-info-col-4">
          <span><span>Du lịch thông minh!</span> Đăng ký nhận tin để lên kế hoạch cho kỳ nghỉ tới ngay từ bây giờ:</span>
          <div>
            <Input placeholder="Email của bạn"></Input>
            <Button>Đăng ký</Button>
          </div>
          <div>
            <img src="https://statics.vntrip.vn/images/logo_bocongthuong_blue.png" alt=""/>
            <img src="https://statics.vntrip.vn/images/logo_bocongthuong_red.png" alt=""/>
          </div>
        </div>
      </div>
      <div className="footer-bottom ">
       <div className="container  footer-bottom-container">
       <div className="footer-bottom-left">Bản quyền thuộc về Arya</div>
        <div className="footer-bottom-right">
          <a href="#">
            <FaFacebookSquare />
            <span>Facebook</span>
          </a>
          <a href="#">
            <FaInstagram />
            <span>Instagram</span>
          </a>
          <a href="#">
            <AiOutlineYoutube />
            <span>YouTube</span>
          </a>
        </div>
       </div>
      </div>
    </div>
  );
}

export default Footer;
