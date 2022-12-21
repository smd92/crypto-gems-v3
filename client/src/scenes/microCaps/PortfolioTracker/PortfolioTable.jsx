import React from "react";
import { useSelector } from "react-redux";
import DataTable from "components/DataTable";
import PortfolioModal from "./PortfolioModal";

const PortfolioTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState([]);
  const token = useSelector((state) => state.token);

  const getData = async () => {
    try {
      const response = await fetch("/portfolioToken", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      let data = await response.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDataById = async () => {
    try {
      const id = selectedRowData[0].id;
      const response = await fetch(`/portfolioToken/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      let data = await response.json();
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    }
  };

  const addData = async (data) => {
    try {
      const response = await fetch("/portfolioToken", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      getData(); //update table content
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    }
  };

  const editData = async (data) => {
    try {
      const id = selectedRowData[0].id;
      const response = await fetch(`/portfolioToken/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      getData(); //update table content
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    }
  };

  const deleteData = () => {
    const promises = selectedRowData.map((obj) => {
      return fetch(`/portfolioToken/${obj.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    Promise.all(promises)
      .then(() => getData())
      .catch((err) => console.log("Unable to delete data: " + err.message));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "tokenAddress", headerName: "Token Address", width: 150 },
    { field: "tokenSymbol", headerName: "Symbol", width: 70 },
    { field: "tokenName", headerName: "Name", width: 100 },
    { field: "buyAmount", headerName: "Amount", width: 150 },
    { field: "buyPriceUSD", headerName: "Buy Price USD", width: 100 },
    { field: "buyFeeUSD", headerName: "Buy Fee USD", width: 100 },
    { field: "currentPriceUSD", headerName: "Current Price USD", width: 150 },
    { field: "currentWorthUSD", headerName: "Current Worth USD", width: 150 },
  ];

  const getRows = () => {
    const rows = data.map((obj) => {
      return {
        id: obj._id,
        tokenAddress: obj.tokenAddress,
        tokenSymbol: obj.tokenSymbol,
        tokenName: obj.tokenName,
        buyAmount: obj.buyAmount,
        buyPriceUSD: obj.buyPriceUSD,
        buyFeeUSD: obj.buyFeeUSD,
      };
    });
    return rows;
  };

  React.useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    data && (
      <div>
        <DataTable
          rows={getRows()}
          columns={columns}
          setSelectedRowData={setSelectedRowData}
          width="70%"
        />
      </div>
    )
  );
};

export default PortfolioTable;
