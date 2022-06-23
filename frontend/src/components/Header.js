import logo from "../images/logo.svg";
import React from "react";
import {Routes, Route, Link} from "react-router-dom"
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div
          className="header__logo"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
        <Routes>
          <Route path='/sign-in' element={<Link className="header__link" to='/sign-up'>Регистрация</Link>}/>
          <Route path='/sign-up' element={<Link className="header__link" to='/sign-in'>Войти</Link>}/>
          <Route path='/' element={
            <div className="header__logged-cont">
              <p className="header__email">{this.props.userData?.email}</p>
              <Link className="header__logout" onClick={this.props.signOut} to='/sign-in'>Выйти</Link>
            </div>}/>
        </Routes>
      </header>
    );
  }
}

export default Header;


{/* <Routes>           {this.props.userData?.email}
          <Route path='/sign-up'>
            <Link className="header__link" to='/sign-up'>Регистрация</Link> 
          </Route>
          <Route path='/sign-in'>
            <Link className="header__link" to='/sign-in'>Войти</Link> 
          </Route>
          <Route path='/'>
            <div className="header__logged-cont">
              <p className="header__email">{this.props.email}</p>
              <Link className="header__logout" onClick={this.props.signOut} to='/sign-in'></Link>
            </div> 
          </Route>
        </Routes> */}