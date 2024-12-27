import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const fadeInUp = (element: string, delay: number = 0) => {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out",
  })
}

export const staggerFadeInUp = (elements: string, stagger: number = 0.2) => {
  return gsap.from(elements, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger,
    ease: "power3.out",
  })
}

export const fadeIn = (element: string, delay: number = 0) => {
  return gsap.from(element, {
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out",
  })
}

export const scaleIn = (element: string, delay: number = 0) => {
  return gsap.from(element, {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out",
  })
}

