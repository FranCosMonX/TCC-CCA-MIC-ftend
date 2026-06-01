import { Button, Card, Divider, Link, Modal, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import React from "react";

interface MensagemSistemaParams {
  closeModal: () => void;
  mensagemSistema: string;
  links?: string[]
}

const MensagemSistema: React.FC<MensagemSistemaParams> = ({ closeModal, mensagemSistema, links }) => {
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
        gap: '10px',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <Typography>{mensagemSistema}</Typography>
        <Divider sx={{color: grey[200]}} />
        {
          links !== undefined && links.length > 0 && 
          <Typography sx={{width: '100%', textAlign: 'left'}} variant="body2">
            Links úteis: {links.map((link, index) => {
              if (links.length == 1){
                return (
                  <Link key={index} href={link}>{link}</Link>
                )
              } else {
                if (index < links.length - 2){
                  return (
                    <Link key={index} href={link}>{link}, </Link>
                  )
                }else{
                  return (
                    <Link key={index} href={link}>{link}.</Link>
                  )
                }
              }
            })}
          </Typography>
        }
        <Button variant="contained" onClick={() => {
          closeModal()
          setModalOpen(false)
        }}>OK</Button>
      </Card>
    </Modal>
  )
}

export default MensagemSistema