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
        webgl: {
            hash: string;
            value: {
                basics: {
                    [key: string]: unknown;
                };
                extensions: {
                    [key: string]: unknown;
                };
            };
        };
    };
}>;
export { type Feature, fpPromise };
