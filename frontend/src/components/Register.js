import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      const { email, password } = state;
      props.handleRegister(email, password)
    }

  return(
    <div className="login">
    <form onSubmit={handleSubmit} className="login__form">
        <h2 className="login__title">Регистрация</h2>
        <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="login__input"
            value={state.email}
            onChange={handleChange}
            required
            minLength='6'
        />
        <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            className="login__input"
            value={state.password}
            onChange={handleChange}
            required
            autoComplete="off"
            minLength='4'
        />
        <button type="submit" className="login__submit">Зарегистрироваться</button>
        <div className='login__registred'>
          <p>Уже зарегистрированы? <Link to='/sign-in' className='login__link'>Войти</Link></p>
          
        </div>
    </form>
</div>
  )
}

export default Register;