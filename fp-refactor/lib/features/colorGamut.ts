import type { Feature } from '.';
import { sha256 } from '../utils/hash';

export default class ColorGamutFeature implements Feature {
	// ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
	// rec2020 > p3 > srgb
	static gamutList = ['rec2020', 'p3', 'srgb'];
	name = 'Color Gamut Feature';
	enabled = true;
	#data: string | null = null;
	#displayValue: string | null = null;

	async support() {
		return true;
	}

	async data() {
		for (const gamut of ColorGamutFeature.gamutList) {
			const mediaQuery = `(color-gamut: ${gamut})`;
			if (matchMedia(mediaQuery).matches) {
				this.#data = `gamut: ${gamut}`;
				this.#displayValue = gamut;
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
