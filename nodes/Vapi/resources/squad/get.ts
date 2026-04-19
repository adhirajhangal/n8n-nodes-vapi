import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['get'], resource: ['squad'] };

export const squadGetDescription: INodeProperties[] = [
	{
		displayName: 'Squad ID',
		name: 'squadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'The ID of the squad to retrieve',
		routing: { request: { url: '=/squad/{{$value}}' } },
	},
];
