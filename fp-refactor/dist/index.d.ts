type RawData = Record<string, {
    hash: string;
    value: string;
}>;
declare function collectFingerprint(): Promise<{
    id: string;
    ip: any;
    useragent: any;
    headers: any;
    rawData: RawData;
    serverFeature: RawData;
}>;
export { collectFingerprint };
