export function sha256(message: string): string {
	function rightRotate(value: number, amount: number): number {
		return (value >>> amount) | (value << (32 - amount));
	}

	const utf8Encode = new TextEncoder().encode(message);
	const data = Array.from(utf8Encode);

	const K = [
		0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
		0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
		0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
		0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
		0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
		0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
		0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
		0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	const H = [
		0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	];

	const originalBitLength = data.length * 8;
	data.push(0x80);

	while ((data.length * 8 + 64) % 512 !== 0) {
		data.push(0);
	}

	const bitLengthArray = new Array(8).fill(0);
	for (let i = 0; i < 8; i++) {
		bitLengthArray[7 - i] = (originalBitLength >>> (i * 8)) & 0xff;
	}
	data.push(...bitLengthArray);

	const chunks: number[][] = [];
	for (let i = 0; i < data.length; i += 64) {
		chunks.push(data.slice(i, i + 64));
	}

	chunks.forEach((chunk) => {
		const w = new Array(64);
		for (let i = 0; i < 16; i++) {
			w[i] =
				(chunk[i * 4] << 24) |
				(chunk[i * 4 + 1] << 16) |
				(chunk[i * 4 + 2] << 8) |
				chunk[i * 4 + 3];
		}
		for (let i = 16; i < 64; i++) {
			const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
			const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
			w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
		}

		let [a, b, c, d, e, f, g, h] = H;

		for (let i = 0; i < 64; i++) {
			const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
			const ch = (e & f) ^ (~e & g);
			const temp1 = (h + S1 + ch + K[i] + w[i]) | 0;
			const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
			const maj = (a & b) ^ (a & c) ^ (b & c);
			const temp2 = (S0 + maj) | 0;

			h = g;
			g = f;
			f = e;
			e = (d + temp1) | 0;
			d = c;
			c = b;
			b = a;
			a = (temp1 + temp2) | 0;
		}

		H[0] = (H[0] + a) | 0;
		H[1] = (H[1] + b) | 0;
		H[2] = (H[2] + c) | 0;
		H[3] = (H[3] + d) | 0;
		H[4] = (H[4] + e) | 0;
		H[5] = (H[5] + f) | 0;
		H[6] = (H[6] + g) | 0;
		H[7] = (H[7] + h) | 0;
	});

	return H.map((h) => (h >>> 0).toString(16).padStart(8, '0')).join('');
}

/* 
	demo
	console.log(sha256('hello'));
	e.g. 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
*/
