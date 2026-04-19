import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

import { assistantDescription } from './resources/assistant';
import { callDescription } from './resources/call';
import { phoneNumberDescription } from './resources/phoneNumber';
import { squadDescription } from './resources/squad';

// Vapi + n8n. Full CRUD for assistants, outbound calls, phone numbers, squads.
// Base url: https://api.vapi.ai
export class Vapi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Vapi',
		name: 'vapi',
		icon: { light: 'file:../../icons/vapi.svg', dark: 'file:../../icons/vapi.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage Vapi AI voice assistants, trigger outbound calls, and automate voice workflows',
		defaults: {
			name: 'Vapi',
		},
		// Works as a regular workflow step and as a tool inside an AI agent. Use both.
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'vapiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.vapi.ai',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Assistant',
						value: 'assistant',
						description: 'Create and manage your Vapi voice assistants',
					},
					{
						name: 'Call',
						value: 'call',
						// This is the one. Fire outbound calls from any workflow.
						description: 'Start outbound calls, get call details, and end active calls',
					},
					{
						name: 'Phone Number',
						value: 'phoneNumber',
						description: 'List and retrieve your Vapi phone numbers',
					},
					{
						name: 'Squad',
						value: 'squad',
						description: 'Manage squads — groups of assistants that hand off to each other',
					},
				],
				default: 'call',
			},
			...assistantDescription,
			...callDescription,
			...phoneNumberDescription,
			...squadDescription,
		],
	};
}
