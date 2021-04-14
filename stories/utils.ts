import { action } from '@storybook/addon-actions'
import { FormikHelpers } from 'formik'

export function handleSubmit<T>(
  values: T,
  { setSubmitting }: FormikHelpers<T>
) {
  action('submit:start')(values)
  setTimeout(() => {
    setSubmitting(false)
    action('submit:done')()
  }, 2000)
}
