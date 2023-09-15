

import { Resolver, Mutation, Arg, Ctx, Args, ArgsType, Field, Query, PubSub, PubSubEngine } from 'type-graphql';




@Resolver()
export class TodoResolver {
  @Mutation(() => String, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    // @Ctx() ctx: MyContext,
  ): Promise<String | null> {
    return ''
  }

@Query(()=> String)
async hi(

): Promise<String> {
  return 'hello'
}









}

