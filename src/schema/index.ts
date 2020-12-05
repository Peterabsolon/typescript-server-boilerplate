import path from 'path'
import { ArrayMaxSize, Length, Max, MaxLength, Min } from 'class-validator'
import {
  Arg,
  Args,
  ArgsType,
  AuthChecker,
  Authorized,
  buildSchemaSync,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'

enum Roles {
  Admin,
}

@ObjectType()
export class Recipe {
  @Field((_type) => ID)
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  creationDate: Date

  @Field((_type) => [String])
  ingredients: string[]
}

class RecipeNotFoundError extends Error {}

interface User {
  name: string
}

@InputType()
class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string

  @Field((_type) => [String])
  @ArrayMaxSize(30)
  ingredients: string[]
}

@ArgsType()
class RecipesArgs {
  @Field((_type) => Int)
  @Min(0)
  skip: number = 0

  @Field((_type) => Int)
  @Min(1)
  @Max(50)
  take: number = 25
}

class RecipeService {
  hello = () => console.log('hello')

  findById = (id: string) => console.log('findById', id)

  findAll = (args: RecipesArgs) => console.log('findAll', args)

  addNew = ({ data, user }: { data: NewRecipeInput; user: User }) => {
    console.log('addNew', data, user)
    return Promise.resolve({ ...data, id: '1', creationDate: new Date() })
  }

  removeById = (id: string) => console.log('removeById', id)
}

@Resolver(Recipe)
class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query((_returns) => Recipe)
  async recipe(@Arg('id') id: string) {
    const recipe = await this.recipeService.findById(id)
    if (recipe === undefined) {
      throw new RecipeNotFoundError(id)
    }
    return recipe
  }

  @Query((_returns) => [Recipe])
  recipes(@Args() { skip, take }: RecipesArgs) {
    return this.recipeService.findAll({ skip, take })
  }

  @Mutation((_returns) => Recipe)
  @Authorized()
  addRecipe(
    @Arg('newRecipeData') newRecipeData: NewRecipeInput,
    @Ctx('user') user: User,
  ): Promise<Recipe> {
    return this.recipeService.addNew({ data: newRecipeData, user })
  }

  @Mutation((_returns) => Boolean)
  @Authorized(Roles.Admin)
  async removeRecipe(@Arg('id') id: string) {
    try {
      await this.recipeService.removeById(id)
      return true
    } catch {
      return false
    }
  }
}

export const customAuthChecker: AuthChecker = ({ root, args, context, info }, roles) => {
  console.log('root', root)
  console.log('args', args)
  console.log('context', context)
  console.log('info', info)
  console.log('roles', roles)

  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  return true // or false if access is denied
}

export const schema = buildSchemaSync({
  resolvers: [RecipeResolver],
  authChecker: customAuthChecker,
  emitSchemaFile: {
    path: path.resolve(__dirname, 'schema.gql'),
    commentDescriptions: true,
  },
})

// import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

// export const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return 'world'
//         },
//       },
//     },
//   }),
// })
