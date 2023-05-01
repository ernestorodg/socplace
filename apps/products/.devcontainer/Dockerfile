FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:16

# Cache and Install dependencies
# COPY package.json /client-web/package.json
COPY package.json /workspace/package.json
# COPY src $USER_HOME/workspace/src
# COPY public $USER_HOME/workspace/public

WORKDIR /workspace
RUN npm -g install

# CMD ["npm", "start"]
