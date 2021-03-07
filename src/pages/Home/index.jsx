import React from "react";
import { connect } from "react-redux";
import history from "../../util/history";
import SlideShow from "./SlideShow";
import moment from "moment";
import { DatePicker, Space, Input, Button } from "antd";
import "./styles.css";

import iconSearch from "../../images/homeImages/iconSearch.svg";
import icongiarenhat from "../../images/homeImages/icon-gia-re-nhat.svg";
import iconthanhtoanlinhhoat from "../../images/homeImages/icon-thanhtoan-linh-hoat.svg";
import iconhotline from "../../images/homeImages/icon-hotline.svg";
import anhDn from "../../images/homeImages/anh-trong-nuoc/DA-NANG.jpg";
import anhDaLat from "../../images/homeImages/anh-trong-nuoc/anh-da-lat.jpg";
import capnhatxuhuong from "../../images/homeImages/capnhatxuhuong.svg";
import combochudong from "../../images/homeImages/combochudong.svg";
import giamgiachothanhvien from "../../images/homeImages/giamgiachothanhvien.svg";
import combodonggia from "../../images/homeImages/combo0đ.svg";
import vemaybay from "../../images/homeImages/vemaybay.svg";
import combo0d from "../../images/homeImages/0đ.svg";

const { RangePicker } = DatePicker;

