import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";
import PokemonDetails from "../Features/Pokemon/PokemonDetails";

export const router = createBrowserRouter([{
    path:'/',
    element: <App />,
    children:[
        {path:'pokemon/:id',element:<PokemonDetails/>}
    ]
}])