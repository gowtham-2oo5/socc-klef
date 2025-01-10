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

import { useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const teamMembers: TeamMember[] = [
  { name: "Alex Johnson", role: "Founder & Lead Instructor" },
  { name: "Sarah Lee", role: "Algorithm Specialist" },
  { name: "Michael Chen", role: "Competitive Programming Coach" },
  { name: "Emily Taylor", role: "Community Manager" },
  { name: "David Brown", role: "Data Structures Expert" },
  { name: "Sophia Rodriguez", role: "Web Development Instructor" },
  { name: "Ryan Kim", role: "Machine Learning Specialist" },
  { name: "Olivia Wang", role: "Cybersecurity Advisor" },
  { name: "James Wilson", role: "Mobile App Development Lead" },
  { name: "Emma Davis", role: "UI/UX Design Instructor" },
  { name: "Daniel Lee", role: "Blockchain Technology Expert" },
  { name: "Ava Martinez", role: "Cloud Computing Specialist" },
  { name: "Ethan Thompson", role: "Game Development Instructor" },
  { name: "Isabella Clark", role: "IoT and Embedded Systems Expert" },
  { name: "Noah Garcia", role: "AR/VR Development Lead" },
  { name: "Mia Patel", role: "Natural Language Processing Specialist" },
  { name: "Liam Johnson", role: "DevOps Engineer" },
  // Uncomment the following lines if you want 21 team members
  // { name: "Sophie Turner", role: "Full Stack Developer" },
  // { name: "Jack Robinson", role: "AI Ethics Specialist" },
  // { name: "Zoe Campbell", role: "Quantum Computing Researcher" },
  // { name: "Lucas Nguyen", role: "Robotics Engineer" },

  // Add other members as needed
].map((member) => ({
  ...member,
  image: `/placeholder.svg?height=120&width=120&text=${encodeURIComponent(
    member.name.split(" ")[0][0] + member.name.split(" ")[1][0]
  )}`,
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
}));

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <motion.div
    variants={{
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    }}
  >
    <Card className="bg-card/40 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 transform hover:scale-105 group">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1">
          <Image
            src={member.image}
            alt={member.name}
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-1 font-display group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
        <div className="flex space-x-4">
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-secondary transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Team: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section id="team" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-small-primary opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-12 text-center font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
        >
          Meet Our Team
        </motion.h2>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
