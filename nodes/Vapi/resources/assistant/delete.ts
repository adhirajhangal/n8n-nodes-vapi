import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['delete'], resource: ['assistant'] };

export const assistantDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		// No undo on this.
		description: 'The ID of the assistant to delete',
		routing: {
			request: { url: '=/assistant/{{$value}}' },
		},
	},
];
