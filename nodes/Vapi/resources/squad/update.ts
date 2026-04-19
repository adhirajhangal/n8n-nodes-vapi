import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['update'], resource: ['squad'] };

export const squadUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Squad ID',
		name: 'squadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'The ID of the squad to update',
		routing: { request: { url: '=/squad/{{$value}}' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'Members (JSON)',
				name: 'members',
				type: 'json',
				default: '[]',
				description: 'Updated array of squad members',
				routing: { send: { type: 'body', property: 'members' } },
			},
		],
	},
];
