import { Feature } from '.';
export default class CanvasFeature implements Feature {
    #private;
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        value: {
            image: string;
        };
    } | null>;
}
