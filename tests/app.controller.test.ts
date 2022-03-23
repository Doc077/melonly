const callController = () => {
  return 'Home page'
}

test('assert app controller response is valid', () => {
  const response = callController()

  expect(response).toMatch(/[A-Za-z]+ page/)
})
