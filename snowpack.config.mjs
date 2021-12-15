/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    /* ... */
    public: "/",
    src: "/dist"
  },
  plugins: [
    /* ... */
    "@snowpack/plugin-svelte",
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
    knownEntrypoints: ["svelte", "svelte/transition", "svelte/store", "filepond"]
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // put the build files in /docs
    out: 'docs',
    // put the meta snowpack build files under snowpack instead of _snowpack since Github special-cases underscore prefixed folders
    metaUrlPath: 'snowpack'
  },
};
