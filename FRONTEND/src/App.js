// djr/FRONTEND/src/App.js
import React from "react";
import { Route, Switch, Link } from "react-router-dom"

// import Apollo framework query hook
import { useQuery } from '@apollo/react-hooks'; // New
import "./App.css"

// import our queries previously defined
import { MOVIE_QUERY, MOVIE_LIST_QUERY } from "./query" //New

const MainPage = (props) => {
    const { loading, error, data } = useQuery(MOVIE_LIST_QUERY);
    
    // when query starts, loading will be true until the response will back.
    // At this time this will be rendered on screen
    if (loading) return <div>Loading</div>
    
    // if response fail, this will be rendered
    if (error) return <div>Unexpected Error: {error.message}</div>

    //if query succeed, data will be available and render the data
    return(
        <div className="main-page">
            {data && data.movieList &&
                data.movieList.map(movie => (
                    <div className="movie-card" key={movie.slug}>
                        <img 
                            className="movie-card-image"
                            src={movie.posterUrl} 
                            alt={movie.name + " poster"} 
                            title={movie.name + " poster"} 
                        />
                        <p className="movie-card-name">{movie.name}</p>
                        <Link to={`/movie/${movie.slug}`} className="movie-card-link" />
                    </div>
                ))
            }
        </div>
    )
}

const MoviePage = (props) => {
    // uncomment to see which props are passed from router
    //console.log(props)

    // due to we make slug parameter dynamic in route component,
    // urlParameters will look like this { slug: 'slug-of-the-selected-movie' }
    const urlParameters = props.match.params

    const { loading, error, data } = useQuery(MOVIE_QUERY, { 
        variables:{slug:urlParameters.slug}
    });

    if (loading) return <div>Loading</div>
    if (error) return <div>Unexpected Error: {error.message}</div>
  
    return (
        <div className="movie-page">
        <Link to="/" className="back-button" >Main Page</Link>
            {data && data.movie && 
                <div className="movie-page-box">
                    <img 
                        className="movie-page-image"
                        src={data.movie.posterUrl} 
                        alt={data.movie.name + " poster"} 
                        title={data.movie.name + " poster"} 
                    />
                    <div className="movie-page-info">
                        <h1>{data.movie.name}</h1>
                        <p>Year: {data.movie.year}</p>
                        <br />
                        <p>{data.movie.summary}</p>
                    </div>
                </div>
            }

        </div>
    )
}


const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={MainPage} />

                // colon before slug means it is a dynamic value
                // that makes slug parameter anything
                // like: /movie/the-matrix-1999   or /movie/anything
                <Route exact path="/movie/:slug" component={MoviePage} />
            </Switch>
        </div>
    )
}
export default App