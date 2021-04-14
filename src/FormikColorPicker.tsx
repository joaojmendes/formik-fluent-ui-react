import { ColorPicker, IColor, IColorPickerProps } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToColorPicker<V extends IColor | string = string, FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<IColorPickerProps, 'color' | 'onChange'> {
  return {
    color: field.value,
    onChange: (_, color) => {
      form.setFieldValue(field.name, color.hex),
        field.onBlur(createFakeEvent(field))
    },
  }
}
export type FormikColorPickerProps<V extends IColor | string = string, FormValues = any> = Omit<
  IColorPickerProps,
  'color' | 'onChange'
> &
  FieldProps<V, FormValues>

export function FormikColorPicker<V extends IColor | string = string, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikColorPickerProps<V, FormValues>) {
  return (
    <ColorPicker
      {...props}
      {...mapFieldToColorPicker({
        field,
        form,
        meta
      })}
    />
  )
}
