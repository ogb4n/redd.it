import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

interface BasicModalProps {
  labelButton: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  bgcolor?: string;
  hoverBgcolor?: string;
  sx?: any;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  labelButton,
  children,
  bgcolor,
  icon,
  hoverBgcolor,
  ...sx
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button sx={{ bgcolor: bgcolor,  "&:hover": {
            bgcolor: hoverBgcolor, 
          }, }} onClick={() => setOpen(true)}>
        {icon}
        {labelButton}
      </Button>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {children}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};
