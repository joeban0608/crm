import AudioFeature from './features/audio';
import CanvasFeature from './features/canvas';
import TimezoneFeature from './features/timezone';
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
	// console.log('fpFeatureInfo', fpFeatureInfo);
	return fpFeatureInfo;
};

const hashFpFeatures = async () => {
	const features = [new CanvasFeature(), new AudioFeature(), new TimezoneFeature()];
	let image: string = '';
	let audio: string = '';
	let timezone: string = '';

	const results: string[] = [];
	for (const feature of features) {
		const data = await run(feature);
		console.log(feature.name, data?.fingerprint);
		console.log(data?.info?.image);
		console.log(data?.info?.audio);
		console.log(data?.info?.timezone);
		if (data?.info?.image) {
			image = data?.info?.image as string;
		}
		if (data?.info?.audio) {
			audio = data?.info?.audio as string;
		}
		if (data?.info?.timezone) {
			timezone = data?.info?.timezone as string;
		}

		results.push(data?.fingerprint || '');
	}

	return {
		id: await sha256(JSON.stringify(results)),
		useragent: navigator.userAgent,
		rawData: {
			canvas: {
				hash: await sha256(image),
				'text image': image
			},
			audio: {
				hash: await sha256(audio),
				value: audio
			},
			timezone: {
				hash: await sha256(timezone),
				value: timezone
			}
		}
	};
};
export { type Feature, fpPromise };
