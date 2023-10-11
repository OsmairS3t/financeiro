module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          'moduleName': '@env',
          'allowUndefined': false,
        },
      ],
      [
        'module-resolver',
        {
          root:['./src'],
          alias: {
            '@assets':'./src/Assets',
            '@components': './src/Components',
            '@screens': './src/Screens',
            '@storage': './src/Storage',
            '@utils': './src/Utils',
          }
        }
      ],
    ]
  };
};
