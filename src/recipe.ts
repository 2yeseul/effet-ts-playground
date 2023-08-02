import { Context, Effect, Layer } from 'effect'

import { Flour, Sugar } from './resources'

export interface Recipe {
  readonly steps: Effect.Effect<never, never, ReadonlyArray<string>>
}

export const Recipe = Context.Tag<Recipe>()

export const RecipeLive = Layer.effect(
  Recipe,
  Effect.all([Sugar, Flour]).pipe(
    Effect.map(([sugar, flour]) =>
      Recipe.of({
        steps: Effect.all([sugar.grams(200), flour.cups(1)]),
      }),
    ),
  ),
)
