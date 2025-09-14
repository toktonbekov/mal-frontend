const { config } = require('dotenv')

config()

module.exports = {
  chess: {
    input: `${process.env.VITE_API_URL}/api-docs.json`,
    output: {
      baseUrl: process.env.VITE_API_URL,
      // mode: 'tags-split',
      target: './app/composables/api/generated.ts',
      schemas: './app/types/api',
      client: 'vue-query',
      prettier: true,
      override: {
        query: {
          useQuery: true,
          useInfiniteQuery: true,
          useMutation: true,
        },
        mutator: {
          path: './app/composables/api/mutator.ts',
          name: 'customInstance',
        },
      },
    },
  }

}
