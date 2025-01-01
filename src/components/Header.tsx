"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Events", "Team", "Contact", "IDE"];

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary relative group",
        pathname === href ? "text-primary" : "text-muted-foreground"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
    </Link>
  );

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container px-4 py-4 grid grid-cols-3 items-center">
        {/* Logo */}
        <Link href="/" className="col-start-1 animate-float">
          <Image
            src="/SOCC-LOGO.png"
            alt="SOCC Logo"
            width={50}
            height={50}
            className="mr-2 transition-transform hover:scale-110 duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 col-start-2 col-span-1">
          {navItems.map((item) => (
            <NavLink key={item} href={`/${item.toLowerCase()}`}>
              {item}
            </NavLink>
          ))}
        </nav>

        {/* Right side items */}
        <div className="flex items-center space-x-4 justify-end col-start-3">
          <ThemeSwitcher />
          <Button
            variant="outline"
            className="hidden sm:inline-flex group overflow-hidden relative"
          >
            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
              Join SOCC
            </span>
            <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-colors hover:bg-primary/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-primary" />
            ) : (
              <Menu className="text-primary" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden col-span-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container px-4 py-4 flex flex-col space-y-4 bg-background/95 backdrop-blur-sm">
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <NavLink
                    href={item === "IDE" ? "/ide" : `#${item.toLowerCase()}`}
                  >
                    <span className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                      {item}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
              <Button
                variant="outline"
                className="w-full justify-center group overflow-hidden relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                  Join SOCC
                </span>
                <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
