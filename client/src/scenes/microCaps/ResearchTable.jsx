import React from "react";
import { useSelector } from "react-redux";
import DataTable from "components/DataTable";

const ResearchTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const token = useSelector((state) => state.token);

  const getData = async () => {
    try {
      const response = await fetch("/dexGemsResearch", {
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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "symbol", headerName: "Symbol", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "dexToolsURL", headerName: "DexTools", width: 200 },
    { field: "tokenAddress", headerName: "Token Address", width: 200 },
    { field: "isBuy", headerName: "Is Buy?", width: 200 },
    { field: "dateAdded", headerName: "Date Added", width: 200 },
  ];

  const getRows = () => {
    const rows = data.map((obj) => {
      return {
        id: obj._id,
        symbol: obj.researchData.symbol,
        name: obj.researchData.name,
        dexToolsURL: obj.researchData.dexToolsURL,
        tokenAddress: obj.researchData.tokenAdress,
        isBuy: obj.researchData.isBuy,
        dateAdded: new Date(obj.createdAt),
      };
    });
    setRows(rows);
  };

  React.useEffect(() => {
    getData();
    if (data) getRows();
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return <DataTable rows={rows} columns={columns} />;
};

export default ResearchTable;
