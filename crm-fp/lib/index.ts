import { BASE_API_URL } from './constant';
import AudioFeature from './features/audio';
import CanvasFeature from './features/canvas';
import ColorGamutFeature from './features/colorGamut';
import HardwareConcurrencyFeature from './features/hardwareConcurrency';
import HdrFeature from './features/hdr';
import LanguagesFeature from './features/language';
import ScreenResolutionFeature from './features/screen';
import TimezoneFeature from './features/timezone';
import { sha256 } from './hash';
import { tracking } from './tracker';

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
	const createVisitorRes = await postCreateFingerprint(fpFeatureInfo);
	const createVisitorData = await createVisitorRes.json();
	// console.log('createVisitorRes', createVisitorData);
	return await createVisitorData.data;
};

type RawData = {
	[key: string]: {
		hash: string;
		value: string;
	};
};
const hashFpFeatures = async () => {
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
	const _serverFeature: RawData = {};

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

		if (featureData?.fingerprint) {
			remixFeatures.push(featureData.fingerprint);
		}
	}

	const serverData = (await getUserRequestInfo()) as
		| {
				headers: { [key: string]: unknown };
				ip: string;
		  }
		| undefined;
	if (serverData) {
		await _appendServerFeature(_serverFeature, remixFeatures, serverData);
	}

	return {
		id: await sha256(JSON.stringify(remixFeatures)),
		ip: serverData?.ip || false,
		useragent: (serverData?.headers['user-agent'] as string) || false,
		headers: serverData?.headers || false,
		rawData: _rawData,
		serverFeature: _serverFeature
	};
};

function _appendRawData(data: Data, dataTitle: string, featureName: string, rawData: RawData) {
	if (data?.info?.[featureName]) {
		rawData[dataTitle] = {
			hash: data.fingerprint,
			value: data.info[featureName] as string
		};
	}
}
async function _appendServerFeature(
	_serverFeature: RawData,
	remixFeatures: string[],
	serverData?: { [key: string]: unknown }
) {
	if (serverData?.ip) {
		const fp = await sha256(serverData.ip as string);
		_serverFeature['client ip'] = {
			hash: fp,
			value: serverData.ip as string
		};
		remixFeatures.push(fp);
	}
}

async function getUserRequestInfo() {
	try {
		const getFpRes = await fetch(`${BASE_API_URL}/api/fingerprint`);
		const serverDataRes = await getFpRes.json();
		if (!serverDataRes) {
			throw new Error('failed to get user request info');
		}
		return serverDataRes.serverData;
	} catch (e) {
		console.error('failed to get user request info', e);
	}
}

async function postCreateFingerprint(fingerprint: { [key: string]: unknown }) {
	return fetch(`${BASE_API_URL}/api/fingerprint`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(fingerprint)
	});
}

export { type Feature, fpPromise, tracking };
