import { type Feature, hash } from '.';

export default class CanvasFeature implements Feature {
	name = 'Canvas Feature';
	enabled = true;

	#ctx: CanvasRenderingContext2D | null = null;
	#data: string | null = null;

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
			fingerprint: await hash(this.#data),
			info: {
				image: this.#data
			}
		};
	}
}
