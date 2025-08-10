import { createOpenAI } from '@ai-sdk/openai';
import { chatModels, type ChatModel } from './models';

export function createCompatibleProvider(model: ChatModel) {
  return createOpenAI({
    baseURL: process.env.OPENAI_COMPATIBLE_BASE_URL || 'https://api.openai.com/v1',
    apiKey: process.env.OPENAI_COMPATIBLE_API_KEY || '',
  });
}

export const myProvider = {
  languageModel: (modelId: string) => {
    const model = chatModels.find(m => m.id === modelId) || chatModels[0];
    const provider = createCompatibleProvider(model);
    return provider(model.modelName);
  },
  
  imageModel: (modelId: string) => {
    const provider = createOpenAI({
      baseURL: process.env.OPENAI_COMPATIBLE_BASE_URL || 'https://api.openai.com/v1',
      apiKey: process.env.OPENAI_COMPATIBLE_API_KEY || '',
    });
    return provider.image('dall-e-3');
  },
};