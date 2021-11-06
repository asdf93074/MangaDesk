import axios, {AxiosResponse} from 'axios';
import {MangaApi} from 'api/api.interface';

class MangaInfo {
  coverImageUrl: string;
  title: string;
  url: string;
	id: string;
  api?: MangaApi;

	constructor(api: MangaApi) {
		this.api = api;
	}

  get?(): Promise<any> {
		return axios.get<any>(
			this.api.routes['get'].url,
			{},
		).then((resp: AxiosResponse) => this.api.routes['get'].convert(resp.data.data));
  }
}

export default MangaInfo;
