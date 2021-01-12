chrome.storage.sync.get(['postcode', 'phone', 'name', 'add', 'province', 'city', 'machi', 'goods', 'goods_num'], function(data) {
    //receiver
    document.getElementById('consignee_zip_code').value = data.postcode;
    document.getElementsByClassName('w300')[2].value = data.name;
    document.getElementById('consignee_telephone').value = data.phone;
    document.getElementById('shipment_titleconsignee_address1').value = data.province;
    document.getElementById('consignee_address02').value = data.city;

    var add = data.add.trim();
    add = add.replace(data.province, '');
    add = add.replace(data.city, '');
    // add = add.replace(data.machi, '');
    var reg = /\(不在時宅配ボックス希望\)/;

    var add1 = reg.exec(add); // not at home
    var reg1 = /.*[0-9]+[-‐ー][0-9]+/;
    var add2 = reg1.exec(add); // the num of banchi
    var add = add.replace(add2, ''); // the last part
    if (!add2)
    {
        document.getElementById('consignee_address03').value = add;
    }
    else
    {
        document.getElementById('consignee_address03').value = add2;
        if (add)
        {
            if (add1)
            {
                add += add1;
            }
            document.getElementById('consignee_address04').value = add;
        }
    }
    
    
    //sender
    document.getElementById('shipper_telephone').value = '0782005302';
    document.getElementById('shipper_zip_code').value = '658-0032';
    document.getElementById('shipment_titleshipper_address1').value ='兵庫県';
    document.getElementById('shipper_address2').value ='神戸市東灘区';
    document.getElementById('shipper_address3').value ='向洋町中1-17';
    document.getElementsByClassName('w300')[5].value = 'DADDY\'S CHOICE JAPAN';

    //checker
    document.getElementById('is_post_all_master').click();

    // goods
    document.getElementById('item_name1').value = data.goods + ' ' + data.goods_num;
    
    chrome.storage.sync.set({phone: '0'});
    ;
            // alert('Information cleaned...');
})
//shipment_titleconsignee_address1 道都
//consignee_address02 市区郡町村
//consignee_address03 町・番地
//consignee_address04 マンション・ビル名
//class: w300 name