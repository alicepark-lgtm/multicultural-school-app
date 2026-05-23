import { ALLERGENS } from '../data/allergens'
import { t } from '../i18n/translations'

export default function AllergenFilter({ language, selectedAllergens, toggleAllergen, setSelectedAllergens }) {
  const tr = t[language]

  const getName = (a) => a[language] || a.ko

  return (
    <div className="allergen-filter-card">
      <p className="allergen-filter-title">{tr.allergenFilterTitle}</p>
      <p className="allergen-filter-desc">{tr.allergenFilterDesc}</p>
      <div className="allergen-filter-actions">
        <button className="filter-action-btn" onClick={() => setSelectedAllergens(new Set())}>
          {tr.clearAll}
        </button>
        <button className="filter-action-btn" onClick={() => setSelectedAllergens(new Set(ALLERGENS.map(a => a.id)))}>
          {tr.selectAll}
        </button>
        {selectedAllergens.size > 0 && (
          <span style={{ fontSize:12, color:'var(--danger)', fontWeight:700, alignSelf:'center' }}>
            ⚠ {selectedAllergens.size}개 선택됨
          </span>
        )}
      </div>
      <div className="allergen-grid">
        {ALLERGENS.map(allergen => {
          const selected = selectedAllergens.has(allergen.id)
          return (
            <button
              key={allergen.id}
              className={`allergen-chip ${selected ? 'selected' : ''}`}
              style={selected ? {
                background: allergen.color,
                borderColor: allergen.border,
                color: '#1E293B',
              } : {}}
              onClick={() => toggleAllergen(allergen.id)}
              title={`${allergen.id}. ${allergen.ko}`}
            >
              <span>{allergen.emoji}</span>
              <span>{getName(allergen)}</span>
              {selected && <span style={{ color: allergen.border }}>✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
