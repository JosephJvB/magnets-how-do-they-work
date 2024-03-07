setup:
1. home prefetch data on server
  - data is hydrated from DOM <script> tag "__next_f.push"
2. re-used Nav displays data on home page without fetching
3. navigate to new page using Nav
  - data is not re-fetched: HOW
  - did the data stay in some server cache?
4. reload on new page
  - data is re-fetched since new page serverside does not prefetch
  - would I expect it to use the same server cache as before?

Home -> First
1. @home:server queryClient.prefetch() & dehydrate
2. @home:client queryClient.hydrate
  - have magic _next_f <script> tag with react query state
  - fetch is not called
3. @home:client click link to /first
4. @first:server no prefetch, no dehydrate
5. @first:client
  - have magic _next_f <script> tag with react query state
  - fetch is not called
  - server cache from home:server prefetch() ? + server dehydrate ?
6. @first:client reload
7. @first:server no prefetch, no dehydrate
8. @first:client refetches
  - DO NOT have magic _next_f <script> tag with react query state

First -> Home
1. @first:server - nothing
  - no script tag
2. @first:client init QueryClient and fetch
  - no script tag
3. @first:client click link to / Home
- no script tag
4. @home:server prefetches the query
5. @home:client doesn't refetch
  - dehydrated react-query state script tag not in DOM - so weird

Home -> First -> Home
1. @home server prefetch and render dehydrated script tag
2. @first no refetch
3. @home:server render function not called at all!
  - perhaps the whole component is cached in browser somehow
  - fooking mental

In conclusion, nextjs and react-query are very complex and I don't have a good mental model for where / how data is persisted OUCH
- but the dehydrated script tags are a good start