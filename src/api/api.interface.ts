import MangaInfo from 'models/MangaInfo.model';

export interface routeItem {
	url?: string;
	convert: (...data: any) => any;
}

export interface MangaApi {
	website: string;
	baseUrl: string;
	manga: MangaInfo;
	routes: {[string: string] : routeItem};
};
