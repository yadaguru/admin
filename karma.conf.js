//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'reminders/*.js',
      'categories/*.js',
      'timeframes/*.js',
      'tests/*.js',
      'testDates/*.js',
      'contentItems/*.js',
      'login/*.js',
      'components/**/*.js',
      'services/**/*.js',
      'components/**/*.html'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates'
    }

  });
};
