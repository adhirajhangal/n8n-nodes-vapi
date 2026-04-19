import type { INodeProperties } from 'n8n-workflow';

import { phoneNumberGetDescription } from './get';
import { phoneNumberGetManyDescription } from './getAll';

const show = { resource: ['phoneNumber'] };

export const phoneNumberDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a phone number',
				description: 'Get a specific Vapi phone number by ID',
				routing: { request: { method: 'GET' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many phone numbers',
				// Use this to pick a number dynamically instead of hardcoding the ID.
				description: 'List many phone numbers in your Vapi account',
				routing: { request: { method: 'GET', url: '/phone-number' } },
			},
		],
		default: 'getAll',
	},
	...phoneNumberGetDescription,
	...phoneNumberGetManyDescription,
];
