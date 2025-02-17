declare global {
    interface Window {
        pako: {
            deflate: (input: string) => Uint8Array;
        };
    }
}
export declare function tracking(visitorInfo: {
    [key: string]: unknown;
}): Promise<void>;
