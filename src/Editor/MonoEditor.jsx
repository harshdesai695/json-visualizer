import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const MonoEditor = () => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  
  // State is now local to this component
  const [theme, setTheme] = useState("vs-dark");

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    
    // Auto-format the initial value after a short delay to ensure editor is ready
    setTimeout(() => {
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
          editorRef.current.layout();
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
      style={{ position: 'relative', height: "100%", width: "100%", overflow: "hidden" }}
    >
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          zIndex: 20,
          padding: '6px 12px',
          cursor: 'pointer',
          backgroundColor: theme === 'vs-dark' ? '#ffffff' : '#333333',
          color: theme === 'vs-dark' ? '#000000' : '#ffffff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          opacity: 0.9,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        {theme === 'vs-dark' ? '☀ Light' : '☾ Dark'}
      </button>

      <Editor
        height="100%"
        defaultLanguage="json"
        defaultValue='{ "name": "MyKart", "status": "active", "items": [1,2,3] }'
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