import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = (props) => {
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
            props.setSelectedRowData(selectedRowData);
          }}
        />
      </div>
    </>
  );
};

export default DataTable;
