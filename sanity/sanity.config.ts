import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './index'

export default defineConfig({
  name: 'default',
  title: 'My Project',

  projectId: 'vr5f0y22',
  dataset: 'production',

  basePath: '/sanity',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})
