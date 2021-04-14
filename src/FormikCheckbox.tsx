import { FieldProps } from 'formik'
import { Checkbox, ICheckboxProps } from '@fluentui/react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToCheckbox<V extends boolean, FormValues = any>({
  form,
  field: { value, onChange, onBlur, checked, ...field },
}: FieldProps<V, FormValues>): Pick<ICheckboxProps, 'checked' | 'name' | 'onChange'> {
  return {
    ...field,
    onChange: (_, checked) => {
      form.setFieldValue(field.name, checked)
      onBlur(createFakeEvent(field))
    },
    checked: value,
  }
}

export type FormikCheckboxProps<V extends boolean, FormValues = any> = Omit<
  ICheckboxProps,
  'checked' | 'name' | 'onChange'
> &
  FieldProps<V, FormValues>

export function FormikCheckbox<V extends boolean, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikCheckboxProps<V, FormValues>) {
  return <Checkbox {...props} {...mapFieldToCheckbox({ field, form, meta })} />
}
