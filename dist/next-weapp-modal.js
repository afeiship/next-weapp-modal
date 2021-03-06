(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var nxWxPromisify = nx.wxPromisify || require('next-wx-promisify');
  var wx = global.wx;
  var DEFAULT_OPTIONS = { title: '提示' };

  var NxWeappModal = nx.declare('nx.WeappModal', {
    statics: {
      present: function(inOptions) {
        return new Promise(function(resolve, reject) {
          var options = nx.mix(nxWxPromisify(resolve, reject), DEFAULT_OPTIONS, inOptions);
          wx.showModal(options);
        });
      },
      alert: function(inOptions) {
        return this.present(nx.mix({ showCancel: false }, inOptions));
      },
      confirm: function(inOptions) {
        return this.present(nx.mix({ showCancel: true }, inOptions)).then(function(res) {
          var data = res.data;
          if (data.confirm) {
            return Promise.resolve({ code: 0, data: data });
          }
          if (data.cancel) {
            return Promise.resolve({ code: 1, data: data });
          }
        });
      },
      dismiss: function() {}
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappModal;
  }
})();
