var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'service-worker-access-control-demo',
  description: 'Servicio basado en js.',
  script: 'H:\\socket\\servicio-node-ts\\dist\\index.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();