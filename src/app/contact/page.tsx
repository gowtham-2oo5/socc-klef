"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Code, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center md:text-left font-display"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Join Our Coding Community
          </span>
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-muted border-2 border-primary focus:border-secondary text-foreground placeholder-muted-foreground rounded-lg p-4 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary-rgb)/0.5)] focus:shadow-[0_0_20px_rgba(var(--secondary-rgb)/0.7)]"
            />
            {errors.name && (
              <p className="text-destructive mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-muted border-2 border-primary focus:border-secondary text-foreground placeholder-muted-foreground rounded-lg p-4 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary-rgb)/0.5)] focus:shadow-[0_0_20px_rgba(var(--secondary-rgb)/0.7)]"
            />
            {errors.email && (
              <p className="text-destructive mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-muted border-2 border-primary focus:border-secondary text-foreground placeholder-muted-foreground rounded-lg p-4 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary-rgb)/0.5)] focus:shadow-[0_0_20px_rgba(var(--secondary-rgb)/0.7)]"
              rows={4}
            />
            {errors.message && (
              <p className="text-destructive mt-1">{errors.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/80 hover:via-secondary/80 hover:to-accent/80 text-primary-foreground font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(var(--accent-rgb)/0.5)] hover:shadow-[0_0_20px_rgba(var(--accent-rgb)/0.7)]"
          >
            <Send className="mr-2" /> Send Message
          </Button>
        </motion.form>
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center relative overflow-hidden bg-grid-small-blue">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-card rounded-xl p-8 shadow-[0_0_30px_rgba(var(--primary-rgb)/0.3)]">
            <h2 className="text-2xl font-bold mb-6 text-primary font-display">
              Our Coding Hub
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary bg-opacity-20">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-foreground">Tech Building, Room 42</p>
                  <p className="text-foreground">University Campus</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-secondary bg-opacity-20">
                  <Phone className="text-secondary w-6 h-6" />
                </div>
                <p className="text-foreground">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-accent bg-opacity-20">
                  <Mail className="text-accent w-6 h-6" />
                </div>
                <p className="text-foreground">contact@codingclub.edu</p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 grid grid-cols-3 gap-8"
        >
          {[
            { Icon: Code, label: "Weekly Coding Challenges" },
            { Icon: Trophy, label: "Competitive Programming" },
            { Icon: Users, label: "Collaborative Learning" },
          ].map(({ Icon, label }, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-card shadow-[0_0_15px_rgba(var(--primary-rgb)/0.3)]">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2 h-24 w-1 bg-gradient-to-b from-primary to-transparent" />
              <p className="text-center text-sm mt-2 text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
