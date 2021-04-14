import { DatePicker, IDatePickerProps } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, invokeAll, Omit } from './utils'

export function mapFieldToDatePicker<V extends Date = Date, FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<
  IDatePickerProps,
  'value' | 'onSelectDate' | 'onAfterMenuDismiss'
> {
  return {
    value: field.value,
    onAfterMenuDismiss: () => field.onBlur(createFakeEvent(field)),
    onSelectDate: date => form.setFieldValue(field.name, date),
  }
}
export type FormikDatePickerProps<V extends Date = Date, FormValues = any> = Omit<
  IDatePickerProps,
  'value' | 'onSelectDate' | 'onBlur' | 'onChange'
> &
  FieldProps<V, FormValues>

export function FormikDatePicker<V extends Date = Date, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikDatePickerProps<V, FormValues>) {
  const { onAfterMenuDismiss, ...fieldProps } = mapFieldToDatePicker({
    field,
    form,
    meta,
  })

  return (
    <DatePicker
      {...props}
      onAfterMenuDismiss={invokeAll(
        onAfterMenuDismiss,
        props.onAfterMenuDismiss
      )}
      {...fieldProps}
    />
  )
}
