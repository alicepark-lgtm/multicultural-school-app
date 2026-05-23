import { useState } from 'react'
import { MENU_DATA, FOOD_INFO, HOLIDAYS } from '../data/menuData'
import { allergenById } from '../data/allergens'
import { t } from '../i18n/translations'

function getFoodName(foodKo, language) {
  return FOOD_INFO[foodKo]?.names?.[language] || foodKo
}

export default function MonthlyCalendar({ language, selectedAllergens }) {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(4) // 0-indexed: 4 = May

  const tr = t[language]
  const today = new Date(2026, 4, 22) // 오늘: 2026-05-22

  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const pad = n => String(n).padStart(2, '0')
  const getDateKey = (d) => `${year}-${pad(month + 1)}-${pad(d)}`

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const dayOfWeek = (d) => new Date(year, month, d).getDay()

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <button className="cal-nav-btn" onClick={prevMonth}>{tr.prevMonth}</button>
        <span className="calendar-title">
          {year}년 {tr.months[month]}
        </span>
        <button className="cal-nav-btn" onClick={nextMonth}>{tr.nextMonth}</button>
      </div>

      <div className="calendar-day-header">
        {tr.days.map((d, i) => (
          <div key={i} className="cal-day-label">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e${idx}`} className="cal-cell empty" />

          const dow = dayOfWeek(day)
          const dateKey = getDateKey(day)
          const menu = MENU_DATA[dateKey]
          const holiday = HOLIDAYS[dateKey]
          const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate()
          const isWeekend = dow === 0 || dow === 6

          const allergenHits = menu
            ? menu.filter(item => item.allergens.some(id => selectedAllergens.has(id)))
            : []

          const hasAllergen = allergenHits.length > 0

          let cellClass = 'cal-cell'
          if (!menu && !isWeekend && !holiday) cellClass += ' weekend-cell'
          if (isWeekend || (!menu && !holiday)) cellClass += ` ${dow === 0 ? 'sunday' : 'saturday'}`
          if (holiday) cellClass += ' holiday-cell'
          if (isToday) cellClass += ' today-cell'
          if (hasAllergen) cellClass += ' has-allergen'

          return (
            <div key={day} className={cellClass + ` ${dow === 0 ? 'sunday' : dow === 6 ? 'saturday' : ''}`}>
              {hasAllergen && <div className="allergen-dot" />}
              <div className="cal-date">{day}</div>

              {holiday && (
                <div className="holiday-label">{holiday}</div>
              )}

              {menu && !holiday ? (
                <div className="cal-menu-items">
                  {menu.slice(0, 4).map((item, i) => {
                    const isHit = item.allergens.some(id => selectedAllergens.has(id))
                    return (
                      <div key={i} className={`cal-menu-item ${isHit ? 'allergen-hit' : ''}`}>
                        {language === 'ko' ? item.name : getFoodName(item.name, language)}
                      </div>
                    )
                  })}
                  {menu.length > 4 && (
                    <div className="cal-menu-item" style={{ color:'#94A3B8' }}>+{menu.length - 4}</div>
                  )}
                </div>
              ) : !holiday && !isWeekend ? (
                <div className="no-meal-cell">—</div>
              ) : isWeekend ? (
                <div className="no-meal-cell" style={{ fontSize:10 }}>{tr.weekend}</div>
              ) : null}
            </div>
          )
        })}
      </div>

      {selectedAllergens.size > 0 && (
        <div style={{ padding:'10px 16px', background:'#FEF2F2', borderTop:'1px solid #FECACA', display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:16 }}>⚠️</span>
          <span style={{ fontSize:12, color:'#B91C1C', fontWeight:600 }}>
            {tr.allergenWarning}: {Array.from(selectedAllergens).map(id => allergenById[id]?.[language] || allergenById[id]?.ko).join(', ')}
          </span>
        </div>
      )}
    </div>
  )
}
