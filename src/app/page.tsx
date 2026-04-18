"use client"

import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLocale } from "./context";
import { Services } from "@/components/home/Services";
import Footer from "@/components/layout/Footer";
import { Projects } from "@/components/home/Projects";
import { ContactForm } from "@/components/home/ContactForm";

export default function Page() {
  const { isRTL } = useLocale()

  return (
    <section className="relative container mx-auto px-4 py-5 pt-10 sm:pt-20">
      <Hero isRTL={isRTL} />
      <Skills isRTL={isRTL} />
      <Projects isRTL={isRTL} />
      <Services isRTL={isRTL} />
      <ContactForm isRTL={isRTL} />
      <WhatsAppButton isRTL={isRTL} />
      <Footer isRtl={isRTL} />
    </section>
  )
}
