import {MangaApi} from 'api/api.interface';

export class CoverArt {
	api?: MangaApi;

	constructor(api: MangaApi) {
		this.api = api;
	}

	getCoverUrl(...args: any[]): Promise<string> {
		return this.api.routes['getCoverUrl'].convert(args[0], args[1]);
	}
}
