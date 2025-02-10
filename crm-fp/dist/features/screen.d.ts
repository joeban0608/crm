import { Feature } from '..';
export default class ScreenResolutionFeature implements Feature {
    #private;
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        info: {
            screenResolution: string;
        };
    } | null>;
}
