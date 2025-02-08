import { type Feature } from '..';
import { sha256 } from '../hash';

export default class LanguagesFeature implements Feature {
	name = 'Languages Feature';
	enabled = true;
	#ctx: string[][] = [];
	#data: string | null = null;
  
	async support() {
		return !!navigator;
	}

	async data() {
		if (navigator.language) {
			this.#ctx.push([navigator.language]);
		}
		if (Array.isArray(navigator.languages)) {
			this.#ctx.push(navigator.languages);
		}
		this.#data = JSON.stringify(this.#ctx);
    
		return {
			fingerprint: await sha256(this.#data),
			info: {
				languages: this.#data
			}
		};
	}
}
