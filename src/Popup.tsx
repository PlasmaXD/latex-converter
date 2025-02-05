import React, { useState } from 'react'

const Popup: React.FC = () => {
  const [latexInput, setLatexInput] = useState('')
  const [markdownOutput, setMarkdownOutput] = useState('')

  // LaTeX数式をMarkdown形式に変換する関数
  const convertLatexToMarkdown = (text: string): string => {
    let result = text
    // インライン数式: \( ... \) → $ ... $
    result = result.replace(/\\\((.*?)\\\)/g, '$$$1$')
    // ディスプレイ数式: \[ ... \] → $$ ... $$
    result = result.replace(/\\\[(.*?)\\\]/gs, '$$$$ $1 $$$')

    return result
  }

  // ボタンがクリックされたときに変換を実行
  const handleConvert = () => {
    const converted = convertLatexToMarkdown(latexInput)
    setMarkdownOutput(converted)
  }

  // スタイル設定（シンプルにinline styleで実装）
  const containerStyle: React.CSSProperties = {
    width: '400px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    padding: '8px'
  }

  const textAreaStyle: React.CSSProperties = {
    width: '100%',
    height: '150px',
    boxSizing: 'border-box',
    marginBottom: '8px'
  }

  const resultStyle: React.CSSProperties = {
    width: '100%',
    height: '150px',
    boxSizing: 'border-box',
    backgroundColor: '#f4f4f4',
    padding: '8px',
    overflowY: 'auto'
  }

  const buttonStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
    cursor: 'pointer'
  }

  return (
    <div style={containerStyle}>
      <h2>LaTeX → Markdown 変換</h2>
      <textarea
        style={textAreaStyle}
        placeholder="LaTeXコードを入力してください"
        value={latexInput}
        onChange={(e) => setLatexInput(e.target.value)}
      />
      <button style={buttonStyle} onClick={handleConvert}>
        変換
      </button>
      <div style={resultStyle}>
        {markdownOutput}
      </div>
    </div>
  )
}

export default Popup
