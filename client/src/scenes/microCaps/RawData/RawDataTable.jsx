import React from "react";
import { useSelector } from "react-redux";
import DataTable from "components/DataTable";

const RawDataTable = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState([]);
  const token = useSelector((state) => state.token);

  const getData = async () => {
    try {
      //get data of last 7 days
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() - 7));

      const response = await fetch("/dexGems/timespan", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: {
          startDate: JSON.stringify(startDate),
          endDate: JSON.stringify(endDate),
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

  React.useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div>RawDataTable</div>;
};

export default RawDataTable;