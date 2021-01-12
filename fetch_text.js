// goods
var v_goods = '';
var v_goods_num = '';
var choice = document.getElementsByClassName('more-info-column-word-wrap-break-word')[0].innerText;
var num = document.getElementsByClassName('a-keyvalue')[0].children[1].children[0].children[4].innerText;
var price = document.getElementsByClassName('a-text-right')[4].innerText; // price per good

price = parseInt(/[0-9]*,*[0-9]+/.exec(price)[0].replace(',', ''));
reg_good_fhf = /デュポン タイベック防護服/;
reg_fhf = /防護服/;
reg_wmask = [/白/, /ホワイト/];
reg_bmask = [/青/, /ブルー/];
reg_kn95 = [/95/, /5層/];
if (reg_fhf.exec(choice))
{
  if (reg_good_fhf.exec(choice))
  {
    v_goods = 'デュポン タイベック防護服';
    if (/使い捨て用 M/.exec(choice))
      v_goods +='168~176';
    else if (/使い捨て用 M/.exec(choice))
      v_goods +='168~176';
    else if (/使い捨て用 M/.exec(choice))
      v_goods +='168~176';

    if (price<2300)
      v_goods_num = num;
    else if (price>2300)
      v_goods_num = (2*parseInt(num)).toString();
  }
  else
  {
    v_goods = '防護服';
    var size = /[0-9]*-*[0-9]*cm/.exec(choice);
    if (!size)
      {
        if (/FZzy 防護服/.exec(choice))
          v_goods += '120';
        if (/\(m/.exec(choice))
          v_goods += '168~176';
        if (/\(Ｌ/.exec(choice))
          v_goods += '165~180';
      }
    v_goods += size;

    if (price<2300)
      v_goods_num = num;
    else if (price>2300 && price<6000)
      v_goods_num = (3*parseInt(num)).toString();
    else if (price>6500 && price<8000)
      v_goods_num = (5*parseInt(num)).toString();
    else if (price>10000)
      v_goods_num = (10*parseInt(num)).toString();
    

  } 
}
else if (reg_kn95[0].exec(choice) || reg_kn95[1].exec(choice))
{
  v_goods = 'KN95';
  if (price < 1500)
    v_goods_num = '10*'+num;
  else
    v_goods_num = '20*'+num;
}
else if (reg_wmask[0].exec(choice) || reg_wmask[1].exec(choice))
{
  v_goods = 'WHITE-MASK';
  if (price<1000)
    v_goods_num = '50*'+num;
  else if (price>1000 && price<1500)
    v_goods_num = '100*'+num;
  else if (price>1500 && price<1800)
    v_goods_num = '50*'+(3*parseInt(num)).toString();
  else if (price>1850)
    v_goods_num = '200*'+num;
}
else if (reg_bmask[0].exec(choice) || reg_bmask[1].exec(choice))
{
  v_goods = 'BLUE-MASK';
  if (price<1000)
    v_goods_num = '50*'+num;
  else if (price>1500)
    v_goods_num = '200*'+num;
}


var elements = document.querySelectorAll('[data-test-id=shipping-section-buyer-address]')[0].children;
var len_elements = elements.length;

var v_phone = document.querySelectorAll('[data-test-id=shipping-section-phone]')[0].innerText
var v_postcode = elements[0].innerText.replace(/[\r\n]/g,"");
var v_name = elements[len_elements-1].innerText.replace(/[\r\n]/g,"");
var v_province; var v_city; var v_machi;

var v_add = '';
var index = 0;
for (element of elements)
{
    if (index != 0 && index != len_elements-1)
    {
        // alert(element.innerText.replace(/[\r\n]/g,""));
        v_add = v_add + element.innerText.replace(/[\r\n]/g,"");  
    }
    index += 1;

}

// get address from postcode
var text;
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
  if(xhttp.readyState == 4 && xhttp.status == 200){
    //   console.log(xhttp.responseText);
      act_on_response(xhttp.responseText);
  }
}
function act_on_response(res)
{
  var json = JSON.parse(res);
  v_province = json.results[0].address1;
  v_city = json.results[0].address2; 
  v_machi = json.results[0].address3;
  chrome.storage.sync.set({postcode: v_postcode, phone: v_phone, add: v_add, name: v_name, 
    province:v_province, city:v_city, machi:v_machi, goods:v_goods, goods_num:v_goods_num});
  alert(v_machi);
}
xhttp.open("GET", "https://zipcloud.ibsnet.co.jp/api/search?zipcode="+v_postcode, true);
xhttp.send();
// alert('information copied...');