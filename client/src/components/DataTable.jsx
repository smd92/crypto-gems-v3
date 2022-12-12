import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable(props) {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
