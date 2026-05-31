import { Box, Button, Card, Modal, Typography } from "@mui/material"
import React from "react";

interface MensagemSistemaParams {
  closeModal?: () => void;
  alternaticaTrueCallback: () => void;
  alternativaFalseCallback: () => void;
  textBtnFalse: string;
  textBtnTrue: string;
  mensagemSistema: string;
}

const OpcaoBinariaSistema: React.FC<MensagemSistemaParams> = ({ closeModal, mensagemSistema, textBtnFalse, textBtnTrue, alternaticaTrueCallback,alternativaFalseCallback }) => {
  const [modalOpen, setModalOpen] = React.useState(true)

  return (
    <Modal
      open={modalOpen}
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
        gap: '10px',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <Typography>{mensagemSistema}</Typography>
        <Box display={"flex"} justifyContent={'space-around'} width={'100%'}>
          <Button variant="outlined" onClick={() => {
            alternativaFalseCallback();
            if (closeModal !== undefined) closeModal()
            setModalOpen(false)
          }}>{textBtnFalse}</Button>
          <Button variant="contained" onClick={() => {
            alternaticaTrueCallback();
            if (closeModal !== undefined) closeModal()
            setModalOpen(false)
          }}>{textBtnTrue}</Button>
        </Box>
      </Card>
    </Modal>
  )
}

export default OpcaoBinariaSistema