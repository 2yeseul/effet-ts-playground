import { Context, Effect, Match } from 'effect'

// eslint-disable-next-line no-console
const program = Effect.sync(() => console.log('hello'))

Effect.runSync(program) // never throws error

// # Creating Effects

const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('Cannot divide by zero')
  }

  return a / b
}

divide(1, 1) // Type Signature만 보면 예외를 발생시키는지 알 수 없음

const divideWithEffect = (
  a: number,
  b: number,
): Effect.Effect<never, Error, number> =>
  b === 0
    ? Effect.fail(new Error('Cannot divide by zero'))
    : Effect.succeed(a / b)

// execute Effect synchronously
// throw an error if Effect fails or performs any async tasks
Effect.runSync(divideWithEffect(1, 1))

// ====================================================================

export interface Random {
  readonly next: () => Effect.Effect<never, number, number>
}

export const Random = Context.Tag<Random>()
// Random 은 서비스를 대신한다. random number를 리턴하는 next라는 함수를 가진다. Random의 Value는 Effect의 "Tag"로 표현할 수 있다.
// Random 이라는 서비스를 대표하고 런타임 시점에 Effect를 위치하게 하고 사용할 수 있도록 한다.

const program2 = Random.pipe(
  Effect.flatMap((random) => random.next()),
  Effect.flatMap((randomNumber) =>
    Effect.log(`random number is ${randomNumber}`),
  ),
)

const runnable = Effect.provideService(
  program2,
  Random,
  Random.of({
    next: () => Effect.succeed(Math.random()),
  }),
)

Effect.runSync(runnable)
