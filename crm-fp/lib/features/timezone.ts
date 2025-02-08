// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions

import { type Feature } from '..';
import { sha256 } from '../hash';

export default class TimezoneFeature implements Feature {
	name = 'Timezone Feature';
	enabled = true;
	#data: string | null = null;

	async support() {
		return true;
	}

	async data() {
		if (Intl.DateTimeFormat) {
			const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
			this.#data = timezone;
		} else {
			this.#data = this.#getTimezoneOffset();
		}

		if (this.#data === null) {
			return null;
		}

		return {
			fingerprint: await sha256(this.#data),
			info: {
				timezone: this.#data
			}
		};
	}

	// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
	#getTimezoneOffset(): string {
		const date = new Date();
		const offset = -date.getTimezoneOffset();
		const sign = offset >= 0 ? '+' : '-';
		const hours = Math.floor(Math.abs(offset) / 60)
			.toString()
			.padStart(2, '0');
		const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
		return `UTC${sign}${hours}:${minutes}`;
	}
}
