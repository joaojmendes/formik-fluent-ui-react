import { ISliderProps, Slider } from  '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToSlider<V extends number = number, FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<ISliderProps, 'value' | 'onChange' | 'onChanged'> {
  return {
    value: field.value,
    onChange: value => {
      form.setFieldValue(field.name, value)
    },
    onChanged: () => field.onBlur(createFakeEvent(field)),
  }
}

export type FormikSliderProps<V extends number = number, FormValues = any> = Omit<
  ISliderProps,
  'value' | 'onChange' | 'onChanged'
> &
  FieldProps<V, FormValues>

export function FormikSlider<V extends number = number, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikSliderProps<V, FormValues>) {
  return <Slider {...props} {...mapFieldToSlider({ field, form, meta })} />
}
