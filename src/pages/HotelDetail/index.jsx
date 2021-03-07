import React, { useState, useEffect, useRef } from "react";
import history from "../../util/history";
import { connect } from "react-redux";
import {
  Pagination,
  Rate,
  Form,
  Input,
  DatePicker,
  Button,
  Modal,
  Progress,
  Tooltip,
  Slider as SliderAnt,
} from "antd";
import {
  FrownOutlined,
  SmileOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import moment from "moment";
import Slider from "react-slick";
import ImageGallery from "react-image-gallery";

import {
  getHotelList,
  getHotelDetail,
  createComment,
  getCommentList,
  getRandomHotel,
} from "../../redux/actions";

import iconmaps from "../../images/listHotel/iconmaps.svg";
import iconHoanTraPhong from "../../images/hotelDetail/i-hoantraphong.png";
import iconKhongBuaAn from "../../images/hotelDetail/i-bua-an.png";
import iconCoBuaAn from "../../images/hotelDetail/i-co-bua-an.png";
import imgGiaRe from "../../images/hotelDetail/icon.price-cheap.png";
import iconSucChua from "../../images/hotelDetail/i-succhua.png";
import iconCommentGood from "../../images/hotelDetail/icon-review-good.png";
import iconCommentBad from "../../images/hotelDetail/icon-review-bad.png";

import { FaBed } from "react-icons/fa";
import { BiArea } from "react-icons/bi";

import "react-image-gallery/styles/css/image-gallery.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

function HotelDetail({
  getRandomHotel,
  randomHotel,
  hotelList,
  getHotelList,
  hotelDetail,
  getHotelDetail,
  match,
  createComment,
  commentList,
  getCommentList,
}) {
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const [moreDescriptionList, setMoreDescriptionList] = useState([]);
  const [value1, setValue1] = useState(10);
  const [value2, setValue2] = useState(10);
  const [value3, setValue3] = useState(10);
  const [value4, setValue4] = useState(10);
  const [value5, setValue5] = useState(10);
  const [value6, setValue6] = useState(10);
  const [averageValue, setaAverageValue] = useState(10);
  const [numberPage, setNumberPage] = useState(1);
  const [isShowModalImage, setIsShowModalImage] = useState(false);
  const hotelId = match.params.id;
  const place = match.params.place;

  useEffect(() => {
    getRandomHotel({
      place: place,
    });

    getHotelDetail({
      id: hotelId,
    });
    getCommentList({
      id: hotelId,
      page: numberPage,
      limit: 5,
    });

    // giá trị ban đầu của ngày đi và ngày đến là hôm nay và ngày mai
    let dateTime = {
      checkIn: moment().startOf("day").format("L"),
      checkOut: moment().add(1, "day").format("L"),
      // dddd, DD MM YYYY
    };

    let rangeDateTime = JSON.stringify(dateTime);
    sessionStorage.setItem("date", rangeDateTime);
  }, [hotelId]);

  //chuyển đổi ngày sang tiếng việt
  //moment.locale("vi"); 
  const dateFormat = ["MM/DD/YYYY"];
  const { RangePicker } = DatePicker;
  const infoHotelDetail = hotelDetail.slice(0, 1);
  const totalCommentHotel = hotelDetail.slice(1, 2);
  const roomHotelDetail = hotelDetail.slice(2);

  //modal image detail
  const createArrImage = () => {
    let arrImages = [];
    const arrImageShowModal = infoHotelDetail;
    arrImageShowModal.map((item, index) => {
      item.url.map((item) =>
        arrImages.push({
          original: item.src,
          thumbnail: item.src,
        })
      );
    });
    return arrImages;
  };
  //bật tắt modal image
  const showModalImage = () => {
    setIsShowModalImage(true);
  };
  const hideModalImage = () => {
    setIsShowModalImage(false);
  };

  const handleToggleDescription = (id) => {
    const moreDescriptionIndex = moreDescriptionList.findIndex(
      (moreId) => moreId === id
    );
    if (moreDescriptionIndex === -1) {
      setMoreDescriptionList([...moreDescriptionList, id]);
    } else {
      const newMoreDescriptionList = moreDescriptionList;
      newMoreDescriptionList.splice(moreDescriptionIndex, 1);
      setMoreDescriptionList([...newMoreDescriptionList]);
    }
  };

  //submit form comment
  const submitComment = (values) => {
    if (localStorage.getItem("user")) {
      createComment({
        hotelId: infoHotelDetail[0].id,
        point: averageValue,
        userName:
          JSON.parse(localStorage.getItem("user")).firstName +
          " " +
          JSON.parse(localStorage.getItem("user")).lastName,
        userId: JSON.parse(localStorage.getItem("user")).id,
        status: {
          comment: values.review,
          good: values.reviewGood,
          bad: values.reviewBad,
        },
      });
      setNumberPage(1);
      getCommentList({
        id: hotelId,
        page: 1,
        limit: 5,
      });
      form.resetFields();
      toast.info("😘 Cảm ơn bạn đã đóng góp ý kiến!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,

      });
    } else {
      toast.info("🙂 Đăng nhập để thực hiện thao tác này!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // onclick đặt phòng
  const handelBooking = (roomItem) => {
    if (localStorage.getItem("user")) {
      let idHotel = { id: hotelId };
      sessionStorage.setItem("idHotel", JSON.stringify(idHotel));
      history.push(`/booking/${place}/${hotelId}/${roomItem.id}/step-1`);
    } else {
      // show modal hiển thị thông báo chưa đăng nhập
      toast.info("🙂 Đăng nhập để thực hiện thao tác này!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //----------------search detail----------------------------//
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  }
  // get value datetinme vào session
  const handleChangeDateTime = (value, dateString) => {
    // let dateTime = { checkIn:  moment(`${dateString[0]}`).format("dddd, DD MMMM YYYY"), checkOut: moment(`${dateString[1]}`).format("dddd, DD MMMM YYYY")};
     let dateTime = { checkIn: dateString[0], checkOut: dateString[1]};
    
    let rangeDateTime = JSON.stringify(dateTime);
    sessionStorage.setItem("date", rangeDateTime);
  };

  // get value số phòng, số người vào session
  // const handleChangePersonRoom = (amountPerson, amountRoom) => {
  //   let personRoom = { amountPerson, amountRoom };
  //   sessionStorage.setItem("personRoom", JSON.stringify(personRoom));
  // };

  // //tăng giảm phòng, số người
  // const handelReduction = (e) => {
  //   const typeOption = e.target.getAttribute("optionGet");
  //   console.log("Log: : handelReduction -> typeOption", typeOption);
  //   if (room >= 1 && person >= 1) {
  //     if (typeOption == "reductionRoom") {
  //       if (room * 2 < person) {
  //       } else setRoom(room - 1);
  //     } else {
  //       setPerson(person - 1);
  //     }
  //   } else if (room == 0 || person == 0) {
  //     setPerson(0);
  //     setRoom(0);
  //   }
  //   handleChangePersonRoom(person, room);
  // };
  // const handelIncrease = (e) => {
  //   const typeOption = e.target.getAttribute("optionGet");
  //   if (person < 8 && room < 3) {
  //     if (typeOption == "increaseRoom") {
  //       setRoom(room + 1);
  //       setPerson(person + 1);
  //     } else {
  //       setPerson(person + 1);
  //       if (person > room * 2.5) {
  //         setRoom(room + 1);
  //       }
  //     }
  //   }
  //   handleChangePersonRoom(person, room);
  // };

  const renderHotelDetailImages = () => {
    return infoHotelDetail.map((item, index) => (
      <div
        className="hotelDetail-header-container"
        key={`hotelDetail-header-${item.id}-${index}`}
      >
        <div className="hotelDetail-header-title">
          <div className="hotelDetail-header-title-name">
            <h1>{item.name}</h1>
            <span>
              <Rate
                disabled
                allowHalf
                defaultValue={item.rate}
                className="hotelDetail-rate"
              ></Rate>
            </span>
          </div>
          <div className="hotelDetail-header-name-place">
            <img src={iconmaps} alt="iconmaps" />
            <span>{item.address}</span>
          </div>
        </div>
        <div className="hotelDetail-header-images">
          <div
            className="hotelDetail-header-image image-1 pointer"
            onClick={() => showModalImage()}
          >
            <img src={item.url[0].src} alt={item.url[0].alt} />
          </div>
          <div
            className="hotelDetail-header-image image-2 pointer"
            onClick={() => showModalImage()}
          >
            <img src={item.url[1].src} alt={item.url[1].alt} />
          </div>
          <div
            className="hotelDetail-header-image image-3 pointer"
            onClick={() => showModalImage()}
          >
            <img src={item.url[2].src} alt={item.url[2].alt} />
            <div>
              <div className=" hotelDetail-header-image-point pointer">
                <span className="image-point">
                  <span>{item.point}</span>
                  {item.point >= 9 ? (
                    <span>Tuyệt vời</span>
                  ) : item.point >= 8 ? (
                    <span>Rất tốt</span>
                  ) : item.point >= 6.5 ? (
                    <span>Tốt</span>
                  ) : item.point >= 5 ? (
                    <span>Chấp nhận được</span>
                  ) : item.point >= 4 ? (
                    <span>Kém</span>
                  ) : (
                    <span>Quá kém</span>
                  )}
                </span>
                {commentList.length != 0 && (
                  <span className="number-vote pointer">
                    &#40;{totalCommentHotel[0].length} đánh giá &#41;
                  </span>
                )}
              </div>
            </div>
          </div>

          <div
            className="hotelDetail-header-image image-6 pointer"
            onClick={() => showModalImage()}
          >
            <img src={item.url[5].src} alt={item.url[5].alt} />
          </div>
          <div className=" image-7 pointer" onClick={() => showModalImage()}>
            <div className="hotelDetail-header-image">
              <img src={item.url[6].src} alt={item.url[6].alt} />
            </div>
            <div
              className="hotelDetail-header-image image-8 pointer"
              onClick={() => showModalImage()}
            >
              <img src={item.url[7].src} alt={item.url[7].alt} />
              <div
                className="hotelDetail-header-more-image pointer"
                onClick={() => showModalImage()}
              >
                <span>Xem tất cả {item.url.length} ảnh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const settingSlider = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    swipe: true,
    arrows: true,
  };
  const renderRooms = () => {
    return roomHotelDetail.map((roomItem, roomIndex) => (
      <div
        className="hotelDetail-rooms-item"
        key={`roomHotelDetail-${roomItem.id}-${roomIndex}`}
      >
        <div className="rooms-item-top">
          <span className="rooms-item-top-img">
            <img src={roomItem.image[0].src} alt={roomItem.alt} />
          </span>
          <div className="rooms-item-top-right">
            <div>
              <h2>{roomItem.name}</h2>
              <div className="rooms-item-top-service">
                <span>
                  <span>
                    <FaBed />
                  </span>
                  <span>{roomItem.description.bed}</span>
                </span>
                <span>
                  <span>
                    <BiArea />
                  </span>
                  <span>{roomItem.description.roomArea}</span>
                </span>
              </div>
            </div>
            <Button onClick={() => handleToggleDescription(roomItem.id)}>
              {moreDescriptionList.findIndex(
                (moreId) => moreId == roomItem.id
              ) == -1
                ? "Xem chi tiết"
                : "Ẩn chi tiết"}
            </Button>
          </div>
        </div>
        <div
          className={
            moreDescriptionList.findIndex((id) => id == roomItem.id) != -1
              ? "rooms-item-more"
              : "hide-rooms-item-more"
          }
        >
          <div className="rooms-item-more-left">
            <Slider {...settingSlider}>
              <div>
                <img
                  className=""
                  src={roomItem.image[0].src}
                  alt={roomItem.image[0].alt}
                ></img>
              </div>
              <div>
                <img
                  className=""
                  src={roomItem.image[1].src}
                  alt={roomItem.image[1].alt}
                ></img>
              </div>
            </Slider>
          </div>
          <div className="rooms-item-more-right">
            <div>
              <p>Giường: {roomItem.description.bed}</p>
              <p>Diện tích phòng: {roomItem.description.bed}</p>
              <p>Thiết bị trong phòng: {roomItem.description.device}</p>
              <p>Mô tả phòng: {roomItem.description.descriptionRoom}</p>
              <p>
                Các phòng đều có điều hoà nhiệt độ (máy lạnh) kèm với tivi LCD
                32" truyền hình vệ tinh có các kênh quốc tế, tủ lạnh, tủ quần áo
                và phòng tắm riêng. Ngoài ra, phòng còn cung cấp các cuộc gọi
                nội hạt miễn phí và Wi-Fi internet miễn phí.
              </p>
            </div>
          </div>
        </div>
        <div className="rooms-item-bottom">
          <div className="rooms-item-bottom-item">
            <img src={iconHoanTraPhong} alt="iconHoanTraPhong" />
            <div className="service-true">
              <span>Huỷ phòng</span>
              <span>Có hoàn huỷ</span>
            </div>
          </div>
          <div className="rooms-item-bottom-item">
            <img
              src={roomItem.meal == true ? iconCoBuaAn : iconKhongBuaAn}
              alt="iconBuaAn"
            />
            <div
              className={
                roomItem.meal == true ? "service-true" : "service-false"
              }
            >
              <span>Bữa ăn</span>
              <span>
                {roomItem.meal == true
                  ? "Bao gồm bữa ăn sáng"
                  : "Không bao gồm"}
              </span>
            </div>
          </div>
          <div className="rooms-item-bottom-item">
            <img src={iconSucChua} alt="iconSucChua" />
            <div className="service-true">
              <span>Sức chứa</span>
              <span>{roomItem.capacity} người</span>
            </div>
          </div>
          <p>
            <b>{roomItem.price.toLocaleString()} đ</b>
          </p>
          <span>
            <Button onClick={() => handelBooking(roomItem)}>Đặt phòng</Button>
          </span>
        </div>
      </div>
    ));
  };

  const handleChange = (value, index) => {
    // eslint-disable-next-line default-case
    switch (index) {
      case 0:
        setValue1(value);
        break;
      case 1:
        setValue2(value);
        break;
      case 2:
        setValue3(value);
        break;
      case 3:
        setValue4(value);
        break;
      case 4:
        setValue5(value);
        break;
      case 5:
        setValue6(value);
        break;
    }
    const values = (value1 + value2 + value3 + value4 + value5 + value6) / 6;
    setaAverageValue(values.toFixed(1));
  };

  const arrReview = [
    "Sự sạch sẽ",
    "Tiện nghi",
    "Thoải mái",
    "Nhân Viên",
    "Địa điểm",
    "Giá cả",
  ];

  const renderComment = () => {
    return commentList.map((item, index) => (
      <div
        className="hotelDetail-comment-item"
        key={`hotelDetail-comment-${item.id}-${index}`}
      >
        <div className="hotelDetail-comment-point">
          <div className="comment-point ">
            <span>{item.point}</span>

            {item.point >= 9 ? (
              <span>Tuyệt vời</span>
            ) : item.point >= 8 ? (
              <span>Rất tốt</span>
            ) : item.point >= 6.5 ? (
              <span>Tốt</span>
            ) : item.point >= 5 ? (
              <span>Chấp nhận được</span>
            ) : item.point >= 4 ? (
              <span>Kém</span>
            ) : (
              <span>Quá kém</span>
            )}
          </div>
          <div className="comment-name-user">
            <span>{item.userName}</span>
          </div>
        </div>
        <div className="hotelDetail-comment-status">
          <p>"{item.status.comment}"</p>
          <p className="review-good">{item.status.good}</p>
          <p className="review-bad">{item.status.bad}</p>
        </div>
      </div>
    ));
  };

  // random ra  3 phòng đề cử
  // const randomHotel = () => {
  //   const Rand = hotelList[Math.floor(Math.random() * hotelList.length)];
  //   const Rand1 = hotelList[Math.floor(Math.random() * hotelList.length)];
  //   const Rand2 = hotelList[Math.floor(Math.random() * hotelList.length)];
  //   return [Rand, Rand1, Rand2];

  //   // let Rand1;
  //   // let Rand2;
  //   // do {
  //     //   Rand1 = hotelList[Math.floor(Math.random() * hotelList.length)];
  //     //   Rand2 = hotelList[Math.floor(Math.random() * hotelList.length)];
  //     // } while (
  //       //   JSON.stringify(Rand1) === JSON.stringify(Rand) ||
  //       //   JSON.stringify(Rand) === JSON.stringify(Rand2) ||
  //       //   JSON.stringify(Rand1) === JSON.stringify(Rand2)
  //       // );
  // };

  // đề cử khách sạn
  const renderNominationsHotel = () => {
    return randomHotel.map((itemRandom, indexRandom) => (
      <div
        className="hotelDetail-nominations-content"
        key={`hotelDetail-nominations-${itemRandom.id}-${indexRandom}`}
      >
        <div className="hotelDetail-nominations-wrapper">
          <img src={itemRandom.url[0].src} alt={itemRandom.url[0].src} />
          <div className="hotelDetail-nominations-information">
            <h2>{itemRandom.name}</h2>

            <div className="hotelDetail-nominations-information-rate">
              <Rate disabled allowHalf defaultValue={itemRandom.rate}></Rate>
            </div>
            <div className="hotelDetail-nominations-information-address">
              <Tooltip
                placement="topLeft"
                title={itemRandom.address}
                color="#ff9633"
              >
                <img src={iconmaps} alt="iconmaps" />
                <span>{itemRandom.address}</span>
              </Tooltip>
            </div>

            <div className="hotelDetail-nominations-information-price">
              <p className="right-item-price-newPrice ">
                <b>
                  {itemRandom.defaultPrice.toLocaleString()}
                  <span className="under-line">đ</span>
                </b>
              </p>
            </div>
            <div className="hotelDetail-nominations-information-button">
              <Button
                onClick={() => history.push(`/hotel/${place}/${itemRandom.id}`)}
              >
                Xem nơi này
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div className="hotelDetail">
      <div className="container hotelDetail-container">
        <div className="hotelDetail-header">{renderHotelDetailImages()}</div>

        <div className="hotelDetail-body">
          <div className="hotelDetail-body-top">
            <div className="hotelDetail-body-sort">
              <span>
                <b>Chọn lọc:</b>
              </span>
              <Button>Miễn phí huỷ phòng</Button>
              <Button>Bao gồm bữa ăn</Button>
            </div>

            <div className="hotelDetail-choose-day">
              <h3>Ngày đến - Ngày đi</h3>
              <RangePicker
                disabledDate={disabledDate}
                defaultValue={[
                  moment(moment().startOf("day"), dateFormat),
                  moment(moment().add(1, "day"), dateFormat),
                ]}
                format={dateFormat}
                onChange={handleChangeDateTime}
              />
            </div>
          </div>
          <div className="hotelDetail-rooms">{renderRooms()}</div>
          <div className="hotelDetail-inforHotel">
            <div className="hotelDetail-inforHotel-title">
              <img src={imgGiaRe} alt="imgGiaRe" />
              <span>
                <b>Rẻ hơn giá rẻ nhất</b>&nbsp;&nbsp;Nếu bạn tìm được đơn vị
                khác cung cấp cùng loại phòng, ở cùng khách sạn vào cùng thời
                điểm, liên hệ ngay với Arya.com để được mua giá rẻ hơn rẻ nhất.
              </span>
            </div>
          </div>
        </div>
        <div className="hotelDetail-comment">
          <div className="create-comment">
            <h2>Bạn đánh giá khách sạn này như thế nào?</h2>
            <div className="create-comment-point">
              <div
                className={
                  averageValue > 8
                    ? "point-highest"
                    : averageValue >= 6.5 && averageValue <= 8
                    ? "point-above-average"
                    : averageValue >= 5 && averageValue < 6.5
                    ? "point-average"
                    : "point-least"
                }
              >
                <Progress
                  type="circle"
                  percent={averageValue * 10}
                  format={(percent) => `${percent}`}
                  status="ok"
                  width={200}
                  strokeWidth={3}
                />
                <span className="create-comment-chart-text">
                  {averageValue >= 9 ? (
                    <span>Tuyệt vời</span>
                  ) : averageValue >= 8 ? (
                    <span>Rất tốt</span>
                  ) : averageValue >= 6.5 ? (
                    <span>Tốt</span>
                  ) : averageValue >= 5 ? (
                    <span>Chấp nhận được</span>
                  ) : averageValue >= 4 ? (
                    <span>Kém</span>
                  ) : (
                    <span>Quá kém</span>
                  )}
                </span>
              </div>
              <div className="create-comment-point-left">
                <div className="create-comment-input">
                  {arrReview.map((item, index) => (
                    <div
                      className="create-comment-slider-point"
                      key={`arrReview-${index}`}
                    >
                      <span>{item}</span>
                      <div>
                        <FrownOutlined
                          className={
                            (index === 0
                              ? value1
                              : index === 1
                              ? value2
                              : index === 2
                              ? value3
                              : index === 3
                              ? value4
                              : index === 4
                              ? value5
                              : value6) <= 5
                              ? "icon-wrapper-active"
                              : "icon-wrapper icon-wrapper-first-child"
                          }
                        />
                        <SliderAnt
                          min={0}
                          max={10}
                          onChange={(value) => handleChange(value, index)}
                          value={
                            index === 0
                              ? value1
                              : index === 1
                              ? value2
                              : index === 2
                              ? value3
                              : index === 3
                              ? value4
                              : index === 4
                              ? value5
                              : value6
                          }
                          step={0.1}
                        />
                        <SmileOutlined
                          className={
                            (index === 0
                              ? value1
                              : index === 1
                              ? value2
                              : index === 2
                              ? value3
                              : index === 3
                              ? value4
                              : index === 4
                              ? value5
                              : value6) > 5
                              ? "icon-wrapper-active"
                              : "icon-wrapper"
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="create-comment-text">
              <div className="create-comment-text-form">
                <Form
                  layout="vertical"
                  form={form}
                  name="comment"
                  onFinish={submitComment}
                  initialValues={{
                    review: "",
                    reviewGood: "",
                    reviewBad: "",
                  }}
                  scrollToFirstError
                >
                  <Form.Item
                    className="form-item-first-child"
                    name="review"
                    rules={[
                      {
                        required: true,
                        message: "Hãy Nhập vào đánh giá, bình luận của bạn",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Mời bạn để lại đánh giá, bình luận (Vui lòng nhập tiếng việt có dấu)" />
                  </Form.Item>
                  <div className="comment-form-item">
                    <img src={iconCommentGood} alt="iconCommentGood" />
                    <Form.Item name="reviewGood">
                      <Input placeholder="Mặt tích cực của khách sạn" />
                    </Form.Item>
                  </div>
                  <div className="comment-form-item">
                    <img src={iconCommentBad} alt="iconCommentGood" />
                    <Form.Item name="reviewBad">
                      <Input placeholder="Những điều cần cải thiện" />
                    </Form.Item>
                  </div>
                  <Form.Item>
                    <Button className="create-comment-text-btn-cancel">
                      Huỷ
                    </Button>
                    <Button
                      type="primary"
                      className="create-comment-text-btn-submit"
                      htmlType="submit"
                    >
                      Gửi
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="get-comment">
            {renderComment()}
            <div className="get-comment-pagination">
              {commentList.length > 0 && (
                <Pagination
                  current={numberPage}
                  total={40}
                  onChange={(page) => {
                    return (
                      setNumberPage(page),
                      getCommentList({ id: hotelId, page, limit: 5 })
                    );
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="hotelDetail-nominations">
          <h2>
            <b>Khách sạn có liên quan</b>
          </h2>
          <div className="hotelDetail-nominations-container">
            {renderNominationsHotel()}
          </div>
        </div>
      </div>
      <Modal
        maskClosable="true"
        visible={isShowModalImage}
        width={1300}
        onCancel={hideModalImage}
        onOk={showModalImage}
        centered="true"
        className="hotelDetail-modal"
      >
        <ImageGallery items={createArrImage()} />
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}
const mapStateToProps = (state) => {
  const {
    hotelList,
    hotelDetail,
    commentList,
    randomHotel,
  } = state.hotelReducer;
  return {
    hotelDetail,
    commentList,
    hotelList,
    randomHotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelList: (params) => dispatch(getHotelList(params)),
    getHotelDetail: (params) => dispatch(getHotelDetail(params)),
    createComment: (params) => dispatch(createComment(params)),
    getCommentList: (params) => dispatch(getCommentList(params)),
    getRandomHotel: (params) => dispatch(getRandomHotel(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HotelDetail);
