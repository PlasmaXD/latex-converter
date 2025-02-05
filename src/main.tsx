import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './Popup'

const rootElement = document.getElementById('root')!

// React 18 以降推奨される createRoot を使用
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
