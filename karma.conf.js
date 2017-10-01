module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'dist/Logo.js',
      'spec/unit/**/*Spec.js'
    ]
  });
};