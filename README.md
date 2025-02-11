## LaTeX formulas to Markdown Converter

**要件:**
LaTeXの数式モード指定をMarkdown形式に変換するツールを提供する

**機能要件:**

1. **数式変換機能:**
   - ユーザーが入力したLaTeX形式の数式を、以下のように変換します。
     - インライン数式: `\( ... \)` → `$ ... $`
     - ディスプレイ数式: `\[ ... \]` → `$$ ... $$`

2. **ユーザーインターフェース:**
   - ポップアップ内に以下の要素を配置します。
     - LaTeXコード入力用のテキストエリア
     - 変換ボタン
     - 変換結果表示用の領域

3. **ポップアップのデザイン:**
   - 幅: 400px
   - フォント: Arial, sans-serif
   - フォントサイズ: 16px
   - 入力エリアと結果表示エリアの高さ: 150px

**非機能要件:**

- **技術スタック:**
  - React 18
  - TypeScript
  - Vite

- **ブラウザ互換性:**
  - 最新バージョンのGoogle Chromeに対応

<!-- - **パフォーマンス:**
  - ユーザー操作に対して即時に変換結果を表示 -->

**開発環境:**

- **プロジェクトセットアップ:**
  - ViteとReactを使用してプロジェクトを作成
  - 必要な依存関係をインストール

- **ファイル構成:**
  - `manifest.json`: 拡張機能のメタデータを定義
  - `index.html`: Reactアプリケーションのマウントポイント
  - `main.tsx`: エントリーポイント、`Popup`コンポーネントのレンダリング
  - `Popup.tsx`: ユーザーインターフェースと変換ロジック



<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->


```
my-latex-converter-extension/
├── public/
│   ├── manifest.json
│   └── icon.png
├── src/
│   ├── main.tsx
│   └── Popup.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## Usage
LaTeX コードをテキストエリアに入力し、変換ボタン (「変換」) を押すと Markdown に変換されます。

```
dist/
├── manifest.json    // publicからコピーされた
├── icon.png         // publicからコピーされた
├── assets/
│   ├── index-xxxx.js
│   ├── index-xxxx.css
│   └── ...
└── index.html
```
Todo
## 追加要件
- 複数行数式へも対応すること
- 変換エラーが発生した場合は適切にエラーメッセージを表示

## 追加技術スタック
- ESLint + Prettier によるコード品質維持
- Jest や React Testing Library などを利用したテストの導入検討