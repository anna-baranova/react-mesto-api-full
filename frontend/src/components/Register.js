import React from 'react';
import { Link } from "react-router-dom";

function Register(props) {
	const [authEmail, setAuthEmail] = React.useState("");
	const [authPassword, setAuthPassword] = React.useState("");

	const handleChangeEmail = (e) => {
		setAuthEmail(e.target.value);
	};
	const handleChangePassword = (e) => {
		setAuthPassword(e.target.value);
	};

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		props.handleRegisterUser(authPassword, authEmail);
	}
    

	return (
		<form 
			className="auth__form" 
			onSubmit={handleSubmitRegister}
		>
			<h2 className="auth__title">Регистрация</h2>
			<input 
				className="auth__input" 
				type="email"
				placeholder="Email"
				required
				autoComplete="on"
				value={authEmail}
				onChange={handleChangeEmail}
			></input>
			<input 
				className="auth__input" 
				type="password" 
				placeholder="Пароль"
				value={authPassword}
				required
				autoComplete="on"
				onChange={handleChangePassword}
			></input>
			<button className="auth__submit-btn" type="submit">Зарегистрироваться</button>
			<p className="auth__text">
				Уже зарегистрированы? 
				<Link className="auth__link" to="/sign-in">Войти</Link>
			</p>
		</form>
	)
}

export default Register;