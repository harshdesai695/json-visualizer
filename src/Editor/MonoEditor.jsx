import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import "./MonoEditor.css";

const MonoEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [theme, setTheme] = useState("vs-dark");

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      schemas: [],
      enableSchemaRequest: true,
    });

    setTimeout(() => {
      editor.layout();
      editor.getAction('editor.action.formatDocument').run();
    }, 100);
  }

  const toggleTheme = () => {
    setTheme(prev => prev === "vs-dark" ? "light" : "vs-dark");
  };

  useEffect(() => {
    const container = containerRef.current;
    
    const resizeObserver = new ResizeObserver(() => {
      if (editorRef.current) {
        window.requestAnimationFrame(() => {
          if (editorRef.current) {
            editorRef.current.layout();
          }
        });
      }
    });

    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="mono-editor-container"
    >
      <button
        onClick={toggleTheme}
        className={`theme-toggle-btn ${theme === 'vs-dark' ? 'btn-light' : 'btn-dark'}`}
      >
        {theme === 'vs-dark' ? '☀ Light' : '☾ Dark'}
      </button>

      <Editor
        height="100%"
        defaultLanguage="json"
        value={value}
        onChange={onChange}
        theme={theme}
        onMount={handleEditorDidMount}
        options={{
          wordWrap: "on",
          automaticLayout: false,
          formatOnPaste: true,
          formatOnType: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          folding: true,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
};

export default MonoEditor;