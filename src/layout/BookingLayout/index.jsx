import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InfoRoomBooking from "../../components/InfoRoomBooking";
import './styles.css';

function BookingLayout({ component: Component, ...props }) {
  const [checkPagePay, setCheckPagePay] = useState(false)
  const [infoBooking, setInfoBooking] = useState({})

  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header {...routerProps}/>
          <div className="container main-booking">
            <Component setCheckPagePay={setCheckPagePay} checkPagePay={checkPagePay} {...routerProps} infoBooking={infoBooking}/>
            <InfoRoomBooking setCheckPagePay={setCheckPagePay} checkPagePay={checkPagePay} {...routerProps} setInfoBooking={setInfoBooking}/>
          </div>
          <div className="booking-footer"></div>
        </>
      )}
    />
  );
}

export default BookingLayout;
