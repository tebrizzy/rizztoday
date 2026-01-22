import { usePanelStore, panelStore } from '../../stores/panelStore'

export function MenuButtons() {
  const activePanel = usePanelStore()

  const buttons = [
    { id: 'about' as const, label: 'About', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
        <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z" stroke="white" strokeWidth="2"/>
      </svg>
    )},
    { id: 'cards' as const, label: 'Works', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2"/>
        <rect x="7" y="9" width="10" height="2" fill="white"/>
        <rect x="7" y="13" width="6" height="2" fill="white"/>
      </svg>
    )},
    { id: 'testimonials' as const, label: 'Testimonials', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15C21 15.55 20.78 16.05 20.41 16.41C20.05 16.78 19.55 17 19 17H7L3 21V5C3 4.45 3.22 3.95 3.59 3.59C3.95 3.22 4.45 3 5 3H19C19.55 3 20.05 3.22 20.41 3.59C20.78 3.95 21 4.45 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  ]

  return (
    <div className="menu-buttons">
      {buttons.map((button, index) => (
        <button
          key={button.id}
          className={`menu-btn ${activePanel === button.id ? 'active' : ''} ${activePanel && activePanel !== button.id ? 'hidden' : ''}`}
          data-panel={button.id}
          data-original={index}
          onClick={() => panelStore.toggle(button.id)}
        >
          {button.icon}
          <span className="menu-btn-label">{button.label}</span>
        </button>
      ))}
    </div>
  )
}
