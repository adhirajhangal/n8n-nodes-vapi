import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class VapiApi implements ICredentialType {
	name = 'vapiApi';

	displayName = 'Vapi API';

	// The docs are actually good. Worth reading.
	documentationUrl = 'https://docs.vapi.ai/api-reference/authentication';

	icon: Icon = { light: 'file:../icons/vapi.svg', dark: 'file:../icons/vapi.dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			// dashboard.vapi.ai → Account → API Keys
			description:
				'Your Vapi private API key. Find it at <a href="https://dashboard.vapi.ai" target="_blank">dashboard.vapi.ai</a> → Account → API Keys.',
		},
	];

	// Bearer token. One header. That's it.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// Lists assistants. If this fails, the key is wrong.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.vapi.ai',
			url: '/assistant',
			method: 'GET',
		},
	};
}
