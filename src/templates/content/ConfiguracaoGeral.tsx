import React from "react"
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';
import type { SelectChangeEvent } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfigGeralSchema, type ConfigGeralFormData } from "../../utils/ConfiguracaoGeral.schema";
import api from "../../api/api";

interface ConfiguracaoGeralParams {
  closeModal: () => void;
  openMensagemSistema: (msg:string) => void;
}

const ConfiguracaoGeral: React.FC<ConfiguracaoGeralParams> = ({closeModal, openMensagemSistema}) => {
  const [modalOpen, setModalOpen] = React.useState(true)
  const [iasmodels, setIasModels] = React.useState("")
  const [apiKey, setApiKey] = React.useState("")
  const [mostraCodigo, setMoostraCodigo] = React.useState(false)
  const [explica, setExplica] = React.useState(false)

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

  const handleVerificarConexao = async () => {
    await api.post('/verificaConexao', 
      {ia:iasmodels, key_ai_api: apiKey})
      .then(() => {
        console.log("funcionou")
      }).catch(() => {
        console.error("Não funcionou")
      })
  }

  const onSubmit: SubmitHandler<ConfigGeralFormData> =  async (data) => {
    console.log(mostraCodigo)
    await api.post('/configuracaoGeral', {
      nome_projeto: data.nomeDoProjeto,
      diretorio: data.diretorio,
      key_ai_api: apiKey,
      ver_codigo: mostraCodigo,
      comentario_codigo: explica
    }).then((e) => {
      console.log(e)
    }).catch((e) => {
      console.error(e)
    })
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
            height: 'max-content',
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
                label="Nome do projeto"
                placeholder="Hello World"
                fullWidth
                {...register('nomeDoProjeto')}
                error={!!errors.nomeDoProjeto}
                helperText={errors.nomeDoProjeto?.message}
              />
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
                  onChange={(e) => {setApiKey(e.target.value)}}
                  error={apiKey.length < 1}
                  helperText="Não pode conter valores nulos"
                />
                <Button onClick={handleVerificarConexao}><LoopIcon /></Button>
              </Box>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={mostraCodigo} onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    setMoostraCodigo(event.target.checked);
                  }} />} label="Mostar código no histórico de conversa"/>
                <FormControlLabel control={<Checkbox checked={explica} onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    setExplica(event.target.checked);
                  }} />} label="Explicar o código."/>
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