module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'spec/unit/SpecUtility.js',
      'dist/Logo.min.js',
      'spec/unit/**/*Spec.js'
    ]
  });
};