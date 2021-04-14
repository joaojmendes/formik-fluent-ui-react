import { Dropdown, IDropdownProps } from '@fluentui/react';
import { FieldProps } from 'formik'
import * as React from 'react'
import { createFakeEvent, getErrorMessage, invokeAll, Omit } from './utils'

export function mapFieldToDropdown<V extends string | number | string[] | number[] | null, FormValues = any>({
  form,
  field,
  meta
}: FieldProps<V, FormValues>): Pick<
  IDropdownProps,
  'selectedKey' | 'selectedKeys' | 'onDismiss' | 'onChange' | 'errorMessage'
> {
  const multiSelect = Array.isArray(field.value)
  const shared = {
    errorMessage: getErrorMessage({ field, form, meta }),
    onDismiss: () => field.onBlur(createFakeEvent(field)),
  }

  return multiSelect
    ? {
        ...shared,
        selectedKeys: (field.value as string[] | number[]),
        onChange: (_, option) => {
          const value = field.value as any[]

          if (typeof option !== "undefined") {
            if (option.selected) {
              form.setFieldValue(field.name, [...value, option!.key])
            } else {
              const idx = (field.value as any[]).indexOf(option!.key)

              if (idx !== -1) {
                form.setFieldValue(field.name, [
                  ...value.slice(0, idx),
                  ...value.slice(idx + 1),
                ])
              }
            }
          }
        },
      }
    : {
        ...shared,
        selectedKey: (field.value as string | number | null),
        onChange: (_, option) => {
          form.setFieldValue(field.name, option!.key)
        },
      }
}

export type FormikDropdownProps<V, FormValues> = Omit<IDropdownProps, 'selectedKey'> &
  FieldProps<V, FormValues>
export function FormikDropdown<V extends string | number | string[] | number[] | null, FormValues = any>({
  field,
  form,
  meta,
  ...props
}: FormikDropdownProps<V, FormValues>) {
  const { errorMessage, onDismiss, ...fieldProps } = mapFieldToDropdown({
    field,
    form,
    meta
  })

  return (
    <Dropdown
      errorMessage={errorMessage}
      {...props}
      onDismiss={invokeAll(onDismiss, props.onDismiss)}
      {...fieldProps}
    />
  )
}
