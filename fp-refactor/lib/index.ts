import { collectFingerprint } from './utils/fingerprint';
import { postCreateFingerprint } from './utils/api';

async function fpPromise() {
	const fingerprintData = await collectFingerprint();
	const response = await postCreateFingerprint(fingerprintData);
	const responseData = await response.json();
	return responseData.data;
}

export { fpPromise, collectFingerprint };
