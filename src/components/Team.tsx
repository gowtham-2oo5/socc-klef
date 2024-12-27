"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const teamMembers = [
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
  { name: "Mia Patel", role: "Natural Language Processing Specialist" }
].map(member => ({
  ...member,
  image: "/placeholder.svg?height=120&width=120",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com"
}))

const Team = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section id="team" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display text-primary">Meet Our Team</h2>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
              }}
            >
              <Card className="bg-gray-900 border-gray-800 hover:border-primary transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold mb-1 font-display">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                  <div className="flex space-x-4">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <FaGithub size={20} />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <FaLinkedin size={20} />
                    </a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <FaTwitter size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
    </section>
  )
}

export default Team

