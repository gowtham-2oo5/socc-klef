"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Testimonials = () => {
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

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      image: "/images/alex.jpg",
      quote: "SOCC has been instrumental in my growth as a competitive programmer. The challenges and community support are unparalleled.",
    },
    {
      name: "Sarah Lee",
      role: "Computer Science Student",
      image: "/images/sarah.jpg",
      quote: "Joining SOCC was the best decision I made in college. It's helped me ace technical interviews and land my dream internship.",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      image: "/images/michael.jpg",
      quote: "The algorithm workshops at SOCC have significantly improved my problem-solving skills. I highly recommend it to anyone in tech.",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display text-primary">What Our Members Say</h2>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={cardVariants} custom={index}>
              <Card className="bg-gray-900 border-gray-800 hover:border-primary transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="rounded-full mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <h3 className="text-lg font-bold font-display">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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

export default Testimonials

