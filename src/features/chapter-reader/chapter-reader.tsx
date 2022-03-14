import React from 'react';

import './chapter-reader.sass';

function ChapterReader(props: { pages: string[] }) {
	return (
		<div className="reader">
			{
				props.pages?.map((pageUrl: string) => <img className='page' key={pageUrl} src={pageUrl}></img>)
			}
		</div>
	);
}

export default ChapterReader;
