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
        return this.present(
          nx.mix(
            {
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  Promise.resolve({ code: 0, data: res });
                }
              }
            },
            inOptions
          )
        );
      },
      confirm: function(inOptions) {
        return this.present(
          nx.mix(
            {
              showCancel: true,
              success: function(res) {
                if (res.confirm) {
                  Promise.resolve({ code: 0, data: res });
                }
                if (res.cancel) {
                  Promise.resolve({ code: 1, data: res });
                }
              }
            },
            inOptions
          )
        );
      },
      dismiss: function() {}
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappModal;
  }
})();
