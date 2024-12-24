import * as React from "react";
import { Button } from "./Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

interface BasicModalProps {
  labelButton: string;
  children: React.ReactNode;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  labelButton,
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
        label={labelButton}
        color="bg-accent"
        onClick={() => setOpen(true)}
      />

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
