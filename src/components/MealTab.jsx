import AllergenFilter from './AllergenFilter'
import MonthlyCalendar from './MonthlyCalendar'
import TodayMeal from './TodayMeal'

export default function MealTab({ language, selectedAllergens, toggleAllergen, setSelectedAllergens }) {
  return (
    <div className="meal-container">
      <AllergenFilter
        language={language}
        selectedAllergens={selectedAllergens}
        toggleAllergen={toggleAllergen}
        setSelectedAllergens={setSelectedAllergens}
      />
      <TodayMeal
        language={language}
        selectedAllergens={selectedAllergens}
      />
      <MonthlyCalendar
        language={language}
        selectedAllergens={selectedAllergens}
      />
    </div>
  )
}
