import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
import { applyMiddleware } from "graphql-middleware";

const { json } = pkg;
import {buildSchema} from 'type-graphql';
import { TodoResolver } from "./resolvers/Todo";

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const main =async () => {
  const schema = await buildSchema({resolvers:[
    TodoResolver
  ]})
    const server = new ApolloServer<MyContext>({
        schema: applyMiddleware(schema),
          plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        
        
        await server.start();
        app.use(
          '/graphql',
          cors<cors.CorsRequest>(),
          json(),
          expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
          }),
        );
        
        await new Promise<void>((resolve) => httpServer.listen({ port: 8000 }, resolve));
}

main().catch((error)=> {
  console.log('Error on applicatiuon starting', error);
  
}).finally(()=> {
  console.log('Server started successfully at', 'http://localhost:8000/graphql');
  
})