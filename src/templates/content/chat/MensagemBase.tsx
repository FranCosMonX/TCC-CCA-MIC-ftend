import { Box, type SxProps, type Theme } from "@mui/material";
import type React from "react";
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import remarkGfm from 'react-markdown'
import TextMarkDown from "./TextMarkDown";

interface MensagemBaseParams {
  textAlign: 'center' | 'left' | 'right' | 'end' | 'start' | 'justify';
  text: string;
  sx: SxProps<Theme> | undefined;
}

const MensagemBase: React.FC<MensagemBaseParams> = ({textAlign, text, sx}) => {
  return (
    <Box
      width={'100%'}
      fontFamily={'Arial'}
      fontSize={"20px"}
      padding={'5px 10px'}
      textAlign={textAlign}
      sx={sx}
    >
      {/* {text} */}
      <TextMarkDown />
    </Box>
  )
}

export default MensagemBase;