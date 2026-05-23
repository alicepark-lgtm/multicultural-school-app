import { useState } from 'react'
import { LANGUAGES, t } from '../i18n/translations'
import { SCHOOLS } from '../data/schools'
import NewsletterTab from './NewsletterTab'
import MealTab from './MealTab'

export default function MainPage({ language, setLanguage, school, selectedAllergens, toggleAllergen, setSelectedAllergens, onBack }) {
  const [activeTab, setActiveTab] = useState('meal')
  const tr = t[language]
  const schoolName = SCHOOLS.find(s => s.id === school)?.name || ''

  return (
    <div className="page2">
      <header className="page2-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>{tr.back}</button>
          <span className="header-school">🏫 {schoolName}</span>
        </div>
        <div className="lang-switcher">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-chip ${language === lang.code ? 'active' : ''}`}
              onClick={() => setLanguage(lang.code)}
              title={lang.nativeName}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      </header>

      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === 'newsletter' ? 'active' : ''}`}
          onClick={() => setActiveTab('newsletter')}
        >
          {tr.tabNewsletter}
        </button>
        <button
          className={`tab-btn ${activeTab === 'meal' ? 'active' : ''}`}
          onClick={() => setActiveTab('meal')}
        >
          {tr.tabMeal}
        </button>
      </div>

      <div className="page2-content">
        {activeTab === 'newsletter' ? (
          <NewsletterTab language={language} />
        ) : (
          <MealTab
            language={language}
            selectedAllergens={selectedAllergens}
            toggleAllergen={toggleAllergen}
            setSelectedAllergens={setSelectedAllergens}
          />
        )}
      </div>
    </div>
  )
}
