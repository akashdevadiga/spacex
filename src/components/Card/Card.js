import './card.scss';

function Card(props) {
    const { mission_patch, flight_number, mission_name, mission_id, launch_year, launch_success, land_success } = props;

    return(
        <div className='card'>
            <img alt="spacex" src={mission_patch} />
            <div className='card-name'>{`${mission_name} #${flight_number}`}</div>
            <div className='card-data'>
                <label>Mission Ids</label>
                <li>{"{list mission ids}"}</li>
            </div>
            <div className='card-data flex'>
                <label>Launch Year: </label>
                <span>{launch_year}</span>
            </div>
            <div className='card-data flex'>
                <label>Successfull Launch: </label>
                <span>{launch_success === true ? "true" : launch_success === false ? "false" : "NA"}</span>
            </div>
            <div className='card-data flex'>
                <label>Successfull Landing: </label>
                <span>{land_success === true ? "true" : land_success === false ? "false" : "NA"}</span>
            </div>
        </div>
    );
}

export default Card