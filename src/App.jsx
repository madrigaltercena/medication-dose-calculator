import { useMedicationCalculation } from './hooks/useMedicationCalculation'
import { FormInput } from './components/FormInput'
import { CalculationResults } from './components/CalculationResults'
import './App.css'

function PhaseSection({ title, children }) {
  return (
    <fieldset className="phase">
      <legend className="phase-legend">{title}</legend>
      {children}
    </fieldset>
  )
}

function App() {
  const { inputs, setters, validation, result, reset } = useMedicationCalculation()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="app">
      <main className="container" role="main">
        <header>
          <h1>💊 Calculadora de Medicação</h1>
          <p className="subtitle">Quantas horas vai durar a sua medicação?</p>
        </header>

        <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cálculo de medicação">
          <section aria-labelledby="volume-section">
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
              <FormInput
                id="startTime"
                label="Hora de início da toma"
                type="time"
                value={inputs.startTime}
                onChange={setters.setStartTime}
              />
            </div>
          </section>

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
      </main>
    </div>
  )
}

export default App
