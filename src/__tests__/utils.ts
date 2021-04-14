import renderer from 'react-test-renderer'

export const noop = () => undefined

export const serialize = (component: renderer.ReactTestRenderer) => {
  return component.toJSON()!.toString()
}
