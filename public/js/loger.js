let systemInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    colorDepth: window.screen.colorDepth,
    ram: navigator.deviceMemory || 'N/A', // Available in some browsers
    cpuCount: navigator.hardwareConcurrency || 'N/A', // May not be available in all browsers,
};

function sendlogs(socket){
    socket.emit('log',systemInfo);
}
  

  

