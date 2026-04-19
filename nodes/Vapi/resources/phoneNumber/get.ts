import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['get'], resource: ['phoneNumber'] };

export const phoneNumberGetDescription: INodeProperties[] = [
	{
		displayName: 'Phone Number ID',
		name: 'phoneNumberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'The ID of the phone number to retrieve',
		routing: {
			request: { url: '=/phone-number/{{$value}}' },
		},
	},
];
