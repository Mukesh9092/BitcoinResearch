import * as React from 'react'
import ReactSelect from 'react-select'

export interface ISelectOption {
  label: string
  value: string
}

export interface ISelectComponentProps {
  className: string
  disabled: boolean
  onChange: Function
  options: ISelectOption[]
  placeholder: string
  value: ISelectOption
}

export const SelectComponent = (props: ISelectComponentProps) => {
  return (
    <ReactSelect {...props} />
  )
}

export const Select = SelectComponent
