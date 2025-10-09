import React from "react";
import { Alert, Avatar, MenuItem } from "@mui/material";
import ConfiguracaoGeral from "./templates/content/ConfiguracaoGeral";
import ConfiguracaoMicro from "./templates/content/ConfiguracaoMicro";
import MyBody from "./templates/MyBody";
import MyMenu from "./templates/MyMenu";
import Pagina_de_chat from "./templates/content/chat";
import Apresentacao from "./templates/content/Apresentacao";
import SettingsIcon from '@mui/icons-material/Settings';
import MemoryIcon from '@mui/icons-material/Memory';
import './App.css'
import MensagemSistema from "./templates/content/MensagemSistema";

const Inicio = () => {
  const [eInicio, setEInicio] = React.useState(false);
  const [mensagemSistema, setMensagemSistema] = React.useState<{ativo: boolean, mensagem: string}>({
    ativo: false, mensagem: ''
  })
  const [openModals, setOpenModals] = React.useState<{configGeral: boolean, configMicrocontrolador: boolean}>({
    configGeral : false, configMicrocontrolador : false
  })

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

  const abrir_msg_sistema_Callback = (msg: string) => {
    setMensagemSistema({
      mensagem: msg,
      ativo: true
    })
  }
  const fechar_msg_sistema_Callback = () => {
    setMensagemSistema({
      mensagem: "",
      ativo: false
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
      return <ConfiguracaoMicro closeModal={fechar_config_micro_Callback} />
    return false;
  }

  return (
    <MyBody>
      <MyMenu>
        <MenuItem onClick={() => {
          setOpenModals({
            configGeral: true,
            configMicrocontrolador: false
          })
        }}><SettingsIcon sx={{fontSize: '40px'}} /></MenuItem>
        <MenuItem onClick={() => {
          setEInicio(true)
        }} sx={{':hover':{
          background: 'none'
        }, ':onclick': {
          background: 'none'
        }}}><Avatar src="./public/Logo.png"/></MenuItem>
        <MenuItem onClick={() => {
          setOpenModals({
            configGeral: false,
            configMicrocontrolador: true
          })
        }}><MemoryIcon sx={{fontSize: '40px'}} /></MenuItem>
      </MyMenu>
      {!eInicio && <Pagina_de_chat />}
      {eInicio && <Apresentacao irParaChat_funcion={abrir_chat_callback} />}
      {mensagemSistema.ativo && <MensagemSistema closeModal={fechar_msg_sistema_Callback} mensagemSistema={mensagemSistema.mensagem}/>}
      {handle_model()}
    </MyBody>
  )
}

export default Inicio;