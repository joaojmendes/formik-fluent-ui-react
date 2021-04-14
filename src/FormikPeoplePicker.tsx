import {
  CompactPeoplePicker,
  IPeoplePickerProps,
  IPersonaProps,
  ListPeoplePicker,
  NormalPeoplePicker,
} from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToPeoplePicker<V extends IPersonaProps[] = IPersonaProps[], FormValues = any>({
  form,
  field,
}: FieldProps<V, FormValues>): Pick<
  IPeoplePickerProps,
  'selectedItems' | 'onChange' | 'onBlur'
> {
  return {
    selectedItems: field.value,
    onBlur: () => field.onBlur(createFakeEvent(field)),
    onChange: items => form.setFieldValue(field.name, items),
  }
}
export type FormikPeoplePickerProps<V extends IPersonaProps[] = IPersonaProps[], FormValues = any> = Omit<
  IPeoplePickerProps,
  'selectedItems' | 'onBlur' | 'onChange'
> &
  FieldProps<V, FormValues>

export function FormikNormalPeoplePicker<V extends IPersonaProps[] = IPersonaProps[], FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikPeoplePickerProps<V, FormValues>) {
  return (
    <NormalPeoplePicker
      {...props}
      {...mapFieldToPeoplePicker({
        field,
        form,
        meta
      })}
    />
  )
}

export function FormikCompactPeoplePicker<V extends IPersonaProps[] = IPersonaProps[], FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikPeoplePickerProps<V, FormValues>) {
  return (
    <CompactPeoplePicker
      {...props}
      {...mapFieldToPeoplePicker({
        field,
        form,
        meta
      })}
    />
  )
}

export function FormikListPeoplePicker<V extends IPersonaProps[] = IPersonaProps[], FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikPeoplePickerProps<V, FormValues>) {
  return (
    <ListPeoplePicker
      {...props}
      {...mapFieldToPeoplePicker({
        field,
        form,
        meta
      })}
    />
  )
}
