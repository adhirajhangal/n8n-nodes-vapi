import type { INodeProperties } from 'n8n-workflow';

import { squadCreateDescription } from './create';
import { squadDeleteDescription } from './delete';
import { squadGetDescription } from './get';
import { squadGetManyDescription } from './getAll';
import { squadUpdateDescription } from './update';

const show = { resource: ['squad'] };

export const squadDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a squad',
				// Multiple assistants that hand off to each other on one call.
				description: 'Create a squad of assistants with handoff logic',
				routing: { request: { method: 'POST', url: '/squad' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a squad',
				description: 'Permanently delete a squad',
				routing: { request: { method: 'DELETE' } },
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a squad',
				description: 'Get a squad by ID',
				routing: { request: { method: 'GET' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many squads',
				description: 'List many squads in your account',
				routing: { request: { method: 'GET', url: '/squad' } },
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a squad',
				description: 'Update an existing squad',
				routing: { request: { method: 'PATCH' } },
			},
		],
		default: 'getAll',
	},
	...squadCreateDescription,
	...squadGetDescription,
	...squadGetManyDescription,
	...squadUpdateDescription,
	...squadDeleteDescription,
];
