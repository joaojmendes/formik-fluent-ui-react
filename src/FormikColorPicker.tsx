import { ColorPicker, IColorPickerProps } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToColorPicker<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<IColorPickerProps, 'color' | 'onChange'> {
  return {
    color: field.value,
    onChange: (ev, color) => {
      ev.preventDefault();
      form.setFieldValue(field.name, color),
        field.onBlur(createFakeEvent(field))
    },
  }
}
export type FormikColorPickerProps<T = any> = Omit<
  IColorPickerProps,
  'color' | 'onChange'
> &
  FieldProps<T>

export function FormikColorPicker<T = any>({
  field,
  form,
  ...props
}: FormikColorPickerProps<T>) {
  return (
    <ColorPicker
      {...props}
      {...mapFieldToColorPicker({
        field,
        form,
      })}
    />
  )
}
