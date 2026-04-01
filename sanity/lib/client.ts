import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'vr5f0y22',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})