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
declare const hash: (data: string) => Promise<string>;
declare const fpPromise: () => Promise<{
    useragent: string;
    id: string;
}>;
export { type Feature, fpPromise, hash };
