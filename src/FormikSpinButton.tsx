import { ISpinButtonProps, SpinButton } from  '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToSpinButton<V extends string, FormValues = any>(
  { form, field }: FieldProps<V, FormValues>,
  {
    min,
    max,
    onIncrement,
    onDecrement,
    onValidate,
  }: Pick<
    ISpinButtonProps,
    'min' | 'max' | 'onIncrement' | 'onDecrement' | 'onValidate'
  > = {}
): Pick<
  ISpinButtonProps,
  'value' | 'onIncrement' | 'onDecrement' | 'onValidate' | 'onBlur'
> {
  const handleIncrement = (value: string) => {
    const newValue = onIncrement
      ? onIncrement(value)
      : Math.min(typeof max === 'number' ? max : -Infinity, +value + 1)

    form.setFieldValue(field.name, newValue)
    field.onBlur(createFakeEvent(field))

    return `${newValue}`
  }
  const handleDecrement = (value: string) => {
    const newValue = onDecrement
      ? onDecrement(value)
      : Math.max(typeof min === 'number' ? min : Infinity, +value - 1)

    form.setFieldValue(field.name, newValue)
    field.onBlur(createFakeEvent(field))

    return `${newValue}`
  }
  const handleValidate = (value: string) => {
    const newValue = onValidate ? onValidate(value) : +value

    form.setFieldValue(field.name, newValue)

    return `${newValue}`
  }

  return {
    value: field.value.toString(),
    onIncrement: handleIncrement,
    onDecrement: handleDecrement,
    onValidate: handleValidate,
    onBlur: () => field.onBlur(createFakeEvent(field)),
  }
}

export type FormikSpinButtonProps<V extends string, FormValues = any> = Omit<ISpinButtonProps, 'value'> &
  FieldProps<V, FormValues>

export function FormikSpinButton<V extends string, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikSpinButtonProps<V, FormValues>) {
  return (
    <SpinButton {...props} {...mapFieldToSpinButton({ field, form, meta }, props)} />
  )
}
