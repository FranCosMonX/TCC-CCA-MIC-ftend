import { green } from "@mui/material/colors";
import MensagemBase from "./MensagemBase";
import React from "react";

interface MsgChatIAParams {
  text: string;
}

const MsgChatIA: React.FC<MsgChatIAParams> = ({text}) => {
  return (
    <React.Fragment>
      <MensagemBase textAlign="justify" text={text}
        sx={{
          border: '1px solid darkgray',
          borderBottom: '2px solid darkgray',
          borderRadius:'5px 20px 20px 5px',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          backgroundColor: green[300]
        }}
      />
    </React.Fragment>
  )
}

export default MsgChatIA;