import { MENU_DATA, FOOD_INFO } from '../data/menuData'
import { ALLERGENS, allergenById } from '../data/allergens'
import { t } from '../i18n/translations'

const TODAY_KEY = '2026-05-22'
const TODAY_DISPLAY = { ko:'2026년 5월 22일 금요일', en:'Friday, May 22, 2026', zh:'2026年5月22日 星期五', vi:'Thứ Sáu, 22/05/2026', fil:'Biyernes, Mayo 22, 2026', mn:'2026.05.22 Баасан гараг', ru:'Пятница, 22 мая 2026 г.', ja:'2026年5月22日（金）' }

function getAllergenName(allergen, lang) {
  return allergen[lang] || allergen.ko
}

export default function TodayMeal({ language, selectedAllergens }) {
  const tr = t[language]
  const todayMenu = MENU_DATA[TODAY_KEY] || []

  return (
    <div className="today-meal-card">
      <div className="today-meal-header">
        <span className="today-meal-title">🍱 {tr.todayMenu}</span>
        <span className="today-date">{TODAY_DISPLAY[language]}</span>
      </div>

      <div className="tray-container">
        <div className="tray">
          <div className={`tray-grid ${todayMenu.length <= 4 ? 'cols-2' : ''}`}>
            {todayMenu.map((item, idx) => {
              const info = FOOD_INFO[item.name]
              const isAllergenAlert = item.allergens.some(id => selectedAllergens.has(id))
              const matchedAllergens = item.allergens
                .map(id => allergenById[id])
                .filter(Boolean)
              const alertAllergens = matchedAllergens.filter(a => selectedAllergens.has(a.id))

              return (
                <div
                  key={idx}
                  className={`tray-item ${isAllergenAlert ? 'allergen-alert' : ''}`}
                >
                  <div className="tray-emoji">
                    {info?.emoji || '🍽️'}
                  </div>
                  <div className="tray-name">
                    {info?.names?.[language] || item.name}
                  </div>
                  <div className="tray-desc">
                    {info?.desc?.[language] || info?.desc?.ko || ''}
                  </div>

                  {matchedAllergens.length > 0 && (
                    <div className="tray-allergens">
                      {matchedAllergens.map(a => (
                        <span
                          key={a.id}
                          className={`allergen-badge ${selectedAllergens.has(a.id) ? 'warn' : 'info'}`}
                          title={getAllergenName(a, language)}
                        >
                          {a.emoji} {a.id}
                        </span>
                      ))}
                    </div>
                  )}

                  {isAllergenAlert && (
                    <div className="allergen-warning-banner">
                      ⚠ {tr.allergenWarning}
                      <span style={{ fontSize:8, fontWeight:400, marginLeft:2 }}>
                        {alertAllergens.map(a => getAllergenName(a, language)).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {selectedAllergens.size === 0 && (
          <p style={{ textAlign:'center', marginTop:12, fontSize:12, color:'#92400E' }}>
            💡 {tr.noAllergenSelected}
          </p>
        )}

        {/* 알레르기 범례 */}
        <div style={{ marginTop:16, background:'white', borderRadius:12, padding:'12px 16px' }}>
          <p style={{ fontSize:12, fontWeight:700, color:'var(--text-muted)', marginBottom:8 }}>
            {tr.ingredients}
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {todayMenu
              .flatMap(item => item.allergens)
              .filter((v, i, arr) => arr.indexOf(v) === i)
              .sort((a,b) => a - b)
              .map(id => {
                const a = allergenById[id]
                if (!a) return null
                const isSelected = selectedAllergens.has(id)
                return (
                  <span
                    key={id}
                    style={{
                      display:'inline-flex', alignItems:'center', gap:4,
                      padding:'4px 10px', borderRadius:20,
                      background: isSelected ? a.color : '#F8FAFC',
                      border: `2px solid ${isSelected ? a.border : '#E2E8F0'}`,
                      fontSize:12, fontWeight: isSelected ? 700 : 400,
                    }}
                  >
                    {a.emoji} {a.id}. {getAllergenName(a, language)}
                  </span>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
