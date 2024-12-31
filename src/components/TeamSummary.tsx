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

  return (
    <section id="team" className="py-20 bg-[#030712] relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 text-center font-mono">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
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
              <Card className="bg-black/40 backdrop-blur-sm border-0 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  </div>
                  <h3 className="text-xl font-bold mb-1 font-mono text-white group-hover:text-blue-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
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
      </div>
    </section>
  );
};

export default TeamSummary;