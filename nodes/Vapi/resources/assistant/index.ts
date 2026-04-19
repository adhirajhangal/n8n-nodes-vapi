import type { INodeProperties } from 'n8n-workflow';

import { assistantCreateDescription } from './create';
import { assistantDeleteDescription } from './delete';
import { assistantGetDescription } from './get';
import { assistantGetManyDescription } from './getAll';
import { assistantUpdateDescription } from './update';

const show = { resource: ['assistant'] };

export const assistantDescription: INodeProperties[] = [
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
				action: 'Create an assistant',
				description: 'Create a new Vapi voice assistant',
				routing: { request: { method: 'POST', url: '/assistant' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an assistant',
				description: 'Permanently delete an assistant',
				routing: { request: { method: 'DELETE' } },
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an assistant',
				description: 'Get a single assistant by ID',
				routing: { request: { method: 'GET' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many assistants',
				description: 'List many assistants in your account',
				routing: { request: { method: 'GET', url: '/assistant' } },
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an assistant',
				description: 'Update an existing assistant (partial update)',
				routing: { request: { method: 'PATCH' } },
			},
		],
		default: 'getAll',
	},
	...assistantCreateDescription,
	...assistantGetDescription,
	...assistantGetManyDescription,
	...assistantUpdateDescription,
	...assistantDeleteDescription,
];
