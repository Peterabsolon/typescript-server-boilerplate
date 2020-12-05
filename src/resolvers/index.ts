/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { GraphQLScalarType } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

import { Resolvers } from '../generated/graphql'

const mockRecipe = {
  id: '1',
  ingredients: [],
  title: 'Foo',
  description: 'Foo desc',
  creationDate: '1234',
}

export const resolvers: Resolvers & { DateTime: GraphQLScalarType } = {
  DateTime: GraphQLDateTime,

  Query: {
    recipe: () => Promise.resolve(mockRecipe),
    recipes: () => Promise.resolve([mockRecipe]),
  },

  Mutation: {
    addRecipe: () => Promise.resolve(mockRecipe),
    removeRecipe: () => Promise.resolve(true),
  },
}
