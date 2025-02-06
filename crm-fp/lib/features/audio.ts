import { type Feature } from '..';
import { sha256 } from '../hash';

export default class AudioFeature implements Feature {
	name = 'Audio Feature';
	enabled = true;

	#ctx: OfflineAudioContext | null = null;
	#data: string | null = null;
	#AUDIO_LEN = 5000;

  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
	async support() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const audioCtx = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
		if (!audioCtx) return false;

		this.#ctx = new audioCtx(1, this.#AUDIO_LEN, 44100);
		return this.#ctx !== null;
	}

	async data() {
		if (this.#ctx === null) return null;

		const audioValue = await this.#renderAndGetAudioValue(this.#ctx);
		if (audioValue === null) return null;

		this.#data = await sha256(audioValue.toString());

		return {
			fingerprint: this.#data,
			info: {
				audio: audioValue
			}
		};
	}

	#renderAndGetAudioValue(ctx: OfflineAudioContext): Promise<number | null> {
		return new Promise((resolve) => {
			const oscillator = ctx.createOscillator();
			oscillator.type = 'triangle';
			oscillator.frequency.value = 10000;

			const compressor = ctx.createDynamicsCompressor();
			compressor.threshold.value = -50;
			compressor.knee.value = 40;
			compressor.ratio.value = 12;
			compressor.attack.value = 0;
			compressor.release.value = 0.2;

			oscillator.connect(compressor);
			compressor.connect(ctx.destination);
			oscillator.start();

			ctx.oncomplete = (event) => {
				// We have only one channel, so we get it by index
				const samples = event.renderedBuffer.getChannelData(0);
				const audioValue = this.#calculateHash(samples);
				resolve(audioValue);
			};

			ctx.startRendering();
		});
	}

	#calculateHash(samples: ArrayLike<number>) {
		let hash = 0;
		for (let i = 0; i < samples.length; ++i) {
			hash += Math.abs(samples[i]);
		}
		return hash;
	}
}
