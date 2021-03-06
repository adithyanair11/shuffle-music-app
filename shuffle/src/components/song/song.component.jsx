import './song.styles.css';
import { useDispatch } from 'react-redux';
import { setSearchTrack } from '../../store/search/search.action';
export const Song = ({track,image}) => {
    const dispatch = useDispatch();
    
    const getTrack = () => {
        dispatch(setSearchTrack(track))
    }
    return(
        <div className='song-row' onClick={getTrack}>
            {
                image ?
                (<img className="song-name-album" src={image} alt="track-image"/>)
                :
                (<img className="song-name-album" src={track?.album?.images[0]?.url} alt="track-image"/>)
            }
            <div className='song-row-info'>
                <h5>{track.name}</h5>
                <p>
                    {
                        track?.artists?.
                            map((artist) => artist?.name).join(", ")
                    }
                </p>
                <p>{image ? null : track?.album?.name}</p>
            </div>
        </div>
    )
}
