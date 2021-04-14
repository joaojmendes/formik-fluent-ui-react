import { IToggleProps, Toggle } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToToggle<V extends boolean, FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<IToggleProps, 'checked' | 'onChange'> {
  return {
    onChange: (_, checked) => {
      form.setFieldValue(field.name, checked)
      field.onBlur(createFakeEvent(field))
    },
    checked: field.value,
  }
}

export type FormikToggleProps<V = any, FormValues = any> = Omit<
  IToggleProps,
  'checked' | 'onChange' | 'onBlur'
> &
  FieldProps<V, FormValues>

export function FormikToggle<V extends boolean, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikToggleProps<V, FormValues>) {
  return <Toggle {...props} {...mapFieldToToggle({ field, form, meta })} />
}
