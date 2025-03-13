import React, { useState } from 'react'

const Popup: React.FC = () => {
  const [latexInput, setLatexInput] = useState('')
  const [markdownOutput, setMarkdownOutput] = useState('')
  const [copyMessage, setCopyMessage] = useState('')

  // LaTeX数式をMarkdown形式に変換する関数
  const convertLatexToMarkdown = (text: string): string => {
    // 改行で文字列を分割して処理
    const lines = text.split('\n')
    
    // 各行に対して処理を行う
    const processedLines = lines.map(line => {
      let result = line
      // インライン数式: \( ... \) → $ ... $
      result = result.replace(/\\\((.*?)\\\)/g, '$$$1$')
      return result
    })
    
    // 文字列全体に対してディスプレイ数式の置換を行う
    let fullText = processedLines.join('\n')
    // 改行を確実に維持するためにpreタグで囲む形式に変更
    fullText = fullText.replace(/\\\[([\s\S]*?)\\\]/g, (match, p1) => {
      return '\n$$$$ ' + p1 + ' $$$$\n'
    })
    
    return fullText
  }

  // ボタンがクリックされたときに変換を実行
  const handleConvert = () => {
    const converted = convertLatexToMarkdown(latexInput)
    setMarkdownOutput(converted)
    setCopyMessage('')
  }

  // コピーボタンがクリックされたときの処理
  const handleCopy = () => {
    if (markdownOutput) {
      navigator.clipboard.writeText(markdownOutput)
        .then(() => {
          setCopyMessage('コピーしました！')
          setTimeout(() => setCopyMessage(''), 2000) // 2秒後にメッセージを消す
        })
        .catch(err => {
          setCopyMessage('コピーに失敗しました')
          console.error('クリップボードへのコピーに失敗しました:', err)
        })
    }
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

  const copyButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: markdownOutput ? '#4CAF50' : '#cccccc',
    color: 'white',
    border: 'none',
    cursor: markdownOutput ? 'pointer' : 'default'
  }

  const messageStyle: React.CSSProperties = {
    color: '#4CAF50',
    fontSize: '14px',
    textAlign: 'center',
    height: '20px',
    marginTop: '4px'
  }

  return (
    <div style={containerStyle}>
      <h2>LaTeX → Markdown 変換</h2>
      <textarea
        style={textAreaStyle}
        placeholder="LaTeXコードを入力してください(テスト) "
        value={latexInput}
        onChange={(e) => setLatexInput(e.target.value)}
      />
      <button style={buttonStyle} onClick={handleConvert}>
        変換
      </button>
      <div style={{...resultStyle, whiteSpace: 'pre-wrap'}}>
        {markdownOutput}
      </div>
      <button 
        style={copyButtonStyle} 
        onClick={handleCopy}
        disabled={!markdownOutput}
      >
        クリップボードにコピー
      </button>
      <div style={messageStyle}>{copyMessage}</div>
    </div>
  )
}

export default Popup