function Home() {
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  }

  return (
    <div className="home">
      <div className="home-slide">
        <div className="home-slide-container">
          <div className="home-slide-title"></div>
          <div className="home-slide-search">
            <div className="home-slide-search-input">
              <Input placeholder="Nhập địa điểm, khách sạn"></Input>
            </div>
            <div className="home-slide-search-dateTime">
              <RangePicker disabledDate={disabledDate}  placeholder={["Ngày đến", "Ngày đi"]}/>
              <div className="people">
                <Input placeholder="Nhập số người"></Input>
              </div>
              <div>
                <Button >
                  <img src={iconSearch}></img>Tìm Kiếm
                </Button>
              </div>
            </div>
          </div>
          <SlideShow />
          <div className="home-slide-service">
            <div className="home-slide-service-item">
              <img src={icongiarenhat} alt="icongiarenhat" />
              <h2>Rẻ hơn giá rẻ nhất</h2>
              <p>
                Ở đâu giá rẻ hơn,
                <span style={{ color: "#ff8917" }}>
                  {" "}
                  Thông báo ngay với Arya.vn
                </span>{" "}
                để được mua giá rẻ hơn rẻ nhất
              </p>
            </div>
            <div className="home-slide-service-item">
              <img src={iconthanhtoanlinhhoat} alt="iconthanhtoanlinhhoat" />
              <h2>Thanh toán linh hoạt &#38; an toàn </h2>
              <p>
                Chấp nhận mọi hình thức thanh toán, không cần thẻ tín dụng. Bảo
                mật tuyệt đối thông tin cá nhân.
              </p>
            </div>
            <div className="home-slide-service-item">
              <img src={iconhotline} alt="iconhotline" />
              <h2>Hỗ trợ 24/7</h2>
              <p>
                Gọi ngay 0988 888 888 kể cả{" "}
                <span style={{ color: "#ff8917" }}> 2 giờ sáng</span> để được hỗ
                trợ.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-container container">
        <div className="home-content">
          <div className="home-content-vn">
            <h2>
              <b>ĐIỂM ĐẾN VIỆT NAM YÊU THÍCH</b>
            </h2>
            <div className="vn-container">
              <div
                className="vn-item vn-hn"
                onClick={() => history.push(`/hotel/${"nha_trang"}`)}
              >
                <img
                  src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/Toan-canh-Dao-Diep-Son.png"
                  alt=""
                />
                <h3>Nha Trang</h3>
              </div>
              <div
                className="vn-item vn-dn"
                onClick={() => history.push(`/hotel/${"da_nang"}`)}
              >
                <img src={anhDn} alt="anhDn" />
                <h3>Đà Nẵng</h3>
              </div>
              <div
                className="vn-item vn-hcm"
                onClick={() => history.push(`/hotel/${"tp_ho_chi_minh"}`)}
              >
                <img
                  src="https://dulichkhampha24.com/wp-content/uploads/2020/01/nha-tho-duc-ba-sai-gon-1.jpg"
                  alt="anhDn"
                />
                <h3>Tp Hồ Chí Minh</h3>
              </div>
              <div
                className="vn-item vn-dl"
                onClick={() => history.push(`/hotel/${"sa_pa"}`)}
              >
                <img
                  src="https://img.thuthuatphanmem.vn/uploads/2018/09/26/anh-dep-sa-pa-mua-lua-chin_052040971.jpg"
                  alt="anh sapa"
                />
                <h3>Sa Pa</h3>
              </div>
              <div
                className="vn-item vn-ha"
                onClick={() => history.push(`/hotel/${"hoi_an"}`)}
              >
                <img
                  src="https://media.truyenhinhdulich.vn/upload/news/7_2019/hoi%20an%202_1563176621.jpg"
                  alt="anh hoi an"
                />
                <h3>Hội An</h3>
              </div>
              <div
                className="vn-item vn-sp"
                onClick={() => history.push(`/hotel/${"da_lat"}`)}
              >
                <img src={anhDaLat} alt="anhDn" />
                <h3>Đà lạt</h3>
              </div>
              <div
                className="vn-item vn-nt"
                onClick={() => history.push(`/hotel/${"ha_noi"}`)}
              >
                <img
                  src="https://img.thuthuatphanmem.vn/uploads/2018/09/26/hinh-anh-van-mieu-dep-o-ha-noi_053444423.jpg"
                  alt="anhNhaTRang"
                />
                <h3>Hà Nội</h3>
              </div>
              <div
                className="vn-item vn-pq"
                onClick={() => history.push(`/hotel/${"phu_quoc"}`)}
              >
                <img
                  src="https://vietnamtravelmart.com.vn/wp-content/uploads/BAI-SAO-400x255.jpg"
                  alt="anhDn"
                />
                <h3>Phú Quốc</h3>
              </div>
            </div>
          </div>
          <div className="main-home-content-world">
            <h2>
              <b>ĐIỂM ĐẾN QUỐC TẾ PHỔ BIẾN</b>
            </h2>
            <div className="world-container">
              <div
                className="world-item world-lon-don"
                onClick={() => history.push(`/hotel/${"london"}`)}
              >
                <img
                  src="https://london.ac.uk/sites/default/files/styles/max_1300x1300/public/2018-10/london-aerial-cityscape-river-thames_1.jpg?itok=6LenFxuz"
                  alt="anhDn"
                />
                <h3>Lon Don</h3>
              </div>
              <div
                className="world-item world-singapore"
                onClick={() => history.push(`/hotel/${"singapore"}`)}
              >
                <img
                  src="https://trogiupphaply.gov.vn/sites/default/files/nghien-cuu-trao-doi/b310a2b831bccae293ad.jpg"
                  alt="anhDn"
                />
                <h3>singapore</h3>
              </div>
              <div
                className="world-item world-maldives"
                onClick={() => history.push(`/hotel/${"maldives"}`)}
              >
                <img
                  src="https://img.vietnamfinance.vn/thumbs/700x0/upload/news/vananh/2018/2/8/w-maldives.jpg"
                  alt="anhDn"
                />
                <h3>Maldives</h3>
              </div>
              <div
                className="world-item world-cappadocia"
                onClick={() => history.push(`/hotel/${"cappadocia"}`)}
              >
                <img
                  src="https://twistedsifter.files.wordpress.com/2014/06/balloon-ride-cappadocia-turkey.jpg?w=800"
                  alt="anhDn"
                />
                <h3>Cappadocia</h3>
              </div>
              <div
                className="world-item world-barcelona"
                onClick={() => history.push(`/hotel/${"barcelona"}`)}
              >
                <img
                  src="https://baogialai.com.vn/dataimages/201802/original/images2618964_59bx_thanh_duong.jpg"
                  alt="anhDn"
                />
                <h3>Barcelona</h3>
              </div>
              <div
                className="world-item world-hong-kong"
                onClick={() => history.push(`/hotel/${"hong_kong"}`)}
              >
                <img
                  src="https://tour.dulichvietnam.com.vn/uploads/tour/tmp_1570154575.jpg"
                  alt="anhDn"
                />
                <h3>Hong Kong</h3>
              </div>
              <div
                className="world-item world-los-angeles"
                onClick={() => history.push(`/hotel/${"los-angeles"}`)}
              >
                <img
                  src="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/71/39/f1.jpg"
                  alt="anhDn"
                />
                <h3>Los Angeles</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-commitment ">
        <h2>
          <b>CAM KẾT ĐẾN TỪ ARYA</b>
        </h2>
        <div className="home-commitment-container container">
          <div className="home-commitment-content">
            <div >
              <img src={capnhatxuhuong} alt="" />
              <h2>
                <b>Cập nhật xu hướng du lịch mới nhất</b>
              </h2>
            </div>
            <div>
              <img src={giamgiachothanhvien} alt="" />
              <h2>
                <b>Giảm giá sâu cho thành viên của Arya</b>
              </h2>
            </div>
            <div>
              <img src={combo0d} alt="" />
              <h2>
                <b>Cơ hội du lịch 0đ </b>
              </h2>
            </div>
          </div>
          <div className="home-commitment-content">
            <div>
              <img src={combochudong} alt="" />
              <h2>
                <b>Combo tự động, chủ động lịch trình</b>
              </h2>
            </div>
            <div>
              <img src={combodonggia} alt="" />
              <h2><b>Combo đồng giá 1999k</b></h2>
            </div>
            <div>
              <img src={vemaybay} alt="" />
              <h2>
                <b>Vé máy bay rẻ nhất thị trường</b>
              </h2>
            </div>
          </div>
        </div>
      </div>
     
      <div className="home-mentioned container">
        <h2>
          <b>Arya.com đã được nhắc đến</b>
        </h2>
        <div className="home-mentioned-container ">
          <img
            className="pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/VTV3_logo_2013_final.svg/1024px-VTV3_logo_2013_final.svg.png"
            alt="vtv"
          />
          <img
            className="pointer vnexpress"
            src="https://s1.vnecdn.net/vnexpress/restruct/i/v365/v2_2019/pc/graphics/logo.svg"
            alt="vtv"
          />
          <img
            className="tinhte pointer"
            src="https://s3.cloud.cmctelecom.vn/tinhte1/2017/04/4027554_logo.og.png"
            alt="vtv"
          />
          <img
            className=" vecom pointer"
            src="https://vecom-marine.com/wp-content/uploads/2018/04/vecom-logo-kleur-bol-cutout.png"
            alt="vtv"
          />
          <img
            className="pointer"
            src="https://static-znews.zadn.vn/images/logozing-new-arial.svg"
            alt="vtv"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
