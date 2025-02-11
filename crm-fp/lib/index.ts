import AudioFeature from './features/audio';
import CanvasFeature from './features/canvas';
import ColorGamutFeature from './features/colorGamut';
import HardwareConcurrencyFeature from './features/hardwareConcurrency';
import HdrFeature from './features/hdr';
import LanguagesFeature from './features/language';
import ScreenResolutionFeature from './features/screen';
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

const fpPromise = async (serverParams?: { [key: string]: unknown }) => {
	const fpFeatureInfo = await hashFpFeatures(serverParams);
	return fpFeatureInfo;
};

type RawData = {
	[key: string]: {
		hash: string;
		value: string;
	};
};
const hashFpFeatures = async (serverParams?: { [key: string]: unknown }) => {
	const features = [
		new AudioFeature(),
		new CanvasFeature(),
		new ColorGamutFeature(),
		new HdrFeature(),
		new HardwareConcurrencyFeature(),
		new LanguagesFeature(),
		new ScreenResolutionFeature(),
		new TimezoneFeature()
	];
	const remixFeatures: string[] = [];
	const _rawData: RawData = {};
	const _serverRawData: RawData = {};

	for (const feature of features) {
		const featureData = await run(feature);
		await _appendRawData(featureData as Data, 'audio', 'audio', _rawData);
		await _appendRawData(featureData as Data, 'canvas', 'image', _rawData);
		await _appendRawData(featureData as Data, 'color gamut', 'colorGamut', _rawData);
		await _appendRawData(featureData as Data, 'hdr', 'hdr', _rawData);
		await _appendRawData(
			featureData as Data,
			'hardware concurrency',
			'hardwareConcurrency',
			_rawData
		);
		await _appendRawData(featureData as Data, 'languages', 'languages', _rawData);
		await _appendRawData(featureData as Data, 'screen resolution', 'screenResolution', _rawData);
		await _appendRawData(featureData as Data, 'timezone', 'timezone', _rawData);

		remixFeatures.push(featureData?.fingerprint || '');
	}

	await _appendSystemData(_serverRawData, remixFeatures, serverParams);

	return {
		id: await sha256(JSON.stringify(remixFeatures)),
		useragent: navigator.userAgent,
		rawData: _rawData,
		serverData: _serverRawData
	};
};

const _appendRawData = (data: Data, dataTitle: string, featureName: string, rawData: RawData) => {
	if (data?.info?.[featureName]) {
		rawData[dataTitle] = {
			hash: data.fingerprint,
			value: data.info[featureName] as string
		};
	}
};

const _appendSystemData = (
	rawData: RawData,
	_remixFeatures: string[],
	serverData?: { [key: string]: unknown }
) => {
	if (!serverData) return;
	for (const key in serverData) {
		const featureData = {
			fingerprint: sha256(serverData[key] as string),
			info: {
				[key]: serverData[key]
			}
		};
		const dataTitle = (() => {
			if (key.includes('_')) {
				return key.split('_').join(' ');
			} else if (key.includes('-')) {
				return key.split('-').join(' ');
			} else {
				return key;
			}
		})();
		_appendRawData(featureData, dataTitle, key, rawData);
		_remixFeatures.push(featureData.fingerprint);
	}
};

export { type Feature, fpPromise };
