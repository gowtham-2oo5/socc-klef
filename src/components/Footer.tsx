import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              SOCC
            </h3>
            <p className="text-muted-foreground">
              Empowering coders to reach new heights in competitive programming.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["About", "Events", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-secondary transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display text-foreground">
              Join Our Community
            </h4>
            <Button
              variant="outline"
              className="w-full mb-4 group overflow-hidden relative border-primary text-primary hover:text-primary-foreground transition-all duration-300"
            >
              <span className="relative z-10">Join SOCC</span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
            <div className="flex space-x-4">
              {[
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaGithub, label: "GitHub" },
                { icon: FaDiscord, label: "Discord" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon size={24} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SOCC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
