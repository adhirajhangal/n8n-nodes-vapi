import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['get'], resource: ['call'] };

export const callGetDescription: INodeProperties[] = [
	{
		displayName: 'Call ID',
		name: 'callId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		// Call IDs come back on create, store them if you need to poll status later.
		description: 'The ID of the call to retrieve',
		routing: {
			request: { url: '=/call/{{$value}}' },
		},
	},
];
