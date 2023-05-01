import React from 'react';
import {useSelector} from 'react-redux';
import {Error,Loader,SongCard} from '../components';
import { useGetSongsByCountryQuery } from '../redux/shazamCore';

const TopCharts = () => {
    const {activeSong,isPlaying}=useSelector((state)=>state.player);
    const {data,isFetching,error}=useGetSongsByCountryQuery(country);
   
    if(isFetching) return <Loader title="Loading..."/>

    if(error) return <Error/>

    return <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Discover top charts</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song,i)=>(
                    <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} i={i} data={data}/>
                ))}
            </div>
    </div>
};

export default TopCharts;
