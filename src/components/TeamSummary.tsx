"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { teamMembers } from "../constants";
const TeamSummary = () => {
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

  // Split members into featured and glimpse groups
  const featuredMembers = teamMembers.slice(0, 8);
  const glimpseMembers = teamMembers.slice(8);
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Lead Instructor",
      image: "/placeholder.svg?height=120&width=120&text=AJ",
    },
    {
      name: "Sarah Lee",
      role: "Algorithm Specialist",
      image: "/placeholder.svg?height=120&width=120&text=SL",
    },
    {
      name: "Michael Chen",
      role: "Competitive Programming Coach",
      image: "/placeholder.svg?height=120&width=120&text=MC",
    },
    {
      name: "Emily Taylor",
      role: "Community Manager",
      image: "/placeholder.svg?height=120&width=120&text=ET",
    },
  ];

  return (
    <section id="team" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-small-primary/5 dark:bg-grid-small-primary/10" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 text-center font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Our Team
          </span>
        </h2>

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Featured Members */}
          {featuredMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
              }}
            >
              <Card className="bg-card/40 backdrop-blur-sm border-0 relative group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 flex flex-col items-center text-center relative">
                  <div className="w-28 h-28 mb-4 p-1 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 group-hover:scale-110 transition-transform duration-500">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={112}
                        height={112}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  <div className="mb-4 p-1 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/40 group-hover:to-secondary/40 transition-colors duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 font-display text-foreground group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-secondary transition-colors duration-300">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Glimpse Section */}
          {glimpseMembers.length > 0 && (
            <div className="lg:col-span-4 relative mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-30 blur-sm">
                {glimpseMembers.slice(0, 4).map((member, index) => (
                  <Card key={index} className="bg-black/40 backdrop-blur-sm border-0">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-28 h-28 mb-4 p-1 rounded-full bg-gradient-to-br from-blue-500 to-blue-300">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={112}
                            height={112}
                            className="rounded-full object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-1 font-mono text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Overlay with View Full Team button */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#030712] via-transparent to-transparent">
                <Link href="/team">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group overflow-hidden relative border-blue-500 text-blue-500 hover:text-white"
                  >
                    <span className="relative z-10">View Full Team</span>
                    <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
        <div className="text-center">
          <Link href="/team">
            <Button
              variant="outline"
              size="lg"
              className="group overflow-hidden relative border-primary text-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
            >
              <span className="relative z-10">View Full Team</span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSummary;