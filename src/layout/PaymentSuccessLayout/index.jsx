import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Header';
import './styles.css';

function PaymentSuccessLayout({ component: Component, ...props }) {
  const [isActive, setIsActive] = useState(0);

  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header {...routerProps} setIsActive={setIsActive}/>
          <div className="container main-booking">
            <Component  {...routerProps} />
          </div>
          <div className="booking-footer"></div>
        </>
      )}
    />
  );
}

export default PaymentSuccessLayout;
