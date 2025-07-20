import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Textarea({ label, error, helperText, className = '', ...props }: TextareaProps) {
  const textareaClasses = [
    'form-textarea',
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
      <textarea className={textareaClasses} {...props} />
      {error && <p className="form-error-text">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-dark-muted">{helperText}</p>
      )}
    </div>
  )
}