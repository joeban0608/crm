import type { Feature } from '.';
import { sha256 } from '../utils/hash';

// ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
export default class CanvasFeature implements Feature {
	name = 'Canvas Feature';
	enabled = true;

	#ctx: CanvasRenderingContext2D | null = null;
	#data: string | null = null;

	// TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
	// chrome, edge 目前測試不同裝置，會不一樣
	async support() {
		if (!document) return false;
		this.#ctx = document.createElement('canvas').getContext('2d');
		return this.#ctx !== null;
	}

	async data() {
		if (this.#ctx === null) return null;

		this.#ctx.textBaseline = 'top';
		this.#ctx.font = "14px 'Arial'";
		this.#ctx.textBaseline = 'alphabetic';
		this.#ctx.fillStyle = '#f60';
		this.#ctx.fillRect(100, 1, 55, 20);
		this.#ctx.fillStyle = '#069';
		this.#ctx.fillText('Cyber Universe Canvas', 2, 15);
		this.#ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
		this.#ctx.fillText('Cyber Universe Canvas', 4, 17);

		this.#data = this.#ctx.canvas.toDataURL();
		return {
			fingerprint: await sha256(this.#data),
			value: {
				image: this.#data
			}
		};
	}
}
