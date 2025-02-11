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
    ip: string | boolean;
    useragent: string | boolean;
    headers: boolean | {
        [key: string]: unknown;
    };
    rawData: RawData;
    serverFeature: RawData;
}>;
type RawData = {
    [key: string]: {
        hash: string;
        value: string;
    };
};
export { type Feature, fpPromise };
