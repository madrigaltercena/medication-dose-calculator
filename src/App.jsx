import { useState } from 'react'
import './App.css'

function App() {
  const [volume, setVolume] = useState(10)
  const [phase1Rate, setPhase1Rate] = useState('')
  const [phase1Hours, setPhase1Hours] = useState('')
  const [phase2Rate, setPhase2Rate] = useState('')
  const [phase2Hours, setPhase2Hours] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const v = parseFloat(volume)
    const r1 = parseFloat(phase1Rate)
    const h1 = parseFloat(phase1Hours)
    const r2 = parseFloat(phase2Rate)
    const h2 = parseFloat(phase2Hours)

    if (isNaN(v) || isNaN(r1) || isNaN(h1) || isNaN(r2) || isNaN(h2)) return
    if (v <= 0 || r1 <= 0 || h1 <= 0 || r2 <= 0 || h2 <= 0) return

    const consumptionPhase1 = r1 * h1
    const consumptionPhase2 = r2 * h2
    const totalPerCycle = consumptionPhase1 + consumptionPhase2
    const fullCycles = Math.floor(v / totalPerCycle)
    const remaining = v - (fullCycles * totalPerCycle)

    // How long will the remaining medication last?
    // We try phase 1 first, then phase 2
    let remainingPhase1Hours = 0
    let remainingPhase2Hours = 0
    let remainingPhase1Ml = 0
    let remainingPhase2Ml = 0

    if (remaining >= consumptionPhase1) {
      remainingPhase1Hours = h1
      remainingPhase1Ml = consumptionPhase1
      const afterPhase1 = remaining - consumptionPhase1
      if (afterPhase1 >= consumptionPhase2) {
        remainingPhase2Hours = h2
        remainingPhase2Ml = consumptionPhase2
      } else {
        remainingPhase2Hours = afterPhase1 / r2
        remainingPhase2Ml = afterPhase1
      }
    } else {
      remainingPhase1Hours = remaining / r1
      remainingPhase1Ml = remaining
    }

    const totalHours = fullCycles * (h1 + h2) +
      (remainingPhase1Hours > 0 ? remainingPhase1Hours : 0) +
      (remainingPhase2Hours > 0 ? remainingPhase2Hours : 0)

    setResult({
      volume,
      r1, h1,
      r2, h2,
      consumptionPhase1,
      consumptionPhase2,
      totalPerCycle,
      fullCycles,
      remaining,
      remainingPhase1Hours,
      remainingPhase2Hours,
      remainingPhase1Ml,
      remainingPhase2Ml,
      totalHours,
    })
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    calculate()
  }

  const handleReset = () => {
    setVolume(10)
    setPhase1Rate('')
    setPhase1Hours('')
    setPhase2Rate('')
    setPhase2Hours('')
    setResult(null)
  }

  return (
    <div className="app">
      <div className="container">
        <h1>💊 Calculadora de Medicação</h1>
        <p className="subtitle">Quantas horas vai durar a sua medicação?</p>

        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label htmlFor="volume">Quantidade de medicamento disponível (ml)</label>
            <input
              id="volume"
              type="number"
              step="0.01"
              min="0"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              placeholder="10"
            />
          </div>

          <div className="phase">
            <h2> Fase 1</h2>
            <div className="phase-inputs">
              <div className="form-group">
                <label htmlFor="phase1Rate">Débito da bomba (ml/h)</label>
                <input
                  id="phase1Rate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={phase1Rate}
                  onChange={(e) => setPhase1Rate(e.target.value)}
                  placeholder="0.51"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phase1Hours">Duração (horas)</label>
                <input
                  id="phase1Hours"
                  type="number"
                  step="0.01"
                  min="0"
                  value={phase1Hours}
                  onChange={(e) => setPhase1Hours(e.target.value)}
                  placeholder="16"
                  required
                />
              </div>
            </div>
          </div>

          <div className="phase">
            <h2> Fase 2</h2>
            <div className="phase-inputs">
              <div className="form-group">
                <label htmlFor="phase2Rate">Débito da bomba (ml/h)</label>
                <input
                  id="phase2Rate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={phase2Rate}
                  onChange={(e) => setPhase2Rate(e.target.value)}
                  placeholder="0.35"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phase2Hours">Duração (horas)</label>
                <input
                  id="phase2Hours"
                  type="number"
                  step="0.01"
                  min="0"
                  value={phase2Hours}
                  onChange={(e) => setPhase2Hours(e.target.value)}
                  placeholder="8"
                  required
                />
              </div>
            </div>
          </div>

          <div className="buttons">
            <button type="submit" className="btn-primary">Calcular</button>
            <button type="button" className="btn-secondary" onClick={handleReset}>Limpar</button>
          </div>
        </form>

        {result && (
          <div className="results">
            <h2>📊 Resultados</h2>

            <div className="result-highlight">
              <p>A sua medicação vai durar aproximadamente <strong>{result.totalHours.toFixed(2)} horas</strong></p>
              <p className="cycles">
                ({result.fullCycles} ciclos completos de {result.h1 + result.h2}h
                {result.remaining > 0 && ` + ${(result.remainingPhase1Hours + result.remainingPhase2Hours).toFixed(2)}h parciais`})
              </p>
            </div>

            <div className="calculations">
              <h3>Cálculos:</h3>
              
              <div className="calc-step">
                <p><strong>Consumo na Fase 1:</strong></p>
                <p className="formula">{result.r1} ml/h × {result.h1} h = <strong>{result.consumptionPhase1.toFixed(3)} ml</strong></p>
              </div>

              <div className="calc-step">
                <p><strong>Consumo na Fase 2:</strong></p>
                <p className="formula">{result.r2} ml/h × {result.h2} h = <strong>{result.consumptionPhase2.toFixed(3)} ml</strong></p>
              </div>

              <div className="calc-step">
                <p><strong>Consumo total por ciclo:</strong></p>
                <p className="formula">{result.consumptionPhase1.toFixed(3)} ml + {result.consumptionPhase2.toFixed(3)} ml = <strong>{result.totalPerCycle.toFixed(3)} ml</strong></p>
              </div>

              <div className="calc-step">
                <p><strong>Ciclos completos possíveis:</strong></p>
                <p className="formula">{result.volume} ml ÷ {result.totalPerCycle.toFixed(3)} ml/ciclo = <strong>{result.fullCycles} ciclos</strong></p>
              </div>

              <div className="calc-step">
                <p><strong>Medicação restante após ciclos completos:</strong></p>
                <p className="formula">{result.volume} ml - ({result.fullCycles} × {result.totalPerCycle.toFixed(3)} ml) = <strong>{result.remaining.toFixed(3)} ml</strong></p>
              </div>

              <div className="calc-step">
                <p><strong>Tempo restante com medicação sobrante:</strong></p>
                {result.remaining >= result.consumptionPhase1 ? (
                  <>
                    <p className="formula">Fase 1: {result.remainingPhase1Hours.toFixed(2)} h ({result.remainingPhase1Ml.toFixed(3)} ml)</p>
                    <p className="formula">Fase 2: {result.remainingPhase2Hours.toFixed(2)} h ({result.remainingPhase2Ml.toFixed(3)} ml)</p>
                  </>
                ) : (
                  <p className="formula">Fase 1: {result.remainingPhase1Hours.toFixed(2)} h ({result.remainingPhase1Ml.toFixed(3)} ml)</p>
                )}
              </div>

              <div className="calc-step total">
                <p><strong>Total de horas:</strong></p>
                <p className="formula">
                  ({result.fullCycles} ciclos × {result.h1 + result.h2} h) + {result.remainingPhase1Hours > 0 ? `${result.remainingPhase1Hours.toFixed(2)}h` : '0h'} + {result.remainingPhase2Hours > 0 ? `${result.remainingPhase2Hours.toFixed(2)}h` : '0h'} = <strong>{result.totalHours.toFixed(2)} horas</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
