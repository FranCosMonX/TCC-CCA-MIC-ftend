import React from "react"
import MensagemBase from "./MensagemBase";

interface MsgChatUsuarioParams {
  text: string;
}

const MsgChatUsuario: React.FC<MsgChatUsuarioParams> = ({text}) => {
  return (
    <React.Fragment>
      <MensagemBase textAlign="justify" text={text}
        sx={{
          border: '1px solid darkgray',
          borderBottom: '2px solid darkgray',
          borderRadius:'20px 5px 5px 20px',
          backgroundColor: '#9de3fa49',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
      />
    </React.Fragment>
  )
}

export default MsgChatUsuario;