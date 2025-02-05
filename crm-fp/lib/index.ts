import { getUserAgent } from './agent';
import CanvasFeature from './canvas';
import { sha256 } from './hash';

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

	return await sha256(JSON.stringify(results));
};

const useragent = getUserAgent();

const fpPromise = async () => {
	const fp = {
		useragent: useragent,
		id: await hashFpFeatures()
	};
	return fp;
};
export { type Feature, fpPromise };
