# n8n-nodes-vapi

An n8n community node for [Vapi](https://vapi.ai). Wire your AI phone agents directly into your n8n workflows without touching the API.

Built by someone who actually runs AI agency campaigns with this stuff.

[![npm version](https://img.shields.io/npm/v/@adhirajhangal/n8n-nodes-vapi)](https://www.npmjs.com/package/@adhirajhangal/n8n-nodes-vapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## What This Does

Adds a **Vapi** node to n8n with full support for:

| Resource | Operations |
|---|---|
| **Assistant** | Create, Get, Get Many, Update, Delete |
| **Call** | Create Outbound, Get, Get Many, End |
| **Phone Number** | Get, Get Many |
| **Squad** | Create, Get, Get Many, Update, Delete |

The most common use case: fire an outbound call to a lead, pass metadata (like their name, company, CRM ID), and receive the transcript + outcome via webhook, all from an n8n workflow.

---

## Installation

### In n8n (Recommended)

1. Open your n8n instance
2. Go to **Settings → Community Nodes**
3. Click **Install**
4. Enter `@adhirajhangal/n8n-nodes-vapi`
5. Click **Install** and restart n8n

### Manual (self-hosted)

```bash
cd ~/.n8n/custom  # or your custom nodes directory
npm install @adhirajhangal/n8n-nodes-vapi
# restart n8n
```

---

## Credentials

You'll need a Vapi API key.

1. Go to [dashboard.vapi.ai](https://dashboard.vapi.ai)
2. Click your account → **API Keys**
3. Copy your **Private Key** (starts with the long string)
4. In n8n, go to **Credentials → New** → search for **Vapi API**
5. Paste the key and save

> Your private key is what you use for server-side API calls. Don't confuse it with the public key (that's for client-side SDKs).

---

## Usage Examples

### Fire an Outbound Call

The most common workflow: trigger a call to a lead when something happens (form submitted, deal stage changes, etc.).

1. Add the **Vapi** node
2. Set Resource → **Call**, Operation → **Create (Outbound)**
3. Fill in:
   - **Phone Number ID**: your Vapi number (get it from dashboard → Phone Numbers)
   - **Customer Phone Number**: the lead's number in E.164 format (`+14155550100`)
   - **Assistant** → pick "Existing Assistant" and paste your assistant ID
4. In **Additional Fields**, add **Metadata** with any data you want back on the webhook:
   ```json
   {
     "leadId": "{{ $json.id }}",
     "campaign": "q2-outbound",
     "firstName": "{{ $json.firstName }}"
   }
   ```

### Create an Assistant

Build an assistant programmatically, useful if you're spinning up agents per client.

1. Resource → **Assistant**, Operation → **Create**
2. Set the name, first message, and system prompt
3. In Additional Fields, pick your LLM (gpt-4o-mini is the sweet spot for cost/quality) and voice provider

### Get Call Transcript

After a call ends, pull the full transcript and outcome:

1. Resource → **Call**, Operation → **Get**
2. Pass the call ID (comes back from the webhook or from Create Call response)
3. The response includes `transcript`, `recordingUrl`, `summary`, `cost`, and more

---

## Webhook Setup (Highly Recommended)

Vapi sends call events to a webhook URL you define, and that's how you get transcripts, outcomes, and custom function call results back into n8n.

1. Add an **n8n Webhook** node to your workflow
2. Copy the webhook URL
3. When creating/updating your Vapi assistant, paste it into **Webhook URL**
4. Vapi will POST to that URL on events: `call-started`, `call-ended`, `transcript`, `function-call`, etc.

The `call-ended` event is the one you want, it has the full transcript and call outcome.

---

## Tips From Real Campaigns

**Use `assistantOverrides` for personalization without creating a new assistant per lead.** Pass `firstMessage` and `variableValues` to customize what the agent says per call, saves you from managing hundreds of assistants.

**Always pass metadata.** When a call ends and the webhook fires, that metadata comes right back. Use it to link the call back to your CRM record, campaign, or whatever triggered it.

**E.164 format or it'll 400.** Phone numbers must be formatted as `+[country code][number]`, no dashes, no spaces, no parentheses.

**Vapi pagination is timestamp-based, not page-based.** Use `createdAtGt` / `createdAtLt` to paginate through large call lists.

**Squads are underused.** If you have a complex flow (receptionist → qualifier → closer), use a Squad instead of trying to cram all that logic into one assistant's prompt.

---

## Resources

- [Vapi API Docs](https://docs.vapi.ai/api-reference)
- [Vapi Dashboard](https://dashboard.vapi.ai)
- [n8n Community Nodes Docs](https://docs.n8n.io/integrations/community-nodes/)

---

## Contributing

PRs welcome. If Vapi adds new endpoints or you hit a bug, open an issue.

---

## License

MIT
