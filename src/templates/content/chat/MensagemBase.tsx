import { Box, type SxProps, type Theme } from "@mui/material";
import type React from "react";
import Markdown from "react-markdown";

interface MensagemBaseParams {
  textAlign: 'center' | 'left' | 'right' | 'end' | 'start' | 'justify';
  text: string;
  sx: SxProps<Theme> | undefined;
}

const MensagemBase: React.FC<MensagemBaseParams> = ({textAlign, text, sx}) => {
  return (
    <Box
      component={'pre'}
      maxWidth={'100%'}
      fontFamily={'Arial'}
      fontSize={"20px"}
      padding={'5px 10px'}
      textAlign={textAlign}
      sx={sx}
    >
      <Markdown>
        {text}
      </Markdown>
    </Box>
  )
}

export default MensagemBase;