import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user-context/hook";
import GenericButton from "./genericButton";
import GenericInput from "./genericInput";
import { XCircle } from "phosphor-react";
import { fetchLogin, fetchRegister } from "../helpers/fetchApi";
import { setLocalStorage } from "../helpers/localStorage";

const INVALID_ERROR = "Invalid UserName or Password";

function LoginModal() {
  const [isError, setIsError] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const navigate = useNavigate();
  const { isMenuLoginHandler } = useUserContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "registerUsername":
        setRegisterUsername(event.target.value);
        break;
      case "registerPassword":
        setRegisterPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    const isLoginPasswordValid = passwordRegex.test(password);
    const isRegisterPasswordValid = passwordRegex.test(registerPassword);

    if (!isLoginPasswordValid || username.length < 3) {
      setIsLoginDisabled(true);
    } else {
      setIsLoginDisabled(false);
    }
    if (!isRegisterPasswordValid || registerUsername.length < 3) {
      setIsRegisterDisabled(true);
    } else {
      setIsRegisterDisabled(false);
    }
  }, [username, password, registerUsername, registerPassword]);

  const handleLogin = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<any> => {
    try {
      switch (event.target.name) {
        case "Entrar":
          const loginToken = await fetchLogin({ username, password });
          if(!loginToken.token) throw new Error(INVALID_ERROR);
          setLocalStorage("token", loginToken.token);
          setIsError(false);
          navigate('/dashboard');
          break;
          
          case "Cadastrar":
            const registerToken = await fetchRegister({
              username: registerUsername,
              password: registerPassword,
            });
            if(!registerToken.token) throw new Error(INVALID_ERROR);
            setLocalStorage("token", registerToken.token);
            setIsError(false);
            navigate("/dashboard");
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <div className="login-modal">
      <XCircle
        className="exit-loginform"
        size={20}
        color="#454545"
        weight="fill"
        onClick={isMenuLoginHandler}
      />

      <div className="login-form">
        <h1>Entrar</h1>
        <GenericInput
          labelName="Username"
          labelClassname="inpt-label"
          className="username-input"
          type="text"
          name="username"
          value={username}
          placeholder="digite seu usuário"
          handleChange={handleChange}
        />
        <GenericInput
          labelName="Password"
          labelClassname="inpt-label"
          className="password-input"
          type="password"
          name="password"
          value={password}
          placeholder="********"
          handleChange={handleChange}
        />

        <GenericButton
          buttonName="Entrar"
          className="login-btn"
          isDisabled={isLoginDisabled}
          handleClick={handleLogin as unknown as any}
        />
      </div>

      <span className="line-form" />

      <div className="login-form">
        <h1>Cadastrar</h1>
        <GenericInput
          labelName="Username"
          labelClassname="inpt-label"
          className="username-input"
          type="text"
          name="registerUsername"
          value={registerUsername}
          placeholder="digite seu usuário"
          handleChange={handleChange}
        />
        <GenericInput
          labelName="Password"
          labelClassname="inpt-label"
          className="password-input"
          type="password"
          name="registerPassword"
          value={registerPassword}
          placeholder="********"
          handleChange={handleChange}
        />

        <GenericButton
          buttonName="Cadastrar"
          className="login-btn"
          isDisabled={isRegisterDisabled}
          handleClick={ handleLogin as unknown as any}
        />
      </div>
      {isError && <span className="error-msg">Erro ao fazer login/cadastro</span>}
    </div>
  );
}

export default LoginModal;
