import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['call'] };

export const callGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show },
		options: [
			{
				displayName: 'Assistant ID',
				name: 'assistantId',
				type: 'string',
				default: '',
				// Filter by assistant to see calls for one agent, useful for campaign reporting.
				description: 'Filter calls by a specific assistant',
				routing: { send: { type: 'query', property: 'assistantId' } },
			},
			{
				displayName: 'Created After',
				name: 'createdAtGt',
				type: 'dateTime',
				default: '',
				description: 'Only return calls created after this date',
				routing: { send: { type: 'query', property: 'createdAtGt' } },
			},
			{
				displayName: 'Created Before',
				name: 'createdAtLt',
				type: 'dateTime',
				default: '',
				description: 'Only return calls created before this date',
				routing: { send: { type: 'query', property: 'createdAtLt' } },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 1000 },
				default: 50,
				description: 'Max number of results to return',
				routing: { send: { type: 'query', property: 'limit' } },
			},
			{
				displayName: 'Phone Number ID',
				name: 'phoneNumberId',
				type: 'string',
				default: '',
				description: 'Filter calls by a specific Vapi phone number',
				routing: { send: { type: 'query', property: 'phoneNumberId' } },
			},
		],
	},
];
