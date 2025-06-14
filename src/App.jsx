import React, { useEffect, useState } from 'react'
import './App.css'

 const API_URL=`http://www.omdbapi.com/?i=tt3896198&apikey=3f1501f9`;
export default function App() {
  const [movies,setMovies]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');

  const searchMovies=async (title)=>{
    const res=await fetch(`${API_URL}&s=${title}`);
    const data=await res.json();
    setMovies(data.Search||[]);
  }
  
  useEffect(()=>{
    searchMovies('Batman');
   },[]);

  return (
    <div className='container'>
       <div className='search-box'>
          <h1>🎬 Movie Search App</h1>
          <input 
           type="text"
           placeholder="Search for movies" 
           value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
         />
       
      
       <button onClick={()=>searchMovies(searchTerm)}>Search</button>
      </div>
      
      <div className='movies-list'>
        {
          movies.length>0 ? (
             movies.map((movie)=>(
                <div className='movie-card' key={movie.imdbID}>
                   <img src={movie.Poster!=='N/A'?movie.Poster:'https://via.placeholder.com/150'} alt={movie.Title}/>
                   <h3>{movie.Title}</h3>
                   <p>{movie.Year}</p>
                </div>
             ))
          ):(
             <h2>No movies found</h2>
          )
        }
      </div>

    </div>

  )
}
