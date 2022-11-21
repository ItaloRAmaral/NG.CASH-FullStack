import{ IUserTransactionType } from "../interfaces/user-interface";
import TransactionTableInfo from "./transactionTableInfo";

type TransactionTableProps = {
  list: IUserTransactionType[];
};

function TransactionTable(props: TransactionTableProps) {
  const { list } = props;
  return (
    <div className="transaction-table-container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {
            list.length === 0
            ? null
            : (
              list.map((item) => (
                <TransactionTableInfo
                  key={item.transactionId}
                  transactionItem={item}
                />
              ))
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
