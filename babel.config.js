// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
  ['@babel/plugin-transform-class-properties', { loose: true }],
     ['@babel/plugin-transform-private-methods', { loose: true }],
     ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
