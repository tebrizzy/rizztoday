import { useState, useEffect } from 'react'
import { usePanelStore, panelStore } from '../../stores/panelStore'
import { VerifiedBadge } from '../../shared/components/VerifiedBadge'
import { TESTIMONIALS } from '../../constants/testimonials'
import styles from './TestimonialsCard.module.css'

export function TestimonialsCard() {
  const activePanel = usePanelStore()
  const isActive = activePanel === 'testimonials'
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(`.${styles.testimonialsCard}`) && !target.closest('[data-panel="testimonials"]')) {
        if (isActive) panelStore.close()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isActive])

  const showTestimonial = (index: number) => {
    const total = TESTIMONIALS.length
    setCurrentIndex(((index % total) + total) % total)
  }

  return (
    <div className={`${styles.testimonialsCard} ${isActive ? styles.active : ''}`}>
      <button className={`${styles.testimonialArrow} ${styles.prev}`} onClick={() => showTestimonial(currentIndex - 1)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className={`${styles.testimonialArrow} ${styles.next}`} onClick={() => showTestimonial(currentIndex + 1)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {TESTIMONIALS.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className={`${styles.testimonialSlide} ${index === currentIndex ? styles.active : ''}`}
          data-index={index}
        >
          <div className={styles.testimonialHeader}>
            <img loading="lazy" src={testimonial.pfp} alt={testimonial.name} className={styles.testimonialPfp} />
            <div className={styles.testimonialInfo}>
              <h3 className={styles.testimonialName}>
                {testimonial.name}
                <VerifiedBadge color="orange" />
                <img loading="lazy" src={testimonial.badge} alt={testimonial.title} className={styles.companyBadge} />
              </h3>
              <span className={styles.testimonialTitle}>{testimonial.title}</span>
            </div>
          </div>
          <div className={styles.testimonialQuote}>
            <p>{testimonial.quote}</p>
          </div>
          <div className={`${styles.jobDoneTag} ${styles[testimonial.job.type]}`}>
            <img loading="lazy" src={testimonial.job.logo} alt={testimonial.job.type} className={styles.jobBrandLogo} />
            <span className={styles.jobText}>{testimonial.job.text}</span>
            {testimonial.job.duration && (
              <span className={styles.jobDuration}>{testimonial.job.duration}</span>
            )}
            {testimonial.job.ongoing && <span className={styles.ongoingDot}></span>}
          </div>
        </div>
      ))}
    </div>
  )
}
