import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from "./Footer.module.css";

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <h3 className={styles.brandName}>Shree Narayan</h3>
            <p className={styles.brandSub}>Secondary School</p>
            <p className={styles.desc}>
              Providing quality education from ECD to Grade 12 in Ishworpur Municipality, Sarlahi, Nepal.
            </p>
          </div>

          {/* Connect */}
          <div>
            <h4 className={styles.heading}>Connect</h4>
            <div className={styles.connectButtons}>
              <a
                href="https://www.facebook.com/narayansecondaryschool"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <div className={styles.socialIconWrap}>
                  <FacebookIcon size={20} />
                </div>
                <div className={styles.socialText}>
                  <span className={styles.socialTitle}>Facebook</span>
                  <span className={styles.socialSub}>narayansecondaryschool</span>
                </div>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=narayanssks@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <div className={`${styles.socialIconWrap} ${styles.gmailIconWrap}`}>
                  <Mail size={20} />
                </div>
                <div className={styles.socialText}>
                  <span className={styles.socialTitle}>Email Us</span>
                  <span className={styles.socialSub}>narayanssks@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.heading}>Contact</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>Keshargunj, Ishworpur 45801, Sarlahi</span>
              </div>
              <a href="tel:9854027017" className={styles.contactItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Phone size={16} className={styles.contactIcon} />
                <span>9854027017</span>
              </a>
              <a href="mailto:narayanssks@gmail.com" className={styles.contactItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Mail size={16} className={styles.contactIcon} />
                <span>narayanssks@gmail.com</span>
              </a>
            </div>
          </div>
          
          {/* Map */}
          <div>
            <h4 className={styles.heading}>Location</h4>
            <div className={styles.mapContainer}>
              <iframe 
                src="https://maps.google.com/maps?q=27.0138168,85.6454086&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="150" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Shree Narayan Secondary School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
