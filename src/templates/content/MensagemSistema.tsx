import { Button, Card, Modal, Typography } from "@mui/material"
import React from "react";

interface MensagemSistemaParams {
  closeModal: () => void;
  mensagemSistema: string;
}

const MensagemSistema: React.FC<MensagemSistemaParams> = ({ closeModal, mensagemSistema }) => {
  const [modalOpen, setModalOpen] = React.useState(true)

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        closeModal()
        setModalOpen(false)
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "maxContent",
      }}
    >
      <Card sx={{
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Typography>{mensagemSistema}</Typography>
        <Button variant="contained" onClick={() => {
          closeModal()
          setModalOpen(false)
        }}>OK</Button>
      </Card>
    </Modal>
  )
}

export default MensagemSistema