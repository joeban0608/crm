import { Feature } from '.';
export default class AudioFeature implements Feature {
    #private;
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        info: {
            audio: number;
        };
    } | null>;
}
