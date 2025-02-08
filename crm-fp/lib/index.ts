import AudioFeature from './features/audio';
import CanvasFeature from './features/canvas';
import ColorGamutFeature from './features/colorGamut';
import HdrFeature from './features/hdr';
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

type RawData = {
	[key: string]: {
		hash: string;
		value: string;
	};
};
const hashFpFeatures = async () => {
	const features = [
		new CanvasFeature(),
		new AudioFeature(),
		new LanguagesFeature(),
		new ColorGamutFeature(),
		new HdrFeature()
	];
	const remixFeatures: string[] = [];
	const rawData: RawData = {};

	for (const feature of features) {
		const featureData = await run(feature);
		_appendRawData(rawData, featureData as Data, 'canvas', 'image');
		_appendRawData(rawData, featureData as Data, 'audio', 'audio');
		_appendRawData(rawData, featureData as Data, 'languages', 'languages');
		_appendRawData(rawData, featureData as Data, 'color gamut', 'colorGamut');
		_appendRawData(rawData, featureData as Data, 'hdr', 'hdr');

		remixFeatures.push(featureData?.fingerprint || '');
	}

	return {
		id: await sha256(JSON.stringify(remixFeatures)),
		useragent: navigator.userAgent,
		rawData
	};
};

const _appendRawData = (rawData: RawData, data: Data, dataTitle: string, featureName: string) => {
	if (data?.info?.[featureName]) {
		rawData[dataTitle] = {
			hash: data.fingerprint,
			value: data.info[featureName] as string
		};
	}
};

export { type Feature, fpPromise };
