import { tracking } from './tracker';
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
declare const fpPromise: () => Promise<any>;
export { type Feature, fpPromise, tracking };
