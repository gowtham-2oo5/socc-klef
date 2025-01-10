"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Users, Zap, ChevronRight } from "lucide-react";

const upcomingEvents = [
  {
    title: "Coding Challenge",
    date: "May 15, 2024",
    description:
      "Test your skills in our monthly coding challenge and win exciting prizes!",
    icon: Zap,
  },
  {
    title: "Algorithm Workshop",
    date: "June 1, 2024",
    description: "Learn advanced algorithmic techniques from industry experts.",
    icon: Users,
  },
  {
    title: "Hackathon",
    date: "July 10-12, 2024",
    description:
      "Join our annual hackathon and build innovative solutions to real-world problems.",
    icon: Calendar,
  },
];

const pastEvents = [
  {
    title: "Web Development Bootcamp",
    date: "March 5-7, 2024",
    description:
      "Intensive 3-day workshop on modern web development technologies.",
    attendees: 150,
    icon: Zap,
  },
  {
    title: "AI and Machine Learning Symposium",
    date: "February 20, 2024",
    description:
      "Exploring the latest advancements in AI and ML with industry leaders.",
    attendees: 200,
    icon: Users,
  },
  {
    title: "Competitive Programming Contest",
    date: "January 15, 2024",
    description:
      "Annual coding competition with participants from across the country.",
    attendees: 300,
    icon: Calendar,
  },
];

const Events = () => {
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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const totalEvents = upcomingEvents.length + pastEvents.length;
  const totalAttendees = pastEvents.reduce(
    (sum, event) => sum + event.attendees,
    0
  );

  return (
    <section
      id="events"
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-12 text-center font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
      >
          Events
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <Card className="bg-card/40 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold mb-2 font-display text-primary">
                {totalEvents}
              </h3>
              <p className="text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card className="bg-card/40 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold mb-2 font-display text-secondary">
                {totalAttendees}
              </h3>
              <p className="text-muted-foreground">Total Attendees</p>
            </CardContent>
          </Card>
          <Card className="bg-card/40 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold mb-2 font-display text-accent">
                {upcomingEvents.length}
              </h3>
              <p className="text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-bold mb-8 font-display text-primary"
        >
          Upcoming Events
        </motion.h3>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {upcomingEvents.map((event, index) => (
            <motion.div key={index} variants={cardVariants} custom={index}>
              <Card className="bg-card/40 backdrop-blur-sm border-primary/20 hover:border-primary transition-all duration-300 transform hover:scale-105 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-xl">
                      {event.title}
                    </CardTitle>
                    <event.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-primary mb-2">{event.date}</p>
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full group overflow-hidden relative"
                  >
                    <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-300">
                      Register Now
                    </span>
                    <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-3xl font-bold mb-8 font-display text-secondary"
        >
          Past Events
        </motion.h3>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {pastEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index + upcomingEvents.length}
            >
              <Card className="bg-card/40 backdrop-blur-sm border-secondary/20 hover:border-secondary transition-all duration-300 transform hover:scale-105 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-xl">
                      {event.title}
                    </CardTitle>
                    <event.icon className="w-6 h-6 text-secondary group-hover:text-accent transition-colors duration-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary mb-2">{event.date}</p>
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Attendees: {event.attendees}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-secondary hover:text-accent transition-colors duration-300"
                    >
                      Learn More <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
