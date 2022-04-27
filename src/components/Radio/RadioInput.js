import './radio.scss';

const RadioInput = ({ name, label, value, isChecked, handleChange }) => {
	const handleRadioChange = (e) => {
		const { id } = e.currentTarget;
		handleChange(id); // Send back id to radio group for comparison
	};

	return (
		<div className='radio-main'>
			{/* Target this input: opacity 0 */}
			<input
				type="radio"
				className="custom-radio"
				name={name}
				id={value} // htlmlFor targets this id.
				checked={isChecked}
				onChange={handleRadioChange}
			/>
			<label htmlFor={value}>
				<span>{label}</span>
			</label>
		</div>
	);
};

export default RadioInput;
