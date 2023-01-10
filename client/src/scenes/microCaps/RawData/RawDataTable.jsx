import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import DataTable from "components/DataTable";
import RawDataModal from "./RawDataModal";
import BasicDatePicker from "components/BasicDatePicker";

const dateFormat = "MM/dd/yyyy";
const today = format(new Date(), dateFormat);

const RawDataTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState([]);
  //date picker
  const [date, setDate] = React.useState(today);
  const token = useSelector((state) => state.token);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/dexGems/date/${date.replaceAll("/", "-")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && data && (
        <div>
          <BasicDatePicker
            date={date}
            setDate={setDate}
            dateFormat={dateFormat}
          />
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
              selectedRowData={selectedRowData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RawDataTable;
