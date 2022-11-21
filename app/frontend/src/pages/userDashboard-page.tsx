import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboardHeader";
import TransactionBox from "../components/transactionBox";
import TransactionHistory from "../components/transactionHistory";
import { useAppContext } from "../context/app-context/hook";
import { getLocalStorage } from "../helpers/localStorage";
import { IToken } from "../interfaces/user-interface";

function UserDashboardPage() {
  const {
    userLoggedInfo,
    setUserLoggedInfoHandler,
    transactionList,
    getAllTransactions,
    isInfoUpdated,
  } = useAppContext();
  const navigate = useNavigate();

  const user = useMemo(
    () => getLocalStorage<IToken>("user") || null,
    []
  ) as IToken;

  useEffect(() => {
    try {
      if (user.token) {
        setUserLoggedInfoHandler({ token: user.token as string } as IToken);
      }

      if (Object.keys(userLoggedInfo).length > 0) {
        getAllTransactions(
          { token: user.token as string } as IToken,
          userLoggedInfo.accountId
        );
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const updateInfo = async () => {
      const verifyInfo = await isInfoUpdated({ token: user.token });
      if (Object.keys(userLoggedInfo).length > 0 || verifyInfo) {
        const { userInfo, transactions } = verifyInfo;

        if (userInfo.account.balance !== userLoggedInfo.account.balance) {
          await setUserLoggedInfoHandler({ token: user.token as string } as IToken);
        }
        if (transactions.length > transactionList.length) {
          getAllTransactions(
            { token: user.token as string } as IToken,
            userLoggedInfo.accountId
          );
        }
      }
    };
    updateInfo();
  }, [
    isInfoUpdated,
    transactionList,
    userLoggedInfo,
    getAllTransactions,
    user.token,
    setUserLoggedInfoHandler,
  ]);

  return (
    <section className="tertiary-container">
      <DashboardHeader user={{ ...userLoggedInfo }} />
      <section className="transaction-container">
        {Object.keys(userLoggedInfo).length === 0 && user !== null ? null : (
          <TransactionBox user={{ ...userLoggedInfo, token: user.token }} />
        )}
        {Object.keys(userLoggedInfo).length === 0 &&
        transactionList.length === 0 &&
        user !== null ? null : (
          <TransactionHistory list={transactionList} />
        )}
      </section>
    </section>
  );
}

export default UserDashboardPage;
