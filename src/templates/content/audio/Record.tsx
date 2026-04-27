import React, { useEffect, useState } from "react";
import axios from "axios";
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { Button } from "@mui/material";

interface AssemblyTranscricaoParams {
  obterTextoTranscrito: (e:string) => void
}

const AssemblyTranscricao: React.FC<AssemblyTranscricaoParams> = ({obterTextoTranscrito}) => {
  const [texto, setTexto] = useState("");
  const [gravando, setGravando] = useState(false)
  const [recorder, setRecorder] = useState<MediaRecorder>()
  const API_KEY = import.meta.env.VITE_KEY_ASSEMBLY_AI; // coloque sua chave aqui

  const enviarAudio = async (audioBlob: Blob) => {
    try {
      // 1. Upload do arquivo
      const uploadResp = await axios.post(
        "https://api.assemblyai.com/v2/upload",
        audioBlob,
        {
          headers: {
            authorization: API_KEY,
            "content-type": "application/octet-stream",
          },
        }
      );

      const audioUrl = uploadResp.data.upload_url;

      // 2. Criar transcrição
      const transcricaoResp = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        {
          audio_url: audioUrl,
          language_code: "pt",
          speech_models: ["universal-2"] // ou "universal-3-pro"
        },
        {
          headers: { authorization: API_KEY },
        }
      );

      const transcricaoId = transcricaoResp.data.id;

      // 3. Consultar resultado
      let status = "queued";
      while (status !== "completed" && status !== "error") {
        const resp = await axios.get(
          `https://api.assemblyai.com/v2/transcript/${transcricaoId}`,
          { headers: { authorization: API_KEY } }
        );
        status = resp.data.status;
        if (status === "completed") {
          setTexto(resp.data.text);
        }
        await new Promise((r) => setTimeout(r, 3000)); // espera 3s antes de consultar de novo
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  const gravar = async () => {
    setGravando(true)
    console.log("funcao gravar acionada")
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setRecorder(new MediaRecorder(stream));
  };

  const parar = async () => {
    if(recorder != undefined && recorder != null){
      recorder.stop();
      setGravando(false);
    }
  }

  useEffect(() => {
    console.log("record alterado")
    if(recorder != undefined && recorder != null){
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/mp3" });
        enviarAudio(audioBlob);
      };

      recorder.start();
      // setTimeout(() => {recorder.stop();setGravando(false);}, 10000); // grava 5 segundos
    }
  }, [recorder])

  useEffect(() => {
    console.log(texto)
    if(!gravando){
      obterTextoTranscrito(texto);
    }
  }, [texto])

  return (
    <React.Fragment>
      {!gravando && <Button variant="outlined" title="Gravar" onClick={gravar}><MicIcon fontSize="large" /></Button>}
      {gravando && <Button variant="outlined" title="Gravar" onClick={parar}><StopIcon fontSize="large" /></Button>}
      <p>{texto}</p>
    </React.Fragment>
  );
};

export default AssemblyTranscricao;
