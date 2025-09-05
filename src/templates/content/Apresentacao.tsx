import React from "react"
import MyContainer from "../MyContainer"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useForm, type SubmitHandler } from "react-hook-form";
import { IntroducaoSchema, type IntroducaoFormData } from "../../utils/Introducao.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../api/api";

interface ApresentacaoParams {
  irParaChat_funcion: () => void;
}

const Apresentacao: React.FC<ApresentacaoParams> = ({irParaChat_funcion}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError
  } = useForm<IntroducaoFormData>({
    resolver: zodResolver(IntroducaoSchema)
  })

  const onSubmit: SubmitHandler<IntroducaoFormData> = async (data) => {
    await api.post('/usuario', {'usuario': data.apelido})
      .then(() => {
        alert('Apelido atualizado com exito.')
        irParaChat_funcion();
      })
      .catch((e) => {
        console.log(e.response.data.error)
        setError('apelido', {message: 'Houve um erro ao mudar o nome de usuário'})
      })
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
            <Button variant="contained" type="submit" >Prosseguir</Button>
          </Box>
      </MyContainer>
    </form>
  )
}

export default Apresentacao