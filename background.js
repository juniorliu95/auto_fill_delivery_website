chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    name: '', phone: '0', postcode: '0', add:'', province:'', city:'', machi:'',
    goods:'', goods_num:''
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: 'sellercentral.amazon.co.jp'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: 'kuronekoyamato'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: 'clickpost.jp'},
      }),
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
