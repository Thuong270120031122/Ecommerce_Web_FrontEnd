import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Alert, Button, Collapse, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

export function AlertCard({ message, state, openAlert }) {
  console.log(openAlert);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(openAlert);
    setTimeout(() => setOpen(false), 5000);
  }, [openAlert, message, state]);
  return (
    <div className="w-[25rem] fixed z-50 top-4 right-4">
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity={state}
          action={
            <CancelIcon
              sx={{ mt: "2px" }}
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            ></CancelIcon>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}
