import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";

export default function DataTable(props) {
  const [selectedRowData, setSelectedRowData] = React.useState([]);
  const token = useSelector((state) => state.token);

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

        setSelectedRowData([]);
      } catch (err) {
        console.log("Unable to delete data: " + err.message);
      }
    }
  };

  return (
    <>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = props.rows.filter((row) =>
              selectedIDs.has(row.id.toString())
            );
            setSelectedRowData(selectedRowData);
          }}
        />
      </div>

      {/* BUTTONS FOR DB OPERATIONS */}
      <AddButton />
      {selectedRowData.length === 1 && <EditButton />}
      {selectedRowData.length >= 1 && <DeleteButton deleteData={deleteData} />}
    </>
  );
}
