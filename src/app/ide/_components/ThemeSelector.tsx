"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import useMounted from "../../../hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
    "vs-dark": <Moon className="size-4" />,
    "vs-light": <Sun className="size-4" />,
    "github-dark": <Github className="size-4" />,
    monokai: <Laptop className="size-4" />,
    "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const mounted = useMounted();
    const { theme: editorTheme, setTheme: setEditorTheme } = useCodeEditorStore();
    const { theme: systemTheme } = useTheme();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentTheme = THEMES.find((t) => t.id === editorTheme);

    const isDark = systemTheme === "dark";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-48 group relative flex items-center gap-2 px-4 py-2.5 
                    ${isDark ? 'bg-[#1e1e2e]/80 hover:bg-[#262637]' : 'bg-gray-100 hover:bg-gray-200'} 
                    rounded-lg transition-all duration-200 
                    ${isDark ? 'border-gray-800/50 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300'}`}
            >
                <div className={`absolute inset-0 bg-gradient-to-r 
                    ${isDark ? 'from-blue-500/5 to-purple-500/5' : 'from-blue-500/10 to-purple-500/10'} 
                    rounded-lg opacity-0 group-hover:opacity-100 transition-opacity`} />

                <Palette className={`w-4 h-4 ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'} transition-colors`} />

                <span className={`min-w-[80px] text-left ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors`}>
                    {currentTheme?.label}
                </span>

                <div className={`relative w-4 h-4 rounded-full 
                    ${isDark ? 'border-gray-600 group-hover:border-gray-500' : 'border-gray-300 group-hover:border-gray-400'} 
                    transition-colors`}
                    style={{ background: currentTheme?.color }} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-2 w-full min-w-[240px] 
                            ${isDark ? 'bg-[#1e1e2e]/95 border-[#313244]' : 'bg-white/95 border-gray-200'} 
                            backdrop-blur-xl rounded-xl border shadow-2xl py-2 z-50`}
                    >
                        <div className={`px-2 pb-2 mb-2 border-b ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
                            <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} px-2`}>
                                Select Theme
                            </p>
                        </div>

                        {THEMES.map((t, index) => (
                            <motion.button
                                key={t.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                                    relative group w-full flex items-center gap-3 px-3 py-2.5 
                                    ${isDark ? 'hover:bg-[#262637]' : 'hover:bg-gray-100'} transition-all duration-200
                                    ${editorTheme === t.id ? 'bg-blue-500/10 text-blue-400' : isDark ? 'text-gray-300' : 'text-gray-700'}
                                `}
                                onClick={() => setEditorTheme(t.id)}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r 
                                    ${isDark ? 'from-blue-500/5 to-purple-500/5' : 'from-blue-500/10 to-purple-500/10'} 
                                    opacity-0 group-hover:opacity-100 transition-opacity`} />

                                <div className={`
                                    flex items-center justify-center size-8 rounded-lg
                                    ${editorTheme === t.id ? 'bg-blue-500/10 text-blue-400' : isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100 text-gray-500'}
                                    group-hover:scale-110 transition-all duration-200
                                `}>
                                    {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                                </div>

                                <span className={`flex-1 text-left group-hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors`}>
                                    {t.label}
                                </span>

                                <div className={`relative size-4 rounded-full 
                                    ${isDark ? 'border-gray-600 group-hover:border-gray-500' : 'border-gray-300 group-hover:border-gray-400'} 
                                    transition-colors`}
                                    style={{ background: t.color }} />

                                {editorTheme === t.id && (
                                    <motion.div
                                        className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ThemeSelector;