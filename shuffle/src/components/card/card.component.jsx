import './card.styles.css';
import { Link } from 'react-router-dom';

export const Card = ({data,id,type}) => {
    return(
        <Link to={`${type}/${id}`} className="link link-card">
        <div className='card' style={{
            backgroundImage: `url(${data?.images[0].url})`,
            backgroundPostion: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
        }}>
            <h4 className='name'>{data?.name}</h4>
            <div className="overlay"/>
        </div>
        </Link>
    )
}