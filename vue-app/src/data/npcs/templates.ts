// NPC Template definitions

import type { NPCTemplate, NPCMemory, DialogueTree } from '@/types'

export const npcTemplates: Record<string, NPCTemplate> = {
  ghost_girl: {
    id: 'ghost_girl',
    name: 'MAYA',
    portrait: '👻',
    pitch: 1.4,
    appearance: {
      skin: '#d0d0e0',
      shirt: '#446688',
      hair: '#1a1a2a',
      translucent: true,
    },
    getDialogue(mem: NPCMemory): DialogueTree {
      if (!mem.visited) {
        return {
          start: [
            { text: "*looks up* ...You can see me?", effect: { memory: { visited: true } } },
            {
              text: "Most people can't. Not anymore.",
              choices: [
                { text: "Are you okay?", id: 'kind', type: 'kind' },
                { text: "What happened to you?", id: 'ask', type: 'strange' },
              ],
            },
          ],
          kind: [
            { text: "*small smile* Kind. That's rare here." },
            { text: "*fades*", leave: true },
          ],
          ask: [
            { text: "I had an accident. I think. I came here after..." },
            { text: "*fades*", leave: true },
          ],
        }
      }
      return {
        start: [
          { text: "*nods* Thank you for seeing me." },
          { text: "*fades*", leave: true },
        ],
      }
    },
  },

  merchant: {
    id: 'merchant',
    name: 'MERCHANT',
    portrait: '💰',
    pitch: 1.0,
    appearance: {
      skin: '#d4a574',
      shirt: '#8b4513',
      hair: '#1a1a1a',
    },
    getDialogue(_mem: NPCMemory): DialogueTree {
      return {
        start: [
          {
            text: "Welcome! Browse my wares.",
            choices: [
              { text: "[Buy Potion - 10 gold]", id: 'buy', type: 'action' },
              { text: "Just looking.", id: 'browse', type: 'kind' },
            ],
          },
        ],
        buy: [
          { text: "Excellent! *hands over potion*", effect: { gold: -10 } },
          { text: "*returns to work*", leave: true },
        ],
        browse: [
          { text: "Take your time!" },
          { text: "*counts coins*", leave: true },
        ],
      }
    },
  },

  demon: {
    id: 'demon',
    name: 'AZAZEL',
    portrait: '👹',
    pitch: 0.6,
    appearance: {
      skin: '#8b2500',
      shirt: '#1a1a1a',
      hair: '#ff4500',
      horns: true,
      tail: true,
    },
    getDialogue(_mem: NPCMemory): DialogueTree {
      return {
        start: [
          {
            text: "*flames flicker* Mortal.",
            choices: [
              { text: "What are you?", id: 'what', type: 'strange' },
              { text: "*back away*", id: 'flee', type: 'bad' },
            ],
          },
        ],
        what: [
          { text: "I am what lurks between worlds.", effect: { hp: -10 } },
          { text: "*laughs*", leave: true },
        ],
        flee: [{ text: "Wise. *vanishes*", leave: true }],
      }
    },
  },

  robot: {
    id: 'robot',
    name: 'UNIT-7',
    portrait: '🤖',
    pitch: 0.8,
    appearance: {
      skin: '#888888',
      shirt: '#444444',
      hair: '#666666',
      mechanical: true,
    },
    getDialogue(_mem: NPCMemory): DialogueTree {
      return {
        start: [
          {
            text: "*beeps* SCANNING... HUMAN DETECTED.",
            choices: [
              { text: "Hello!", id: 'greet', type: 'kind' },
              { text: "What's your function?", id: 'func', type: 'strange' },
            ],
          },
        ],
        greet: [
          { text: "GREETING PROTOCOL ACTIVATED. HELLO." },
          { text: "*powers down*", leave: true },
        ],
        func: [
          { text: "PURPOSE: UNKNOWN. SEARCHING..." },
          { text: "*static*", leave: true },
        ],
      }
    },
  },

  elf: {
    id: 'elf',
    name: 'ELANOR',
    portrait: '🧝',
    pitch: 1.2,
    appearance: {
      skin: '#e8dfd0',
      shirt: '#2d5a3d',
      hair: '#c4b896',
      ears: 'pointed',
    },
    getDialogue(_mem: NPCMemory): DialogueTree {
      return {
        start: [
          {
            text: "*gazes at you with ancient eyes*",
            choices: [
              { text: "Greetings, traveler.", id: 'greet', type: 'kind' },
              { text: "What brings you here?", id: 'ask', type: 'strange' },
            ],
          },
        ],
        greet: [
          { text: "Well met. The forest whispers of your journey." },
          { text: "*bows gracefully*", leave: true },
        ],
        ask: [
          { text: "I wander, as my kind always have." },
          { text: "*fades into the shadows*", leave: true },
        ],
      }
    },
  },

  skeleton: {
    id: 'skeleton',
    name: 'BONES',
    portrait: '💀',
    pitch: 0.7,
    appearance: {
      skin: '#f5f5dc',
      shirt: '#333333',
      hair: '#444444',
      bones: true,
    },
    getDialogue(_mem: NPCMemory): DialogueTree {
      return {
        start: [
          {
            text: "*rattles* ...Got any milk?",
            choices: [
              { text: "No, sorry.", id: 'no', type: 'kind' },
              { text: "Why do you need milk?", id: 'why', type: 'strange' },
            ],
          },
        ],
        no: [
          { text: "*sad rattle* Worth a shot..." },
          { text: "*sits down*", leave: true },
        ],
        why: [
          { text: "For my bones! They're getting brittle..." },
          { text: "*creaks*", leave: true },
        ],
      }
    },
  },
}

export function getNPCTemplate(id: string): NPCTemplate | undefined {
  return npcTemplates[id]
}
