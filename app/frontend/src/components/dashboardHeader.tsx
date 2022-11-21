import { useNavigate } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import GenericButton from "./genericButton";
import { TransactionBoxProps } from "./transactionBox";

function DashboardHeader(props: TransactionBoxProps) {
  const { user } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header-container-dash">
      <div className="navbar-brand-dash">
        <img
          src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg"
          alt="NG Logo"
        />
      </div>
      {
        Object.keys(user).length === 0
        ? null 
        : (
          <div className="navbar-menu-dash">
            <div className="balance-info">
              <h1>Saldo</h1>
              <p>{`R$: ${(user.account.balance).toFixed(2)}`}</p>
            </div>

            <span />

            <div className="user-info-dash">
              <UserCircle size={30} color="#f2f2f2" weight="duotone" />
              <p>{user.username}</p>
            </div>

            <span />

            <GenericButton 
              buttonName="Sair"
              className="logout-btn"
              handleClick={ handleLogout }
            />
          </div>
        )
      }
    </header>
  );
}

export default DashboardHeader;
