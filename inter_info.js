//change the color of webpage to color when clike the icon
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.get(tabs[0].id, function(tab){
        chrome.storage.sync.get('phone', function(data){
          var reg_url = /sellercentral/; // amazon
          var reg_post_url = /kuronekoyamato/; // kuroneko
          var reg_post_click_url = /clickpost/; // click post
          // alert(tab.url);
          if (data.phone == '0' && reg_url.exec(tabs[0].url) != null)
          {
            chrome.tabs.executeScript(tabs[0].id, 
              {file: "fetch_text.js"});
          }
          else if (reg_post_url.exec(tabs[0].url) != null) // kuroneko
          {
              chrome.tabs.executeScript(tabs[0].id, 
                {file: "put_text.js"});
          }
          else if (reg_post_click_url.exec(tabs[0].url) != null) // click post
          {
              chrome.tabs.executeScript(tabs[0].id, 
                {file: "put_text_click_post.js"});
          }
          else
          {
            chrome.storage.sync.set({phone: '0'}, function(){
              alert('error!');
            });
            
          }
        });
        
      })
    }
    );
})