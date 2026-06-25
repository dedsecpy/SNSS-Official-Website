"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import styles from "./FacultySlider.module.css";

const initialTeam = [
  {
    id: 1,
    name: "Mr. Phaniraj Baral",
    role: "Principal & Nepali Faculty",
    description: "With over 20 years of experience in educational leadership, Mr. Baral guides SNSS with a vision of holistic student development, while also bringing his passion for language into the classroom as a Nepali teacher.",
    image: "/phaniraj-baral-faculty.png"
  },
  {
    id: 2,
    name: "CD Sir",
    role: "Maths Teacher",
    description: "Dedicated to academic excellence, helping students master mathematical concepts with clear, engaging, and effective teaching methods.",
    image: "/cd-sir-new.jpeg"
  },
  {
    id: 3,
    name: "Raj Kumar Samal",
    role: "Science Faculty",
    description: "Passionate about fostering scientific inquiry and hands-on learning, guiding students through engaging and practical educational experiences.",
    image: "/samal-sir.png"
  },
  {
    id: 4,
    name: "Mr. BN Jha",
    role: "Faculty Member",
    description: "Dedicated to student success and academic excellence, bringing years of expertise to the classroom.",
    image: "/bn-jha.png"
  },
  {
    id: 5,
    name: "Mr. Ganesh",
    role: "Faculty Member",
    description: "A highly dedicated educator, bringing years of expertise and a passion for teaching to the classroom.",
    image: "/mr-ganesh.png"
  },
  {
    id: 7,
    name: "Mr. Amar Baniya",
    role: "Faculty Member",
    description: "Dedicated to student success and academic excellence, bringing years of expertise and passion to the classroom.",
    image: "/amar-baniya.png"
  },
  {
    id: 8,
    name: "Padma Mainali",
    role: "English Faculty / Admin Committee",
    description: "A passionate English teacher and a leading member of the administrative committee, dedicated to fostering both language skills and school excellence.",
    image: "/padma-mainali.jpeg"
  }
];

export default function FacultySlider() {
  const [members, setMembers] = useState(initialTeam);

  const nextSlide = () => {
    setMembers((prev) => {
      const newArr = [...prev];
      const first = newArr.shift();
      if (first) newArr.push(first);
      return newArr;
    });
  };

  const prevSlide = () => {
    setMembers((prev) => {
      const newArr = [...prev];
      const last = newArr.pop();
      if (last) newArr.unshift(last);
      return newArr;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const centerIndex = Math.floor(members.length / 2);

  return (
    <div className={styles.sliderSection}>
      <div className={styles.carouselContainer}>
        <AnimatePresence initial={false} mode="popLayout">
          {members.map((member, index) => {
            const offset = index - centerIndex;
            const isCenter = offset === 0;
            const zIndex = 10 - Math.abs(offset);
            const scale = isCenter ? 1 : Math.max(0.6, 1 - Math.abs(offset) * 0.15);

            // Dynamic X calculation for smooth 3D coverflow
            const x = isCenter ? 0 : offset * 180 + Math.sign(offset) * 40;

            // Far cards fade out
            const opacity = Math.abs(offset) >= 3 ? 0 : 1 - Math.abs(offset) * 0.3;

            // 3D rotation based on side
            const rotateY = offset * -15;

            return (
              <motion.div
                key={member.id}
                className={styles.card}
                onClick={() => {
                  if (offset > 0) nextSlide();
                  if (offset < 0) prevSlide();
                }}
                initial={false}
                animate={{
                  zIndex,
                  scale,
                  x,
                  opacity,
                  rotateY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  mass: 1,
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={isCenter}
                  />
                  <div className={styles.overlay} />
                </div>

                <motion.div
                  className={styles.content}
                  animate={{
                    opacity: isCenter ? 1 : 0,
                    y: isCenter ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  <p className={styles.description}>"{member.description}"</p>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={prevSlide} aria-label="Previous">
          <ChevronLeft size={28} />
        </button>
        <button className={styles.controlBtn} onClick={nextSlide} aria-label="Next">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
