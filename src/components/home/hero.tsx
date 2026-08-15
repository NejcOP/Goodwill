"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/products";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <Image
          src={heroImage}
          alt="Model znamke GOODWILL v volnenem plašču na obali"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="container-luxury relative z-10 pb-20 sm:pb-28"
      >
        <p className="mb-4 text-xs tracking-[0.4em] text-white/80 uppercase">
          Kolekcija pomlad / poletje
        </p>
        <h1 className="max-w-3xl font-serif text-6xl leading-[1.05] text-white sm:text-7xl lg:text-8xl">
          Udobni luksuz
        </h1>
        <p className="mt-6 max-w-md text-base text-white/85">
          Naravni materiali. Narejeno za dolgo življenjsko dobo.
        </p>
        <Button
          render={<Link href="/izdelki" />}
          nativeButton={false}
          size="lg"
          className="mt-9 h-12 rounded-full bg-white px-8 text-xs tracking-[0.15em] text-charcoal uppercase hover:bg-white/90"
        >
          Odkrijte kolekcijo
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 sm:block"
      >
        <ArrowDown className="size-4 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
