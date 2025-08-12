import MensagemBase from "./MensagemBase";
import React from "react";

interface MsgChatSistemaParams {

}

const MsgChatSistema: React.FC<MsgChatSistemaParams> = () => {
  return (
    <React.Fragment>
      <MensagemBase textAlign="justify" text="teste. Mensagem do sistema"
        sx={{
          border: '1px solid darkgray',
          borderRadius:'5px 20px 20px 5px'
        }}
      />
    </React.Fragment>
  )
}

export default MsgChatSistema;