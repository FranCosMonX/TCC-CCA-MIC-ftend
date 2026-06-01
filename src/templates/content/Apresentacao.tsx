import React from "react"
import MyContainer from "../MyContainer"
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { useForm, type SubmitHandler } from "react-hook-form";
import { IntroducaoSchema, type IntroducaoFormData } from "../../utils/Introducao.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../api/api";

interface ApresentacaoParams {
  irParaChat_funcion: () => void;
  openMensagemSistema: (msg:string) => void;
  load: boolean;
}

const Apresentacao: React.FC<ApresentacaoParams> = ({irParaChat_funcion, openMensagemSistema, load}) => {
  const [loading, setLoading] = React.useState(false)
  const [apresentacaoIniciada, setApresentacaoIniciada] = React.useState(0)

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
    reset
  } = useForm<IntroducaoFormData>({
    resolver: zodResolver(IntroducaoSchema)
  })

  React.useEffect(() => {
    setLoading(load)
  }, [load])

  React.useEffect(() => {
    if(apresentacaoIniciada < 1){
      const req = async () => {
        try {
          await api.get('/configuracao')
            .then((response) => {
              if (response.status == 200){
                const dados = response.data
  
                reset({
                  apelido: dados.apelido
                })
              }
            })
            .catch((error) => {
              if (error.response.status >= 500 || !error.request || !error.response?.data){
                openMensagemSistema("Houve um problema com o sistema interno. Tente novamente mais tarde.")
              } else {
                openMensagemSistema(error.response.data.mensagem)
              }
            })
        } catch (e){}
      }
      setApresentacaoIniciada((prev) => (prev+1))
      setTimeout(() => {
        req()
      }, 500);
    }
  }, [apresentacaoIniciada])

  const onSubmit: SubmitHandler<IntroducaoFormData> = async (data) => {
    setLoading(true)
    try {
      await api.post('/usuario', {'usuario': data.apelido}, {timeout: 120000})
        .then(async() => {
          await api.post('/IniciarChat')
            .then((response) => {
              if (response.status == 200){
                irParaChat_funcion()
              }
            })
            .catch(() => {
              openMensagemSistema("Houve um problema ao iniciar o chat.")
            })
        })
        .catch((responseError) => {
          if (responseError.status >= 500 || !responseError.request || !responseError.response?.data){
            openMensagemSistema("Houve um problema com o sistema interno. Tente novamente mais tarde.")
            return
          }
          
          setError('apelido', {message: 'Houve um erro ao mudar o nome de usuário'})
        })
        .finally(() => setLoading(false))
    } catch (e){}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MyContainer
        sx={{
          height: '100%',
          paddingBottom: '24px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
        >
          <Typography variant="h4" textAlign={"center"}>Como gostaria de ser chamado?</Typography>
          <TextField
            placeholder="Ex: Julho, Camila, Henry"
            type={'text'}
            fullWidth
            {...register('apelido')}
            error={!!errors.apelido}
            helperText={errors.apelido?.message}
          />
          <Box
            display={'flex'}
            justifyContent={'center'}
          >
            {loading && <CircularProgress /> }
            {!loading && <Button title="Começar a conversar" variant="contained" type="submit" >Prosseguir</Button>}
          </Box>
      </MyContainer>
    </form>
  )
}

export default Apresentacao