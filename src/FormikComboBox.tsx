import { ComboBox, IComboBoxProps } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, getErrorMessage, invokeAll, Omit } from './utils'

export function mapFieldToComboBox<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  IComboBoxProps,
  'selectedKey'  | 'onDismiss' | 'onChange' | 'errorMessage'
> {

  const shared = {
    errorMessage: getErrorMessage({ field, form }),
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

export type FormikComboBoxProps<T> = Omit<IComboBoxProps, 'selectedKey'> &
  FieldProps<T>
export function FormikComboBox<T = any>({
  field,
  form,
  ...props
}: FormikComboBoxProps<T>) {
  const { errorMessage, onDismiss, ...fieldProps } = mapFieldToComboBox({
    field,
    form,
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
