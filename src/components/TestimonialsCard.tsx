import { useState, useEffect } from 'react'
import { usePanelStore, panelStore } from './MenuButtons'
import { VerifiedBadge } from './VerifiedBadge'

const TESTIMONIALS = [
  {
    name: 'DEVOUR',
    title: 'CEO at Phase',
    pfp: '/testimonial/DEVOUR.jpg',
    badge: '/content/logos/phase-badge.jpg',
    quote: `"Rizzy has been a core creative force behind Radiants' public presence. He consistently translates abstract ideas, fast-moving narratives, and evolving brand direction into content that actually resonates with people. What stands out most is his creativity. In an attention-driven environment, Rizzy understands how to balance speed, creativity, and brand integrity. He's not just a designer or content creator, he's someone who actively helps shape how a project is perceived in the market."`,
    job: {
      type: 'radiants',
      logo: '/content/logos/radiant logo.png',
      text: 'Creative Direction',
      duration: '3 years — and still',
      ongoing: true
    }
  },
  {
    name: 'Jerk Terror',
    title: 'CEO at Hydex',
    pfp: '/testimonial/JerkTerror.jpg',
    badge: '/content/logos/hydex-badge.jpg',
    quote: `"Rizzy has an incredibly keen eye for design. Whether I have a strong idea of what I need or just a rough concept, he always delivers a professional grade product that often exceeds my expectations."`,
    job: {
      type: 'hydex',
      logo: '/content/hydex-logo-white.png',
      text: 'Logo Animation & Pitch Deck Design'
    }
  }
]

export function TestimonialsCard() {
  const activePanel = usePanelStore()
  const isActive = activePanel === 'testimonials'
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.testimonials-card') && !target.closest('[data-panel="testimonials"]')) {
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
    <div className={`testimonials-card ${isActive ? 'active' : ''}`}>
      <button className="testimonial-arrow prev" onClick={() => showTestimonial(currentIndex - 1)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="testimonial-arrow next" onClick={() => showTestimonial(currentIndex + 1)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {TESTIMONIALS.map((testimonial, index) => (
        <div
          key={index}
          className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}
          data-index={index}
        >
          <div className="testimonial-header">
            <img loading="lazy" src={testimonial.pfp} alt={testimonial.name} className="testimonial-pfp" />
            <div className="testimonial-info">
              <h3 className="testimonial-name">
                {testimonial.name}
                <VerifiedBadge color="orange" />
                <img loading="lazy" src={testimonial.badge} alt={testimonial.title} className="company-badge" />
              </h3>
              <span className="testimonial-title">{testimonial.title}</span>
            </div>
          </div>
          <div className="testimonial-quote">
            <p>{testimonial.quote}</p>
          </div>
          <div className={`job-done-tag ${testimonial.job.type}`}>
            <img loading="lazy" src={testimonial.job.logo} alt={testimonial.job.type} className="job-brand-logo" />
            <span className="job-text">{testimonial.job.text}</span>
            {testimonial.job.duration && (
              <span className="job-duration">{testimonial.job.duration}</span>
            )}
            {testimonial.job.ongoing && <span className="ongoing-dot"></span>}
          </div>
        </div>
      ))}
    </div>
  )
}
