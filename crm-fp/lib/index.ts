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
	// console.log('serverParams===', serverParams);
	for (const feature of features) {
		const featureData = await run(feature);
		await _appendRawData(_rawData, featureData as Data, 'audio', 'audio');
		await _appendRawData(_rawData, featureData as Data, 'canvas', 'image');
		await _appendRawData(_rawData, featureData as Data, 'color gamut', 'colorGamut');
		await _appendRawData(_rawData, featureData as Data, 'hdr', 'hdr');
		await _appendRawData(
			_rawData,
			featureData as Data,
			'hardware concurrency',
			'hardwareConcurrency'
		);
		await _appendRawData(_rawData, featureData as Data, 'languages', 'languages');
		await _appendRawData(_rawData, featureData as Data, 'screen resolution', 'screenResolution');
		await _appendRawData(_rawData, featureData as Data, 'timezone', 'timezone');
		if (serverParams) {
			if (serverParams?.client_ip) {
				await _appendRawData(
					_rawData,
					{
						fingerprint: sha256(serverParams.client_ip as string),
						info: {
							client_ip: serverParams.client_ip
						}
					},
					'client ip',
					'client_ip'
				);
				remixFeatures.push(serverParams?.client_ip as string);
			}
		}

		remixFeatures.push(featureData?.fingerprint || '');
	}

	return {
		id: await sha256(JSON.stringify(remixFeatures)),
		useragent: navigator.userAgent,
		_rawData
	};
};

const _appendRawData = (_rawData: RawData, data: Data, dataTitle: string, featureName: string) => {
	if (data?.info?.[featureName]) {
		_rawData[dataTitle] = {
			hash: data.fingerprint,
			value: data.info[featureName] as string
		};
	}
};

export { type Feature, fpPromise };
