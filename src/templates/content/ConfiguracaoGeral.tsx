import React from "react"
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';
import type { SelectChangeEvent } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfigGeralSchema, type ConfigGeralFormData } from "../../utils/ConfiguracaoGeral.schema";

interface ConfiguracaoGeralParams {
  closeModal: () => void;
}

const ConfiguracaoGeral: React.FC<ConfiguracaoGeralParams> = ({closeModal}) => {
  const [modalOpen, setModalOpen] = React.useState(true)
  const [iasmodels, setIasModels] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ConfigGeralFormData>({
    resolver: zodResolver(ConfigGeralSchema)
  })

  const handleChangeIasModels = (event: SelectChangeEvent) => {
    setIasModels(event.target.value);
  }

  const onSubmit: SubmitHandler<ConfigGeralFormData> =  async (data) => {

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
          alignItems: "center",
          height: "maxContent",
        }}
      >
        <form style={{'display': 'flex', 'alignItems': 'center'}} onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{
            width: '600px',
            height: '510px',
            overflowY: 'auto',
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
                fullWidth
                {...register('diretorio')}
                error={!!errors.diretorio}
                helperText={errors.diretorio?.message}
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
                  {...register('apiKey')}
                  error={!!errors.apiKey}
                  helperText={errors.apiKey?.message}
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
                <Button variant="contained" type="submit">Salvar</Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      </Modal>
    </React.Fragment>
  )
}

export default ConfiguracaoGeral;