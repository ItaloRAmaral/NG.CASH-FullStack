import Header from "../components/header";
import LoginModal from "../components/login-modal";
import { useUserContext } from "../context/user-context/hook";
import useIsUserLoggedIn from "../hooks/useIsUserLoggedIn";

function HomePage() {
  const { isMenuLogin } = useUserContext();
  useIsUserLoggedIn();
  
  return (
    <section className="secondary-container">
      <Header />
      <section className="main-info-container">
        <div className="info-section">
          <h1>A Carteira da nova geração.</h1>
          <h2>É para todas as idades!</h2>
          <div className="apps-container">
            <img
              src="https://ng.cash/_nuxt/img/googleplay.a58a8ba.png"
              alt="Google Play"
            />
            <img
              src="https://ng.cash/_nuxt/img/appstore.a23ac7c.png"
              alt="Apple Store"
            />
          </div>
        </div>

        <div className="appimg-container">
          <img
            src="https://ng.cash/_nuxt/img/home-ngcash-app.49e176e.png"
            alt="Celular com a tela do app NGCASH"
          />
        </div>
      </section>
      {isMenuLogin ? <LoginModal /> : null}
    </section>
  );
}

export default HomePage;