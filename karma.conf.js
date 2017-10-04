module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'spec/unit/SpecUtility.js',
      'dist/Logo.js',
      'spec/unit/**/*Spec.js'
    ]
  });
};