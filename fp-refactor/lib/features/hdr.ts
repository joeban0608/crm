import type { Feature } from '.';
import { sha256 } from '../utils/hash';

export default class HdrFeature implements Feature {
	// ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
	static hdrList = ['high', 'standard'];
	name = 'HDR Feature';
	enabled = true;
	#data: string | null = null;
	#displayValue: string | null = null;

	async support() {
		return true;
	}

	async data() {
		for (const hdr of HdrFeature.hdrList) {
			const mediaQuery = `(dynamic-range: ${hdr})`;
			if (matchMedia(mediaQuery).matches) {
				this.#data = `dynamic-range: ${hdr}`;
				this.#displayValue = hdr;
				break;
			}
		}
		if (this.#data === null) {
			return null;
		}

		return {
			fingerprint: await sha256(this.#data),
			value: this.#displayValue
		};
	}
}
