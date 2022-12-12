import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import AddButton from "./AddButton";

export default function DataTable(props) {
  const [selectedRowData, setSelectedRowData] = React.useState([]);

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
      <AddButton />
      {selectedRowData.length === 1 && <EditButton />}
      {selectedRowData.length >= 1 && <DeleteButton />}
    </>
  );
}
