import { useState } from 'react'
import { useMedicationCalculation } from './hooks/useMedicationCalculation'
import { useEquivalenceCalculation } from './hooks/useEquivalenceCalculation'
import { FormInput } from './components/FormInput'
import { CalculationResults } from './components/CalculationResults'
import { EquivalenceResults } from './components/EquivalenceResults'
import './App.css'

function PhaseSection({ title, children }) {
  return (
    <fieldset className="phase">
      <legend className="phase-legend">{title}</legend>
      {children}
    </fieldset>
  )
}

function DurationCalculator({ inputs, setters, validation, result, reset }) {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cálculo da duração">
        <PhaseSection title="Dados da medicação">
          <div className="phase-inputs">
            <FormInput
              id="volume"
              label="Quantidade de medicamento disponível (ml)"
              type="number"
              step="0.01"
              min="0"
              value={inputs.volume}
              onChange={setters.setVolume}
              placeholder="10"
            />
          </div>
        </PhaseSection>

        <PhaseSection title="Fase 1">
          <div className="phase-inputs">
            <FormInput
              id="phase1Rate"
              label="Débito da bomba (ml/h)"
              type="number"
              step="0.01"
              min="0"
              value={inputs.phase1Rate}
              onChange={setters.setPhase1Rate}
              placeholder="0.51"
              error={validation.errors.phase1Rate}
              required
            />
            <FormInput
              id="phase1Hours"
              label="Duração (horas)"
              type="number"
              step="0.01"
              min="0"
              value={inputs.phase1Hours}
              onChange={setters.setPhase1Hours}
              placeholder="16"
              error={validation.errors.phase1Hours}
              required
            />
          </div>
        </PhaseSection>

        <PhaseSection title="Fase 2">
          <div className="phase-inputs">
            <FormInput
              id="phase2Rate"
              label="Débito da bomba (ml/h)"
              type="number"
              step="0.01"
              min="0"
              value={inputs.phase2Rate}
              onChange={setters.setPhase2Rate}
              placeholder="0.35"
              error={validation.errors.phase2Rate}
              required
            />
            <FormInput
              id="phase2Hours"
              label="Duração (horas)"
              type="number"
              step="0.01"
              min="0"
              value={inputs.phase2Hours}
              onChange={setters.setPhase2Hours}
              placeholder="8"
              error={validation.errors.phase2Hours}
              required
            />
          </div>
        </PhaseSection>

        <div className="buttons">
          <button
            type="submit"
            className="btn-primary"
            disabled={!validation.isValid}
            aria-disabled={!validation.isValid}
          >
            Calcular
          </button>
          <button type="button" className="btn-secondary" onClick={reset}>
            Limpar
          </button>
        </div>
      </form>

      <CalculationResults result={result} />
    </>
  )
}

function EquivalenceCalculator({ inputs, setters, validation, result, reset }) {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cálculo da equivalência">
        <PhaseSection title="Dados do cálculo">
          <div className="phase-inputs">
            <FormInput
              id="equivalentesDaLevodopa"
              label="Equivalentes da levodopa"
              type="number"
              step="0.01"
              min="0"
              value={inputs.equivalentesDaLevodopa}
              onChange={setters.setEquivalentesDaLevodopa}
              placeholder="2000"
              error={validation.errors.equivalentesDaLevodopa}
              required
            />
            <FormInput
              id="horasAcordado"
              label="Horas acordado"
              type="number"
              step="0.01"
              min="0"
              value={inputs.horasAcordado}
              onChange={setters.setHorasAcordado}
              placeholder="16"
              error={validation.errors.horasAcordado}
              required
            />
          </div>
        </PhaseSection>

        <div className="buttons">
          <button
            type="submit"
            className="btn-primary"
            disabled={!validation.isValid}
            aria-disabled={!validation.isValid}
          >
            Calcular
          </button>
          <button type="button" className="btn-secondary" onClick={reset}>
            Limpar
          </button>
        </div>
      </form>

      <EquivalenceResults result={result} />
    </>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('duration')
  const durationCalculator = useMedicationCalculation()
  const equivalenceCalculator = useEquivalenceCalculation()

  const tabContent = {
    duration: {
      label: 'Duração',
      subtitle: 'Quantas horas vai durar a sua medicação?',
    },
    equivalence: {
      label: 'Taxa base',
      subtitle: 'Calcule a taxa base em ml/h.',
    },
  }

  return (
    <div className="app">
      <main className="container" role="main">
        <header>
          <h1>💊 Calculadora de Medicação</h1>
          <p className="subtitle">{tabContent[activeTab].subtitle}</p>
        </header>

        <div className="tabs" role="tablist" aria-label="Tipos de cálculo">
          <button
            type="button"
            role="tab"
            id="tab-duration"
            aria-selected={activeTab === 'duration'}
            aria-controls="panel-duration"
            className={`tab-button ${activeTab === 'duration' ? 'active' : ''}`}
            onClick={() => setActiveTab('duration')}
          >
            {tabContent.duration.label}
          </button>
          <button
            type="button"
            role="tab"
            id="tab-equivalence"
            aria-selected={activeTab === 'equivalence'}
            aria-controls="panel-equivalence"
            className={`tab-button ${activeTab === 'equivalence' ? 'active' : ''}`}
            onClick={() => setActiveTab('equivalence')}
          >
            {tabContent.equivalence.label}
          </button>
        </div>

        {activeTab === 'duration' ? (
          <section
            id="panel-duration"
            role="tabpanel"
            aria-labelledby="tab-duration"
            className="tab-panel"
          >
            <DurationCalculator {...durationCalculator} />
          </section>
        ) : (
          <section
            id="panel-equivalence"
            role="tabpanel"
            aria-labelledby="tab-equivalence"
            className="tab-panel"
          >
            <EquivalenceCalculator {...equivalenceCalculator} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
