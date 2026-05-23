import { useState } from 'react'
import SelectionPage from './components/SelectionPage'
import MainPage from './components/MainPage'

export default function App() {
  const [page, setPage] = useState(1)
  const [language, setLanguage] = useState('ko')
  const [school, setSchool] = useState('')
  const [selectedAllergens, setSelectedAllergens] = useState(new Set())

  const toggleAllergen = (id) => {
    setSelectedAllergens(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (page === 1) {
    return (
      <SelectionPage
        language={language}
        setLanguage={setLanguage}
        school={school}
        setSchool={setSchool}
        onStart={() => setPage(2)}
      />
    )
  }

  return (
    <MainPage
      language={language}
      setLanguage={setLanguage}
      school={school}
      selectedAllergens={selectedAllergens}
      toggleAllergen={toggleAllergen}
      setSelectedAllergens={setSelectedAllergens}
      onBack={() => setPage(1)}
    />
  )
}
