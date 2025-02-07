import React from 'react';

interface TableItem {
  name: string;
  amount: number;
  price: number;
  size?: string;
  totalAmount: number;
}

interface TableProps {
  data: TableItem[];
}

const Table = (props: TableProps) => {
  const { data } = props;
  return (
    <table className="table table-success table-striped table-bordered table-responsive">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена за 1 единицу</th>
          <th>Общая сумма</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.amount}</td>
            <td>{item.price}</td>
            <td>{item.totalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
