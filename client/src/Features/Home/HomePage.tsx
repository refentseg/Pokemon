import React, { useEffect, useState } from 'react'
import PokemonCard from '../../Component/PokemonCard';
import { Pokemon } from '../../models/Pokemon';

  interface PokeAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }

export default function HomePage() {
    const [data, setData] = useState<Pokemon[] | null>(null);
    const [filteredData, setFilteredData] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  const fetchPokemon = async () => {
    try {
    setIsLoading(true);
      const response = await fetch(`${baseUrl}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: PokeAPIResponse = await response.json();
      setData(data.results);
      setFilteredData(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  
  useEffect(() => {
    setIsLoading(true)
    const filtered = data?.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered || []);
    setIsLoading(false)
  }, [searchTerm, data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
      
    return (
      <>
      <input placeholder='Search...' className='border-2 p-4 mb-4 w-[400px] border-neutral-600' value={searchTerm} onChange={handleSearchChange}/>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {isLoading ? (
                <p>Loading...</p>
                ) : (
                    filteredData && filteredData.length > 0 ? (
                    filteredData.map((pokemon, index) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
                    ))
                ) : (
                    <p>No Pokemon found</p>
                )
            )}
        </div>
      </>
    )
}
