import { CustomHandle } from './Handle';

import React, { useState } from 'react';

import Slider from 'rc-slider';

// const styles = {
// 	background: 'red'
// };
const wrapperStyle = { width: 400, margin: 50 };
const maxValue = 4050;

const PriceRange = (props) => {
	const [ priceValues, setPriceValues ] = useState(props.priceFilters);
	// eslint-disable-next-line
	const [ lowerBound, setLowerBound ] = useState(0);
	// eslint-disable-next-line
	const [ upperBound, setUpperBound ] = useState(maxValue);
	const handleChange = (value) => {
		value[1] = value[1] === maxValue ? 1000000 : value[1];

		setPriceValues(value);
	};
	const handleAfterChange = () => {
		//if 6050 is selected, we default to our maximum value (1M) to show all listings above 6000.
		priceValues[1] = priceValues[1] === maxValue ? 1000000 : priceValues[1];
		props.onPriceChange(priceValues);
	};

	return (
		<div className="price_range">
			{priceValues && (
				<div>
					<Slider.Range
						min={lowerBound}
						max={upperBound}
						step={50}
						defaultValue={priceValues}
						onChange={handleChange}
						onAfterChange={handleAfterChange}
						handle={CustomHandle}
					/>
					<div className="pricetag">
						${priceValues[0]} - ${priceValues[1] === 1000000 ? '4000+' : priceValues[1]}
					</div>
				</div>
			)}
		</div>
	);
};

export default PriceRange;
