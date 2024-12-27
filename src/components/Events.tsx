"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const upcomingEvents = [
  {
    title: "Coding Challenge",
    date: "May 15, 2024",
    description: "Test your skills in our monthly coding challenge and win exciting prizes!",
  },
  {
    title: "Algorithm Workshop",
    date: "June 1, 2024",
    description: "Learn advanced algorithmic techniques from industry experts.",
  },
  {
    title: "Hackathon",
    date: "July 10-12, 2024",
    description: "Join our annual hackathon and build innovative solutions to real-world problems.",
  },
]

const pastEvents = [
  {
    title: "Web Development Bootcamp",
    date: "March 5-7, 2024",
    description: "Intensive 3-day workshop on modern web development technologies.",
    attendees: 150,
  },
  {
    title: "AI and Machine Learning Symposium",
    date: "February 20, 2024",
    description: "Exploring the latest advancements in AI and ML with industry leaders.",
    attendees: 200,
  },
  {
    title: "Competitive Programming Contest",
    date: "January 15, 2024",
    description: "Annual coding competition with participants from across the country.",
    attendees: 300,
  },
]

const Events = () => {
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
  }

  const totalEvents = upcomingEvents.length + pastEvents.length
  const totalAttendees = pastEvents.reduce((sum, event) => sum + event.attendees, 0)

  return (
    <section id="events" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display text-primary">Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-black border-gray-800">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2 font-display text-primary">{totalEvents}</h3>
              <p className="text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card className="bg-black border-gray-800">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2 font-display text-primary">{totalAttendees}</h3>
              <p className="text-muted-foreground">Total Attendees</p>
            </CardContent>
          </Card>
          <Card className="bg-black border-gray-800">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2 font-display text-primary">{upcomingEvents.length}</h3>
              <p className="text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl font-bold mb-6 font-display">Upcoming Events</h3>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {upcomingEvents.map((event, index) => (
            <motion.div key={index} variants={cardVariants} custom={index}>
              <Card className="bg-black border-gray-800 hover:border-primary transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="font-display">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary mb-2">{event.date}</p>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <Button variant="outline" className="w-full group overflow-hidden relative">
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">Register Now</span>
                    <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <h3 className="text-2xl font-bold mb-6 font-display">Past Events</h3>
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
            <motion.div key={index} variants={cardVariants} custom={index + upcomingEvents.length}>
              <Card className="bg-black border-gray-800 hover:border-primary transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="font-display">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary mb-2">{event.date}</p>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <p className="text-sm text-muted-foreground">Attendees: {event.attendees}</p>
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

export default Events

