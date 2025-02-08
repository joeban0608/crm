import { Feature } from '..';
export default class LanguagesFeature implements Feature {
    #private;
    name: string;
    enabled: boolean;
    support(): Promise<boolean>;
    data(): Promise<{
        fingerprint: string;
        info: {
            languages: string;
        };
    }>;
}
