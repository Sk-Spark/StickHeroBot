var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient()

client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      return client.shell(device.id, 'input keyevent 26')
        // Use the readAll() utility to read all the content without
        // having to deal with the events. `output` will be a Buffer
        // containing all the output.
        .then(adb.util.readAll)
        .then(function(output) {
          console.log('[%s] %s', device.id, output.toString().trim())
        })
    })
  })
  .then(function() {
    console.log('Done.')
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })