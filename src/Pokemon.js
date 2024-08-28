import {useEffect, useState} from 'react'
import "./index.css";
import { PokemonCards } from './PokemonCards';

const Pokemon = () => {
  const [pokemon,setPokemon]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [search,setSearch]=useState("");
    const API="https://pokeapi.co/api/v2/pokemon?limit=250";
    const fetchPokemon=async()=>{
        try{
              const res=await fetch(API);
              const data=await res.json();
              console.log(data)

              const detaileddata=data.results.map(async(currpokemon)=>{
                // console.log(currpokemon.url);

                //by calling we called 1032 apis of pokemon
                const res=await fetch(currpokemon.url); 
                //await method are called with async funcion
                const data=await res.json();
                // console.log(data)
                return data;
              })
              // console.log(detaileddata)
              const detailedresponse=await Promise.all(detaileddata)
              console.log(detailedresponse)
              setPokemon(detailedresponse)
              setLoading(false)
        }
        catch(error){
            console.log(error)
            setLoading(false);
            setError(error);

        }
    };
    useEffect(()=>{
        fetchPokemon();
    },[]);
    const searchData=pokemon.filter((curpokemon)=>{
      return (curpokemon.name.toLowerCase().includes(search.toLowerCase()))
    });

    if(loading){
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    if(error){
      return (
        <div>
          <h1>{error.message}</h1>
        </div>
      )
    }
    
  return (
    <div>
      <section className='container'>
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className='pokemon-search'>
          <input type="text" placeholder='search Pokemon' value={search}
          onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div>
          <ul className='cards'>
            {
              searchData.map((currpokemon)=>{
                // return <li key={currpokemon.id}>{currpokemon.name}</li>
                return (
                    <PokemonCards key={currpokemon.id} pokemonData={currpokemon}/>
                );
              })
            }
          </ul>
        </div>

      </section>
    </div>
    
  );
};


// import React from 'react'

// const pokemon = () => {
//   return (
//     <div>
//       <h2>Go Ash Ketchum</h2>
//     </div>
//   )
// }

export default Pokemon
// import React from 'react'

// function pokemon() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default pokemon

