import { Context, Effect, Layer } from 'effect'

// 1. MeasuringCup 서비스에 대한 정의
export interface MeasuringCup {
  readonly measure: (
    amount: number,
    unit: string,
  ) => Effect.Effect<never, never, string>
}

// 2. MeasuringCup 서비스에 대한 태그 생성
export const MeasuringCup = Context.Tag<MeasuringCup>()

export const MeasuringCupLive = Layer.succeed(
  MeasuringCup,
  MeasuringCup.of({
    measure: (amount, unit) => Effect.succeed(`Measured ${amount} ${unit}(s)`),
  }),
)
