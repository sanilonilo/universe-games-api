import {defineConfig} from 'vitest/config'

export default defineConfig({
    test:{
        globals:true,
        exclude:['./env.ts','node_modules', 'dist', '.idea', '.git', '.cache']
    }
})