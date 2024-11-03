"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, BookOpen, Users, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Component() {
  const SkillIcon = ({
    skill,
    x,
    y,
  }: {
    skill: string;
    x: number;
    y: number;
  }) => {
    return (
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: Math.random() * 0.5 + 1.5,
          type: "spring",
          stiffness: 50,
        }}
        style={{ left: x, top: y }}
      >
        <img
          src={getImageSrc(skill)}
          alt={`${skill} icon`}
          className="w-16 h-16"
        />
      </motion.div>
    );
  };

  const getImageSrc = (skill: string) => {
    switch (skill) {
      case "codechef":
        return "/codechef.png";
      case "leetcode":
        return "/leetcode.png";
      case "codeforces":
        return "/codeforces.png";
      case "socc":
        return "/SOCC-LOGO.jpg";
      default:
        return `https://skillicons.dev/icons?i=${skill}`;
    }
  };

  const [showOpening, setShowOpening] = useState(true);
  const [icons, setIcons] = useState<{ skill: string; x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOpening(false);
    }, 5000);

    const skills = [
      "java",
      "c",
      "cpp",
      "python",
      "javascript",
      "codechef",
      "leetcode",
      "codeforces",
    ];

    const desiredCenterX = window.innerWidth / 2;
    const desiredCenterY = window.innerHeight / 2;

    const radius = Math.min(desiredCenterX, desiredCenterY) - 100;

    const angleStep = (2 * Math.PI) / skills.length;

    const newIcons = skills.map((skill, index) => {
      const angle = index * angleStep;
      const x = desiredCenterX + radius * Math.cos(angle) - 32;
      const y = desiredCenterY + radius * Math.sin(angle) - 32;

      return { skill, x, y };
    });

    setIcons(newIcons);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-gray-100 text-gray-800 flex flex-col transition-colors duration-700 ease-in-out">
      <AnimatePresence mode="wait">
        {showOpening ? (
          <div className="h-screen flex items-center justify-center">
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-800 z-50 overflow-hidden"
            >
              <motion.div
                id="mainDiv"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <img
                  src={getImageSrc("socc")}
                  width={150}
                  alt="SOCC LOGO"
                  height={150}
                  style={{ borderRadius: "20px" }}
                />
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-4xl font-bold text-center mb-2"
              >
                SOCC
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-xl text-center mb-4"
              >
                School of Competitive Coding
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-center text-primary-foreground/80 mb-6"
              >
                Empowering future coders
              </motion.p>
              <div className="hidden sm:block">
                {icons.map((icon, index) => (
                  <SkillIcon
                    key={index}
                    skill={icon.skill}
                    x={icon.x}
                    y={icon.y}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex flex-col"
          >
            <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
              <div className="flex items-center space-x-2">
                <Code2 className="w-6 h-6" />
                <span className="text-lg font-semibold">SOCC</span>
              </div>
              <nav>
                <ul className="sm:flex hidden space-x-4">
                  {["Home", "About", "Team", "Gallery", "Events"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm hover:underline text-primary-foreground/90"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="sm:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <nav className="flex flex-col space-y-4">
                      {["Home", "About", "Team", "Gallery", "Events"].map(
                        (item) => (
                          <a
                            key={item}
                            href="#"
                            className="text-lg font-medium hover:underline"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </nav>
                  </SheetContent>
                </Sheet>
              </nav>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-100 text-gray-800">
              <h1 className="text-4xl font-bold mb-6 text-center">
                Welcome to the School of Competitive Coding
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                {[
                  {
                    title: "Learn",
                    icon: <BookOpen className="w-12 h-12 mb-4 text-primary" />,
                    text: "Master algorithms and data structures",
                  },
                  {
                    title: "Practice",
                    icon: <Code2 className="w-12 h-12 mb-4 text-primary" />,
                    text: "Solve challenging coding problems",
                  },
                  {
                    title: "Compete",
                    icon: <Users className="w-12 h-12 mb-4 text-primary" />,
                    text: "Participate in coding competitions",
                  },
                ].map(({ title, icon, text }, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    {icon}
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </main>

            <footer className="bg-muted p-4 text-center text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} SOCC - KLEF. All rights
                reserved.{" "}
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
