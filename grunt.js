module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    server: {
      port: 8000,
      base: '.'
    },
    reload: {
      port: 8001,
      proxy: {
        host: 'localhost',
        port: 8000 // should match server.port config
      }
    },
    jshint: {
      "options": {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "boss": true,
        "eqnull": true
      },
      "src": {
        "options": {
          "browser": true,
          "devel": true,
          "strict": true
        }
      },
      "grunt": {
        "options": {
          "node": true
        }
      }
    },
    lint: {
      grunt: 'grunt.js',
      src: [
        'demo/*.js',
        'demo/widgets/*.js',
        'demo/widgets/*/*.js',
        'src/*.js',
        'src/ext/*.js',
        'src/lib/*.js',
        'src/sandbox/*.js'
      ]
    },
    watch: {
      files: [
        '*',
        '*/*',
        '*/*/*',
        '*/*/*/*',
        '*/*/*/*/*'
      ],
      tasks: 'lint qunit reload'
    },
    qunit: {
      all: ['http://localhost:8000/test/test.html']
    }
  });

  grunt.loadNpmTasks('grunt-reload');

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.registerTask('test', 'server qunit');
  grunt.registerTask('dev', 'server reload watch');
};