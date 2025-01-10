"use client";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { useEffect } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "../../../hooks/useMounted";
import { useTheme } from "next-themes";

function EditorPanel() {
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();
  const { theme: systemTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    if (!editor) return;
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    const model = editor.getModel();
    if (model) {
      model.setValue(newCode);
    }
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    if (!editor) return;
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    const model = editor.getModel();
    if (model) {
      model.setValue(defaultCode);
    }
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  const handleEditorMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
    setEditor(editor);
  };

  if (!mounted) return null;

  return (
    <div className="relative h-full">
      <div className={`relative backdrop-blur rounded-xl p-6 h-full ${systemTheme === 'light'
          ? 'bg-white/90 border border-gray-200'
          : 'bg-[#12121a]/90 border border-white/[0.05]'
        }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${systemTheme === 'light' ? 'bg-gray-100' : 'bg-[#1e1e2e]'
              } ring-1 ${systemTheme === 'light' ? 'ring-gray-200' : 'ring-white/5'
              }`}>
              <Image
                src={"/" + language + ".png"}
                alt={`${language} logo`}
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className={`text-sm font-medium ${systemTheme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>Code Editor</h2>
              <p className="text-xs text-gray-500">
                Write and execute your code
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font Size Slider */}
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${systemTheme === 'light'
                ? 'bg-gray-100 ring-1 ring-gray-200'
                : 'bg-[#1e1e2e] ring-1 ring-white/5'
              }`}>
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className={`p-2 rounded-lg transition-colors ${systemTheme === 'light'
                  ? 'bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-200'
                  : 'bg-[#1e1e2e] hover:bg-[#2a2a3a] ring-1 ring-white/5'
                }`}
              aria-label="Reset to default code">
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>
          </div>
        </div>

        {/* Editor */}
        <div className={`relative group rounded-xl overflow-hidden ${systemTheme === 'light'
            ? 'ring-1 ring-gray-200'
            : 'ring-1 ring-white/[0.05]'
          }`}>
          <Editor
            height="750px"
            language={LANGUAGE_CONFIG[language].monacoLanguage}
            onChange={handleEditorChange}
            theme={theme}
            beforeMount={defineMonacoThemes}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: true },
              fontSize,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderWhitespace: "selection",
              fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
              fontLigatures: true,
              cursorBlinking: "smooth",
              smoothScrolling: true,
              contextmenu: true,
              renderLineHighlight: "all",
              lineHeight: 1.6,
              letterSpacing: 0.5,
              roundedSelection: true,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />

          {!mounted && <EditorPanelSkeleton />}
        </div>
      </div>
    </div>
  );
}

export default EditorPanel;
