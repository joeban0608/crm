import { type Feature } from '.';
import { sha256 } from './hash';

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

		await this.#renderTextImg(this.#ctx.canvas, this.#ctx);
		// denoise canvas handle Private safari mode issue
		const denoisedImageData = await this.#getDenoisedImageData(this.#ctx.canvas);
		const denoiseCanvas = this.#getDenoiseCanvas(denoisedImageData);
		this.#data = await this.#canvasTostring(denoiseCanvas);

		return {
			fingerprint: await sha256(this.#data),
			info: {
				image: this.#data
			}
		};
	}

	#renderTextImg(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		const text = `Cyber Universe Canvas`;
		// initial Canvas
		canvas.width = 300;
		canvas.height = 75;
		ctx.fillStyle = '#fff'; // 白色背景
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.imageSmoothingEnabled = false; // 禁用反锯齿

		// normalize text
		ctx.font = "14px 'Arial'";
		ctx.textBaseline = 'alphabetic';
		ctx.fillStyle = '#f60';
		ctx.fillRect(100, 1, 55, 20);
		ctx.fillStyle = '#069';
		ctx.fillText(text, 2, 15);
		ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
		ctx.fillText(text, 4, 17);
	}

	#canvasTostring(canvas: HTMLCanvasElement): string {
		return canvas.toDataURL();
	}

	// ref: https://github.com/google/security-research/security/advisories/GHSA-24cm-69m9-fpw3
	#getDenoisedImageData(c1: HTMLCanvasElement): ImageData {
		const scale = 3;

		const c2 = document.createElement('canvas');
		c2.width = c1.width * scale;
		c2.height = c1.height * scale;
		const _ctx = c2.getContext('2d');
		if (!_ctx) {
			throw new Error('Failed to get 2D _ctx');
		}
		_ctx.imageSmoothingEnabled = false;
		_ctx.scale(scale, scale);
		_ctx.drawImage(c1, 0, 0);

		const scaled = _ctx.getImageData(0, 0, c2.width, c2.height);
		const real = new ImageData(c1.width, c1.height);
		for (let y = 0; y < c1.height; y += 1) {
			for (let x = 0; x < c1.width; x += 1) {
				const realIdx = (y * c1.width + x) * 4;
				const scaledIdx = (y * scale * c2.width + x * scale + 1) * 4;
				for (let chan = 0; chan < 4; chan += 1) {
					real.data[realIdx + chan] = scaled.data[scaledIdx + chan];
				}
			}
		}
		return real;
	}

	#getDenoiseCanvas(denoisedImageData: ImageData): HTMLCanvasElement {
		const processedCanvas = document.createElement('canvas');
		processedCanvas.width = denoisedImageData.width;
		processedCanvas.height = denoisedImageData.height;
		const processedCtx = processedCanvas.getContext('2d');
		if (!processedCtx) {
			throw new Error('Failed to get 2D context');
		}
		processedCtx.putImageData(denoisedImageData, 0, 0);
		return processedCanvas;
	}
}
