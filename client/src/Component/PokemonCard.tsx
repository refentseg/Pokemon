import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
    name: string;
    url: string;
  }

export default function PokemonCard({name,url}:PokemonCardProps){
    const id = url.split('/').filter(Boolean).pop();

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const navigate = useNavigate();

    function handleClick(){
        navigate(`pokemon/${id}`)
    }

    return(
        <>
        <div className="card bg-white group cursor-pointer rounded-xl border p-3 space-y-4 " onClick={handleClick}>
            <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`${name} sprite`}
            className="w-full h-32 object-contain mb-2"
            loading="lazy"
            />
            <div className="text-lg font-semibold text-gray-800">{capitalizedName}</div>
        </div>
        </>
    )
}