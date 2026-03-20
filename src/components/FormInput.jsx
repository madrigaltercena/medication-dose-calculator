import './FormInput.css'

export function FormInput({
  id,
  label,
  type = 'number',
  step,
  min,
  value,
  onChange,
  placeholder,
  error,
  defaultValue,
  required,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {required && <span className="required" aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        step={step}
        min={min}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
        className={error ? 'input-error' : ''}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
