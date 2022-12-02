const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost/app/contacts',
    experimentalSessionAndOrigin: true,
    video: false
  },
});
