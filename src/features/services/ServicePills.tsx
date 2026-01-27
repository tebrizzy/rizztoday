import { useState, useEffect, useRef } from 'react'
import { SERVICES } from '../../constants/services'
import { ServiceCard } from './ServiceCard'

export function ServicePills() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleHireClick = () => {
    if (isOpen) {
      setExpandedId(null)
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const handlePillClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Close everything when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpandedId(null)
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const visibleServices = SERVICES.filter(s => s.visible)
  const expandedService = SERVICES.find(s => s.id === expandedId)

  return (
    <div className={`service-pills-container ${isOpen ? 'open' : ''}`} ref={containerRef}>
      <button className={`hire-me-btn ${isOpen ? 'active' : ''}`} onClick={handleHireClick}>
        <span className="hire-icon">{isOpen ? '×' : '✦'}</span>
        <span className="hire-text">{isOpen ? 'What you need?' : 'Hire me'}</span>
      </button>

      <div className={`service-pills ${isOpen ? 'open' : ''}`}>
        {visibleServices.map((service, index) => (
          <button
            key={service.id}
            className={`service-pill ${expandedId === service.id ? 'active' : ''}`}
            onClick={() => handlePillClick(service.id)}
            style={{ transitionDelay: isOpen ? `${index * 0.05}s` : `${(visibleServices.length - index - 1) * 0.03}s` }}
          >
            <span className="pill-icon">{service.icon}</span>
            <span className="pill-title">{service.title}</span>
          </button>
        ))}
      </div>

      {expandedService && (
        <ServiceCard service={expandedService} />
      )}
    </div>
  )
}
