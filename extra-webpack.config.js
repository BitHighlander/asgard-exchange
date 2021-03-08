module.exports = {
  node: {
    vm: true,
    stream: true
  },
  resolve: {
    alias: {
      "crypto": "crypto-browserify"
    }
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
