import { ChoiceGroup, IChoiceGroupProps } from '@fluentui/react'
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToChoiceGroup<V extends string | number, FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<
  IChoiceGroupProps,
  'selectedKey' | 'onChange' | 'name'
> {
  return {
    name: field.name,
    selectedKey: field.value,
    onChange: (_, option) => {
      form.setFieldValue(field.name, option ? option!.key : null)
      field.onBlur(createFakeEvent(field))
    },
  }
}

export type FormikChoiceGroupProps<V extends string | number, FormValues = any> = Omit<
  IChoiceGroupProps,
  'selectedKey' | 'name' | 'onChange' | 'onBlur' | 'form'
> &
  FieldProps<V, FormValues>

export function FormikChoiceGroup<V extends string | number, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikChoiceGroupProps<V, FormValues>) {
  return <ChoiceGroup {...props} {...mapFieldToChoiceGroup({ field, form, meta })} />
}
