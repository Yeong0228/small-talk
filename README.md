## SmallTalk

SmallTalk is an open source AI Chat Application specifically designed for learning languages. It is my first Next.js app that aims to be production ready.

People have been building many similar apps since the release of ChatGPT. They usually try to monetize it and the apps are not flexible enough. Therefore I wanted to create my own so it can be customized to my needs, and I welcome everyone else to fork or contribute to this repo.

## Roadmap

As of 7/30/2023:
- [X] Wrap up basic small talk functionalities with text and voice in English. Sorry, it only supports English learners for the moment.
- [X] Add i18n support. Yay! Now you can learn (almost) any language you want.
- [X] Support review mode, where the AI gives you feedback in your own language on the recent conversation. You can ask AI to elaborate or explain to you when you are confused!
- [ ] Store and load conversations based on a (file-based) database.
- [ ] Add pre-defined scenarios, so you can learn to talk in different common scenarios.
- [ ] Support customization of AI personality and voice. You can even write your own prompt to define how your language tutor/buddy should talk like.
- [ ] Allow self intro as a prompt so AI can know you before you even talk!

There are a lot more things I should do to make the AI talk and sound more real, and, most importantly, know you well. I learned English partly by frequently talking to native speakers. You learn even faster if you have a good friend who speaks this language. The AI can be your good friend.

I will keep working on it. If you have any suggestions, please feel free to open an issue or pull request.

## Getting Started

### Requirements

- [Node.js 16.8](https://nodejs.org/) or later
- An [OpenAI](https://platform.openai.com/account/api-keys) API Key
- An [Azure Speech](https://speech.microsoft.com/) subscription key

### Browser Compatibility

As of 7/25/2023, it fully functions on mainstream browsers (Chrome, Edge, Firefox, and Safari).

### Installation

First install all dependencies by running:

```bash
npm install
```

Then create a `.env.local` file in the root directory of the project and add the following:

```
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
OPENAI_ORGANIZATION=YOUR_OPENAI_ORGANIZATION (optional)
AZURE_SPEECH_KEY=YOUR_AZURE_SPEECH_SUBSCRIPTION_KEY
AZURE_SPEECH_REGION=YOUR_AZURE_SPEECH_REGION
```

Finally start the app simply by running:

```bash
npm run dev
```

## Additional Notes

### Testing on Mobile Devices

Starting audio on a mobile device requires secure connection, so we need to set up HTTPS when testing locally. Follow the instructions below:

Install `mkcert` and generate a certificate for localhost:

```bash
brew install mkcert # Or equivalent on your OS
mkcert -install
mkcert localhost # Run this command under project's root directory
```

You'll see two files generated: `localhost.pem` and `localhost-key.pem`. Then install the proxy:

```bash
npm install -g local-ssl-proxy
```

And start the proxy:

```bash
local-ssl-proxy --source 8080 --target <YOUR_PORT> --cert localhost.pem --key localhost-key.pem # <YOUR_PORT> is the port started by Next.js, which is 3000 by default
```

Finally find your local IP by running:

```bash
ipconfig getifaddr en0
```

Now you can access the app on your mobile device by visiting `https://<YOUR_IP_ADDRESS>:8080`. Make sure your mobile device is connected to the same network as your computer.

### Configuration

Currently the page does not have widgets to configure how the AI speaks. You can change it by directly editing the SSML under `app/utils/azure-speech.ts`.

Have fun!
