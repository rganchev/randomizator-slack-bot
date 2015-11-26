module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'dist/randomizer.js': 'src/randomizer.js'
        }
      }
    },
    execute: {
      target: {
        src: ['dist/randomizer.js']
      }
    }
  });

  grunt.registerTask('default', ['babel', 'execute']);
}