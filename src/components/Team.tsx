"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Linkedin } from 'lucide-react';
import { Github } from "lucide-react";
import { teamMembers } from "@/constants";
// Define the team member type
interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedinUrl?: string;
  githubUrl?:string;
}



export function ExpandableTeamCards() {
  const [active, setActive] = useState<TeamMember | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-3xl h-auto bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                <motion.div
                  layoutId={`image-${active.name}-${id}`}
                  className="w-full md:w-1/2"
                >
                  <Image
                    priority
                    width={600}
                    height={600}
                    src={active.image}
                    alt={active.name}
                    className="w-full h-[300px] md:h-[400px] object-cover object-center"
                    quality={100}
                  />
                </motion.div>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <motion.h3
                        layoutId={`name-${active.name}-${id}`}
                        className="font-semibold text-neutral-800 dark:text-neutral-200 text-2xl"
                      >
                        {active.name}
                      </motion.h3>
                      <motion.p
                        layoutId={`role-${active.role}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-lg"
                      >
                        {active.role}
                      </motion.p>
                    </div>

                    {active.linkedinUrl && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="h-6 w-6" />
                      </motion.a>
                    )}
                    {active.githubUrl && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-black text-white hover:bg-blue-750 transition-colors"
                      >
                        <Github className="h-6 w-6" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {teamMembers.map((member) => (
          <motion.div
            layoutId={`card-${member.name}-${id}`}
            key={member.name}
            onClick={() => setActive(member)}
            className="group p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors duration-200 hover:shadow-lg"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div
                layoutId={`image-${member.name}-${id}`}
                className="overflow-hidden rounded-lg"
              >
                <Image
                  width={400}
                  height={400}
                  src={member.image}
                  alt={member.name}
                  className="h-64 w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-200"
                  quality={100}
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col space-y-1">
                <motion.h3
                  layoutId={`name-${member.name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-lg"
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  layoutId={`role-${member.role}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center text-base"
                >
                  {member.role}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default ExpandableTeamCards;