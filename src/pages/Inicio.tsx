import { Avatar, MenuItem } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MemoryIcon from '@mui/icons-material/Memory';
import MyBody from "../templates/MyBody";
import MyMenu from "../templates/MyMenu";
import React from "react";
import Pagina_de_chat from "../templates/content/chat";
import Apresentacao from "../templates/content/Apresentacao";
import ConfiguracaoGeral from "../templates/content/ConfiguracaoGeral";

const Inicio = () => {
  const [eInicio, setEInicio] = React.useState(true);
  const [openModals, setOpenModals] = React.useState<{configGeral: boolean, configMicrocontrolador: boolean}>({
    configGeral : false, configMicrocontrolador : false
  })

  const fechar_config_geral_Callback = () => {
    setOpenModals({
      ...openModals,
      configGeral: false
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
      return <ConfiguracaoGeral closeModal={fechar_config_geral_Callback} />
    return true
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
        <MenuItem sx={{':hover':{
          background: 'none'
        }, ':onclick': {
          background: 'none'
        }}}><Avatar src="./public/Logo.png"/></MenuItem>
        <MenuItem onClick={() => {}}><MemoryIcon sx={{fontSize: '40px'}} /></MenuItem>
      </MyMenu>
      {!eInicio && <Pagina_de_chat />}
      {eInicio && <Apresentacao irParaChat_funcion={abrir_chat_callback} />}
      {handle_model()}
    </MyBody>
  )
}

export default Inicio;