import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Popup from './Popup';

describe('Popup Component', () => {
  test('コンポーネントが正常にレンダリングされる', () => {
    render(<Popup />);
    
    expect(screen.getByText('LaTeX → Markdown 変換')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '変換' })).toBeInTheDocument();
  });

  test('インライン数式を正しく変換する', () => {
    render(<Popup />);
    
    const input = screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)');
    const convertButton = screen.getByRole('button', { name: '変換' });
    
    // fireEvent.changeを使用して入力値を設定
    fireEvent.change(input, { target: { value: '\\(x^2 + y^2 = z^2\\)' } });
    
    // 変換ボタンをクリック
    fireEvent.click(convertButton);
    
    // 結果を確認
    const output = screen.getByText('$x^2 + y^2 = z^2$');
    expect(output).toBeInTheDocument();
  });

  test('ディスプレイ数式を正しく変換する', () => {
    render(<Popup />);
    
    const input = screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)');
    const convertButton = screen.getByRole('button', { name: '変換' });
    
    // 複数行を含むディスプレイ数式を入力
    const latexInput = '\\[\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\\]';
    fireEvent.change(input, { target: { value: latexInput } });
    
    // 変換ボタンをクリック
    fireEvent.click(convertButton);
    
    // 結果の表示領域を取得（スタイルで識別）
    const resultAreas = screen.getAllByRole('generic');
    const resultArea = resultAreas.find(el => 
      el.style.backgroundColor === 'rgb(244, 244, 244)' && 
      el.style.whiteSpace === 'pre-wrap'
    );
    
    // 期待する出力パターンを確認
    expect(resultArea).toBeDefined();
    expect(resultArea?.textContent).toContain('$$$$'); // ディスプレイ数式のマーカーを含む
    expect(resultArea?.textContent).toContain('\\sum_{i=1}^n i = \\frac{n(n+1)}{2}'); // 数式を含む
  });

  test('複数行の数式を正しく変換する', () => {
    render(<Popup />);
    
    const input = screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)');
    const convertButton = screen.getByRole('button', { name: '変換' });
    
    // 複数行の数式を含むテキスト
    const multilineLatex = '\\[\na = b + c\\\\\nd = e + f\n\\]';
    fireEvent.change(input, { target: { value: multilineLatex } });
    
    // 変換ボタンをクリック
    fireEvent.click(convertButton);
    
    // 結果表示領域を取得
    const resultAreas = screen.getAllByRole('generic');
    // 出力を含むdiv要素を特定（スタイルを持つ結果表示用のdiv）
    const resultArea = resultAreas.find(el => 
      el.style.backgroundColor === 'rgb(244, 244, 244)' && 
      el.style.whiteSpace === 'pre-wrap'
    );
    
    // 内容を確認
    expect(resultArea).toBeDefined();
    expect(resultArea?.textContent).toContain('a = b + c');
    expect(resultArea?.textContent).toContain('d = e + f');
    expect(resultArea?.textContent).toContain('$$$$');
  });
});