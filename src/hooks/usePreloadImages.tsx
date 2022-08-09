import { useEffect } from 'react';

async function loadImageAsync(url: string) {
  return await new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

async function loadImagesInOrder(srcs: string[]): Promise<void> {
  for (const src of srcs) {
    await loadImageAsync(src);
  }
}

export const usePreloadImages = (imageSrcs: string[]) => {
  useEffect(() => {
    loadImagesInOrder(imageSrcs);
  }, [imageSrcs]);
};
