import { Feature } from '.';
export default class TimezoneFeature implements Feature {
    #private;
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        value: string;
    } | null>;
}
