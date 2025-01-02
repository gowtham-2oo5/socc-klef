"use client";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Play, Terminal, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import RunningCodeSkeleton from "./RunningCodeSkeleton";
import { motion } from "framer-motion";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";

function OutputPanel() {
  const { output, error, isRunning, runCode } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { theme: systemTheme } = useTheme();
  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRunWithInput = () => {
    runCode(userInput);
  };

  const isDark = systemTheme === 'dark';

  return (
    <div className={`relative rounded-xl p-4 ring-1 ${isDark
      ? 'bg-[#181825] ring-gray-800/50'
      : 'bg-white ring-gray-200'
      }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-6 h-6 rounded-lg ring-1 ${isDark
            ? 'bg-[#1e1e2e] ring-gray-800/50'
            : 'bg-gray-100 ring-gray-200'
            }`}>
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Output</span>
        </div>
        <ThemeSelector />
        <LanguageSelector hasAccess={true} />

        {hasContent && (
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg ring-1 transition-all ${isDark
              ? 'text-gray-400 hover:text-gray-300 bg-[#1e1e2e] ring-gray-800/50 hover:ring-gray-700/50'
              : 'text-gray-600 hover:text-gray-800 bg-gray-100 ring-gray-200 hover:ring-gray-300'
              }`}
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      <div className="mb-3">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter input for your program here..."
          className={`w-full p-3 rounded-lg border ${isDark
            ? 'bg-[#1e1e2e] text-gray-300 border-gray-700'
            : 'bg-gray-100 text-gray-700 border-gray-200'
            }`}
          rows={4}
        />

        <motion.button
          onClick={handleRunWithInput}
          disabled={isRunning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 disabled:cursor-not-allowed focus:outline-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />
          <div className="relative flex items-center gap-2.5">
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                <span className="text-sm font-medium text-white/90">Executing...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
                <span className="text-sm font-medium text-white/90 group-hover:text-white">Run Code</span>
              </>
            )}
          </div>
        </motion.button>
      </div>

      <div className="relative">
        <div className={`relative backdrop-blur-sm rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm ${isDark
          ? 'bg-[#1e1e2e]/50 border border-[#313244]'
          : 'bg-gray-100/50 border border-gray-200'
          }`}>
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className={`whitespace-pre-wrap ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>{output}</pre>
            </div>
          ) : (
            <div className={`h-full flex flex-col items-center justify-center ${isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ring-1 mb-4 ${isDark
                ? 'bg-gray-800/50 ring-gray-700/50'
                : 'bg-gray-200/50 ring-gray-300/50'
                }`}>
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center">Run your code to see the output here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;