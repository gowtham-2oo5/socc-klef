"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Calendar, Users, Clock } from "lucide-react";

const EventsSummary = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const totalEvents = 15;
  const totalAttendees = 2000;
  const upcomingEvents = 3;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section
      id="events"
      className="py-20 bg-[#030712] relative overflow-hidden"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 text-center font-mono">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
            Events
          </span>
        </h2>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              icon: Calendar,
              title: "Total Events",
              value: totalEvents,
              gradient: "from-[#1a44ff] via-[#4169ff] to-[#638dff]",
            },
            {
              icon: Users,
              title: "Total Attendees",
              value: totalAttendees,
              gradient: "from-[#ff1a8c] via-[#ff4169] to-[#ff638d]",
            },
            {
              icon: Clock,
              title: "Upcoming Events",
              value: upcomingEvents,
              gradient: "from-[#ffb01a] via-[#ffc041] to-[#ffd063]",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-0 relative group overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <CardContent className="p-6 text-center relative">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 inline-block group-hover:scale-110 transition-transform duration-500`}
                  >
                    <item.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-4xl font-bold mb-2 font-mono text-white">
                    {inView && <CountUp end={item.value} duration={2} />}
                  </h3>
                  <p className="text-muted-foreground">{item.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/events">
            <Button
              variant="outline"
              size="lg"
              className="group overflow-hidden relative border-blue-500 text-blue-500 hover:text-white"
            >
              <span className="relative z-10">View All Events</span>
              <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSummary;
