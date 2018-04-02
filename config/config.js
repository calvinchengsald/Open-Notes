const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'opennotes'
    },
    port: process.env.PORT || 3000,
    //db: 'postgres://localhost/opennotes-development'
    db: 'postgres://postgres@localhost/openNotes'
  },

  test: {
    root: rootPath,
    app: {
      name: 'opennotes'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/opennotes-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'opennotes'
    },
    port: process.env.PORT || 3000,
    //db: 'postgres://localhost/opennotes-production'
    db: process.env.DATABASE_URL
  }
};

module.exports = config[env];
