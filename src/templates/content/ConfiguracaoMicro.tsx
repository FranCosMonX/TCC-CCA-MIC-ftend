import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, InputLabel, LinearProgress, MenuItem, Modal, Select, Typography, type SelectChangeEvent } from "@mui/material";
import React, { type ChangeEvent } from "react"
import api from "../../api/api";

interface ConfiguracaoMicroParams {
  closeModal: () => void;
  openMensagemSistema: (msg:string) => void;
}

interface MicrocontroladorConf {
  fqbn: string
  nome: string
  ambiente_configurado: boolean
  id: number
}

const ConfiguracaoMicro: React.FC<ConfiguracaoMicroParams> = ({ closeModal, openMensagemSistema }) => {
  const [configMicInicializado, setConfigMicInicializado] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [microcontrolador, setMicrocontrolador] = React.useState("");
  const [loading, setLoading] = React.useState(false)
  const [microcontroladoresDisponiveis, setMicrocontroladoresDisponiveis] = React.useState<MicrocontroladorConf[]>([])
  const [microcontroladorSelecionado, setMicrocontroladorSelecionado] = React.useState<MicrocontroladorConf>({fqbn: '', nome: '', id: -1, ambiente_configurado: false})

  React.useEffect(() => {
    if(!configMicInicializado){
      const carregarDados = async () => {
        await api.get('/configuracao')
          .then((response) => {
            const dataResponse = response.data
            
            if (dataResponse.id_microcontrolador != null)
              setMicrocontrolador(dataResponse.id_microcontrolador);
          })
          .finally(() => setModalOpen(true))
      }
  
      carregarDados()
      get_microcontroladores()
      setConfigMicInicializado(true)
    }
  }, [configMicInicializado])

  React.useEffect(() => {
    for (let mic of microcontroladoresDisponiveis) {
      if (mic.id == parseInt(microcontrolador)){
        setMicrocontroladorSelecionado(mic)
      }
    }
  }, [microcontrolador])

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (microcontrolador == "") {
      openMensagemSistema("Problema em modificar o campo. Escolha uma opção válida.")
      return
    }

    setLoading(true)
    await api.post('/configuracaoMicrocontrolador',
      {id_microcontrolador: microcontroladorSelecionado.id},
      {timeout: 5*60000})//5 minutos
      .then((response) => {
        openMensagemSistema(response.data.mensagem)
        closeModal()
        setModalOpen(false)
      })
      .catch((responseError) => {
        if (responseError.status >= 500 || !responseError.request || !responseError.response?.data){
          openMensagemSistema("Houve um problema com o sistema interno. Tente novamente mais tarde.")
          
          closeModal()
          setModalOpen(false)
          return
        }
        
        const dataError = responseError.response.data
        if (responseError.status < 500)
          openMensagemSistema(dataError.mensagem)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const get_microcontroladores = async () => {
    api.get('/microcontrolador')
      .then((response) => {
        if (response.status == 200){
          const listaMics = response?.data?.Microcontroladores
          if (listaMics != null && listaMics != undefined){
            setMicrocontroladoresDisponiveis(listaMics)
          }
        }
      }).catch(() => {
        setMicrocontroladoresDisponiveis([])
      })
  }

  const handleChangeMicrocontrolador = (event: SelectChangeEvent) => {
    setMicrocontrolador(event.target.value)
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
          height: 'max-content',
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
            <InputLabel sx={{fontSize: '1.2em', fontWeight: 'bold'}}>Microcontrolador</InputLabel>
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
                {microcontroladoresDisponiveis.map((mic) => {
                  return (
                    <MenuItem key={mic.id} value={mic.id}>{mic.nome}</MenuItem>
                  )
                })}
                {/* <MenuItem value="ESP 32 NodeMCU">ESP 32 NodeMCU</MenuItem>
                <MenuItem value="Arduino UNO R3">Arduino UNO R3</MenuItem>
                <MenuItem value="Arduino ATMega 328p">Arduino ATMega 328p</MenuItem> */}
              </Select>
            </FormControl>
            <Divider />
            {
              microcontrolador !== "" && 
              <Box display={"flex"} flexDirection={'column'} gap={'0.5px'}>
                <Typography fontFamily={"inherit"} variant="h6">
                  Microcontrolador: <Typography component={'span'} fontWeight={'bold'} >{microcontroladorSelecionado.nome} de ID={microcontroladorSelecionado.id}</Typography>
                </Typography>
                <Typography fontFamily={"inherit"} variant="h6">
                  Identificador: <Typography component={'span'} fontWeight={'bold'} >{microcontroladorSelecionado.fqbn}</Typography>
                </Typography>
                <Typography fontFamily={"inherit"} variant="h6">
                  Drives instalados: <Typography component={'span'} fontWeight={'bold'} >{microcontroladorSelecionado.ambiente_configurado ? "Ambiente já configurado." : "Ambiente não configurado."}</Typography>
                </Typography>
              </Box>
            }
            {
              loading &&
              <Box width={'100%'}>
                <LinearProgress color="primary"/>
              </Box>
            }
            {
              !loading &&
              <Box display={'flex'} justifyContent={'space-between'}>
                <Button variant="outlined" onClick={() => {
                  closeModal()
                  setModalOpen(false)
                }}>Cancelar</Button>
                <Button type="submit" variant="contained">Salvar</Button>
              </Box>
            }
          </CardContent>
        </Card>
      </Modal>
    </React.Fragment>
  )
}

export default ConfiguracaoMicro;