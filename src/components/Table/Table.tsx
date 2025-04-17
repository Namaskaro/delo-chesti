import React from 'react';

interface TableItem {
  name: string;
  amount: number;
  subname?: string;
  price: number;
  size?: string;
  totalAmount: number;
}

interface TableProps {
  data: TableItem[] | undefined;
}

const Table = (props: TableProps) => {
  const { data } = props;
  return (
    <div className="table-responsive">
      {data?.some((item) => item.subname) ? (
        <table className="table table-success table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <th>Наименование автомобиля</th>
              <th>Наименование детали</th>
              <th>Количество</th>
              <th>Цена за 1 единицу</th>
              <th>Общая сумма</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.subname}</td>
                <td>{item.amount}</td>
                <td>{item.price}</td>
                <td>{item.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="table-responsive">
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
              {data?.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>{item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
