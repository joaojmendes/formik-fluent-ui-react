import { DatePicker, IDatePickerProps } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, invokeAll, Omit } from './utils'

export function mapFieldToDatePicker<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  IDatePickerProps,
  'value' | 'onSelectDate' | 'onAfterMenuDismiss'
> {
  return {
    value: field.value,
    onAfterMenuDismiss: () => field.onBlur(createFakeEvent(field)),
    onSelectDate: date => form.setFieldValue(field.name, date),
  }
}
export type FormikDatePickerProps<T = any> = Omit<
  IDatePickerProps,
  'value' | 'onSelectDate' | 'onBlur' | 'onChange'
> &
  FieldProps<T>

export function FormikDatePicker<T = any>({
  field,
  form,
  ...props
}: FormikDatePickerProps<T>) {
  const { onAfterMenuDismiss, ...fieldProps } = mapFieldToDatePicker({
    field,
    form,
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
