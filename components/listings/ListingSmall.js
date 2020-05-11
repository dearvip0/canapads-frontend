import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSelectedListing } from './../../redux/actions/selectedListingActions';

import external from '../../images/external_link.png';
const ListingSmall = (props) => {
	const dispatch = useDispatch();

	//console.log(props);
	const setSelectedAd = () => {
		//props.setSelectedAd(props.feature.properties.id);
		dispatch(setSelectedListing({ listing: props.feature.properties.id }));
	};
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	//const cost = '$' + props.feature.properties.price.toFixed().replace(/\d(?=(\d{3}))/g, '$&,');
	const cost = formatter.format(props.feature.properties.price);
	return (
		<div className="listing_small">
			<div className="price_tag">
				<span className="cost">{cost}</span>
			</div>
			<div className="external">
				<Link href="/details/[id]" as={`/details/${props.feature.properties.id}`}>
					<a target="_blank">
						<img className="external_img" src={external} alt="" />{' '}
					</a>
				</Link>
			</div>
			<a onClick={setSelectedAd}>
				<div className="info_box">
					<div className="info_box_bottom">
						<span className="title">{props.feature.properties.title.substring(0, 55)}</span>
					</div>
				</div>
				<img className="box_image" src={props.feature.properties.image} alt="" />
			</a>
		</div>
	);
};

export default ListingSmall;
