import React, { useState } from 'react';

const Login = (props) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            return;
        }
        props.handleLogin(inputs.email, inputs.password) 
    }

    return(
        <div className="login">
            <form onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Вход</h2>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="login__input"
                    value={inputs.email}
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
                    value={inputs.password}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    minLength='4'
                />
                <button type="submit" className="login__submit">Войти</button>
            </form>
        </div>

    )
}

export default Login;