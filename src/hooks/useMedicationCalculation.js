import { useState, useMemo } from 'react'

export function useMedicationCalculation() {
  const [volume, setVolume] = useState(10)
  const [phase1Rate, setPhase1Rate] = useState('')
  const [phase1Hours, setPhase1Hours] = useState('')
  const [phase2Rate, setPhase2Rate] = useState('')
  const [phase2Hours, setPhase2Hours] = useState('')

  const inputs = { volume, phase1Rate, phase1Hours, phase2Rate, phase2Hours }
  const setters = { setVolume, setPhase1Rate, setPhase1Hours, setPhase2Rate, setPhase2Hours }

  const validation = useMemo(() => {
    const v = parseFloat(volume)
    const r1 = parseFloat(phase1Rate)
    const h1 = parseFloat(phase1Hours)
    const r2 = parseFloat(phase2Rate)
    const h2 = parseFloat(phase2Hours)

    const errors = {}

    if (phase1Rate !== '' && isNaN(r1)) errors.phase1Rate = 'Valor inválido'
    if (phase1Hours !== '' && isNaN(h1)) errors.phase1Hours = 'Valor inválido'
    if (phase2Rate !== '' && isNaN(r2)) errors.phase2Rate = 'Valor inválido'
    if (phase2Hours !== '' && isNaN(h2)) errors.phase2Hours = 'Valor inválido'

    if (!isNaN(r1) && r1 < 0) errors.phase1Rate = 'Deve ser positivo'
    if (!isNaN(h1) && h1 < 0) errors.phase1Hours = 'Deve ser positivo'
    if (!isNaN(r2) && r2 < 0) errors.phase2Rate = 'Deve ser positivo'
    if (!isNaN(h2) && h2 < 0) errors.phase2Hours = 'Deve ser positivo'
    if (!isNaN(r1) && r1 > 1000) errors.phase1Rate = 'Valor excessivo'
    if (!isNaN(h1) && h1 > 1000) errors.phase1Hours = 'Valor excessivo'
    if (!isNaN(r2) && r2 > 1000) errors.phase2Rate = 'Valor excessivo'
    if (!isNaN(h2) && h2 > 1000) errors.phase2Hours = 'Valor excessivo'

    const allFilled = phase1Rate !== '' && phase1Hours !== '' &&
                      phase2Rate !== '' && phase2Hours !== ''

    const isValid = allFilled &&
      !isNaN(v) && v > 0 &&
      !isNaN(r1) && r1 > 0 &&
      !isNaN(h1) && h1 > 0 &&
      !isNaN(r2) && r2 > 0 &&
      !isNaN(h2) && h2 > 0

    return { errors, isValid }
  }, [volume, phase1Rate, phase1Hours, phase2Rate, phase2Hours])

  const result = useMemo(() => {
    const v = parseFloat(volume)
    const r1 = parseFloat(phase1Rate)
    const h1 = parseFloat(phase1Hours)
    const r2 = parseFloat(phase2Rate)
    const h2 = parseFloat(phase2Hours)

    if (isNaN(v) || isNaN(r1) || isNaN(h1) || isNaN(r2) || isNaN(h2)) return null
    if (v <= 0 || r1 <= 0 || h1 <= 0 || r2 <= 0 || h2 <= 0) return null

    const consumptionPhase1 = r1 * h1
    const consumptionPhase2 = r2 * h2
    const totalPerCycle = consumptionPhase1 + consumptionPhase2
    const fullCycles = Math.floor(v / totalPerCycle)
    const remaining = v - (fullCycles * totalPerCycle)

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

    return {
      volume: v,
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
    }
  }, [volume, phase1Rate, phase1Hours, phase2Rate, phase2Hours])

  const reset = () => {
    setVolume(10)
    setPhase1Rate('')
    setPhase1Hours('')
    setPhase2Rate('')
    setPhase2Hours('')
  }

  return { inputs, setters, validation, result, reset }
}
