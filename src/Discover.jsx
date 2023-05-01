import {Error,Loader,SongCard} from '../components';
import {genres} from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/shazamCore';
import {useDispatch,useSelector} from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/shazamCore';



const Discover = () => {
    const dispatch=useDispatch();
    const {activeSong,isPlaying,genreListId} =useSelector((state)=>state.player);
    const {data,isFetching,error}=useGetSongsByGenreQuery(genreListId||'pop');
    if(isFetching) return <Loader title={'Loading..'}/>;
    const genreTitle=genres.find(({value})=>value===genreListId)?.title;
    if(error) return <Error/>;

    return (
        <div className='flex flex-col'>
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
              <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
                <select className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5' onChange={(e)=>{dispatch(selectGenreListId(e.target.value))}} value={genreListId||'pop'}>
                    {genres.map((genre,index)=>(
                        <option key={index} value={genre.value}>{genre.title}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song,index)=>(
                    <SongCard data={data} key={index} song={song} index={index} isPlaying={isPlaying} activeSong={activeSong}/>
                ))}
            </div>
        </div>
    )
}

export default Discover;
