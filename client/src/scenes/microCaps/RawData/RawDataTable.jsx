import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import DataTable from "components/DataTable";
import RawDataModal from "./RawDataModal";

const RawDataTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState([]);
  const token = useSelector((state) => state.token);

  const getData = async () => {
    try {
      const response = await fetch("/dexGems/latest", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      let data = await response.json();
      setData(data);
      setError(null);
      console.log(data);
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = () => {
    const promises = selectedRowData.map((obj) => {
      return fetch(`/dexGems/${obj.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    Promise.all(promises)
      .then(() => getData())
      .catch((err) => console.log("Unable to delete data: " + err.message));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "symbol", headerName: "Symbol", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "marketCapUSD", headerName: "Marketcap USD", width: 150 },
    { field: "totalLiquidityUSD", headerName: "Total Liq USD", width: 150 },
    { field: "liqToMcap", headerName: "Liq to Mcap", width: 150 },
    { field: "createdAt", headerName: "Created at", width: 150 },
    { field: "priceChangePct", headerName: "Price Change %", width: 150 },
  ];

  const getRows = () => {
    const rows = data.map((obj) => {
      return {
        id: obj.id,
        symbol: obj.symbol,
        name: obj.name,
        marketCapUSD: obj.marketCapUSD,
        totalLiquidityUSD: obj.totalLiquidityUSD,
        liqToMcap: obj.liqToMcap,
        createdAt: (function compute() {
          const unixTimestamp = obj.createdAtTimestamp;
          const milliseconds = unixTimestamp * 1000;
          const date = new Date(milliseconds);
          return date.toLocaleString();
        })(),
        priceChangePct: obj.priceChangePct,
      };
    });
    return rows;
  };

  React.useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {data && (
        <div>
          <DataTable
            rows={getRows()}
            columns={columns}
            setSelectedRowData={setSelectedRowData}
            width="90%"
          />
          {selectedRowData.length >= 1 && (
            <RawDataModal
              dbOperation={"deleteData"}
              handleOperation={deleteData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RawDataTable;
