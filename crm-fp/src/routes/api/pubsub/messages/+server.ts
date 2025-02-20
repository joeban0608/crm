import { PubSub } from '@google-cloud/pubsub';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import Pako from 'pako';
const pubSubClient = new PubSub();

export const GET: RequestHandler = async () => {
	return new Response();
};
export const POST: RequestHandler = async (event) => {
	// Creates a client; cache this for further use
	const req = event.request;
	const body = await req.json();
	const topicNameOrId = body.topic_name_or_id;
	const message = body.message;
	let restoredMsg: string | null = null;
	try {
		restoredMsg = JSON.parse(Pako.inflate(message, { to: 'string' })); // 直接解析 JSON
	} catch {
		console.error('decompressed error');
	}

	// from bundle js tracker.ts
	if (!body.topic_name_or_id) {
		return json({ error: 'topic_name_or_id is required' }, { status: 400 });
	}

	if (!body.message) {
		return json({ error: 'message is required' }, { status: 400 });
	}

	// [END pubsub_publish_with_error_handler]
	// [END pubsub_quickstart_publisher]
	// have to : gcloud auth application-default login
	const mid = await publishMessage(topicNameOrId, JSON.stringify(restoredMsg)).catch((err) => {
		console.error(err.message);
		return json({ error: 'publish message failed' }, { status: 500 });
		// process.exitCode = 1;
	});

	if (!mid) {
		return json({ error: 'publish message failed' }, { status: 500 });
	}

	return json({ message: 'message published', mid }, { status: 201 });
};

async function publishMessage(__topicNameOrId: string, __data: string) {
	// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
	const dataBuffer = Buffer.from(__data, 'utf-8');

	// Cache topic objects (publishers) and reuse them.
	const topic = pubSubClient.topic(__topicNameOrId);

	try {
		const messageId = await topic.publishMessage({ data: dataBuffer });
		console.log(`Message ${messageId} published.`);
		return messageId;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Received error while publishing: ${error.message}`);
		} else {
			throw new Error('Received unknown error while publishing');
		}
	}
}
