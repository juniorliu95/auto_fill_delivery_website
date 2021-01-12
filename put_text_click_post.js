chrome.storage.sync.get(['postcode', 'phone', 'name', 'add', 'province', 'city', 'machi', 'goods', 'goods_num'], function(data) {
    //receiver
    document.getElementById('package_zip').value = data.postcode;
    document.getElementById('package_receiver_name').value = data.name;
    if (data.add.length < 20)
        document.getElementById('package_receiver_address').value = data.add+'\n'+data.phone;
    else
    {
        add = data.add;
        text = '';
        for (let i=0;i<add.length;i++)
        {
            if (i % 19 == 0 && i!=0)
            {
                text += add[i]+'\n';
            }
            else
            {
                text += add[i];
            }                
        }
        document.getElementById('package_receiver_address').value = text+'\n'+data.phone;
    }

    //checker
    // document.getElementById('is_post_all_master').click();

    //goods
    document.getElementById('package_print_title').value = data.goods + ' ' + data.goods_num;

    chrome.storage.sync.set({phone: '0'});
    ;
            // alert('Information cleaned...');
})