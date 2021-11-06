import Chapter from './Chapter.model';

class Manga {
  title: string;
	name: string;
  imageUrl: string;
  description: string;
  chapters: Chapter[] = [];
}

export default Manga;
