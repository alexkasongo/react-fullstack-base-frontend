1. yarn add urql graphql to make graphql requests to our graphql client
2. yarn add -D @graphql-codegen/cli
3. yarn graphql-codegen init
4. yarn add -D @graphql-codegen/typescript-urql
5. yarn add @urql/exchange-graphcache
6. yarn add next-urql react-is isomorphic-unfetch // setup server-side rendering

Mental map of what is happening

me -> browser http://localhost:3000
-> next.js server
-> request graphql server locahost:4444
-> building the HTML
-> sending back to your browser

Note that the initial page nextjs loads server side renders, after that it does not load any server side code
