import {
  IUserTransactionType,
} from "../interfaces/user-interface";

type TransactionTableProps = {
  transactionItem: IUserTransactionType;
};

function TransactionTableInfo(props: TransactionTableProps) {
  const { transactionItem } = props;

  return (
    <tr>
      <td>{transactionItem.transactionName}</td>
      <td >{transactionItem.type}</td>
      <td className={transactionItem.style}>{`R$ ${transactionItem.value}`}</td>
      <td>{transactionItem.createdAt}</td>
    </tr>
  );
}

export default TransactionTableInfo;
