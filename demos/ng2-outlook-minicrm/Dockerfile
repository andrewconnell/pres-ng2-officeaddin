FROM node:6.9.1

# create folders, group & user
RUN mkdir -p /ac/demo /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

# add NPM & Typings configs, install all modules & TypeScript type defs
WORKDIR /ac/demo
COPY package.json tsconfig.json /ac/demo/
RUN npm install --unsafe-perm=true

# copy codebase for app into container
RUN mkdir src
COPY src /ac/demo/src
RUN chown -R nodejs:nodejs /ac/demo
USER nodejs

# run app
CMD npm start
