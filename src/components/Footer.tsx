import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from "./Footer.module.css";

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



          {/* Resources */}
          <div>
            <h4 className={styles.heading}>Resources</h4>
            <ul className={styles.linkList}>
              <li><Link href="/contact" className={styles.link}>Contact</Link></li>
              <li><Link href="/admin" className={styles.link}>Staff Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.heading}>Contact</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>Keshargunj, Ishworpur 45801, Sarlahi</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} className={styles.contactIcon} />
                <span>9854027017</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <span>narayanssks@gmail.com</span>
              </div>
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
