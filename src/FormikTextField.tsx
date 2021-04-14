import {
  ITextFieldProps,
  MaskedTextField,
  TextField,
} from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { getErrorMessage, Omit } from './utils'

export function mapFieldToTextField<V extends string = string, FormValues = any>({
  form,
  field,
  meta,
}: FieldProps<V, FormValues>): Pick<
  ITextFieldProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'errorMessage' | 'form'
> {
  return {
    ...field,
    errorMessage: getErrorMessage({ form, field, meta }),
  }
}

export function mapFieldToMaskedTextField<V extends string, FormValues = any>({
  form,
  field,
  meta,
}: FieldProps<V, FormValues>): Pick<
  ITextFieldProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'errorMessage' | 'form'
> {
  return {
    ...mapFieldToTextField({ form, field, meta }),
    // ev hsa wrong balue for MaskedTextField
    onChange: (_, value) => form.setFieldValue(field.name, value),
  }
}

export type FormikTextFieldProps<V extends string, FormValues = any> = Omit<
  ITextFieldProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'form'
> &
  FieldProps<V, FormValues>

export function FormikTextField<V extends string, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikTextFieldProps<V, FormValues>) {
  const { errorMessage, ...fieldProps } = mapFieldToTextField({ field, form, meta })

  return (
    <TextField
      errorMessage={errorMessage} // allow for prop overwrite
      {...props}
      {...fieldProps}
    />
  )
}

export function FormikMaskedTextField<V extends string, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikTextFieldProps<V, FormValues>) {
  const { errorMessage, ...fieldProps } = mapFieldToMaskedTextField({
    field,
    form,
    meta,
  })

  return (
    <MaskedTextField
      errorMessage={errorMessage} // allow for prop overwrite
      {...props}
      {...fieldProps}
    />
  )
}
