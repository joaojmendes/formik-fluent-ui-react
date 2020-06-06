

# formik-fluent-ui-react

> 💉 Instant pain reliever for using Formik with Fluent-UI React 💉

## Why?

To reduce the boilerplate code needed to get [Fluent UI input components](https://developer.microsoft.com/en-us/fabric#/components) work seamlessly with Formiks [field props](https://jaredpalmer.com/formik/docs/api/field) and validation errors.

## How?

1. Install package

```bash
yarn add formik-Fluent-UI-react
# or
npm install --save formik-fluent-ui-react
```

2. Replace `FooComponent` with `FormikFooComponent` or use the `mapFieldToFooComponent`, i.e

```tsx
import { Formik, Form, Field } from 'formik'
import { DatePicker } from 'office-ui-fabric-react'
import { FormikDatePicker, mapFieldToDatePicker } from 'formik-fluent-ui-react'

const OldAndUgly = () => (
  <Formik initialValues={{ date: new Date() }}>
    <Form>
      <Field
        name="date"
        render={fieldProps => (
          <DatePicker
            value={/* wrapper code for fieldProps.value */}
            onSelectDate={/* wrapper code for fieldProps.onChange */}
            {/* and more ugly wrapper code trying to get name, onBlur, etc. working */}
          />
        )}
      />
    </Form>
  </Formik>
)

// using the component
const NewAndPretty = () => (
  <Formik initialValues={{ date: new Date() }}>
    <Form>
      <Field name="date" component={FormikDatePicker} />
    </Form>
  </Formik>
)

// or using the map function
const NewAndAlsoPretty = () => (
  <Formik initialValues={{ date: new Date() }}>
    <Form>
      <Field name="date" render={fieldProps => (
        <DatePicker {...mapFieldToDatePicker(fieldProps)} />
      )} />
    </Form>
  </Formik>
)
```

## Development

###

```
git clone https://github.com/joaojmendes/formik-fluent-ui-react
cd formik-fluent-ui-react && npm install | yarn install
```

### Running development server

```
yarn start
```

### Running tests

```
yarn test
```
