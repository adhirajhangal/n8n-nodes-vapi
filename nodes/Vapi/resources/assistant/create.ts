import type { INodeProperties } from 'n8n-workflow';

const show = { operation: ['create'], resource: ['assistant'] };

export const assistantCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show },
		description: 'A name for this assistant — just for your reference in the dashboard',
		routing: {
			send: { type: 'body', property: 'name' },
		},
	},
	{
		displayName: 'First Message',
		name: 'firstMessage',
		type: 'string',
		default: 'Hey, how can I help you today?',
		displayOptions: { show },
		// First thing your assistant says. Make it count.
		description: 'What the assistant says when it picks up the call',
		routing: {
			send: { type: 'body', property: 'firstMessage' },
		},
	},
	{
		displayName: 'System Prompt',
		name: 'systemPrompt',
		type: 'string',
		typeOptions: { rows: 5 },
		default: '',
		displayOptions: { show },
		description: 'The system prompt that defines the assistant\'s personality, knowledge, and goal',
		routing: {
			send: {
				type: 'body',
				// Vapi nests this inside the model object. Handled below.
				property: 'model.systemPrompt',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show },
		// name, firstMessage, systemPrompt. That covers 90% of builds.
		options: [
			{
				displayName: 'End Call Message',
				name: 'endCallMessage',
				type: 'string',
				default: '',
				description: 'What the assistant says right before hanging up',
				routing: { send: { type: 'body', property: 'endCallMessage' } },
			},
			{
				displayName: 'End Call Phrases',
				name: 'endCallPhrases',
				type: 'string',
				default: '',
				description:
					'Comma-separated phrases that trigger the assistant to end the call (e.g. "goodbye, take care, have a good day")',
				routing: {
					send: {
						type: 'body',
						property: 'endCallPhrases',
						// API wants an array. Convert the string.
						value: '={{$value.split(",").map(s => s.trim()).filter(Boolean)}}',
					},
				},
			},
			{
				displayName: 'LLM Model',
				name: 'modelName',
				type: 'string',
				default: 'gpt-4o-mini',
				// gpt-4o-mini is the right call for most outbound work. Fast, cheap, good enough.
				description: 'The model name (e.g. gpt-4o, gpt-4o-mini, claude-3-5-sonnet-20241022)',
				routing: { send: { type: 'body', property: 'model.model' } },
			},
			{
				displayName: 'LLM Provider',
				name: 'modelProvider',
				type: 'options',
				options: [
					{ name: 'Anthropic', value: 'anthropic' },
					{ name: 'Custom LLM', value: 'custom-llm' },
					{ name: 'Google', value: 'google' },
					{ name: 'Groq', value: 'groq' },
					{ name: 'OpenAI', value: 'openai' },
					{ name: 'Together AI', value: 'together-ai' },
				],
				default: 'openai',
				description: 'The LLM provider powering this assistant',
				routing: { send: { type: 'body', property: 'model.provider' } },
			},
			{
				displayName: 'Max Duration (Seconds)',
				name: 'maxDurationSeconds',
				type: 'number',
				default: 300,
				description: 'Max call duration in seconds, prevents runaway calls on your Vapi bill',
				routing: { send: { type: 'body', property: 'maxDurationSeconds' } },
			},
			{
				displayName: 'Silence Timeout (Seconds)',
				name: 'silenceTimeoutSeconds',
				type: 'number',
				default: 30,
				description: 'How long to wait in silence before ending the call',
				routing: { send: { type: 'body', property: 'silenceTimeoutSeconds' } },
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 2, numberStepSize: 0.1 },
				default: 0.7,
				description: 'LLM temperature, lower is more consistent and higher is more creative',
				routing: { send: { type: 'body', property: 'model.temperature' } },
			},
			{
				displayName: 'Voice ID',
				name: 'voiceId',
				type: 'string',
				default: '',
				// Get this from your TTS provider's dashboard.
				description: 'The voice ID from your TTS provider (e.g. ElevenLabs voice ID)',
				routing: { send: { type: 'body', property: 'voice.voiceId' } },
			},
			{
				displayName: 'Voice Provider',
				name: 'voiceProvider',
				type: 'options',
				options: [
					{ name: 'Azure', value: 'azure' },
					{ name: 'Cartesia', value: 'cartesia' },
					{ name: 'Deepgram', value: 'deepgram' },
					{ name: 'ElevenLabs', value: 'elevenlabs' },
					{ name: 'LMNT', value: 'lmnt' },
					{ name: 'OpenAI', value: 'openai' },
					{ name: 'PlayHT', value: 'playht' },
				],
				default: 'elevenlabs',
				description: 'Text-to-speech provider',
				routing: { send: { type: 'body', property: 'voice.provider' } },
			},
			{
				displayName: 'Webhook URL',
				name: 'serverUrl',
				type: 'string',
				default: '',
				description: 'URL to receive call events (transcripts, status updates, function calls)',
				routing: { send: { type: 'body', property: 'serverUrl' } },
			},
		],
	},
];
