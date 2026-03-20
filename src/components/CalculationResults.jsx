import './CalculationResults.css'

export function CalculationResults({ result }) {
  if (!result) return null

  return (
    <div className="results" role="region" aria-label="Resultados do cálculo">
      <h2>📊 Resultados</h2>

      <div className="result-highlight">
        <p>A sua medicação vai durar aproximadamente</p>
        <p className="total-hours"><strong>{result.totalHours.toFixed(2)} horas</strong></p>
        <p className="cycles">
          ({result.fullCycles} ciclos completos de {result.h1 + result.h2}h
          {result.remaining > 0 && ` + ${(result.remainingPhase1Hours + result.remainingPhase2Hours).toFixed(2)}h parciais`})
        </p>
      </div>

      <div className="calculations">
        <h3>Cálculos:</h3>

        <div className="calc-step">
          <p><strong>Consumo na Fase 1:</strong></p>
          <p className="formula">
            {result.r1} ml/h × {result.h1} h = <strong>{result.consumptionPhase1.toFixed(3)} ml</strong>
          </p>
        </div>

        <div className="calc-step">
          <p><strong>Consumo na Fase 2:</strong></p>
          <p className="formula">
            {result.r2} ml/h × {result.h2} h = <strong>{result.consumptionPhase2.toFixed(3)} ml</strong>
          </p>
        </div>

        <div className="calc-step">
          <p><strong>Consumo total por ciclo:</strong></p>
          <p className="formula">
            {result.consumptionPhase1.toFixed(3)} ml + {result.consumptionPhase2.toFixed(3)} ml = <strong>{result.totalPerCycle.toFixed(3)} ml</strong>
          </p>
        </div>

        <div className="calc-step">
          <p><strong>Ciclos completos possíveis:</strong></p>
          <p className="formula">
            {result.volume} ml ÷ {result.totalPerCycle.toFixed(3)} ml/ciclo = <strong>{result.fullCycles} ciclos</strong>
          </p>
        </div>

        <div className="calc-step">
          <p><strong>Medicação restante após ciclos completos:</strong></p>
          <p className="formula">
            {result.volume} ml - ({result.fullCycles} × {result.totalPerCycle.toFixed(3)} ml) = <strong>{result.remaining.toFixed(3)} ml</strong>
          </p>
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
            ({result.fullCycles} ciclos × {result.h1 + result.h2} h) + {' '}
            {result.remainingPhase1Hours > 0 ? `${result.remainingPhase1Hours.toFixed(2)}h` : '0h'} + {' '}
            {result.remainingPhase2Hours > 0 ? `${result.remainingPhase2Hours.toFixed(2)}h` : '0h'} ={' '}
            <strong>{result.totalHours.toFixed(2)} horas</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
