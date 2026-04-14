// playground/App.tsx
import { useState, useEffect } from 'react';
import { EXAMPLES } from './examples';
import { codeToHtml } from 'shiki';
import { copyToClipboard } from './utils/exportCode';
import './App.css';

export default function App() {
  const [selectedExample, setSelectedExample] = useState(EXAMPLES[0]);
  const [showCode, setShowCode] = useState(true);
  const [debug, setDebug] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  const SelectedComponent = selectedExample.component;

  useEffect(() => {
    codeToHtml(selectedExample.code, {
      lang: 'tsx',
      theme: 'github-dark',
    }).then(setHighlightedCode);
  }, [selectedExample.code]);

  const handleCopy = async () => {
    await copyToClipboard(selectedExample.code);
    setCopyState('copied');
    setTimeout(() => setCopyState('idle'), 1500);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>leafer-react<span> Playground</span></h1>
        </div>
        <div className="example-list">
          {EXAMPLES.map((example) => (
            <button
              key={example.id}
              className={`example-btn ${selectedExample.id === example.id ? 'active' : ''
                }`}
              onClick={() => setSelectedExample(example)}
            >
              <div className="example-name">{example.name}</div>
              <div className="example-desc">{example.description}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Preview */}
      <main className="preview">
        <div className="preview-header">
          <div className="preview-title">
            <h2>{selectedExample.name}</h2>
            <p>{selectedExample.description}</p>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={debug}
              onChange={(e) => setDebug(e.target.checked)}
            />
            Debug
          </label>
        </div>
        <div className="preview-content">
          <SelectedComponent debug={debug} />
        </div>
      </main>

      {/* Code Panel */}
      <aside className="code-panel">
        <div className="code-header">
          <h3>Source Code</h3>
          <div className="code-actions">
            <button
              className={`code-copy ${copyState}`}
              onClick={handleCopy}
            >
              {copyState === 'copied' ? 'Copied!' : 'Copy'}
            </button>
            <button
              className="code-toggle"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className={`code-content ${!showCode ? 'hidden' : ''}`}>
          {highlightedCode && (
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          )}
        </div>
      </aside>
    </div>
  );
}
