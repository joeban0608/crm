import { type Feature } from '..';
import { sha256 } from '../hash';

export default class HardwareConcurrencyFeature implements Feature {
	name = 'Hardware Concurrency Feature';
	enabled = true;
	#ctx: string | null = null;
	#data: string | null = null;
  #displayValue: number | null = null;

	async support() {
		return !!navigator;
	}

	async data() {
		if (navigator.hardwareConcurrency) {
			this.#ctx = navigator.hardwareConcurrency.toString();
      this.#displayValue = navigator.hardwareConcurrency;
		}

		if (!this.#ctx) {
			return null;
		}

		this.#data = "hardware concurrency: " + this.#ctx

		return {
			fingerprint: await sha256(this.#data),
			info: {
				hardwareConcurrency: this.#displayValue
			}
		};
	}
}
