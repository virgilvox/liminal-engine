// Environment registry

import type { Environment } from '@/types'
import { hub } from './hub'
import { diner } from './diner'
import { forest } from './forest'
import { alley } from './alley'
import { cave } from './cave'
import { shop } from './shop'
import { showcase } from './showcase'

// All environments indexed by ID
export const environments: Record<string, Environment> = {
  hub,
  diner,
  forest,
  alley,
  cave,
  shop,
  showcase,
}

export function getEnvironment(id: string): Environment | undefined {
  return environments[id]
}

export function getAllEnvironments(): Environment[] {
  return Object.values(environments)
}
