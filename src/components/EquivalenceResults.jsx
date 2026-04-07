import './CalculationResults.css'

export function EquivalenceResults({ result }) {
  if (!result) return null

  return (
    <div className="results" role="region" aria-label="Resultado do cálculo da equivalência">
      <h2>📊 Resultado</h2>

      <div className="result-highlight">
        <p>A equivalência calculada é</p>
        <p className="total-hours">
          <strong>{result.equivalenciaMlPorHora.toFixed(2)} ml/h</strong>
        </p>
      </div>
    </div>
  )
}
