import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['getAll'], resource: ['phoneNumber'] };

export const phoneNumberGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show },
		// Most accounts have two or three numbers, but the filter is there if you need it.
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
				description: 'Only return numbers created after this date',
				routing: { send: { type: 'query', property: 'createdAtGt' } },
			},
		],
	},
];
