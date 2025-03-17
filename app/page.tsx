"use client";

import HomePage from "@/components/Home";
import HeroComponent from "@/components/homes/Hero";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <Navbar />

      <HeroComponent/>
      
    </motion.div>
  );
}
