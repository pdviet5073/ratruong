import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from "../../util/history";
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
import moment from "moment";
import "./styles.css";
import { getHotelList, getSearchHotelList } from "../../redux/actions";

import iconmaps from "../../images/listHotel/iconmaps.svg";
import parking from "../../images/listHotel/iconparking.svg";
import pool from "../../images/listHotel/iconpool.svg";
import restaurant from "../../images/listHotel/iconrestaurant.svg";
import laundry from "../../images/listHotel/iconlaunky.svg";

import { FcLike, FcLikePlaceholder, } from "react-icons/fc";
import { BiSearch } from "react-icons/bi";



const { Search } = Input;
function Hotel({
  match,
  hotelList,
  getHotelList,
  searchHotelList,
  getSearchHotelList,
}) {
  const [isLike, setIsLike] = useState(false);
  const place = match.params.place;
  const [searchKey, setSearchKey] = useState("");
  const [current, setCurent] = useState(1);
  const [tempRate, settempRate] = useState();
  const [isShowSearchList, setIsShowSearchList] = useState(false);
  console.log("Log: : isShowSearchList", isShowSearchList);
  const [dataSelect, setDataSelect] = useState([]);
  const [valueSelect, setValueSelect] = useState(undefined);

  useEffect(() => {
    getHotelList({
      place: place,
      page: current,
      limit: 10,
    });
    getSearchHotelList();
  }, []);
  const hotelPagination = [...hotelList.slice(0,10)];
  console.log('Console.log:  > hotelhotelPaginationList', hotelPagination);
  const allHotel = [...hotelList.slice(10)];
  console.log('Console.log:  > allHotel', allHotel);
  //select
  const { Option } = Select;
  const options = dataSelect.map((d) => (
    <Option key={d.value}>{d.text}</Option>
  ));
  const handleSearchSelect = (value) => {
    if (value) {
      fetch(value, (data) => setDataSelect([data]));
    } else {
      setDataSelect([]);
    }
  };

  const handleChangeSelect = (value) => {
    setValueSelect(value);
  };

  //search date
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  }
  const { RangePicker } = DatePicker;
  //định dạng ngày cho datetime Picker
  const dateFormat = ["MM/DD/YYYY"];

  //sort  giá thấp đến cao
  const handelSort = (e) => {
    if (e.target.value == "bestFit") {
      setIsShowSearchList(false);
    }
    getSearchHotelList({
      place: place,
      sort: e.target.value,
      page: 1,
    });
    setCurent(1);
    settempRate({
      ...tempRate,
      sort: e.target.value,
    });
    setIsShowSearchList(true);
  };

  //hàm lấy giá trị của checkbox: sort bằng sao
  const onChangeCheckBox = (value) => {
    if (value != 0) {
      //lấy đc sao lẻ đi cùng với sao chẵn. vd:4 thì có cả 4.5
      const decimalRate = value.map((item) => {
        return (parseInt(item) + 0.5).toString();
      });
      //xoá trường hợp sao = 5.5
      const deleteV = decimalRate.findIndex((item) => item == 5.5);
      if (deleteV != -1) {
        decimalRate.splice(deleteV, 1);
      }
      //nối 2 mảng sao nguyên và sao lẻ
      const totalRate = [...value, ...decimalRate];
      setCurent(1);
      getSearchHotelList({
        place: place,
        rate: totalRate,
      });
      settempRate({
        ...tempRate,
        rate: totalRate,
      });
      setIsShowSearchList(true);
    } else setIsShowSearchList(false);
  };

  //sort bằng khoảng giá
  const onchangeRangePrice = (value) => {
    if (value.length > 0) {
      let rangePrice;
      if (value[0] == "1") {
        rangePrice = ["0", "500000"];
      } else if (value[0] == "2") {
        rangePrice = ["500000", "1000000"];
      } else if (value[0] == "3") {
        rangePrice = ["1000000", "2000000"];
      } else if (value[0] == "4") {
        rangePrice = ["2000000", "3000000"];
      } else rangePrice = ["3000000", "9000000"];
      getSearchHotelList({
        place: place,
        rangePrice: rangePrice,
        page: 1,
      });
      setCurent(1);
      settempRate({
        ...tempRate,
        rangePrice: rangePrice,
      });
      setIsShowSearchList(true);
    } else setIsShowSearchList(false);
  };

  const handelChangeSearch = (value) => {
    if (value.target.value.length === 0) {
      setSearchKey("");
    }
  };
  //fn lấy value input search
  const handelGetValueSearch = (value) => {
    if (value != "") {
      setSearchKey(value);
    } else setIsShowSearchList(false);
  };

  //search bằng name. nếu search sao có dữ liệu thì filter trên list của search sao. còn không có sẽ là list hotel
  const filterSearchListData = (searchHotelList.length > 0 &&
  isShowSearchList == true &&
  searchKey != ""
    ? searchHotelList
    : allHotel
  ).filter((item) => {
    return item.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
  });

  //dùng gán dữ liệu để in list nào [hotelList , searchList] trong hàm render list khách sạn
  const newList = () => {
    if (isShowSearchList) {
      if (searchHotelList && searchKey == false) return searchHotelList;
      else if (searchHotelList && searchKey) return filterSearchListData;
    } else {
      if (searchKey) return filterSearchListData;
      return (hotelPagination> allHotel? [] : hotelPagination);
    }
  };
  // const newList = () => {s
  //   if (isShowSearchList) {
  //     if (searchHotelList.length>0 && searchKey =="") return searchHotelList;
  //     else if( searchKey !="") return filterSearchListData;
  //   } else {

  //     return hotelList;
  //   }
  // };

  //render  list khách sạn
  const renderHotelList = () => {
    return newList().map((hotelItem, hotelIndex) => (
      <div
        key={`hotel-${hotelItem.id}-${hotelIndex}`}
        className="hotel-wrapper"
        onClick={() => history.push(`/hotel/${place}/${hotelItem.id}`)}
      >
        <div className="hotel-wrapper-left">
          <img src={hotelItem.url[0].src} alt={hotelItem.url[0].alt} />
        </div>
        <div className="hotel-wrapper-right">
          <div className="hotel-wrapper-right-item">
            <div>
              <h2>{hotelItem.name}</h2>
            </div>
            <div className="right-item-information">
              <div className="right-item-information-rate">
                <Rate disabled allowHalf defaultValue={hotelItem.rate}></Rate>
              </div>
              <Tooltip
                placement="topRight"
                title={hotelItem.address}
                color="#ff9633"
              >
                <div className="right-item-information-place text-clamp">
                  <img src={iconmaps} alt="iconmaps" />
                  <span>{hotelItem.address}</span>
                </div>
              </Tooltip>

              <div className="right-item-information-extensions">
                {hotelItem.restaurant === true && (
                  <span>
                    <img src={restaurant} alt="restaurant" />
                    <span>Nhà hàng</span>
                  </span>
                )}
                {hotelItem.pool === true && (
                  <span>
                    <img src={pool} alt="pool" />
                    <span>Bể bơi</span>
                  </span>
                )}
                {hotelItem.laundry === true && (
                  <span>
                    <img src={laundry} alt="laundry" />
                    <span>Giặt ủi</span>
                  </span>
                )}
                {hotelItem.parking === true && (
                  <span>
                    <img src={parking} alt="parking" />
                    <span>Đỗ xe</span>
                  </span>
                )}
              </div>
              <span className="point-child">
                <span>{hotelItem.point}</span>

                {hotelItem.point >= 9 ? (
                  <span>Tuyệt vời</span>
                ) : hotelItem.point >= 8 ? (
                  <span>Rất tốt</span>
                ) : hotelItem.point >= 6.5 ? (
                  <span>Tốt</span>
                ) : hotelItem.point >= 5 ? (
                  <span>Chấp nhận được</span>
                ) : hotelItem.point >= 4 ? (
                  <span>Kém</span>
                ) : (
                  <span>Quá kém</span>
                )}
              </span>
            </div>
          </div>
          <div className="right-item-price">
            <div>
              {1 ? (
                <FcLikePlaceholder className="non-like"></FcLikePlaceholder>
              ) : (
                <FcLike className="point-heart" />
              )}
            </div>
            <div>
              <div className="right-item-price-oldPrice">
                <p>
                  {hotelItem.oldPrice.toLocaleString()}
                  <span className="under-line">đ</span>
                </p>
                <p>
                  {Math.ceil(
                    -100 + (hotelItem.defaultPrice * 100) / hotelItem.oldPrice
                  )}
                  &#37;
                </p>
              </div>
              <p className="right-item-price-newPrice">
                <b>
                  {hotelItem.defaultPrice.toLocaleString()}
                  <span className="under-line">đ</span>
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="page-hotel">
      <div className="container">
        <div className="hotel-search">
          <Select
            showSearch
            value={valueSelect}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearchSelect}
            onChange={handleChangeSelect}
            notFoundContent={null}
            className="hotel-search-input"
          >
            {options}
          </Select>
          <RangePicker
            className="hotel-search-dateTime"
            disabledDate={disabledDate}
            defaultValue={[
              moment(moment().startOf("day"), dateFormat),
              moment(moment().add(1, "days"), dateFormat),
            ]}
            format={dateFormat}
          />

          <Button className="hotel-search-button">Tìm Kiếm</Button>
        </div>
        <div className="hotel-container">
          <div className="hotel-content">
            <div className="hotel-left">
              <div className="hotel-left-number-one">
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/67/Golden_Medal_-1_Icon.svg"
                    alt="anh"
                  />
                </div>
                <h2>Số 1 về chất lượng và dịch vụ</h2>
              </div>
              <div className="hotel-left-container">
                <div>
                  <h3>Tìm khách sạn</h3>
                  <Search
                    placeholder="Nhập tên Khách sạn"
                    onChange={(value) => handelChangeSearch(value)}
                    onSearch={(value) => handelGetValueSearch(value)}
                    className="hotel-left-content-search"
                  />
                </div>
                <div className="hotel-left-content-ranking">
                  <h3>Xếp hạng khách sạn</h3>
                  <Checkbox.Group onChange={onChangeCheckBox}>
                    <Checkbox value="1">
                      <Rate disabled value={1}></Rate>
                    </Checkbox>
                    <Checkbox value="2" className="ranking-item">
                      <Rate disabled value={2}></Rate>
                    </Checkbox>
                    <Checkbox value="3" className="ranking-item">
                      <Rate disabled value={3}></Rate>
                    </Checkbox>
                    <Checkbox value="4" className="ranking-item">
                      <Rate disabled value={4}></Rate>
                    </Checkbox>
                    <Checkbox value="5" className="ranking-item">
                      <Rate disabled value={5}></Rate>
                    </Checkbox>
                  </Checkbox.Group>
                </div>
                <div className="hotel-left-content-sortPrice">
                  <h3>Mức giá</h3>
                  <div className="sortPrice-slider">
                    <Slider
                      range
                      step={1}
                      defaultValue={[0, 500000]}
                      max={3000000}
                      min={0}
                    />
                  </div>
                  <div className="hotel-left-content-priceRange">
                    <Checkbox.Group onChange={onchangeRangePrice}>
                      <Checkbox className="priceRange-first-child" value="1">
                        Dưới 500000đ
                      </Checkbox>
                      <Checkbox className="priceRange-item" value="2">
                        500000 - 1000000đ
                      </Checkbox>
                      <Checkbox className="priceRange-item" value="3">
                        1000000 - 2000000đ
                      </Checkbox>
                      <Checkbox className="priceRange-item" value="4">
                        2000000 - 3000000đ
                      </Checkbox>
                      <Checkbox className="priceRange-item" value="5">
                        Trên 3000000đ
                      </Checkbox>
                    </Checkbox.Group>
                  </div>
                </div>
                <div className="hotel-left-content-type">
                  <h3>Loại chỗ ở</h3>
                  <Checkbox.Group>
                    <Checkbox className="priceRange-first-child" value="1">
                      hotel
                    </Checkbox>
                    <Checkbox className="priceRange-item" value="2">
                      apartment
                    </Checkbox>
                    <Checkbox className="priceRange-item" value="3">
                      guesthouse
                    </Checkbox>
                    <Checkbox className="priceRange-item" value="4">
                      hostel
                    </Checkbox>
                    <Checkbox className="priceRange-item" value="5">
                      aparthotel
                    </Checkbox>
                    <Checkbox className="priceRange-item" value="6">
                      homestay
                    </Checkbox>
                    <Checkbox className="priceRange-item" value="7">
                      resort
                    </Checkbox>
                    <Checkbox className="priceRange-item" value="8">
                      villa
                    </Checkbox>
                  </Checkbox.Group>
                </div>
              </div>
            </div>
            <div className="hotel-right">
              <div className="hotel-right-sort">
                <Radio.Group
                  defaultValue="a"
                  size="large"
                  defaultValue="bestFit"
                >
                  <Radio.Button value="a">Sắp xếp theo</Radio.Button>
                  <Radio.Button value="bestFit" onChange={(e) => handelSort(e)}>
                    Phù hợp nhất
                  </Radio.Button>
                  <Radio.Button value="asc" onChange={(e) => handelSort(e)}>
                    Giá thấp nhất trước
                  </Radio.Button>

                  <Radio.Button value="desc" onChange={(e) => handelSort(e)}>
                    Giá cao nhất trước
                  </Radio.Button>

                  <Radio.Button value="point" onChange={(e) => handelSort(e)}>
                    Được đánh giá hàng đầu
                  </Radio.Button>
                </Radio.Group>
              </div>
              <div className="hotel-right-container">{renderHotelList()}</div>
              <div className="hotel-pagination">
                {(current === 1
                  ? current === 1 && hotelList.length >= 10
                  : hotelList.length >= 0) && (
                  <Pagination
                    current={current}
                    total={40}
                    onChange={(page) => {
                      return (
                        window.scrollTo(0, 53),
                        setCurent(page),
                        isShowSearchList !== true
                          ? getHotelList({ page, limit: 10, place: place })
                          : getSearchHotelList({
                              place: place,
                              page,
                              rate: tempRate.rate,
                              sort: tempRate.sort,
                              rangePrice: tempRate.rangePrice,
                            })
                      );
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-description"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { hotelList, searchHotelList } = state.hotelReducer;
  return {
    hotelList,
    searchHotelList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelList: (params) => dispatch(getHotelList(params)),
    getSearchHotelList: (params) => dispatch(getSearchHotelList(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hotel);
