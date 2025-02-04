import { getUserAgent } from './agent';

const useragent = getUserAgent();
const fingerprint = {
	useragent: useragent,
	id: '...'
};
export { fingerprint };
