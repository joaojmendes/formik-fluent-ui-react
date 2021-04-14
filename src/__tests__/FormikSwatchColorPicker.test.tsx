// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Form, Formik } from 'formik'
import { IColorCellProps, SwatchColorPicker } from '@fluentui/react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import {
  FormikSwatchColorPicker,
  mapFieldToSwatchColorPicker,
} from '../FormikSwatchColorPicker'
import { noop, serialize } from './utils'

const colors = [
  { id: 'red', label: 'red', color: '#ff0000' },
  { id: 'green', label: 'green', color: '#00ff00' },
  { id: 'blue', label: 'blue', color: '#0000ff' },
]

class Values {
  public color: IColorCellProps | string = colors[0]
}
function createFieldProps(
  value: IColorCellProps | string = colors[0]
): FieldProps<IColorCellProps | string> {
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

test('<FormikSwatchColorPicker /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={new Values()} onSubmit={noop}>
      <Form>
        <Field
          name="color"
          render={(fieldProps: FieldProps<Values>) => (
            <FormikSwatchColorPicker
              {...fieldProps}
              columnCount={3}
              colorCells={[
                { id: '#ff0000', label: 'red', color: '#ff0000' },
                { id: '#00ff00', label: 'green', color: '#00ff00' },
                { id: '#0000ff', label: 'blue', color: '#0000ff' },
              ]}
            />
          )}
        />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikSwatchColorPicker /> renders a Fabric <SwatchColorPicker />', () => {
  const fieldProps = createFieldProps()

  const formikSwatchColorPicker = renderer.create(
    <FormikSwatchColorPicker
      {...fieldProps}
      colorCells={colors}
      columnCount={3}
    />
  )
  const fabricSwatchColorPicker = renderer.create(
    <SwatchColorPicker
      {...mapFieldToSwatchColorPicker(fieldProps)}
      colorCells={colors}
      columnCount={3}
    />
  )
  expect(serialize(formikSwatchColorPicker)).toBe(
    serialize(fabricSwatchColorPicker)
  )
})

test('mapFieldToSwatchColorPicker() maps FieldProps to ISwatchColorPickerProps', () => {
  const { field, form, meta } = createFieldProps()
  const props = mapFieldToSwatchColorPicker({ form, field, meta })

  expect(props.selectedId).toBe((field.value as { id: string, label: string, color: string }).id)

  props.onColorChanged!(colors[1].id, colors[1].color)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, {
    id: colors[1].id,
    color: colors[1].color,
  })

  // onColorChanged also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})

test('mapFieldToSwatchColorPicker() also supports string values', () => {
  const { field, form, meta } = createFieldProps(colors[0].color)
  const props = mapFieldToSwatchColorPicker({ form, field, meta })

  expect(props.selectedId).toBe(field.value)

  props.onColorChanged!(colors[1].id, colors[1].color)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, colors[1].color)

  // onColorChanged also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
