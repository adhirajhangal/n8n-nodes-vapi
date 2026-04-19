import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['get'], resource: ['assistant'] };

export const assistantGetDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'The ID of the assistant to retrieve',
		routing: {
			request: {
				// ID goes straight into the url.
				url: '=/assistant/{{$value}}',
			},
		},
	},
];
