import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({ label, error, helperText, className = '', ...props }: InputProps) {
  const inputClasses = [
    'form-input',
    error ? 'form-error' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && <p className="form-error-text">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-dark-muted">{helperText}</p>
      )}
    </div>
  )
}