import type { INodeProperties } from 'n8n-workflow';

import { callCreateDescription } from './create';
import { callEndDescription } from './end';
import { callGetDescription } from './get';
import { callGetManyDescription } from './getAll';

const show = { resource: ['call'] };

export const callDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Create (Outbound)',
				value: 'create',
				action: 'Create an outbound call',
				// This is the one, fires a call to a number using your assistant.
				description: 'Start an outbound call to a phone number using a Vapi assistant',
				routing: { request: { method: 'POST', url: '/call' } },
			},
			{
				name: 'End',
				value: 'end',
				action: 'End an active call',
				description: 'Force-end an active call by ID',
				routing: { request: { method: 'DELETE' } },
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a call',
				description: 'Get details of a specific call including transcript and recording',
				routing: { request: { method: 'GET' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many calls',
				description: 'List calls with optional filters',
				routing: { request: { method: 'GET', url: '/call' } },
			},
		],
		default: 'create',
	},
	...callCreateDescription,
	...callGetDescription,
	...callGetManyDescription,
	...callEndDescription,
];
