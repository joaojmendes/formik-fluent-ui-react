import { IRatingProps, Rating } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToRating<V extends number = number, FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<IRatingProps, 'rating' | 'onChange'> {
  return {
    rating: field.value,
    onChange: (_, value) => {
      form.setFieldValue(field.name, value)
      field.onBlur(createFakeEvent(field))
    },
  }
}

export type FormikRatingProps<V extends number = number, FormValues = any> = Omit<
  IRatingProps,
  'rating' | 'onChange' | 'onBlur'
> &
  FieldProps<V, FormValues>

export function FormikRating<V extends number = number, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikRatingProps<V, FormValues>) {
  return <Rating {...props} {...mapFieldToRating({ field, form, meta })} />
}
