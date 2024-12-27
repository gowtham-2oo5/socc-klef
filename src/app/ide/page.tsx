"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function InternalIDE() {
  const [isComingSoon, setIsComingSoon] = useState(true)

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-display text-primary">Internal IDE</h1>
      {isComingSoon ? (
        <div className="text-center">
          <p className="text-xl mb-8">Our internal IDE is currently under development. This feature will allow members to code and practice directly on our platform.</p>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
          <p className="text-lg mt-8">Stay tuned for updates!</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-8">IDE content will be implemented here.</p>
        </div>
      )}
      <div className="mt-12 text-center">
        <Button onClick={() => setIsComingSoon(!isComingSoon)}>
          {isComingSoon ? "Preview IDE (Demo)" : "Show Coming Soon"}
        </Button>
      </div>
    </div>
  )
}

