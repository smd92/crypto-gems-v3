import React from "react";
import { useSelector } from "react-redux";
import DataTable from "components/DataTable";
import AddButton from "components/AddButton";
import EditButton from "components/EditButton";
import DeleteButton from "components/DeleteButton";

const ResearchTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [selectedRowData, setSelectedRowData] = React.useState([]);
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

  const deleteData = async () => {
    for (let i = 0; i < selectedRowData.length; i++) {
      try {
        const response = await fetch(
          `/dexGemsResearch/${selectedRowData[i].id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
      } catch (err) {
        console.log("Unable to delete data: " + err.message);
      }
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

  return (
    <>
      <DataTable
        rows={rows}
        columns={columns}
        setSelectedRowData={setSelectedRowData}
      />
      {/* BUTTONS FOR DB OPERATIONS */}
      <AddButton />
      {selectedRowData.length === 1 && <EditButton />}
      {selectedRowData.length >= 1 && <DeleteButton deleteData={deleteData} />}
    </>
  );
};

export default ResearchTable;
