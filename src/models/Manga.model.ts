import Chapter from "./Chapter.model";

class Manga {
    name: string;
    imageUrl: string;
    description: string;
    chapters: Chapter[] = [];
}

export default Manga;