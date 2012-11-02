module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    server: {
      port: 8000,
      base: './public'
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
        'public/scripts/*.js',
        'public/scripts/**/*.js'
      ]
    },
    watch: {
      files: [
        'public/index.html',
        'public/scripts/*',
        'public/scripts/**/*',
        'public/scripts/**/**/*'
      ],
      tasks: 'lint reload'
    }
  });

  grunt.loadNpmTasks('grunt-reload');

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.registerTask('dev', 'server reload watch');
};