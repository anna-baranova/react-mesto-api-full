import React from 'react';

function Login(props) {

  const [authEmail, setAuthEmail] = React.useState("");
  const [authPassword, setAuthPassword] = React.useState("");

  const handleChangeEmail = (e) => {
		setAuthEmail(e.target.value);
	};
	const handleChangePassword = (e) => {
		setAuthPassword(e.target.value);
	};

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		props.handleLoginUser(authPassword, authEmail);
	}


  return (
    <form 
      className="auth__form"
      onSubmit={handleSubmitLogin}>
      <h1 className="auth__title">Вход</h1>
      <input 
        className="auth__input" 
        type="email"
        placeholder="Email"
        required
        autoComplete='on'
        value={authEmail}
        onChange={handleChangeEmail}
        
      ></input>
      <input 
        className="auth__input" 
        type="password" 
        placeholder="Пароль"
        required
        autoComplete='on'
        value={authPassword}
        onChange={handleChangePassword}       
      ></input>
      <button className="auth__submit-btn" type="submit">Войти</button>
    </form>
  )
}

export default Login;