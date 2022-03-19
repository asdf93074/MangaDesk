import React, { useEffect, useState } from 'react';

import './chapter-reader.sass';

function ChapterReader(props: { page: string }) {
	const [loading, setLoading] = useState<boolean>(false);

	const onFinishPageLoad = (event: any) => {
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
	}, [props.page]);

	return (
		<div className="reader" tabIndex={-1}>
			{
				loading ?
					<div>
						Loading...
					</div>:
				null
			}
			<img className={`page ${loading ? 'loading': ''}`} src={props.page} onLoad={onFinishPageLoad}></img>
			{/* {
				props.pages?.map((pageUrl: string) => <img className='page' key={pageUrl} src={pageUrl}></img>)
			} */}
		</div>
	);
}

export default ChapterReader;
