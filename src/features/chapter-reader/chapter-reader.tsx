import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

import './chapter-reader.sass';

function ChapterReader(props: { page: string, onRightArrowClick: () => void, onLeftArrowClick: () => void , totalPageNumber: number, currentPageNumber: number }) {
	const [loading, setLoading] = useState<boolean>(false);

	const onFinishPageLoad = (event: any) => {
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
	}, [props.page]);

	return (
		<div className="reader" tabIndex={-1} data-testid="reader">

			<div className='page-left' onClick={props.onLeftArrowClick}></div>
			<div className='page-right' onClick={props.onRightArrowClick}></div>
			{
				loading ?
					<div className="manga-spinner" data-testid="manga-spinner">
						<CircularProgress size="5rem" />
					</div> :
					null
			}
			{!loading && <i className='arrow left' onClick={props.onLeftArrowClick} data-testid='arrow-left' />}
			<img className={`page ${loading ? 'loading' : ''}`} src={props.page} onLoad={onFinishPageLoad}></img>
			{!loading && <i className='arrow right' onClick={props.onRightArrowClick} data-testid='arrow-right' />}
			{/* {
				props.pages?.map((pageUrl: string) => <img className='page' key={pageUrl} src={pageUrl}></img>)
			} */}
			<div className='nav-footer'>
				<span>{props.currentPageNumber+1}/{props.totalPageNumber}</span>
			</div>
		</div>
	);
}

export default ChapterReader;
