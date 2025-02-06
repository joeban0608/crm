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
    canvas: {
        hash: string;
        text: string;
    };
    audio: {
        hash: string;
        value: string;
    };
    useragent: string;
}>;
export { type Feature, fpPromise };
