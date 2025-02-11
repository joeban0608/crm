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
declare const fpPromise: (serverParams?: {
    [key: string]: unknown;
}) => Promise<{
    id: string;
    useragent: string;
    _rawData: RawData;
}>;
type RawData = {
    [key: string]: {
        hash: string;
        value: string;
    };
};
export { type Feature, fpPromise };
