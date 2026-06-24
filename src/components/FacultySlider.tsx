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
    role: "Principal",
    description: "With over 20 years of experience in educational leadership, Mr. Baral guides SNHSS with a vision of holistic student development.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
  },
  {
    id: 2,
    name: "Sita Kandel",
    role: "Vice Principal",
    description: "Dedicated to academic excellence and curriculum innovation, ensuring that every student receives the highest quality of education.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
  },
  {
    id: 3,
    name: "Prakash Thapa",
    role: "Head of Science",
    description: "Passionate about fostering scientific inquiry and hands-on learning through our state-of-the-art laboratory facilities.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80"
  },
  {
    id: 4,
    name: "Anjali Shrestha",
    role: "Head of Management",
    description: "Prepares future business leaders with practical knowledge, industry insights, and entrepreneurial skills.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80"
  },
  {
    id: 5,
    name: "Hari Bahadur Basnet",
    role: "Senior Math Teacher",
    description: "Makes complex mathematical concepts accessible and engaging, consistently producing top results in board examinations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80"
  },
  {
    id: 6,
    name: "Bimala Poudel",
    role: "Head of Administration",
    description: "Ensures smooth day-to-day operations and provides exceptional support to students, parents, and faculty members.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80"
  },
  {
    id: 7,
    name: "Rajendra Joshi",
    role: "Sports Coordinator",
    description: "Believes in physical fitness as a core component of education, organizing inter-school tournaments and training our top athletes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
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
