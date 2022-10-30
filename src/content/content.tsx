import { useState, ChangeEvent } from 'react'
import * as S from './content-style'
import { marked } from 'marked'

import 'highlight.js/styles/github.css'
import('highlight.js').then(hljs => {
  const highlight = hljs.default

  marked.setOptions({
    highlight: (code, language) => {
      if (language && highlight.getLanguage(language)) {
        return highlight.highlight(code, { language }).value
      }

      return highlight.highlightAuto(code).value
    },
  })
})

export function Content () {
  const [content, setContent] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <S.ContentWrapper>
      <S.Header>
        <S.Input defaultValue='Sem título' />
      </S.Header>

      <S.ContentSection>
        <S.Textarea
          placeholder='Digite aqui seu markdown'
          value={content}
          onChange={handleChange}
        />

        <S.Article dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </S.ContentSection>
    </S.ContentWrapper>
  )
}
