import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['assistant'] };

export const assistantGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show },
		// Vapi doesn't use page numbers. Pagination is timestamp-based.
		// createdAtGt is your cursor. Not an offset, a date.
		options: [
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
				displayName: 'Created After',
				name: 'createdAtGt',
				type: 'dateTime',
				default: '',
				description: 'Only return assistants created after this date',
				routing: { send: { type: 'query', property: 'createdAtGt' } },
			},
			{
				displayName: 'Created Before',
				name: 'createdAtLt',
				type: 'dateTime',
				default: '',
				description: 'Only return assistants created before this date',
				routing: { send: { type: 'query', property: 'createdAtLt' } },
			},
			{
				displayName: 'Updated After',
				name: 'updatedAtGt',
				type: 'dateTime',
				default: '',
				description: 'Only return assistants updated after this date',
				routing: { send: { type: 'query', property: 'updatedAtGt' } },
			},
		],
	},
];
