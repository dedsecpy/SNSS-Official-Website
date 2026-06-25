import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { ArrowRight, GraduationCap, BookOpen, Users, Award, Microscope, Trophy, Quote, CheckCircle2 } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";
import AnimatedNumber from "@/components/AnimatedNumber";
import FacultySlider from "@/components/FacultySlider";
import WaterRippleHero from "@/components/WaterRippleHero";
import EventsCarousel from "@/components/EventsCarousel";

export const revalidate = 0;

export default function Home() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <WaterRippleHero />

      {/* ─── Social Proof ─── */}
      <section className={styles.proof}>
        <FadeInUp delay={0.1}>
          <p className={styles.proofLabel}>Trusted by students and families across Nepal</p>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeContent}>
              <div className={styles.proofItem}>
                <Award size={22} strokeWidth={1.5} />
                <span>NEB Affiliated</span>
              </div>
              <div className={styles.proofItem}>
                <GraduationCap size={22} strokeWidth={1.5} />
                <span>Grade 12 Programs</span>
              </div>
              <div className={styles.proofItem}>
                <BookOpen size={22} strokeWidth={1.5} />
                <span>3 Academic Streams</span>
              </div>
              <div className={styles.proofItem}>
                <Users size={22} strokeWidth={1.5} />
                <span>500+ Students</span>
              </div>
              <div className={styles.proofItem}>
                <Trophy size={22} strokeWidth={1.5} />
                <span>Top SEE Results</span>
              </div>
              <div className={styles.proofItem}>
                <Microscope size={22} strokeWidth={1.5} />
                <span>Modern Labs</span>
              </div>
            </div>
            {/* Duplicate for infinite scroll */}
            <div className={styles.marqueeContent} aria-hidden="true">
              <div className={styles.proofItem}>
                <Award size={22} strokeWidth={1.5} />
                <span>NEB Affiliated</span>
              </div>
              <div className={styles.proofItem}>
                <GraduationCap size={22} strokeWidth={1.5} />
                <span>Grade 12 Programs</span>
              </div>
              <div className={styles.proofItem}>
                <BookOpen size={22} strokeWidth={1.5} />
                <span>3 Academic Streams</span>
              </div>
              <div className={styles.proofItem}>
                <Users size={22} strokeWidth={1.5} />
                <span>500+ Students</span>
              </div>
              <div className={styles.proofItem}>
                <Trophy size={22} strokeWidth={1.5} />
                <span>Top SEE Results</span>
              </div>
              <div className={styles.proofItem}>
                <Microscope size={22} strokeWidth={1.5} />
                <span>Modern Labs</span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* ─── Main Content with Sidebar ─── */}
      <div className={`container ${styles.contentWithSidebar}`}>
        {/* Left: Main Sections */}
        <div className={styles.mainContent}>

          {/* ─── About Preview ─── */}
          <section className={`section ${styles.aboutSection}`}>
            <FadeInUp>
              <div className={styles.aboutGrid}>
                <div className={styles.aboutImageWrapper}>
                  <div className={styles.imageBackdrop}></div>
                  <div className={styles.dotsPattern}></div>
                  <div className={styles.aboutImage}>
                    <Image
                      src="/school.png"
                      alt="Main School Building"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      className={styles.schoolImg}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                  
                  {/* Floating Glass Badge */}
                  <div className={styles.floatingBadge}>
                    <div className={styles.badgeIcon}>
                      <Trophy size={24} />
                    </div>
                    <div className={styles.badgeText}>
                      <span className={styles.badgeTitle}><AnimatedNumber endValue={63} />+ Years</span>
                      <span className={styles.badgeSub}>Of Excellence</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.aboutContent}>
                  <div className={styles.aboutLabelWrapper}>
                    <span className={styles.aboutLabelTag}>Discover Our Heritage</span>
                    <div className={styles.aboutLabelLine}></div>
                  </div>
                  <h2 className={styles.aboutTitle}>
                    Empowering minds, <span className={styles.textHighlight}>shaping futures</span> in Sarlahi.
                  </h2>
                  <p className={styles.aboutText}>
                    Established with a vision to provide world-class education, Shree Narayan Higher Secondary School is one of the most respected institutions in Sarlahi. Founded by experienced educators and community leaders, the school consistently delivers outstanding academic results.
                  </p>
                  
                  <ul className={styles.aboutFeatures}>
                    <li>
                      <CheckCircle2 size={20} className={styles.featureIcon} />
                      <span><strong>Expert Faculty:</strong> Dedicated and highly qualified educators.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} className={styles.featureIcon} />
                      <span><strong>Modern Facilities:</strong> State-of-the-art labs and learning spaces.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} className={styles.featureIcon} />
                      <span><strong>Holistic Approach:</strong> Balancing academics, sports, and arts.</span>
                    </li>
                  </ul>
                  
                  <div className={styles.aboutActions}>
                    <Link href="/about" className={styles.aboutBtn}>
                      Learn More About Us <ArrowRight size={18} />
                    </Link>
                    <div className={styles.aboutStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statValue}>10k+</span>
                        <span className={styles.statLabel}>Alumni</span>
                      </div>
                      <div className={styles.statDivider}></div>
                      <div className={styles.statItem}>
                        <span className={styles.statValue}>100%</span>
                        <span className={styles.statLabel}>Dedication</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </section>

          {/* ─── Principal's Message ─── */}
          <section className={`section ${styles.principalSection}`}>
            <FadeInUp>
              <div className={styles.principalGrid}>
                <div className={styles.principalContent}>
                  <div className={styles.quoteWatermark}>
                    <Quote size={120} />
                  </div>
                  <h2 className={styles.aboutTitle} style={{ position: "relative", zIndex: 2 }}>
                    Message from the Principal
                  </h2>
                  <div className={styles.principalTextWrapper}>
                    <p className={styles.principalText}>
                      "At Shree Narayan Higher Secondary School, our mission is to empower students with the knowledge, skills, and values they need to thrive in a rapidly changing world. We believe that education is not just about academic excellence, but about building character and fostering a lifelong love of learning."
                    </p>
                    <p className={styles.principalText}>
                      "Our dedicated faculty and state-of-the-art facilities provide a nurturing environment where every student can discover their true potential. We invite you to join our community and embark on a journey of growth and discovery."
                    </p>
                  </div>
                  <div className={styles.principalSignature}>
                    <div className={styles.signatureLine}></div>
                    <div>
                      <div className={styles.principalName}>Mr. Phaniraj Baral</div>
                      <div className={styles.principalTitle}>Principal, Shree Narayan Secondary School</div>
                    </div>
                  </div>
                </div>
                <div className={styles.principalImageWrapper}>
                  <div className={styles.principalImageBackdrop}></div>
                  <div className={styles.principalImage}>
                    <Image
                      src="/principal-updated.png"
                      alt="Principal of SNSS"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  
                  {/* Floating Info Badge for Principal */}
                  <div className={styles.principalBadge}>
                    <div className={styles.principalBadgeIcon}>
                      <Award size={20} />
                    </div>
                    <div className={styles.principalBadgeText}>
                      <span className={styles.principalBadgeTitle}>Visionary Leadership</span>
                      <span className={styles.principalBadgeSub}>Guiding the future</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </section>

          {/* ─── Programs ─── */}
          <section className={`section ${styles.programsSection}`}>
            <FadeInUp>
              <div className="section-header">
                <span className="section-label">Programs</span>
                <h2 className="section-title">Courses we offer</h2>
                <p className="section-subtitle">
                  A complete educational journey from early childhood through higher secondary levels.
                </p>
              </div>
            </FadeInUp>

            <div className={styles.programsGrid}>
              {/* Science */}
              <FadeInUp delay={0.1} className={styles.programBento1}>
                <div className={`${styles.programCard} glass`}>
                  <div className={styles.programIcon} style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" }}>
                    <Microscope size={28} />
                  </div>
                  <h3 className={styles.programTitle}>Science</h3>
                  <p className={styles.programDesc}>
                    A rigorous program for students pursuing careers in medicine, engineering, and technology.
                  </p>
                  <Link href="/academics" className={styles.programLink}>
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeInUp>

              {/* Management */}
              <FadeInUp delay={0.2} className={styles.programBento2}>
                <div className={`${styles.programCard} glass`}>
                  <div className={styles.programIcon} style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
                    <BookOpen size={28} />
                  </div>
                  <h3 className={styles.programTitle}>Management</h3>
                  <p className={styles.programDesc}>
                    Business education preparing future leaders, entrepreneurs, and corporate professionals.
                  </p>
                  <Link href="/academics" className={styles.programLink}>
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeInUp>

              {/* Education */}
              <FadeInUp delay={0.3} className={styles.programBento3}>
                <div className={`${styles.programCard} glass`}>
                  <div className={styles.programIcon} style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}>
                    <GraduationCap size={28} />
                  </div>
                  <h3 className={styles.programTitle}>Education</h3>
                  <p className={styles.programDesc}>
                    Fostering the next generation of educators with modern teaching methodologies.
                  </p>
                  <Link href="/academics" className={styles.programLink}>
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeInUp>
            </div>
          </section>

          {/* ─── Why Choose Us (Bento Box) ─── */}
          <section className={`section ${styles.whySection}`}>
            <FadeInUp>
              <div className="section-header">
                <span className="section-label">Why Shree Narayan</span>
                <h2 className="section-title">Built for student success</h2>
                <p className="section-subtitle">
                  Everything you need for an outstanding educational experience, all in one place.
                </p>
              </div>
            </FadeInUp>

            <div className={styles.whyGrid}>
              <FadeInUp delay={0.1} className={styles.bento1}>
                <div className={`${styles.whyCard} ${styles.whyCardPrimary}`}>
                  <div className={styles.whyCardImageWrapper}>
                    <Image 
                      src="/classroom_enhanced.png" 
                      alt="Faculty Group"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
                      className={styles.whyCardBgImage}
                    />
                    <div className={styles.whyCardOverlay} />
                  </div>
                  <div className={styles.whyIcon}>
                    <GraduationCap size={32} />
                  </div>
                  <h3 className={styles.whyCardTitle}>Expert Faculty</h3>
                  <p className={styles.whyCardDesc}>
                    Highly experienced and dedicated educators committed to student growth. Our teachers use modern methodologies to engage students.
                  </p>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2} className={styles.bento2}>
                <div className={`${styles.whyCard} ${styles.whyCardMuted}`}>
                  <div className={styles.whyIcon}>
                    <Microscope size={24} />
                  </div>
                  <h3 className={styles.whyCardTitle}>Modern Labs</h3>
                  <p className={styles.whyCardDesc}>
                    Fully equipped science labs and computer facilities.
                  </p>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.3} className={styles.bento3}>
                <div className={`${styles.whyCard} ${styles.whyCardSubtle}`}>
                  <div className={styles.whyIcon}>
                    <Trophy size={24} />
                  </div>
                  <h3 className={styles.whyCardTitle}>Proven Results</h3>
                  <p className={styles.whyCardDesc}>
                    Consistently outstanding performance in board examinations.
                  </p>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.4} className={styles.bento4}>
                <div className={`${styles.whyCard} glass`}>
                  <div className={styles.whyContentRow}>
                    <div className={styles.whyIcon}>
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className={styles.whyCardTitle}>Holistic Growth</h3>
                      <p className={styles.whyCardDesc}>
                        Focus on sports, arts, debates, and extracurricular development.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </section>
        </div>

      </div>

      {/* ─── Happenings / Events Carousel ─── */}
      <EventsCarousel />

      {/* ─── Faculty Profiles ─── */}
      <section className="section" style={{ background: "var(--color-bg-subtle)", padding: "5rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <FadeInUp>
            <div className="section-header" style={{ textAlign: "center" }}>
              <span className="section-label">Our Team</span>
              <h2 className="section-title">Meet Our Faculty</h2>
              <p className="section-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
                Dedicated professionals committed to excellence in education.
              </p>
            </div>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <FacultySlider />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaInner}`}>
          <FadeInUp>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to join us?</h2>
              <p className={styles.ctaDesc}>
                Admissions are open for the 2083 BS academic session. Limited seats available.
              </p>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Link href="/admission" className={styles.ctaBtn}>
              Apply Now <ArrowRight size={18} />
            </Link>
          </FadeInUp>
        </div>
      </section>
    </main>
  );
}
