import React from "react"
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';
import type { SelectChangeEvent } from "@mui/material";

interface ConfiguracaoGeralParams {
  closeModal: () => void;
}

const ConfiguracaoGeral: React.FC<ConfiguracaoGeralParams> = ({closeModal}) => {
  const [modalOpen, setModalOpen] = React.useState(true)
  const [iasmodels, setIasModels] = React.useState("")

  const handleChangeIasModels = (event: SelectChangeEvent) => {
    setIasModels(event.target.value);
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
          height: '500px'
        }}>
          <CardHeader title="Configuração Geral" subheader="Informações para a interação com o chat e salvamento de arquivos" />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <TextField
              label="Local de arquivos"
              placeholder="C:\users\teste\Document\teste"
              type="url"
              fullWidth
            />
            <FormControl>
              <Typography>Inteligência Artificial a ser utilizada</Typography>
              <Select
                value={iasmodels}
                onChange={handleChangeIasModels}
                displayEmpty
              >
                <MenuItem value="ChatGPT">ChatGPT</MenuItem>
              </Select>
            </FormControl>
            <Box display={'flex'} gap={'10px'}>
              <TextField
                label="Chave de acesso à API"
                placeholder="asdasndu129203nfn28f2nf2"
                type="text"
                fullWidth
              />
              <Button><LoopIcon /></Button>
            </Box>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Mostar código no histórico de conversa"/>
              <FormControlLabel control={<Checkbox />} label="Explicar o código."/>
            </FormGroup>
            <Box width={'100%'} display={"flex"} justifyContent={"space-between"}>
              <Button variant="outlined" onClick={() => {
                closeModal()
              }}>Cancelar</Button>
              <Button variant="contained" onClick={() => {
                closeModal()
              }}>Salvar</Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </React.Fragment>
  )
}

export default ConfiguracaoGeral;