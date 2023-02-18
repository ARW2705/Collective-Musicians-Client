import React, { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react'

import { ValidationError, ValidatorFn, TouchStatus } from '../../models/interfaces'
import { validate } from '../../shared/validation/validation'

import './Input.css'


export interface InputProps {
  name: string
  type: string
  onChange: (name: string, value: string | number, errors: ValidationError<string | number>) => void
  initialValue?: string | number,
  validators?: ValidatorFn<string | number>[]
  customClass?: string
  label?: string
  ariaLabel?: string
  min?: number
  max?: number
  reset?: boolean
}

function InputComponent({ initialValue = '', name, type, onChange: handleOnChange, validators = [], customClass = '', label, ariaLabel, min, max, reset = false }: InputProps): JSX.Element {
  const [ value, setValue ] = useState<string | number>(initialValue)
  const [ touchStatus, setTouchStatus ] = useState<TouchStatus>({
    focus: false,
    touched: !!value,
    pristine: !value
  })
  const [ errorState, setErrorState ] = useState<{ errors: ValidationError<string | number>, show: boolean }>({
    errors: {},
    show: false
  })
  const [ placeholderClass, setPlaceholderClass ] = useState<string>('default')
  const onInit = useRef<boolean>(true)

  useEffect(() => {
    if (onInit.current) {
      onInit.current = false
      return
    }

    setValue(initialValue)
    setErrorState({ errors: {}, show: false })
  }, [reset, initialValue])

  useEffect(() => {
    setErrorState(prevProps => ({ ...prevProps, show: !!Object.keys(prevProps.errors).length }))
  }, [touchStatus.touched])

  useEffect(() => {
    const { touched, focus, pristine } = touchStatus
    const isEmpty = touched && !focus && (value === null || value === undefined || value === '')
    setPlaceholderClass(pristine || isEmpty ? 'default' : 'aside')
  }, [touchStatus, value])

  useEffect(() => {
    if (type === 'number' && typeof value === 'string') {
      const numVal: number = parseFloat(value)
      setValue(isNaN(numVal) ? 0 : numVal)
    } else if (type === 'text' && typeof value === 'number') {
      setValue(value.toString())
    }
  }, [type, value])

  const checkValidity = (name: string, rawValue: string) => {
    const value = type === 'number' ? parseFloat(rawValue) : rawValue
    const errors = validate(value, validators)
    setErrorState({ errors, show: touchStatus.touched && !!Object.keys(errors).length })
    setValue(value)
    handleOnChange(name, value, errors)
  }

  const onChange = (event: ChangeEvent): void => {
    const { name, value } = event.target as HTMLInputElement
    checkValidity(name, value)
  }

  const onBlur = (event: FocusEvent): void => {
    const { name, value } = event.target as HTMLInputElement
    checkValidity(name, value)
    setTouchStatus({ ...touchStatus, touched: true, focus: false })
  }

  const onFocus = (): void => {
    setTouchStatus({ ...touchStatus, pristine: false, focus: true })
  }

  const htmlId = `input-${name}`

  return (
    <div className={ `input-container ${customClass}` }>
      <label
        className={ `input placeholder-${placeholderClass}` }
        htmlFor={ htmlId }
      >
        { label }
      </label>
      <input
        id={ htmlId }
        name={ name }
        type={ type }
        value={ value }
        min={ min }
        max={ max }
        onChange={ onChange }
        onFocus={ onFocus }
        onBlur={ onBlur }
        autoComplete='off'
      />
    </div>
  )
}


export default InputComponent
