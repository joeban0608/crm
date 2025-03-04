import { default as AudioFeature } from './audio';
import { default as CanvasFeature } from './canvas';
import { default as ColorGamutFeature } from './colorGamut';
import { default as HdrFeature } from './hdr';
import { default as HardwareConcurrencyFeature } from './hardwareConcurrency';
import { default as LanguagesFeature } from './language';
import { default as ScreenResolutionFeature } from './screen';
import { default as TimezoneFeature } from './timezone';
export declare const features: (AudioFeature | CanvasFeature | ColorGamutFeature | HdrFeature | HardwareConcurrencyFeature | LanguagesFeature | ScreenResolutionFeature | TimezoneFeature)[];
export interface Feature {
    name: string;
    enabled: boolean;
    support: () => Promise<boolean>;
    data: () => Promise<{
        fingerprint: string;
        info?: Record<string, unknown>;
    } | null>;
}
export declare function runFeature(feature: Feature): Promise<{
    fingerprint: string;
    info?: Record<string, unknown>;
} | null>;
