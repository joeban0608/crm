import { Feature } from '..';
export default class ColorGamutFeature implements Feature {
    #private;
    name: string;
    enabled: boolean;
    static gamutList: string[];
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        info: {
            colorGamut: string;
        };
    } | null>;
}
