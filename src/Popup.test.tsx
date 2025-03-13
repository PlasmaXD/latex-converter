import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popup from './Popup';

describe('Popup Component', () => {
  test('コンポーネントが正常にレンダリングされる', () => {
    render(<Popup />);
    
    expect(screen.getByText('LaTeX → Markdown 変換')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '変換' })).toBeInTheDocument();
  });

  test('インライン数式を正しく変換する', async () => {
    render(<Popup />);
    
    const input = screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)');
    const convertButton = screen.getByRole('button', { name: '変換' });
    
    // インライン数式を入力
    await userEvent.type(input, '\\(x^2 + y^2 = z^2\\)');
    
    // 変換ボタンをクリック
    fireEvent.click(convertButton);
    
    // 結果を確認
    const output = screen.getByText('$x^2 + y^2 = z^2$');
    expect(output).toBeInTheDocument();
  });

  test('ディスプレイ数式を正しく変換する', async () => {
    render(<Popup />);
    
    const input = screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)');
    const convertButton = screen.getByRole('button', { name: '変換' });
    
    // ディスプレイ数式を入力
    await userEvent.type(input, '\\[\n\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\n\\]');
    
    // 変換ボタンをクリック
    fireEvent.click(convertButton);
    
    // 結果を確認
    const output = screen.getByText('$$ \n\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\n $$');
    expect(output).toBeInTheDocument();
  });

  test('複数行の数式を正しく変換する', async () => {
    render(<Popup />);
    
    const input = screen.getByPlaceholderText('LaTeXコードを入力してください(テスト)');
    const convertButton = screen.getByRole('button', { name: '変換' });
    
    // 複数行の数式を含むテキスト
    const multilineLatex = '\\[\na = b + c\\\\\nd = e + f\n\\]';
    await userEvent.type(input, multilineLatex);
    
    // 変換ボタンをクリック
    fireEvent.click(convertButton);
    
    // 結果を確認
    const expectedMarkdown = '$$ \na = b + c\\\\\nd = e + f\n $$';
    const output = screen.getByText(expectedMarkdown);
    expect(output).toBeInTheDocument();
  });
});