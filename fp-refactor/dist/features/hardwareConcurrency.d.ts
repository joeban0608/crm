import { Feature } from '.';
export default class HardwareConcurrencyFeature implements Feature {
    #private;
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        info: {
            hardwareConcurrency: number | null;
        };
    } | null>;
}
