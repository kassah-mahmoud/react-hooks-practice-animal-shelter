import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

const API_URL = 'http://localhost:3001/pets'

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const  onFindPetsClick =  async () => {
    let querystring = '';
    if(filters.type !== 'all') {
      querystring = `?type=${filters.type}`;
    }
    try {
      const res = await fetch(`${API_URL}${querystring}`);
      const data = await res.json();
      setPets(data);
    } catch (error) {
      console.log(error)
    }
  }

  const onAdoptPet = (id) => {
    setPets(prevPets => {
      return prevPets.map(pet => {
        if (pet.id === id) {
          return {
            ...pet,
            isAdopted: true,
          };
        }
        return pet;
      })
    })
  }

  console.log(pets);
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={setFilters} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
