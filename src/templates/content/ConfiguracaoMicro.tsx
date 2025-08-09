import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, InputLabel, List, ListItem, MenuItem, Modal, Select, Typography, type SelectChangeEvent } from "@mui/material";
import React from "react"

interface ConfiguracaoMicroParams {
  closeModal: () => void;
}

const ConfiguracaoMicro: React.FC<ConfiguracaoMicroParams> = ({ closeModal }) => {
  const [modalOpen, setModalOpen] = React.useState(true);
  const [microcontrolador, setMicrocontrolador] = React.useState("");
  const [core, setCore] = React.useState("");
  
  const handleChangeMicrocontrolador = (event: SelectChangeEvent) => {
    setMicrocontrolador(event.target.value)
  }

  const handleChangeCore = (event: SelectChangeEvent) => {
    setCore(event.target.value)
  }

  return (
    <React.Fragment>
      <Modal
        open={modalOpen}
        onClose={() => {
          closeModal()
          setModalOpen(false)
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "maxContent",
          alignItems: "center"
        }}
      >
        <Card sx={{
          width: '600px',
          height: '570px',
        }}>
          <CardHeader title="Configuração do Microcontrolador" subheader="Configurar o ambiente de execução para o microcontrolador." />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              paddingTop: '0px',
            }}
          >
            <InputLabel sx={{fontSize: '1.2em'}}>Microcontrolador</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={microcontrolador}
                onChange={handleChangeMicrocontrolador}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                <MenuItem value="Arduino UNO R3">Arduino UNO R3</MenuItem>
                <MenuItem value="Arduino ATMega 328p"></MenuItem>
              </Select>
            </FormControl>
            <InputLabel sx={{fontSize: '1.2em'}}>Core</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={core}
                onChange={handleChangeCore}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value=""><em>Nenhum</em></MenuItem>
              </Select>
            </FormControl>
            <Divider />
            <Typography>Bibliotecas</Typography>
            <Box
              border={"1px solid gray"}
              overflow={"auto"}
              maxHeight={'96px'}
              sx={{'::-webkit-scrollbar': {
                backgroundColor: '#969696ff',
                borderRadius: '10px'
              }, '::-webkit-scrollbar-thumb': {
                backgroundColor: '#dadadaff',
                borderRadius: '19px'
              }}}
            >
              <List>
                <ListItem key={"0"}>Wi-fi</ListItem>
                <ListItem key={"1"}>Bluetooth</ListItem>
                <ListItem key={"2"}>ESP32</ListItem>
              </List>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Button variant="outlined">Cancelar</Button>
              <Button variant="contained">Salvar</Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </React.Fragment>
  )
}

export default ConfiguracaoMicro;