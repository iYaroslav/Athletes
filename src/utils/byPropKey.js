export default (propertyName, value) => () => ({
  [propertyName]: value,
})
