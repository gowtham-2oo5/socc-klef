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
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 dark:bg-grid-small-primary/10" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: Calendar,
              title: "Total Events",
              value: totalEvents,
              gradient: "from-primary via-primary/80 to-primary/60",
            },
            {
              icon: Users,
              title: "Total Attendees",
              value: totalAttendees,
              gradient: "from-secondary via-secondary/80 to-secondary/60",
            },
            {
              icon: Clock,
              title: "Upcoming Events",
              value: upcomingEvents,
              gradient: "from-accent via-accent/80 to-accent/60",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <Card className="bg-card/40 backdrop-blur-sm border-0 relative group overflow-hidden h-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-4xl font-bold mb-3 font-display text-foreground">
                    {inView && <CountUp end={item.value} duration={2} />}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {item.title}
                  </p>
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
              className="group overflow-hidden relative border-primary text-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">View All Events</span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSummary;
