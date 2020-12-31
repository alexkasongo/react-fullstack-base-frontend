import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange, ssrExchange } from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  // ...add your Client options here
  url: "http://localhost:4444/graphql" as string,
  fetchOptions: {
    credentials: "include" as const,
  },
  // Run everytime a LOGIN or REGISTER mutaion query is run and UPDATE the CACHE,
  // Specifically the "me" query by sticking a user in there
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          // Logout
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          // Login
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
        // Subscription: {
        //   newTodo: (result, args, cache, info) => {
        //     // ...
        //   },
        // },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
