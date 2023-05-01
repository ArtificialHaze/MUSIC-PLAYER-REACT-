import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Error,Loader,SongCard} from '../components';
import { useGetSongsByCountryQuery } from '../redux/shazamCore';

const CountryTracks = () =>

{
    const [country, setCountry] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const {activeSong,isPlaying}=useSelector((state)=>state.player);
    const {data,isFetching,error}=useGetSongsByCountryQuery(country);

    useEffect(()=>{
        axios.get('').then((res)=>setCountry(res?.data?.location?.country)).catch((err)=>console.log(err)).finally(()=>setIsLoading(false))
    },[country])

    if(isFetching&&isLoading) return <Loader title="Loading..."/>

    if(error&&country) return <Error/>

    return <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Around you <span className='font-black'>{country}</span></h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song,i)=>(
                    <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} i={i} data={data}/>
                ))}
            </div>
    </div>
};

export default CountryTracks;
