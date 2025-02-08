import { type Feature } from '..';
import { sha256 } from '../hash';

export default class ColorGamutFeature implements Feature {
	// ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
	name = 'ColorGamut Feature';
	enabled = true;
	#data: string | null = null;
	static gamutList = ['rec2020', 'p3', 'srgb'];

	async support() {
		return true;
	}

	async data() {
		for (const gamut of ColorGamutFeature.gamutList) {
			const mediaQuery = `(color-gamut: ${gamut})`;
			if (matchMedia(mediaQuery).matches) {
				this.#data = gamut;
				break;
			}
		}
		if (this.#data === null) {
			return null;
		}

		return {
			fingerprint: await sha256(this.#data),
			info: {
				colorGamut: this.#data
			}
		};
	}
}
