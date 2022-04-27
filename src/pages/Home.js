import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card/Card';
import RadioInput from '../components/Radio/RadioInput';
import './home.scss';
import Loader from '../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';

const Years = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
const baseURL = 'https://api.spacexdata.com/v3/launches';

function Home(props) {
	const [year, setYear] = useState(null);
	const [launch, setLaunch] = useState(null);
	const [landing, setLanding] = useState(null);
	const [post, setPost] = useState(null);
	const [loader, setLoader] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		callApi();
	}, [year, launch, landing]);

	useEffect(() => {
		let ly = searchParams.get('launch_year');
		let lnch = searchParams.get('launch_success');
		let land = searchParams.get('land_success');
		if (ly && Years.includes(ly)) {
			setYear(ly);
		}
		if (lnch) {
			let dt = lnch === "true" ? 'launch-true' : 'launch-false';
			setLaunch(dt);
		}
		if (land) {
			let dt2 = land === "true" ? 'landing-true' : 'landing-false';
			setLanding(dt2);
		}
	}, []);

	const handleChangeYear = (inputValue) => {
		setYear(inputValue);
		searchParams.set('launch_year', inputValue);
		setSearchParams(searchParams);
	};

	const handleChangeLaunch = (inputValue) => {
		setLaunch(inputValue);
		let ls = inputValue === 'launch-true' ? true : false;
		searchParams.set('launch_success', ls);
		setSearchParams(searchParams);
	};

	const handleChangeLanding = (inputValue) => {
		setLanding(inputValue);
		let ls = inputValue === 'landing-true' ? true : false;
		searchParams.set('land_success', ls);
		setSearchParams(searchParams);
	};

	const clearFilters = () => {
		setYear(null);
		setLaunch(null);
		setLanding(null);
		searchParams.delete('');
		setSearchParams();
	};

	const callApi = () => {
		setLoader(true);
		let params = {
			limit: 10,
			launch_year: year,
			launch_success: launch ? (launch === 'launch-true' ? true : false) : null,
			land_success: landing ? (landing === 'landing-true' ? true : false) : null,
		};
		axios
			.get(`${baseURL}`, {
				params: params,
			})
			.then((res) => {
				setPost(res.data);
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
			});
	};

	return (
		<div className="app-container">
            {console.log("Ganesha: ", year, launch, landing)}
			<header>
				<h3>SpaceX Launch Programs</h3>
			</header>
			<div className="main">
				<div className="filters">
					<div className="filters-main-header">
						<h4>Filters</h4>
						<div className="clear" onClick={clearFilters}>
							Clear
						</div>
					</div>
					<div className="filters-header">Launch Year</div>
					<div className="filter-container">
						{Years.map((val) => (
							<RadioInput key={val} name="Year" value={val} label={val} isChecked={year === val} handleChange={handleChangeYear} />
						))}
					</div>
					<div className="filters-header">Successfull Launch</div>
					<div className="filter-container">
						<RadioInput name="Launch" value={'launch-true'} label="True" isChecked={launch === 'launch-true'} handleChange={handleChangeLaunch} />
						<RadioInput name="Launch" value={'launch-false'} label="False" isChecked={launch === 'launch-false'} handleChange={handleChangeLaunch} />
					</div>
					<div className="filters-header">Successfull Landing</div>
					<div className="filter-container">
						<RadioInput name="Landing" value={'landing-true'} label="True" isChecked={landing === 'landing-true'} handleChange={handleChangeLanding} />
						<RadioInput name="Landing" value={'landing-false'} label="False" isChecked={landing === 'landing-false'} handleChange={handleChangeLanding} />
					</div>
				</div>
				<div className="card-main">
					{loader ? (
						<Loader />
					) : (
						post &&
						post.length > 0 &&
						post.map((data) => (
							<Card
								key={data.flight_number}
								flight_number={data.flight_number}
								mission_patch={data.links?.mission_patch}
								mission_name={data.mission_name}
								mission_id={data.mission_id}
								launch_year={data.launch_year}
								launch_success={data.launch_success}
								land_success={data.rocket?.first_stage?.cores[0]?.land_success}
							/>
						))
					)}
					{!loader && (!post || post.length < 1) && <div className="no-data">No Data</div>}
				</div>
			</div>
			<footer>Developed by Akash &#10084;</footer>
		</div>
	);
}

export default Home;
