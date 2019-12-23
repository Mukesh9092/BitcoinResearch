import next from 'next'

const dev = process.env.NODE_ENV !== 'production'

export const createNextApplication = async () => {
  const nextApplicationOptions = {
    dev,
    dir: './src',
  }

  const nextApplication = next(nextApplicationOptions)

  await nextApplication.prepare()

  return nextApplication
}
