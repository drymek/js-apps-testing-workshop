const checkExam = dateProvider => {
  const hour = dateProvider().getHours()

  if (hour > 8) {
    throw new Error('The exam is over!')
  }
}

const examCalculator = (dateProvider) => ({
  sum: (a, b) => {
    checkExam(dateProvider)
    return a + b
  },
})


// 👉 TODO: What's wrong with this test?
// How can you make it pass regardless of date and time?
// 💡 Note: does this help? https://github.com/facebook/jest/issues/2234

describe.skip('examCalculator (final)', () => {
  it(`should sum when it's before 9:00`, () => {
    // given
    const a = 1
    const b = 3
    const date = new Date()
    date.setHours(6)
    const dateProvider = () => date

    // when
    const sum = examCalculator(dateProvider).sum(a, b)

    // then
    expect(sum).toEqual(4)
  })

  it(`should throw error when it's after 9:00`, () => {
    // given
    const date = new Date()
    date.setHours(9)
    const dateProvider = () => date

    // when
    const suming = () => examCalculator(dateProvider).sum(1, 1)

    // then
    expect(suming).toThrow('The exam is over!')
  })
})
