import assert from 'assert'

const testFunction = () => {
  return 2
}

describe('Test suite for the course', () => {
  it('should return 2', () => {
    assert.equal(testFunction(), 2)
  })
})