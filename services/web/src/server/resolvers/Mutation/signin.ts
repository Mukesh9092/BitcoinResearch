import { IncomingMessage } from 'http'

interface Args {
  username: String
  password: String
}

interface Context {
  req: IncomingMessage
}

export default async (_parent: any, args: Args, context: any, info: any) => {
  try {
    const { username, password } = args

    console.log('signin')
    console.log('signin:username', username)
    console.log('signin:password', password)
    console.log('signin:headers', context.req.headers)
    console.log('signin:info', info)
  } catch (error) {
    console.error(error)
  }
}
