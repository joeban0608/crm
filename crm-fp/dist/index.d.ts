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
        image: string;
    };
    useragent: string;
}>;
export { type Feature, fpPromise };
