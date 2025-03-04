import { Feature } from '.';
export default class HdrFeature implements Feature {
    #private;
    static hdrList: string[];
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        value: string | null;
    } | null>;
}
