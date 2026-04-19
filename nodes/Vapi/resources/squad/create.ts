import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['create'], resource: ['squad'] };

export const squadCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'A name for this squad',
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Members (JSON)',
		name: 'members',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: { show },
		// A list of assistants with handoff logic between them, receptionist to specialist to closer, that kind of thing.
		// Each member needs at least an assistantId.
		description:
			'Array of squad members. Each member needs at least an "assistantId". Example: [{"assistantId": "xxx"}, {"assistantId": "yyy"}]',
		routing: { send: { type: 'body', property: 'members' } },
	},
];
