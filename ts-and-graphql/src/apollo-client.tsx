import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql', // Adjust this to your GraphQL server URI
  });
 const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
 });
 
 export default client;