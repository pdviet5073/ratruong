import React from 'react';

import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import 'antd/dist/antd.css';

import DefaultLayout from './layout/DefaultLayout';
import LoginLayout from './layout/LoginLayout';
import BookingLayout from './layout/BookingLayout';
import PaymentSuccessLayout from './layout/PaymentSuccessLayout';

import SignUp from "./pages/SignUp";
import InformationBooking from "./pages/InfomationBooking";
import Payment from "./pages/Payment";
import Home from './pages/Home';
import Hotel from './pages/Hotel';
import HotelDetail from './pages/HotelDetail';
import Profile from "./pages/Profile"
import PaymentSuccess from "./pages/PaymentSuccess"

import history from './util/history';

import myReducer from './redux/reducers';
import mySaga from './redux/sagas';

import * as serviceWorker from './serviceWorker';

import './reset.css';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const myStore = createStore(myReducer, applyMiddleware(...[sagaMiddleware, logger]));
sagaMiddleware.run(mySaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Router history={history}>
        <Switch>
          <BookingLayout exact path="/booking/:place/:idHotel/:idRoom/step-1" component={InformationBooking}/>
          <BookingLayout exact path="/booking/:place/:idHotel/:idRoom/step-2" component={Payment}/>
          <PaymentSuccessLayout exact path="/booking/:place/:idHotel/:idRoom/step-3" component={PaymentSuccess}/>

          
          <LoginLayout exact path="/signUp" component={SignUp} />
          <DefaultLayout exact path="/" component={Home} />
          
          <DefaultLayout exact path="/hotel/:place" component={Hotel} />
          <DefaultLayout exact path="/hotel/:place/:id" component={HotelDetail} />
          <DefaultLayout exact path="/profile" component={Profile} />

          
         {/* <SignUp></SignUp> */}
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
