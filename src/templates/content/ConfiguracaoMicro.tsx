import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, InputLabel, List, ListItem, MenuItem, Modal, Select, Typography, type SelectChangeEvent } from "@mui/material";
import React, { type ChangeEvent } from "react"
import api from "../../api/api";

interface ConfiguracaoMicroParams {
  closeModal: () => void;
}

const ConfiguracaoMicro: React.FC<ConfiguracaoMicroParams> = ({ closeModal }) => {
  const [configMicInicializado, setConfigMicInicializado] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(true);
  const [microcontrolador, setMicrocontrolador] = React.useState("");
  const [core, setCore] = React.useState("");
  
  React.useEffect(() => {
    if(!configMicInicializado){
      const carregarDados = async () => {
        await api.get('/configuracaoMicrocontrolador')
          .then((e: any) => {
            console.log(e);
            setMicrocontrolador(e.microcontrolador);
          })
          .catch(() => {
            alert("Problemas ao carregar os dados do microcontrolador.");
            closeModal();
            setModalOpen(false);
          })
      }
  
      //const dados = carregarDados()
      // setConfigMicInicializado(true)
    }
  }, [configMicInicializado])

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (microcontrolador == "") {
      alert("Problema em modificar o campo. Escolha uma opção válida.")
    }
    await api.post('/configuracaoMicrocontrolador', {microcontrolador: microcontrolador})
      .then((e:any) => {
        alert(e.data.mensagem)
        closeModal()
        setModalOpen(false)
      })
      .catch(() => {
        alert("Os dados não podem ser salvos. Examine os campos e tente novamente.")
      })
  }

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
        <Card component={'form'} onSubmit={handleSubmit} sx={{
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
            <FormControl  sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={microcontrolador}
                id="microcontrolador"
                onChange={handleChangeMicrocontrolador}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                <MenuItem value="ESP32">ESP 32</MenuItem>
                <MenuItem value="Arduino UNO R3">Arduino UNO R3</MenuItem>
                <MenuItem value="Arduino ATMega 328p">Arduino ATMega 328p</MenuItem>
              </Select>
            </FormControl>
            <InputLabel sx={{fontSize: '1.2em'}}>Core</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="core"
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
                width: '8px'
              }, '::-webkit-scrollbar-thumb': {
                backgroundColor: '#dadadaff',
                width: '5px'
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
              <Button type="submit" variant="contained">Salvar</Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </React.Fragment>
  )
}

export default ConfiguracaoMicro;