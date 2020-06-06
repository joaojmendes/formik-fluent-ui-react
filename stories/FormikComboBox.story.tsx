// tslint:disable:jsx-no-lambda

import { IComboBoxOption } from '@fluentui/react'
import { Field, FieldProps, Formik } from 'formik'
import * as React from 'react'
import { FormikComboBox } from '../src/FormikComboBox'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public single: string = ''
  public multi: string[] = ['bar']
}

const options: IComboBoxOption[] = [
  { key: '', text: '' },
  { key: 'foo', text: 'Foo' },
  { key: 'bar', text: 'Bar' },
  { key: 'qux', text: 'Qux' },
  { key: 'gorge', text: 'Gorge' },
]

const validate = (values: any) => {
  const errors: any = {}

  if (!values.single) {
    errors.single = 'required'
  }
}

export const FormikComboBoxStory = () => (
  <Formik
    initialValues={new Values()}
    onSubmit={handleSubmit}
    validate={validate}>
    <StoryForm title="ComboBox">
      <Field
        name="single"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikComboBox
            label="Single"
            required={true}
            {...fieldProps}
            options={options}
          />
        )}
      />
    </StoryForm>
  </Formik>
)
