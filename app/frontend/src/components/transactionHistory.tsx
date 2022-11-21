import { useEffect, useState } from "react";
import TransactionTable from "./transactionTable"
import { IUserTransactionType } from "../interfaces/user-interface";
import GenericButton from "./genericButton";

type TransactionTableProps = {
  list: IUserTransactionType[];
};

function TransactionHistory(props: TransactionTableProps) {
  const [filterList, setFilterList] = useState<IUserTransactionType[]>([]);
  const { list } = props;

  useEffect(() => {
    setFilterList(list);
  }, [list]);


  const handleDataFilter = (): any => {
    const sortedData = filterList.sort((a, b) => {
      const date1 = new Date(a.createdAt);
      const date2 = new Date(b.createdAt);
      return date1.getTime() - date2.getTime();
    })
    console.log(sortedData);
    setFilterList(sortedData);
  }

  const handleCashInFilter = () => {
    const sortedData = list.filter((item) => item.type === "cashIn");
    setFilterList(sortedData);
  }

  const handleCashOutFilter = () => {
    const sortedData = filterList.filter((item) => item.type === "cashOut");
    setFilterList(sortedData);
  }

  const handleResetFilter = () => {
    setFilterList(list);
  }

  
  return (
    <div className="transaction-history">
      <h1>Histórico de Transações</h1>
      <div className="filter-container">
        <GenericButton 
          buttonName="Data"
          className="filter-button"
          handleClick={ () => handleDataFilter() }
        />

        <GenericButton 
          buttonName="Cash In"
          className="filter-button"
          handleClick={ () => handleCashInFilter() }
        />

        <GenericButton 
          buttonName="Cash Out"
          className="filter-button"
          handleClick={ () => handleCashOutFilter() }
        />

        <GenericButton 
          buttonName="Reset"
          className="filter-button"
          handleClick={ () => handleResetFilter() }
        />
      </div>
      <TransactionTable 
        list={filterList}
      />
    </div>
  )
}

export default TransactionHistory