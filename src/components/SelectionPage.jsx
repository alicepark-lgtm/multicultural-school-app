import { LANGUAGES, t } from '../i18n/translations'
import { SCHOOLS } from '../data/schools'

export default function SelectionPage({ language, setLanguage, school, setSchool, onStart }) {
  const tr = t[language]

  return (
    <div className="page1">
      <div className="page1-card">
        <div className="page1-header">
          <span className="page1-icon">🏫</span>
          <h1 className="page1-title">{tr.appTitle}</h1>
          <p className="page1-subtitle">{tr.appSubtitle}</p>
        </div>

        <p className="section-label">{tr.selectLanguage}</p>
        <div className="lang-grid">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-btn ${language === lang.code ? 'active' : ''}`}
              onClick={() => setLanguage(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.nativeName}</span>
            </button>
          ))}
        </div>

        <p className="section-label">{tr.selectSchool}</p>
        <select
          className="school-select"
          value={school}
          onChange={e => setSchool(e.target.value)}
        >
          <option value="">{tr.chooseSchoolPlaceholder}</option>
          {SCHOOLS.map(s => (
            <option key={s.id} value={s.id}>
              {s.city} {s.name}
            </option>
          ))}
        </select>

        <button
          className="start-btn"
          onClick={onStart}
          disabled={!school}
        >
          {tr.startBtn} →
        </button>
      </div>
    </div>
  )
}
