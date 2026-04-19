import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['delete'], resource: ['squad'] };

export const squadDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Squad ID',
		name: 'squadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'The ID of the squad to delete',
		routing: { request: { url: '=/squad/{{$value}}' } },
	},
];
