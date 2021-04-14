import { ComboBox, IComboBoxProps } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, getErrorMessage, invokeAll, Omit } from './utils'

export function mapFieldToComboBox<V extends string | number | string[] | number[] | null, FormValues = any>({
  form,
  field,
  meta
}: FieldProps<V, FormValues>): Pick<
  IComboBoxProps,
  'selectedKey'  | 'onDismiss' | 'onChange' | 'errorMessage'
> {

  const shared = {
    errorMessage: getErrorMessage({ field, form, meta }),
    onDismiss: () => field.onBlur(createFakeEvent(field)),
  }

  return   {
      ...shared,
      selectedKey: field.value,
      onChange: (_, option) => {
        form.setFieldValue(field.name, option!.key)
      },
    }
}

export type FormikComboBoxProps<V, FormValues> = Omit<IComboBoxProps, 'selectedKey'> &
  FieldProps<V, FormValues>
export function FormikComboBox<V extends string | number | string[] | number[] | null, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikComboBoxProps<V, FormValues>) {
  const { errorMessage, onDismiss, ...fieldProps } = mapFieldToComboBox({
    field,
    form,
    meta
  })

  return (
    <ComboBox
      errorMessage={errorMessage}
      {...props}
      onDismiss={invokeAll(onDismiss, props.onDismiss)}
      {...fieldProps}
    />
  )
}
