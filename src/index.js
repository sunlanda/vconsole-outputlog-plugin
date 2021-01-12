import copy from 'copy-to-clipboard';
 
class VConsoleOutputLogsPlugin {
  constructor(vConsole) {
    this.vConsole = vConsole;
    this.$ = vConsole.$;
    this.dom = null;
    return this.init();
  }

  init() {
    const vConsoleExportLogs = new window.VConsole.VConsolePlugin(
      "exportLog",
      "exportLog"
    );

    vConsoleExportLogs.on("ready", () => {
      console.log('[vConsole-exportlog-plugin] -- load');
    });
    vConsoleExportLogs.on("renderTab", (callback) => {
      const html = `<div class="vconsole-exportlog">
      </div>`;
      callback(html);
    });
    vConsoleExportLogs.on("addTool", (callback) => {
      const buttons = [
        {
          name: "exportLogs",
          onClick: this.export,
        },
        {
          name: "copyLogs",
          onClick: this.copyText,
        },
      ];
      callback(buttons);
    });
    this.vConsole.addPlugin(vConsoleExportLogs);
    return vConsoleExportLogs;
  }
  funDownload = (content, filename) => {
    var eleLink = document.createElement("a");
    eleLink.download = filename;
    eleLink.style.display = "none";
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  }
  export = () => {
    let nodeArr = document.querySelectorAll(".vc-content .vc-log")[0].children
    let _str = ''
    for (let i = 0; i < nodeArr.length; i++) {
      const ele = nodeArr[i];
      _str+=`${ele.textContent}\n`
    }
    this.funDownload(_str,`${new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()}.log`)
  };
  copyText = () => {
    let nodeArr = document.querySelectorAll(".vc-content .vc-log")[0].children
    let _str = ''
    for (let i = 0; i < nodeArr.length; i++) {
      const ele = nodeArr[i];
      _str+=`${ele.textContent}\n`
    }
    copy(_str);
  };
}

window.VConsoleOutputLogsPlugin = VConsoleOutputLogsPlugin;

export default VConsoleOutputLogsPlugin;
