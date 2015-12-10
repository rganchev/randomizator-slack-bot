module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        options: {
          only: 'src/**'
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist/'
        }]
      },
      test: {
        options: {
          only: 'test/**'
        },
        files: [{
          expand: true,
          cwd: 'test',
          src: ['**/*.js'],
          dest: 'dist/test/'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.{jison,jisonlex}',
          dest: 'dist/'
        }]
      }
    },
    execute: {
      target: {
        src: ['dist/randomizator.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'node_modules/babel-core/register'
        },
        src: ['dist/test/**/*.js']
      }
    }
  });

  grunt.registerTask('default', ['build', 'execute']);
  grunt.registerTask('test', ['build', 'babel:test', 'mochaTest'])
  grunt.registerTask('build', ['babel:dist', 'copy:dist']);
}