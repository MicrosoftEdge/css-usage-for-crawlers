module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        src: {
            src: [
              'src/cssUsageResults.js',
              'css-usage/cssUsage.src.js',
            ],
            dest: 'cssUsage.src.js'
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat:src']);
};