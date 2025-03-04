type RawData = Record<string, {
    hash: string;
    value: unknown;
}>;
export declare function collectFingerprint(): Promise<{
    id: string;
    ip: any;
    useragent: any;
    headers: any;
    rawData: RawData;
    serverFeature: RawData;
}>;
export {};
