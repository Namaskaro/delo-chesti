import React from 'react';

interface TableItemWithLink {
  name: string;
  amount: number;
  price: number;
  link: string;
}

interface TableProps {
  data: TableItemWithLink[] | undefined;
}

const TableWithLinks = (props: TableProps) => {
  const { data } = props;
  return (
    <div className="table-responsive">
      <table className="table table-success table-striped table-bordered table-responsive">
        <thead>
          <tr>
            <th>Наименование расходов</th>
            <th>Количество</th>
            <th>Цена за 1 единицу</th>
            <th>Источник закупки</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.price}</td>
              <td>
                <a href={item.link}>{item.link}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithLinks;
