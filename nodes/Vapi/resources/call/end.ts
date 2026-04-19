import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['end'], resource: ['call'] };

export const callEndDescription: INodeProperties[] = [
	{
		displayName: 'Call ID',
		name: 'callId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		// For when a call gets stuck, or you need to kill it from a workflow.
		description: 'The ID of the active call to end',
		routing: {
			request: { url: '=/call/{{$value}}' },
		},
	},
];
