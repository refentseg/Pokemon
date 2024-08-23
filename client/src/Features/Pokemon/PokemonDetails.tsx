import { useEffect, useState } from "react";
import { Pokemon } from "../../models/Pokemon";
import { useNavigate, useParams } from "react-router-dom";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip } from "recharts";

export default function PokemonDetails() {
    
    const [pokemon,setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) {
                    throw new Error('Pokémon not found');
                }
                const data = await response.json();
                setPokemon(data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    const radarData = pokemon?.stats.map((stat) => ({
        name: stat.stat.name.replace('-', ' ').toUpperCase(), // Example: 'special-attack' -> 'SPECIAL ATTACK'
        value: stat.base_stat,
    }));

    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
  return (
    <div className="container">
          <div className="text-3xl text-bold mb-2">
                <h1>{pokemon!.name.charAt(0).toUpperCase() + pokemon!.name.slice(1)}</h1>
        </div>
    <div className="flex flex-col md:flex-row">
      
        {/* Details of Pokemon  */}
    <div className="flex flex-col w-1/2 mt-4"> 
        <div>
        <img
            src={pokemon!.sprites.front_default}
            alt={pokemon!.name}
            className="w-60 h-60"
        />
        </div>
      <div className="text-left space-y-4 text-lg">
      <p><strong>Height:</strong> {pokemon!.height}</p>
      <p><strong>Weight:</strong> {pokemon!.weight}</p>
      <p><strong>Types:</strong> {pokemon!.types.map(type => type.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> {pokemon!.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <p><strong>Base Experience:</strong> {pokemon!.base_experience}</p>
      </div>
      
    </div>

        {/* Agilities of Pokemon */}
        <div className="w-1/2">
        <RadarChart cx={200} cy={250} outerRadius={150} width={600} height={500} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} /> {/* Domain can be adjusted based on max stat value */}
                <Radar name="" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
        </RadarChart>
        </div>

        
        
    </div>
    <button onClick={() => {navigate('/')}} className="bg-black p-4 text-white rounded w-40 mt-10">Go Back</button>
    </div>
  )
}
