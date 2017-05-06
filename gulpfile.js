var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var argv = require('yargs').argv;

var environment = argv.env || 'development';

gulp.task('constants', function() {
  var configFile = require('./config.json');
  var envConfig = configFile[environment];
  return ngConstant({
    name: configFile.name,
    constants: envConfig,
    stream: true
  })
  .pipe(gulp.dest('./app'));
});
