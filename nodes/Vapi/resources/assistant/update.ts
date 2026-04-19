import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['update'], resource: ['assistant'] };

export const assistantUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'The ID of the assistant to update',
		routing: {
			request: { url: '=/assistant/{{$value}}' },
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show },
		// PATCH is partial. Only send what you're changing.
		options: [
			{
				displayName: 'First Message',
				name: 'firstMessage',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'firstMessage' } },
			},
			{
				displayName: 'Max Duration (Seconds)',
				name: 'maxDurationSeconds',
				type: 'number',
				default: 300,
				routing: { send: { type: 'body', property: 'maxDurationSeconds' } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'System Prompt',
				name: 'systemPrompt',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				routing: { send: { type: 'body', property: 'model.systemPrompt' } },
			},
			{
				displayName: 'Webhook URL',
				name: 'serverUrl',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'serverUrl' } },
			},
		],
	},
];
