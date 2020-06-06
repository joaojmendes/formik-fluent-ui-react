import { Field, FieldProps, Form, Formik } from 'formik'
import { ColorPicker } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikColorPicker, mapFieldToColorPicker } from '../FormikColorPicker'
import { noop, serialize } from './utils'

class Values {
  public color: string = '#000000'
}

function createFieldProps(value: string = '#000000'): FieldProps<Values> {
  return {
    field: {
      value,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'color',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

test('<FormikColorPicker /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={new Values()} onSubmit={noop}>
      <Form>
        <Field name="color" component={FormikColorPicker} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikColorPicker /> renders a Fabric <ColorPicker />', () => {
  const fieldProps = createFieldProps()

  const formikColorPicker = renderer.create(
    <FormikColorPicker {...fieldProps} />
  )
  const fabricColorPicker = renderer.create(
    <ColorPicker {...mapFieldToColorPicker(fieldProps)} />
  )
  expect(serialize(formikColorPicker)).toBe(serialize(fabricColorPicker))
})

test('mapFieldToColorPicker() maps FieldProps to IColorPickerProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToColorPicker({ form, field })

  expect(props.color).toBe(field.value)



  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, '#ffffff')

  // onColorChanged also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
