"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const InternalIDE = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="group overflow-hidden relative">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">Internal IDE (Coming Soon)</span>
          <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Internal IDE</DialogTitle>
          <DialogDescription>
            Our internal IDE is currently under development. This feature will allow members to code and practice directly on our platform. Stay tuned for updates!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InternalIDE

