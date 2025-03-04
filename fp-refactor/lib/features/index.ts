import AudioFeature from './audio';
import CanvasFeature from './canvas';
import ColorGamutFeature from './colorGamut';
import HdrFeature from './hdr';
import HardwareConcurrencyFeature from './hardwareConcurrency';
import LanguagesFeature from './language';
import ScreenResolutionFeature from './screen';
import TimezoneFeature from './timezone';

export const features = [
	new AudioFeature(),
	new CanvasFeature(),
	new ColorGamutFeature(),
	new HdrFeature(),
	new HardwareConcurrencyFeature(),
	new LanguagesFeature(),
	new ScreenResolutionFeature(),
	new TimezoneFeature()
];

export interface Feature {
	name: string;
	enabled: boolean;
	support: () => Promise<boolean>;
	data: () => Promise<{ fingerprint: string; value?: unknown } | null>;
}

export async function runFeature(feature: Feature) {
	if (!feature.enabled) {
		console.log(`Feature ${feature.name} is disabled`);
		return null;
	}
	if (!(await feature.support())) {
		console.log(`Feature ${feature.name} is not supported`);
		return null;
	}
	return await feature.data();
}
