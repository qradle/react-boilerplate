# Anova Client App

## Run the application locally

### Dependencies
- Node v10+
- cloned repository

### Running

```bash
# after cloning the repo:

# install packages
$ npm i

# list of all variables available here: `./bin/env.js:2`
# for static build
$ export NODE_ENV=production
$ npm run build

# for local run
# head over by default to http://0.0.0.0:{PORT}
$ npm run dev

# run static server
# head over by default to http://0.0.0.0:8020
$ export PORT=8020
$ npm run serve 
```
