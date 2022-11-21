import { useAppContext } from "../context/app-context/hook";
import { IUser, IToken } from "../interfaces/user-interface";
import { IFetchTransfer } from "../interfaces/fetch-interface";
import GenericButton from "./genericButton";
import GenericInput from "./genericInput";


export type TransactionBoxProps = {
  user: IUser;
};

function TransactionBox(props: TransactionBoxProps) {
  const {
    onChangeCashInHandler,
    cashInAccount,
    transactionHandler,
    setUserLoggedInfoHandler,
    setCashInUser,
  } = useAppContext();
  const { user } = props;


  const handleDisabled = (): boolean => {
    if (cashInAccount.username.length < 3 || cashInAccount.value <= 0) {
      return true;
    }
    return false;
  };

  const handleCashIn = async () => {
    const cashIn = {
      ...cashInAccount,
      token: user.token,
    } as IFetchTransfer;
  
    const transaction = await transactionHandler(cashIn)

    if (transaction.message) {
      alert (`${transaction.message}`);
      setCashInUser({username: "", value: ""});
    }

    setUserLoggedInfoHandler({ token: user.token as string } as IToken);
    setCashInUser({ username: "", value: "" });
  }



  return (
    <div className="transaction-info">
      <h1>Qual é o valor da transfêrencia?</h1>
      <h3>{`Saldo disponivel em conta R$: ${user.account.balance.toFixed(
        2
      )} `}</h3>

      <GenericInput
        type="number"
        placeholder="ex: 21.90"
        className="transactionInput"
        name="transactionValue"
        value={cashInAccount.value}
        labelName="Valor:"
        labelClassname="transaction-label"
        handleChange={onChangeCashInHandler}
      />

      <GenericInput
        type="text"
        placeholder="ex: ngcash123"
        className="cashInInput"
        name="cashInAccount"
        value={cashInAccount.username}
        labelName="Username do Destinatário:"
        labelClassname="transaction-label"
        handleChange={onChangeCashInHandler}
      />

      <GenericButton
        buttonName="Transferir"
        className="transaction-btn"
        isDisabled={handleDisabled()}
        handleClick={ handleCashIn }
      />
    </div>
  );
}

export default TransactionBox;
