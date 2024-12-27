import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-display text-primary">SOCC</h3>
            <p className="text-muted-foreground">Empowering coders to reach new heights in competitive programming.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Join Our Community</h4>
            <Button variant="outline" className="w-full mb-4 group overflow-hidden relative">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Join SOCC</span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub size={24} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaDiscord size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-muted-foreground">
          <p>&copy; 2024 SOCC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

