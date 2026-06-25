import React, { useEffect } from "react";
import { Avatar, MenuItem } from "@mui/material";
import ConfiguracaoGeral from "./templates/content/ConfiguracaoGeral";
import ConfiguracaoMicro from "./templates/content/ConfiguracaoMicro";
import MyBody from "./templates/MyBody";
import MyMenu from "./templates/MyMenu";
import Pagina_de_chat from "./templates/content/chat";
import Apresentacao from "./templates/content/Apresentacao";
import SettingsIcon from '@mui/icons-material/Settings';
import MemoryIcon from '@mui/icons-material/Memory';
import MensagemSistema from "./templates/content/MensagemSistema";
import api from "./api/api";
import OpcaoBinariaSistema from "./templates/content/OpcaoBinariaSistema";
import './App.css'

const Inicio = () => {
  const [eInicio, setEInicio] = React.useState(true);
  const [mensagemIntroducao, setMensagemIntrocao] = React.useState(false);
  const [apiInicializada, setApiInicializada] = React.useState(0)
  const [loadUsername, setLoadUsername] = React.useState(false)
  const [mensagemSistema, setMensagemSistema] = React.useState<{ativo: boolean, mensagem: string, links?: string[]}>({
    ativo: false, mensagem: '', links: undefined
  })
  const [opcaoBinariaSistema, setOpcaoBinariaSistema] = React.useState<{ativo: boolean, mensagem: string, textTrue: string, textFalse: string}>({
    ativo: false, mensagem: '', textTrue: '', textFalse:''
  })
  const [openModals, setOpenModals] = React.useState<{configGeral: boolean, configMicrocontrolador: boolean}>({
    configGeral : false, configMicrocontrolador : false
  })
  const [dadosExistem, setDadosExistem] = React.useState<boolean>(false)

  useEffect(() => {
    if (dadosExistem){
      setMensagemIntrocao(false)
    } else if  (eInicio && !dadosExistem){
      setMensagemIntrocao(true)
    }
  }, [dadosExistem])

  React.useEffect(() => {
    if (apiInicializada < 1){
      const handle_api_iniciar = async () => {
        try{
          await api.get('/init', {timeout: 30000})
            .then((response) => {
              if (response.status == 204) return
              if (response.status == 200) setDadosExistem(true)
            })
            .catch((responseError) => {
              if (responseError.response.status == 400){
                abrir_msg_sistema_Callback(responseError.response.data.mensagem)
              }else{
                abrir_msg_sistema_Callback("Houve um erro ao tentar se conectar com o sistema, por favor, tente novamente mais tarde.\n\nDetalhes: " + responseError.response.data.mensagem)
              }
            })
        } catch (e){
          abrir_msg_sistema_Callback("Houve um problema na conexão com o Sistema Interno. Verifique se o backend está conectado e tente novamente (recarregue a página).", ["https://github.com/FranCosMonX/TCC-CCA-MIC-BKend"])
        }
      }
      
      handle_api_iniciar()
      setApiInicializada((prev) => (prev+1))
    }
  }, [apiInicializada])

  React.useEffect(() => {
    if(dadosExistem && apiInicializada < 3) {
      setOpcaoBinariaSistema({
        ativo: true,
        mensagem: "Foi encontrado dados guardados no Banco de Dados. Desejas carregar o ambiente de exeução e e validação da conexão com a IA?",
        textFalse:"Não",
        textTrue: "Sim"
      })
      setApiInicializada((prev) => (prev+1))
    }
  }, [dadosExistem])

  const fechar_config_geral_Callback = () => {
    setOpenModals({
      ...openModals,
      configGeral: false
    })
  }

  const fechar_config_micro_Callback = () => {
    setOpenModals({
      ...openModals,
      configMicrocontrolador: false
    })
  }

  const fechar_alternativa_callback = () => {
    setOpcaoBinariaSistema((prev) => ({
        ...prev,
        ativo: false
      })
    )
  }

  const fechar_msg_sistema_Callback = () => {
    setMensagemSistema({
      links: undefined,
      mensagem: "",
      ativo: false
    })
  }

  const abrir_msg_sistema_Callback = (msg: string, links?: string[]) => {
    setMensagemSistema({
      links: links,
      mensagem: msg,
      ativo: true
    })
  }

  const abrir_chat_callback = () => {
    setEInicio(false);
  }

  /**
   * Controlador de Modals da página.
   */
  const handle_model = () => {
    if (!openModals.configGeral && !openModals.configMicrocontrolador)
      return false;

    if (openModals.configGeral)
      return <ConfiguracaoGeral closeModal={fechar_config_geral_Callback} openMensagemSistema={abrir_msg_sistema_Callback}/>
    if (openModals.configMicrocontrolador)
      return <ConfiguracaoMicro closeModal={fechar_config_micro_Callback} openMensagemSistema={abrir_msg_sistema_Callback}/>
    return false;
  }

  return (
    <MyBody>
      <MyMenu>
        <MenuItem title="Configurações Gerais" disabled={!eInicio} onClick={() => {
          setOpenModals({
            configGeral: true,
            configMicrocontrolador: false
          })
        }}><SettingsIcon sx={{fontSize: '40px', backgroundColor: "rgb(0, 102, 204)", color: 'white', padding: '5px 20px', borderRadius: '9px'}} /></MenuItem>
        {
          !eInicio &&
          <MenuItem title="Voltar ao Inicio" onClick={() => {
            setEInicio(true)
          }} sx={{':hover':{
            background: 'none'
          }, ':onclick': {
            background: 'none'
          }}}><Avatar sx={{width: '2.3em', height: '2.3em'}} src="./public/Logo.png"/></MenuItem>
        }
        <MenuItem title="Configurações do Microcontrolador" disabled={!eInicio} onClick={() => {
          setOpenModals({
            configGeral: false,
            configMicrocontrolador: true
          })
        }}><MemoryIcon sx={{fontSize: '40px', backgroundColor: "rgb(0, 102, 204)", color: 'white', padding: '5px 20px', borderRadius: '9px'}} /></MenuItem>
      </MyMenu>
      {!
        eInicio && <Pagina_de_chat openMensagemSistema={abrir_msg_sistema_Callback} tem_dados_salvos={dadosExistem} />
      }
      {
        mensagemIntroducao && 
        <MensagemSistema 
          closeModal={() => setMensagemIntrocao(false)} 
          mensagemSistema="Antes de iniciar, defina as configurações de conexão e de projeto no canto superior esquerdo e, depois, escolher o microcontrolador localizado no canto superior direito. Somente com estas definições, é possível acessar o sistema."
          links={
            ['https://francosmonx.github.io/#/projetos/tutorial_cca_mic']
          }
        />
      }
      {
        eInicio && <Apresentacao irParaChat_funcion={abrir_chat_callback} openMensagemSistema={abrir_msg_sistema_Callback}load={loadUsername} />
      }
      {mensagemSistema.ativo && <MensagemSistema closeModal={fechar_msg_sistema_Callback} mensagemSistema={mensagemSistema.mensagem} links={mensagemSistema.links}/>}
      {handle_model()}
      { opcaoBinariaSistema.ativo && <OpcaoBinariaSistema 
        closeModal={fechar_alternativa_callback}
        alternaticaTrueCallback={async () => {
          setLoadUsername(true)
          await api.post('/ia/reconectar',{}, {timeout: 20000})
            .then((response) => {
              abrir_msg_sistema_Callback(response.data.mensagem)
            })
            .catch((responseError) => {
              abrir_msg_sistema_Callback(responseError.response.data.mensagem)
            })
            .finally(() => setLoadUsername(false))
        }}
        alternativaFalseCallback={async () => {
          setLoadUsername(true)
          await api.delete('/RemoverConfiguracao',{timeout: 20000})
            .then((response) => {
              abrir_msg_sistema_Callback(response.data.mensagem)
            })
            .catch((responseError) => {
              abrir_msg_sistema_Callback(responseError.response.data.mensagem)
            })
            .finally(() => {
              setLoadUsername(false)
              setDadosExistem(false)
            })
        }}
        mensagemSistema={opcaoBinariaSistema.mensagem}
        textBtnFalse={opcaoBinariaSistema.textFalse}
        textBtnTrue={opcaoBinariaSistema.textTrue} />}
    </MyBody>
  )
}

export default Inicio;