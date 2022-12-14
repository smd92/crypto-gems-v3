import React from "react";
import { useSelector } from "react-redux";
import DataTable from "components/DataTable";
import AddButton from "components/Buttons/AddButton";
import EditButton from "components/Buttons/EditButton";
import DeleteButton from "components/Buttons/DeleteButton";
import TweetButton from "components/Buttons/TweetButton";

const ResearchTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
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

  const addData = () => {
    try {
      console.log("add data")
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    }
  };

  const editData = () => {
    try {
      console.log("edit data")
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

  const tweetData = () => {
    try {
      console.log("tweet data")
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
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
    { field: "isTweeted", headerName: "Is Tweeted?", width: 200 },
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
        />
        {/* BUTTONS FOR DB OPERATIONS 
        {selectedRowData.length === 0 && <AddButton onClick={addData} />}
        {selectedRowData.length === 1 && <EditButton onClick={editData} />}
        {selectedRowData.length >= 1 && (
          <DeleteButton onClick={deleteData} />
        )}
        {selectedRowData.length === 1 &&
          selectedRowData[0].isTweeted == false && (
            <TweetButton onClick={tweetData} />
          )} */}
      </div>
    )
  );
};

export default ResearchTable;
