// ~/Blog/djr/FRONTEND/src/query.js

//import our graph query parser
import gql from "graphql-tag";

// our first query will requests all movies
// with only given fields
// note the usage of gql with jsvascript string literal
export const MOVIE_LIST_QUERY = gql`
    query movieList{
        movieList{
            name, posterUrl, slug
        }
    }
`
// Note the usage of argument.
// the exclamation mark makes the slug argument as required
// without it , argument will be optional
export const MOVIE_QUERY = gql`
    query movie($slug:String!){
        movie(slug:$slug){
            id, name, year, summary, posterUrl, slug
        }
    }
`