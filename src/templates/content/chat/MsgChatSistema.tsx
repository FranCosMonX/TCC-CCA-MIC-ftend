import MensagemBase from "./MensagemBase";
import React from "react";

interface MsgChatSistemaParams {
  text: string;
}

const MsgChatSistema: React.FC<MsgChatSistemaParams> = ({text}) => {
  return (
    <React.Fragment>
      <MensagemBase textAlign="justify" text={text}
        sx={{
          border: '1px solid darkgray',
          borderBottom: '2px solid darkgray',
          borderRadius:'5px 20px 20px 5px',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
      />
    </React.Fragment>
  )
}

export default MsgChatSistema;