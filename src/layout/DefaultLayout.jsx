import React,{ useState} from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './styles.css';

function DefaultLayout({ component: Component, ...props }) {
  // set vị trí khi click ở thanh navbar
  const [isActive, setIsActive] = useState(0);
  
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header {...routerProps}  setIsActive={setIsActive}/>
          <div className="main">
            <Component {...routerProps} isActive={isActive} setIsActive={setIsActive}/>
          </div>
          <Footer/>
        </>
      )}
    />
  );
}

export default DefaultLayout;
