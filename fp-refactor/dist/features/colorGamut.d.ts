import { Feature } from '.';
export default class ColorGamutFeature implements Feature {
    #private;
    static gamutList: string[];
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        value: string | null;
    } | null>;
}
