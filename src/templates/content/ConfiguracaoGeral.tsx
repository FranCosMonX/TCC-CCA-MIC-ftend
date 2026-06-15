import React from "react"
import { Box, Button, Card, CardContent, CardHeader, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, LinearProgress, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';
import type { SelectChangeEvent } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfigGeralSchema, type ConfigGeralFormData } from "../../utils/ConfiguracaoGeral.schema";
import api from "../../api/api";

interface ConfiguracaoGeralParams {
  closeModal: () => void;
  openMensagemSistema: (msg:string, links?: string[]) => void;
}

interface ModeloDisponivel{
  id:number;
  nome_ia:string;
  modelo_disponivel:string;
}

const ConfiguracaoGeral: React.FC<ConfiguracaoGeralParams> = ({closeModal, openMensagemSistema}) => {
  const [confGerIni, setConfigGerIni] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)

  const [iasConhecidas, setIasConhecidas] = React.useState<{aux_map_key:number, nome_ia:string}[]>([])
  const [modelosDisponiveis, setModelosDisponiveis] = React.useState<ModeloDisponivel[]>([])

  const [iaName, setIAName] = React.useState("")
  const [modeloSelecionado, setModeloSelecionado] = React.useState("")

  const [apiKey, setApiKey] = React.useState<{error:boolean, helperText:string, value: string}>({
    error:false, helperText:"", value: ""
  })
  const [statusAPIKey, setStatusApiKey] = React.useState<'primary' | 'success' | 'error' | 'warning'>("primary")
  const [mostraCodigo, setMoostraCodigo] = React.useState(false)
  const [explica, setExplica] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const request_modelos_disponiveis = async () => {
    await api.get(`/ias/nome/${iaName}`)
      .then((response) => {
        if (response.status == 200){
          const dados: {nome_ia:string,id:number,modelo_disponivel:string}[] = response.data.modelos
          
          if (dados === null){
            console.error("Dados nulos ou incorretos")
            return
          }
          setModelosDisponiveis(dados)
          
        } else {
          console.error("A resposta foi recebida, mas houve um erro ao receber os dados")
        }
      })
      .catch(() => {
        // console.error("DEBUG - ",error)
        setModeloSelecionado("")
        setModelosDisponiveis([])
      })
    }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, setError
  } = useForm<ConfigGeralFormData>({
    resolver: zodResolver(ConfigGeralSchema),
    defaultValues: {
      diretorio: "",
      nomeDoProjeto: ""
    }
  })

  React.useEffect(() => {
    if(!confGerIni){
      const request_ias_conhecidas = async () => {
        await api.get('/ias')
          .then((response) => {
            if(response.status == 200){
              const dados = response.data

              setIasConhecidas(dados)
            }else{
              console.error("A resposta foi recebida, mas houve um erro ao receber os dados")
            }
          })
      }
      const request_usuario = async () => {
        try {
          await api.get('/configuracao')
            .then((response) => {
              if (response.status == 200){
                const dados = response.data
  
                reset({
                  diretorio: dados.diretorio != null ? dados.diretorio : "",
                  nomeDoProjeto: dados.nome_projeto != null ? dados.nome_projeto : ""
                })
                  
                // Atualiza estados manuais direto com dados
                if (dados.key_ai_api !== null){
                  setApiKey({
                    error: false,
                    helperText: "",
                    value: dados.key_ai_api
                  })}
                if (dados.nome_ia !== null){
                  setIAName(dados.nome_ia)}
                if (dados.modelo_disponivel != null){
                  setModeloSelecionado(dados.modelo_disponivel)}
                setExplica(dados.comentario_codigo)
                setMoostraCodigo(dados.ver_codigo)
              }else {
                console.error("A resposta foi recebida, mas houve um erro ao receber os dados")
              }
            })
          // .catch((e) => {
          //   console.log(e)
          // })
            .finally(() => setModalOpen(true))
        } catch (e){
          openMensagemSistema("Houve um problema na conexão com o Sistema Interno. Verifique se o backend está conectado e tente novamente (recarregue a página).", ["https://github.com/FranCosMonX/TCC-CCA-MIC-BKend"])
          closeModal()
        }
      }
      request_usuario()
      request_ias_conhecidas()
      setConfigGerIni(true)
    }
  }, [confGerIni])

  React.useEffect(() => {
    if (confGerIni){
      request_modelos_disponiveis()
    }
  }, [iaName])

  const handleChangeIas = (event: SelectChangeEvent) => {
    setIAName(event.target.value);
  }

  const handleChangeIasModels = (event: SelectChangeEvent) => {
    setModeloSelecionado(event.target.value)
  }

  const handleVerificarConexao = async () => {
    setLoading(true)
    console.log(loading)
    
    await api.post('/ia/verificaConexao', 
      {ia:iaName, key_ai_api: apiKey.value, modelo: modeloSelecionado},
      {timeout: 15000})
      .then(() => {
        setStatusApiKey("success")
        setApiKey((prev) => ({
          ...prev,
          helperText: "Verificado com sucesso!"
        }))

        setTimeout(() => {
          setApiKey((prev) => ({
          ...prev,
          helperText: ""
        }))
        }, 1500)
      }).catch((responseError) => {
        if (responseError.response.status >= 500 || !responseError.request || !responseError.response?.data){
          openMensagemSistema("Houve um problema com o sistema interno. Tente novamente mais tarde.")
          
          closeModal()
          setModalOpen(false)
          return
        }
        setStatusApiKey("error")

        const dataError = responseError.response.data
        setApiKey((prev) => ({
          ...prev,
          error: true,
          helperText: dataError.mensagem
        }))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onSubmit: SubmitHandler<ConfigGeralFormData> =  async (data) => {
    if (apiKey.value.length < 1){
      setApiKey({
        value: "",
        error: true,
        helperText: "Não pode haver valores nulos"
      })
    }
    setLoading(true)
    await api.post('/configuracaoGeral', {
      nome_projeto: data.nomeDoProjeto,
      diretorio: data.diretorio,
      key_ai_api: apiKey.value,
      ver_codigo: mostraCodigo,
      comentario_codigo: explica
    }, {
      timeout: 30000
    }).then(() => {
      openMensagemSistema("Todos os dados foram salvos com sucesso.")
      closeModal()
      setModalOpen(false)
    }).catch((responseError) => {
      if (responseError.status >= 500 || !responseError.request || !responseError.response?.data){
        openMensagemSistema("Houve um problema com o sistema interno. Tente novamente mais tarde.")
        
        closeModal()
        setModalOpen(false)
        return
      }
      
      const dataError = responseError.response.data
      if (responseError.status == 500)
        openMensagemSistema(dataError.mensagem)
      if (['nomeDoProjeto', 'diretorio'].includes(dataError.campo))
        setError(dataError.campo, {message: dataError.mensagem})
      
      if (dataError.campo === "key_ai_api"){
        setStatusApiKey("error")
        setApiKey((prev) => ({
          ...prev,
          error: true,
          helperText: dataError.mensagem
        }))
      }
    })
    .finally(() => {
      setLoading(false)
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
                slotProps={{ inputLabel: {shrink: true} }}
                {...register('nomeDoProjeto')}
                error={!!errors.nomeDoProjeto}
                helperText={errors.nomeDoProjeto?.message}
              />
              <TextField
                label="Local de arquivos"
                placeholder="C:\users\teste\Document\teste"
                fullWidth
                slotProps={{ inputLabel: {shrink: true} }}
                {...register('diretorio')}
                error={!!errors.diretorio}
                helperText={errors.diretorio?.message}
              />
              <FormControl sx={{gap: "10px"}}>
                <Typography>Inteligência Artificial a ser utilizada</Typography>
                <Select
                  value={iaName}
                  onChange={handleChangeIas}
                  displayEmpty
                >
                  <MenuItem value="">Selecione uma IA</MenuItem>
                  {iasConhecidas.map((elem) => {
                    return (
                      <MenuItem key={elem.aux_map_key} value={elem.nome_ia}>{elem.nome_ia}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              {modelosDisponiveis.length > 0 && <FormControl sx={{gap: "10px"}}>
                <Select
                  value={modeloSelecionado}
                  onChange={handleChangeIasModels}
                  displayEmpty
                  >
                    <MenuItem value={""}>Selecione o Modelo</MenuItem>
                    {modelosDisponiveis.map((elem) => {
                      return (
                        <MenuItem key={elem.id} value={elem.modelo_disponivel}>{elem.modelo_disponivel}</MenuItem>
                      )
                    })}
                  </Select>
              </FormControl>}
              <Box display={'flex'} gap={'10px'} alignItems={"flex-start"} >
                <TextField
                  label="Chave de acesso à API"
                  placeholder="asdasndu129203nfn28f2nf2"
                  type="text"
                  fullWidth
                  color={statusAPIKey}
                  value={apiKey.value}
                  onChange={(e) => {
                    setApiKey({
                      helperText: "",
                      error:false,
                      value: e.target.value
                    })
                    if(statusAPIKey === "success")
                      setStatusApiKey("warning")
                  }}
                  error={apiKey.error}
                  helperText={apiKey.helperText}
                />
                {
                  loading && <CircularProgress color="primary" sx={{marginTop: '6px', marginRight: '5px', marginLeft: '5px'}}/> ||
                  !loading && <Button sx={{height: '56px'}} title="Validar Conexão" color={statusAPIKey} onClick={handleVerificarConexao}><LoopIcon fontSize="large" /></Button>
                }
              </Box>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={mostraCodigo} onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    setMoostraCodigo(event.target.checked);
                  }} />} label="Mostrar código no histórico de conversa"/>
                <FormControlLabel control={<Checkbox checked={explica} onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    setExplica(event.target.checked);
                  }} />} label="Explicar o código."/>
              </FormGroup>
              {
                loading &&
                <Box width={'100%'}>
                  <LinearProgress color="primary"/>
                </Box>
              }
              {
                !loading &&
                <Box width={'100%'} display={"flex"} justifyContent={"space-between"}>
                  <Button variant="outlined" onClick={() => {
                    closeModal()
                  }}>Cancelar</Button>
                  <Button variant="contained" type="submit">Salvar</Button>
                </Box>
              }
            </CardContent>
          </Card>
        </form>
      </Modal>
    </React.Fragment>
  )
}

export default ConfiguracaoGeral;