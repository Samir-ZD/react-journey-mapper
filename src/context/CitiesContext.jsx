import { createContext, useCallback, useEffect, useReducer } from "react";
import { CityReducer } from "./CityReducer";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

const CitiesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CityReducer, initialState)

    useEffect(()=>{
         const fetchCities = async()=> {
            dispatch({ type: "loading" })
            try {
                const res = await fetch('http://localhost:8000/cities')
                const data = await res.json()
                console.log(data)
                dispatch({ type: "cities/loaded", payload: data });
            }
            catch (err) {
                dispatch({ type: "rejected", action: "error loading data" })
            }
        }
        fetchCities()
    },[])

   const getCity = useCallback(async function getCity(id) {
    if (Number(id) === state.currentCity.id) return;

    dispatch({ type: "loading" });
    try {
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
        dispatch({ type: "rejected", payload: "error loading city" });
    }
}, [state.currentCity.id]);

    const createCity = async (newCity) => {
        dispatch({ type: "loading" })
        try {
            const res = await fetch(`http://localhost:8000/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            dispatch({ type: "city/created", payload: data });
            console.log(data)
        } catch {
            dispatch({ type: "rejected", payload: "error creating city" })
        }
    }

    const deleteCity = async (id) => {
        dispatch({ type: "loading" })
        try {
            const res = await fetch(`http://localhost:8000/cities/${id}`, {
                method: "DELETE"
            })
            const data = await res.json()
            dispatch({ type: "city/deleted", payload: id });
            console.log(data)
        } catch {
            dispatch({ type: "rejected", payload: "error deleting city" })
        }
    }

    return <CitiesContext.Provider value={{
        ...state,
        getCity,
        createCity,
        deleteCity,
    }}>
        {children}
    </CitiesContext.Provider>
}

export default CitiesContext;
export { CitiesProvider };