"use client";

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
