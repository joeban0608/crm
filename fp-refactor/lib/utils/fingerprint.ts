import { sha256 } from '../utils/hash';
import { getUserRequestInfo } from '../utils/api';
import { features, runFeature } from '../features/index';

type RawData = Record<string, { hash: string; value: string }>;

export async function collectFingerprint() {
	const remixFeatures: string[] = [];
	const rawData: RawData = {};
	const serverFeature: RawData = {};

	// 1️⃣ 收集 Feature 指紋
	for (const feature of features) {
		const featureData = await runFeature(feature);
		if (!featureData) continue;

		// 存儲 feature 指紋
		const featureKey = feature.name.toLowerCase().replace(/\s/g, '');
		rawData[featureKey] = {
			hash: featureData.fingerprint,
			value: JSON.stringify(featureData.info)
		};

		remixFeatures.push(featureData.fingerprint);
	}

	// 2️⃣ 收集 Server 端資訊
	const serverData = await getUserRequestInfo();
	if (serverData?.ip) {
		const ipHash = await sha256(serverData.ip);
		serverFeature['client_ip'] = { hash: ipHash, value: serverData.ip };
		remixFeatures.push(ipHash);
	}

	// 3️⃣ 計算 Fingerprint ID
	return {
		id: await sha256(JSON.stringify(remixFeatures)),
		ip: serverData?.ip || false,
		useragent: serverData?.headers?.['user-agent'] ?? false,
		headers: serverData?.headers ?? false,
		rawData,
		serverFeature
	};
}
