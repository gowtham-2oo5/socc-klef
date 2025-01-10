"use client";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react";
import useMounted from "../../../hooks/useMounted";
import { useTheme } from "next-themes";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const mounted = useMounted();
    const { theme: systemTheme } = useTheme();
    const { language, setLanguage } = useCodeEditorStore();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentLanguageObj = LANGUAGE_CONFIG[language];
    const isDark = systemTheme === 'dark';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (langId: string) => {
        if (!hasAccess && langId !== "javascript") return;
        setLanguage(langId);
        setIsOpen(false);
    };

    if (!mounted) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isDark
                    ? 'bg-[#1e1e2e]/80 border-gray-800/50 hover:border-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:border-gray-300'
                    } border ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${isDark
                    ? 'from-blue-500/10 to-purple-500/5'
                    : 'from-blue-500/5 to-purple-500/5'
                    } rounded-lg opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className={`size-6 rounded-md p-0.5 group-hover:scale-110 transition-transform ${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'
                    }`}>
                    <Image
                        src={currentLanguageObj.logoPath}
                        alt="programming language logo"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain relative z-10"
                    />
                </div>

                <span className={`min-w-[80px] text-left transition-colors ${isDark
                    ? 'text-gray-200 group-hover:text-white'
                    : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                    {currentLanguageObj.label}
                </span>

                <ChevronDownIcon className={`size-4 transition-all duration-300 ${isDark
                    ? 'text-gray-400 group-hover:text-gray-300'
                    : 'text-gray-500 group-hover:text-gray-700'
                    } ${isOpen ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-2 w-64 backdrop-blur-xl rounded-xl shadow-2xl py-2 z-50 ${isDark
                            ? 'bg-[#1e1e2e]/95 border-[#313244]'
                            : 'bg-white/95 border-gray-200'
                            } border`}
                    >
                        <div className={`px-3 pb-2 mb-2 border-b ${isDark ? 'border-gray-800/50' : 'border-gray-200'
                            }`}>
                            <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>Select Language</p>
                        </div>

                        <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
                            {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                                const isLocked = !hasAccess && lang.id !== "javascript";

                                return (
                                    <motion.div
                                        key={lang.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group px-2"
                                    >
                                        <button
                                            className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                                                ${language === lang.id
                                                    ? isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                                                    : isDark ? 'text-gray-300' : 'text-gray-600'}
                                                ${isLocked ? "opacity-50" : isDark ? "hover:bg-[#262637]" : "hover:bg-gray-50"}`}
                                            onClick={() => handleLanguageSelect(lang.id)}
                                            disabled={isLocked}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                                                opacity-0 group-hover:opacity-100 transition-opacity`} />

                                            <div className={`relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform
                                                ${language === lang.id
                                                    ? isDark ? 'bg-blue-500/10' : 'bg-blue-100'
                                                    : isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
                                                <Image
                                                    width={24}
                                                    height={24}
                                                    src={lang.logoPath}
                                                    alt={`${lang.label} logo`}
                                                    className="w-full h-full object-contain relative z-10"
                                                />
                                            </div>

                                            <span className={`flex-1 text-left transition-colors ${isDark ? 'group-hover:text-white' : 'group-hover:text-gray-900'
                                                }`}>
                                                {lang.label}
                                            </span>

                                            {language === lang.id && (
                                                <motion.div
                                                    className={`absolute inset-0 border-2 rounded-lg ${isDark ? 'border-blue-500/30' : 'border-blue-200'
                                                        }`}
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}

                                            {isLocked ? (
                                                <Lock className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                            ) : (
                                                language === lang.id && (
                                                    <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                                                )
                                            )}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LanguageSelector;