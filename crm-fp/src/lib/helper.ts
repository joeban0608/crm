export type FileTreeItem = {
	type: 'file' | 'folder';
	name: string;
	value?: string;
	children?: FileTreeItem[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildFingerprintStructure(fingerprint: any): FileTreeItem[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	const buildStructure = (obj: Record<string, any>, parentKey: string = ''): FileTreeItem[] => {
		const items: FileTreeItem[] = [];

		Object.keys(obj).forEach((key) => {
			const item: FileTreeItem = {
				type: typeof obj[key] === 'object' && !Array.isArray(obj[key]) ? 'folder' : 'file',
				name: key,
				children: []
			};

			if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
				item.children = buildStructure(obj[key], key);
			} else {
				item.value = obj[key];
			}

			items.push(item);
		});

		return items;
	};

	return buildStructure(fingerprint);
}

// // 示例调用
// const fingerprint = {
// 	useragent:
// 		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
// 	id: '0d7d21576417aeb06d00d53767bff813b32e99a5d636c9acbd96e5730dbeb800',
// 	canvas: {
// 		image: 'data:image/png;base64,iVBORw0KGgoAA...',
// 		meta: {
// 			width: 200,
// 			height: 100
// 		}
// 	}
// };

// const fingerprintStructure = buildFingerprintStructure(fingerprint);
// console.log(JSON.stringify(fingerprintStructure, null, 2));
