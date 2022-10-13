import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './chapter-reader.sass';

function ChapterReader(props: { page: string, mangaName: string, goToMangaPage: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveringOnImage, setHoveringOnImage] = useState<boolean>(false);

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
          <div className="manga-spinner">
            <CircularProgress size="5rem" />
          </div> :
          null
      }
      <div
        className={`reader-overlay ${hoveringOnImage ? null : 'hide'}`}
        onMouseOver={() => setHoveringOnImage(true)}
        onMouseOut={() => setHoveringOnImage(false)}>
        <span
          onClick={props.goToMangaPage}>
          {props.mangaName}
        </span>
      </div>
      <img
        className={`page ${loading ? 'loading' : ''}`}
        src={props.page}
        onLoad={onFinishPageLoad}
        onMouseOver={() => setHoveringOnImage(true)}
        onMouseOut={() => setHoveringOnImage(false)}>
      </img>
      {/* {
				props.pages?.map((pageUrl: string) => <img className='page' key={pageUrl} src={pageUrl}></img>)
			} */}
    </div>
  );
}

export default ChapterReader;
