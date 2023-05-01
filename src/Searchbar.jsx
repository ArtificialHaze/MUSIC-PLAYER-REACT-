
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'

const Searchbar = () => {
  
  const navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="p-2 text-gray-400 focus-within:text-gray-600" action="#">
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4"/>
        <input type="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} name="search-field" autoComplete="off" id="search-field" placeholder="Search.." className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 p-4 text-white text-base" />
      </div>
    </form>
  )
}

export default Searchbar;
