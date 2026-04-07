import { useMemo, useState } from 'react'

export function useEquivalenceCalculation() {
  const [equivalentesDaLevodopa, setEquivalentesDaLevodopa] = useState('')
  const [horasAcordado, setHorasAcordado] = useState('')

  const inputs = { equivalentesDaLevodopa, horasAcordado }
  const setters = { setEquivalentesDaLevodopa, setHorasAcordado }

  const validation = useMemo(() => {
    const equivalentes = parseFloat(equivalentesDaLevodopa)
    const horas = parseFloat(horasAcordado)

    const errors = {}

    if (equivalentesDaLevodopa !== '' && isNaN(equivalentes)) {
      errors.equivalentesDaLevodopa = 'Valor inválido'
    }

    if (horasAcordado !== '' && isNaN(horas)) {
      errors.horasAcordado = 'Valor inválido'
    }

    if (!isNaN(equivalentes) && equivalentes <= 0) {
      errors.equivalentesDaLevodopa = 'Deve ser positivo'
    }

    if (!isNaN(horas) && horas <= 0) {
      errors.horasAcordado = 'Deve ser positivo'
    }

    const allFilled = equivalentesDaLevodopa !== '' && horasAcordado !== ''

    const isValid = allFilled &&
      !isNaN(equivalentes) && equivalentes > 0 &&
      !isNaN(horas) && horas > 0

    return { errors, isValid }
  }, [equivalentesDaLevodopa, horasAcordado])

  const result = useMemo(() => {
    const equivalentes = parseFloat(equivalentesDaLevodopa)
    const horas = parseFloat(horasAcordado)

    if (isNaN(equivalentes) || isNaN(horas)) return null
    if (equivalentes <= 0 || horas <= 0) return null

    const equivalenciaMlPorHora = (((equivalentes * 0.92 * 1.41) / 240) / horas)

    return {
      equivalentes,
      horas,
      equivalenciaMlPorHora,
    }
  }, [equivalentesDaLevodopa, horasAcordado])

  const reset = () => {
    setEquivalentesDaLevodopa('')
    setHorasAcordado('')
  }

  return { inputs, setters, validation, result, reset }
}
