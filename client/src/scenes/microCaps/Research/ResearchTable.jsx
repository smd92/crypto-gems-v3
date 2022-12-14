import React from "react";
import { Box, Typography} from "@mui/material";
import { useSelector } from "react-redux";
import DataTable from "components/DataTable";
import ResearchModal from "scenes/microCaps/Research/ResearchModal";

const ResearchTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState([]);
  const token = useSelector((state) => state.token);

  const getData = async () => {
    try {
      setLoading(true);
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

  const getDataById = async () => {
    try {
      const id = selectedRowData[0].id;
      const response = await fetch(`/dexGemsResearch/${id}`, {
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
      const response = await fetch("/dexGemsResearch", {
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
      const response = await fetch(`/dexGemsResearch/${id}`, {
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
      return fetch(`/dexGemsResearch/${obj.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    Promise.all(promises)
      .then(() => getData())
      .catch((err) => console.log("Unable to delete data: " + err.message));
  };

  const tweetData = async () => {
    try {
      const id = selectedRowData[0].id;
      const response = await fetch(`twitter/dexGemsResearch/${id}`, {
        method: "PATCH",
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

      getData(); //update table content
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "symbol", headerName: "Symbol", width: 70 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "dexToolsURL", headerName: "DexTools", width: 70 },
    { field: "tokenAddress", headerName: "Token Address", width: 70 },
    { field: "isBuy", headerName: "Is Buy?", width: 70 },
    { field: "dateAdded", headerName: "Date Added", width: 150 },
    { field: "isTweeted", headerName: "Is Tweeted?", width: 90 },
    { field: "priceChangePct", headerName: "Price Change %", width: 150 },
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
        isTweeted: obj.isTweeted,
        priceChangePct: obj.researchData.priceChangePct,
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
        {/* BUTTONS FOR DB OPERATIONS */}
        {selectedRowData.length === 0 && (
          <ResearchModal dbOperation={"addData"} handleOperation={addData} />
        )}
        {selectedRowData.length === 1 && (
          <ResearchModal
            dbOperation={"editData"}
            handleOperation={editData}
            getDataById={getDataById}
          />
        )}
        {selectedRowData.length >= 1 && (
          <ResearchModal
            dbOperation={"deleteData"}
            handleOperation={deleteData}
            selectedRowData={selectedRowData}
          />
        )}
        {selectedRowData.length === 1 &&
          selectedRowData[0].isTweeted == false && (
            <ResearchModal
              dbOperation={"tweetData"}
              handleOperation={tweetData}
            />
          )}
          <Box>
            <Typography>Total Price Change %:</Typography>
            <Typography>{data.map((obj) => obj.researchData.priceChangePct).reduce((a, b) => a + b)}</Typography>
          </Box>
      </div>
    )
  );
};

export default ResearchTable;
