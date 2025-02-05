import { getUserAgent } from './agent';
import CanvasFeature from './canvas';

type Data = {
	fingerprint: string;
	info?: { [key: string]: unknown };
};

interface Feature {
	name: string;
	enabled: boolean;
	support: () => Promise<boolean>;
	data: () => Promise<Data | null>;
}

const hash = async (data: string): Promise<string> => {
	const u8a = new TextEncoder().encode(data);
	const buffer = await crypto.subtle.digest('SHA-256', u8a);
	const hash = Array.from(new Uint8Array(buffer));
	return hash.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const run = async (feature: Feature): Promise<Data | null> => {
	if (!feature.enabled) {
		console.log(`Feature ${feature.name} is disabled`);
		return null;
	}

	if (!(await feature.support())) {
		console.log(`Feature ${feature.name} is not supported`);
		return null;
	}

	return await feature.data();
};

const hashFpFeatures = async () => {
	const features = [new CanvasFeature()];

	const results: string[] = [];
	for (const feature of features) {
		const data = await run(feature);
		console.log(feature.name, data?.fingerprint);
		console.log(data?.info?.image);
		results.push(data?.fingerprint || '');
	}

	return await hash(JSON.stringify(results));
};

const useragent = getUserAgent();

const fpPromise = async () => {
	const fp = {
		useragent: useragent,
		id: await hashFpFeatures()
	};
	console.log('fp', fp);
	return fp;
};
export { type Feature, fpPromise, hash };
