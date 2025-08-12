import Markdown from "react-markdown";

const texto = `
# Teste de titulo

para falar **palavras em negrito**

usando lista
- teste
`

const TextMarkDown = () => {
  return (
    <Markdown>
      {texto}
    </Markdown>
  )
}

export default TextMarkDown;