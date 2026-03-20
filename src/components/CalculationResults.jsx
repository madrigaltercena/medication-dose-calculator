import './CalculationResults.css'

export function CalculationResults({ result }) {
  if (!result) return null

  const { totalHours, isOver24Hours, endTimeStr, endDayStr, endDayOffset, deficit } = result

  return (
    <div className="results" role="region" aria-label="Resultados do cálculo">
      <h2>📊 Resultados</h2>

      <div className="result-highlight">
        <p>A sua medicação vai durar aproximadamente</p>
        <p className="total-hours"><strong>{totalHours.toFixed(2)} horas</strong></p>
        {endDayOffset === 0 ? (
          <p className="end-time">
            🕐 Acaba às {endTimeStr} (mesmo dia)
          </p>
        ) : (
          <p className="end-time">
            🕐 Acaba às {endTimeStr}{endDayStr}
          </p>
        )}
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
          <p><strong>Consumo total por ciclo de 24h:</strong></p>
          <p className="formula">
            {result.consumptionPhase1.toFixed(3)} ml + {result.consumptionPhase2.toFixed(3)} ml = <strong>{result.totalPerCycle.toFixed(3)} ml</strong>
          </p>
        </div>

        {isOver24Hours ? (
          <>
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
          </>
        ) : (
          <>
            <div className="calc-step">
              <p><strong>Tempo com a medicação disponível:</strong></p>
              {result.remaining >= result.consumptionPhase1 ? (
                <>
                  <p className="formula">Fase 1: {result.remainingPhase1Hours.toFixed(2)} h ({result.remainingPhase1Ml.toFixed(3)} ml)</p>
                  <p className="formula">Fase 2: {result.remainingPhase2Hours.toFixed(2)} h ({result.remainingPhase2Ml.toFixed(3)} ml)</p>
                </>
              ) : (
                <p className="formula">Fase 1: {result.remainingPhase1Hours.toFixed(2)} h ({result.remainingPhase1Ml.toFixed(3)} ml)</p>
              )}
              <p className="deficit-note">
                {isOver24Hours
                  ? <>Faltam <strong>{deficit.toFixed(3)} ml</strong> para completar o próximo ciclo de 24h</>
                  : <>Faltam <strong>{deficit.toFixed(3)} ml</strong> para completar o ciclo de 24h</>
                }
              </p>
            </div>
          </>
        )}

        <div className="calc-step total">
          <p><strong>Total de horas:</strong></p>
          <p className="formula">
            {isOver24Hours
              ? `(${result.fullCycles} ciclos × ${result.h1 + result.h2} h) + ${(result.remainingPhase1Hours + result.remainingPhase2Hours).toFixed(2)}h = `
              : `${totalHours.toFixed(2)} h = `
            }
            <strong>{totalHours.toFixed(2)} horas</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
