import { sha256 } from '../utils/hash';
import { getUserRequestInfo } from '../utils/api';
import { features, runFeature } from '../features/index';

type RawData = Record<string, { hash: string; value: unknown }>;

export async function collectFingerprint() {
	const remixFeatures: string[] = [];
	const rawData: RawData = {};
	const serverFeature: RawData = {};

	// 1️⃣ 收集 Feature 指紋
	for (const feature of features) {
		const featureData = await runFeature(feature);
		if (!featureData) continue;

		// 存儲 feature 指紋
		const featureKey = feature.name
			.replace(/\s/g, '') // 去掉所有空格
			.replace(/Feature$/, '') // 去掉結尾的 'Feature'
			.replace(/^[A-Z]/, (match) => match.toLowerCase()); // 將首字母轉小寫

		rawData[featureKey] = {
			hash: featureData.fingerprint,
			value: featureData.value
		};

		remixFeatures.push(featureData.fingerprint);
	}

	// 2️⃣ 收集 Server 端資訊
	const serverData = await getUserRequestInfo();
	// console.log('serverData', serverData);
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
