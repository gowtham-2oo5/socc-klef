"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 text-center font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Get in Touch
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <MapPin className="text-primary-foreground w-6 h-6" />
              </div>
              <p className="text-muted-foreground">
                123 Coding Street, Tech City, 12345
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-accent">
                <Phone className="text-primary-foreground w-6 h-6" />
              </div>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary">
                <Mail className="text-primary-foreground w-6 h-6" />
              </div>
              <p className="text-muted-foreground">info@soccclub.com</p>
            </div>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-card/40 backdrop-blur-sm border-primary/20 focus:border-primary"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-card/40 backdrop-blur-sm border-primary/20 focus:border-primary"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-card/40 backdrop-blur-sm border-primary/20 focus:border-primary"
              rows={4}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground transition-colors duration-300"
            >
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
