import {
  ISwatchColorPickerProps,
  SwatchColorPicker,
} from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToSwatchColorPicker<V extends string | object, FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<
  ISwatchColorPickerProps,
  'selectedId' | 'onColorChanged'
> {
  const value = field.value;
  const valueType = typeof value;
  let selectedId = valueType === "string" ? (value as string) : valueType === "object" ? (value as {id?:string})?.id : undefined;

  return {
    selectedId,
    onColorChanged: (id, color) => {
      form.setFieldValue(
        field.name,
        valueType === 'string' ? color : { id, color }
      )
      field.onBlur(createFakeEvent(field))
    },
  }
}
export type FormikSwatchColorPickerProps<V extends string | object, FormValues = any> = Omit<
  ISwatchColorPickerProps,
  'selectedId' | 'onColorChanged'
> &
  FieldProps<V, FormValues>

export function FormikSwatchColorPicker<V extends string | object, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikSwatchColorPickerProps<V, FormValues>) {
  return (
    <SwatchColorPicker
      {...props}
      {...mapFieldToSwatchColorPicker({
        field,
        form,
        meta
      })}
    />
  )
}
