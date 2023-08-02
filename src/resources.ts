import { Context, Effect, Layer } from 'effect'

import { MeasuringCup } from './measuring-cup'

export interface Sugar {
  readonly grams: (amount: number) => Effect.Effect<never, never, string>
}

export const Sugar = Context.Tag<Sugar>()

export const SugarLive = Layer.effect(
  Sugar,
  Effect.map(MeasuringCup, (measuringCup) =>
    Sugar.of({
      grams: (amount) => measuringCup.measure(amount, 'gram'),
    }),
  ),
)

export interface Flour {
  readonly cups: (amount: number) => Effect.Effect<never, never, string>
}

export const Flour = Context.Tag<Flour>()

export const FlourLive = Layer.effect(
  Flour,
  Effect.map(MeasuringCup, (measuringCup) =>
    Flour.of({
      cups: (amount) => measuringCup.measure(amount, 'cup'),
    }),
  ),
)
