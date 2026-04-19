import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['create'], resource: ['call'] };

export const callCreateDescription: INodeProperties[] = [
	{
		displayName: 'Phone Number ID',
		name: 'phoneNumberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		// Your Vapi number, the one that shows on caller ID.
		// dashboard.vapi.ai → Phone Numbers
		description:
			'The ID of your Vapi phone number to call from. Find it at dashboard.vapi.ai → Phone Numbers.',
		routing: {
			send: { type: 'body', property: 'phoneNumberId' },
		},
	},
	{
		displayName: 'Customer Phone Number',
		name: 'customerPhoneNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		// E.164 format only, like +14155550100. Bare numbers get a 400 every time.
		description: 'The phone number to call in E.164 format (e.g. +14155550100)',
		routing: {
			send: { type: 'body', property: 'customer.number' },
		},
	},
	{
		displayName: 'Assistant',
		name: 'assistantSource',
		type: 'options',
		displayOptions: { show },
		options: [
			{
				name: 'Existing Assistant (by ID)',
				value: 'id',
				// Right choice most of the time, one assistant across many calls.
				description: 'Reference a saved assistant by its ID',
			},
			{
				name: 'Inline (One-Time Config)',
				value: 'inline',
				description: 'Define assistant settings just for this call — not saved to your account',
			},
		],
		default: 'id',
	},
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { ...show, assistantSource: ['id'] } },
		description: 'The ID of the assistant to use for this call',
		routing: {
			send: { type: 'body', property: 'assistantId' },
		},
	},
	{
		displayName: 'System Prompt',
		name: 'inlineSystemPrompt',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		displayOptions: { show: { ...show, assistantSource: ['inline'] } },
		description: 'System prompt for the inline assistant on this call',
		routing: {
			send: { type: 'body', property: 'assistant.model.systemPrompt' },
		},
	},
	{
		displayName: 'First Message',
		name: 'inlineFirstMessage',
		type: 'string',
		default: '',
		displayOptions: { show: { ...show, assistantSource: ['inline'] } },
		description: 'What the assistant says when the call connects',
		routing: {
			send: { type: 'body', property: 'assistant.firstMessage' },
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show },
		options: [
			{
				displayName: 'Assistant Overrides (JSON)',
				name: 'assistantOverrides',
				type: 'json',
				default: '{}',
				// Tweak the assistant per call without touching the saved version.
				// Swap firstMessage or variableValues per lead, this is the right pattern.
				description:
					'Override specific assistant settings for this call only (e.g. systemPrompt, firstMessage, variable values)',
				routing: { send: { type: 'body', property: 'assistantOverrides' } },
			},
			{
				displayName: 'Customer Name',
				name: 'customerName',
				type: 'string',
				default: '',
				// Lets the assistant say "hi John" instead of "hi there".
				description: 'Name of the person being called, assistants can use this in conversation',
				routing: { send: { type: 'body', property: 'customer.name' } },
			},
			{
				displayName: 'Max Duration (Seconds)',
				name: 'maxDurationSeconds',
				type: 'number',
				default: 300,
				description: 'Max call length in seconds, good guardrail for billing',
				routing: { send: { type: 'body', property: 'maxDurationSeconds' } },
			},
			{
				displayName: 'Metadata (JSON)',
				name: 'metadata',
				type: 'json',
				default: '{}',
				// Comes back on every webhook event, so you can link the call back to your CRM record.
				description:
					'Custom metadata attached to this call. Returned in webhooks, great for tracking lead IDs, campaign names, etc.',
				routing: { send: { type: 'body', property: 'metadata' } },
			},
			{
				displayName: 'Webhook URL',
				name: 'serverUrl',
				type: 'string',
				default: '',
				description: "Override the assistant's webhook URL just for this call",
				routing: { send: { type: 'body', property: 'serverUrl' } },
			},
		],
	},
];
