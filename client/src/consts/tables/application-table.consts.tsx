import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

export const applicationTableColumns: Array<GridColDef> = [
  {
    field: "name",
    headerName: "Package Name",
    sortable: false,
    flex: 2,
  },
  {
    field: "screenshotCount",
    headerName: "Monitor Count",
    sortable: false,
    flex: 1,
  },
  {
    field: "actions",
    headerName: "View monitoring",
    sortable: false,
    flex: 1,
    renderCell: ({ id }) => {
      return (
        <Button
          variant="outlined"
          onClick={() => {
            window.location.href = `/applications/${id}`;
          }}
        >
          View
        </Button>
      );
    },
  },
];
