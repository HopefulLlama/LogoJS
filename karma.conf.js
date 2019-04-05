module.exports = config =>
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine'],
    files: [
      'spec/unit/SpecUtility.js',
      'dist/Logo.js',
      'spec/unit/**/*Spec.js'
    ]
  });
