type Data = {
    fingerprint: string;
    info?: {
        [key: string]: unknown;
    };
};
interface Feature {
    name: string;
    enabled: boolean;
    support: () => Promise<boolean>;
    data: () => Promise<Data | null>;
}
declare const fpPromise: () => Promise<{
    id: string;
    useragent: string;
    rawData: {
        canvas: {
            hash: string;
            'text image': string;
        };
        audio: {
            hash: string;
            value: string;
        };
        timezone: {
            hash: string;
            value: string;
        };
    };
}>;
export { type Feature, fpPromise };
