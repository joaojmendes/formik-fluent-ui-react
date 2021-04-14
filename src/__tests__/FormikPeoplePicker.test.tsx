// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Form, Formik } from 'formik'
import {
  CompactPeoplePicker,
  IPersonaProps,
  ListPeoplePicker,
  NormalPeoplePicker,
  setIconOptions,
} from '@fluentui/react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import {
  FormikCompactPeoplePicker,
  FormikListPeoplePicker,
  FormikNormalPeoplePicker,
  mapFieldToPeoplePicker,
} from '../FormikPeoplePicker'
import { noop, serialize } from './utils'

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

const personas = [
  { text: 'Foo Bar', secondaryText: 'foo@bar.com' },
  { text: 'Jane Doe', secondaryText: 'jane@doe.com' },
  { text: 'John Doe', secondaryText: 'john@doe.com' },
]
const handleResolveSuggestions = (filter: string): IPersonaProps[] =>
  personas.filter(x => x.text !== filter && x.secondaryText !== filter)

class Values {
  public people: IPersonaProps[] = [personas[0]]
}

function createFieldProps(
  value: IPersonaProps[] = [personas[0]]
): FieldProps<IPersonaProps[]> {
  return {
    field: {
      value,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'people',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

;[
  [FormikNormalPeoplePicker, NormalPeoplePicker],
  [FormikCompactPeoplePicker, CompactPeoplePicker],
  [FormikListPeoplePicker, ListPeoplePicker],
].forEach(([FormikPeoplePicker, PeoplePicker]: any[]) => {
  test(`<${
    FormikPeoplePicker.name
  } /> renders correctly as a field component`, () => {
    const component = renderer.create(
      <Formik initialValues={new Values()} onSubmit={noop}>
        <Form>
          <Field
            name="people"
            render={(fieldProps: FieldProps<any>) => (
              <FormikPeoplePicker
                {...fieldProps}
                onResolveSuggestions={handleResolveSuggestions}
              />
            )}
          />
        </Form>
      </Formik>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  test(`<${FormikPeoplePicker.name} /> renders a Fabric <${
    PeoplePicker.name
  } />`, () => {
    const fieldProps = createFieldProps()

    const formikPeoplePicker = renderer.create(
      <FormikPeoplePicker
        {...fieldProps}
        onResolveSuggestions={handleResolveSuggestions}
      />
    )
    const fabricPeoplePicker = renderer.create(
      <PeoplePicker
        {...mapFieldToPeoplePicker(fieldProps)}
        onResolveSuggestions={handleResolveSuggestions}
      />
    )
    expect(serialize(formikPeoplePicker)).toBe(serialize(fabricPeoplePicker))
  })
})

test('mapFieldToPeoplePicker() maps FieldProps to IPeoplePickerProps', () => {
  const { field, form, meta } = createFieldProps()
  const props = mapFieldToPeoplePicker({ form, field, meta })

  expect(props.selectedItems).toBe(field.value)

  props.onChange!(personas.slice(0, 2))

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(
    field.name,
    personas.slice(0, 2)
  )

  props.onBlur!(null as any)

  expect(field.onBlur).toHaveBeenCalled()
})
