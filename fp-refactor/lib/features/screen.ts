import type { Feature } from '.';
import { sha256 } from '../utils/hash';

export default class ScreenResolutionFeature implements Feature {
	name = 'Screen resolution Feature';
	enabled = true;
	#ctx: Screen | null = null;
	#data: string | null = null;

	async support() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const audioCtx = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
		if (!audioCtx) return false;

		const screen = window.screen;
		if (!screen) return false;
		this.#ctx = screen;

		return this.#ctx !== null;
	}

	async data() {
		if (this.#ctx === null) return null;

		const screenValue = `${this.#ctx.width} x ${this.#ctx.height}`;
		this.#data = screenValue

		return {
			fingerprint: await sha256(this.#data),
			info: {
				screenResolution: screenValue
			}
		};
	}
}
