import { useAppContext } from "../context/app-context/hook";
import GenericButton from "./genericButton";

function Header() {
  const { isMenuLoginHandler } = useAppContext();
  return (
    <header className="header-container">
      <div className="navbar-brand">
        <img
          src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg"
          alt="NG Logo"
        />
      </div>
      <div className="navbar-menu">
        <span>Benefícios</span>
        <span>Tarifas</span>
        <span>Ajuda</span>
        <span>Segurança</span>
        <span>Carreiras</span>
        <span>Parcerias</span>
        <GenericButton
          buttonName="Login"
          className="login-btn"
          isDisabled={false}
          handleClick={ isMenuLoginHandler }
        />
      </div>
    </header>
  );
}

export default Header;
