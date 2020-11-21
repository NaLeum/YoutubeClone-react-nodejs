import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Footer from './views/Footer/Footer';
import NavBar from './views/NavBar/NavBar';
import Auth from '../hoc/auth'
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';


    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

const App = () => {
  return (
    <Suspense fallback={(<div>Loading</div>)}>
      <Router>
        <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)} />
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/register" component={Auth(RegisterPage,false)}/>
          <Route exact path="/video/upload" component={Auth(VideoUploadPage,true)}/>
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage,null)}/>
          <Route exact path="/subscription" component={Auth(SubscriptionPage,null)}/>

        </Switch>
      </div>
    </Router>
    <Footer />
  </Suspense>
  );
}

export default App;

