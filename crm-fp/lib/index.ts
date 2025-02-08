import AudioFeature from './features/audio';
import CanvasFeature from './features/canvas';
import LanguagesFeature from './features/language';
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

const fpPromise = async () => {
	const fpFeatureInfo = await hashFpFeatures();
	return fpFeatureInfo;
};

const hashFpFeatures = async () => {
	const features = [new CanvasFeature(), new AudioFeature(), new LanguagesFeature()];
	let image: string = '';
	let audio: string = '';
	let languages: string = '';
	const results: string[] = [];
	console.log('features', features);

	for (const feature of features) {
		const data = await run(feature);
		// console.log(feature.name, data?.fingerprint);
		if (data?.info?.image) {
			image = data?.info?.image as string;
		}
		if (data?.info?.audio) {
			audio = data?.info?.audio as string;
		}
		if (data?.info?.languages) {
			languages = JSON.stringify(data?.info?.languages as string[][]);
		}
		results.push(data?.fingerprint || '');
	}

	return {
		id: await sha256(JSON.stringify(results)),
		useragent: navigator.userAgent,
		rawData: {
			canvas: {
				hash: await sha256(image),
				value: image
			},
			audio: {
				hash: await sha256(audio),
				value: audio
			},
			languages: {
				hash: await sha256(languages),
				value: languages
			}
		}
	};
};
export { type Feature, fpPromise };
