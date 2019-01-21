$((document)=>{
  // 初始化高度
  resetHeight()



  // 初始化商品
  $.ajax({
    type:"get",
    dataType:"json",
    url:"/resource/conf/good.json",
    async:true,
    success:function(result){
      let goodsArr = result;
      loadGood(goodsArr);
    },
    error:function(e){
      console.log('cuowu')
    }
  });
  // 加载按钮事件

  // pagination();

})
// 加载商品
function loadGood(arr){
  for (let i = 0;i<arr.length;i++) {
    var li = `<li class="shadow" onclick="addBuyList('${arr[i].goodName}',${arr[i].goodPrice},1,this)">${arr[i].goodName}<span class="price">$${arr[i].goodPrice}</span></li>`
    $('#showGoodsList').append(li);
  }
}

// 设置高度

  
    function resetHeight(){
    $('.nav').height($(document).height());
  }
  $(window).on('resize',function(){
    resetHeight();
  })


// 添加到购买列表.
function addBuyList(goodName,goodPrice,goodCount,e) {

  let have = false;
  let index = 0;
  let name = String(`${goodName}`);
  let div =`<div class="animated zoomInUp"><li class="buyName">${name}</li><li class="buyVar">${goodCount}</li><li class="buyVar">${goodPrice}</li><li class="buyVar remove">删除</li></div>`;
$(e).addClass('animated flip');
let row = document.querySelectorAll('.remove').length;
for(let i = 0;i<=row;i++){
  let text = $(`#buyList div:eq(${i}) li:eq(0)`).text();
  if(name === text){
    have = true;
    index = i;
    break;
  }
}
if(have){
let val = Math.floor($(`#buyList div:eq(${index}) li:eq(1)`).text());
$(`#buyList div:eq(${index}) li:eq(1)`).text(val+1);
}else{
  $('#buyList').append(div);
}
del(row);
}

// 删除功能
function del(row){
  for(let j =0;j<=row;j++){
    $('.remove').on('click',function(){
      $(this).parent().removeClass('zoomInUp');
      $(this).parent().addClass('rotateOut');
      setTimeout(() => {
        $(this).parent().remove();
        checkOut();
      }, 0);
    })
  }
  checkOut();
}

// 计算账单
function checkOut(){
    $('#buyList').scrollTop($('#buyList').height());

  let row = document.querySelectorAll('.remove').length;
  let totalCount = $('#allCount');
  let totalMoney = $('#allMoney');
  let allCount = 0;
  let allMoney = 0;
if(row == 0){
  console.log('shi 0 ')
  totalCount.text(0);
  totalMoney.text(0);
}else{
  for(let j=0;j<=row;j++){
   allCount += Math.floor($(`#buyList div:eq(${j}) li:eq(1)`).text());
   allMoney += Math.floor($(`#buyList div:eq(${j}) li:eq(1)`).text()) * Math.floor($(`#buyList div:eq(${j}) li:eq(2)`).text());
  }
  totalCount.text(allCount);
  totalMoney.text(allMoney);
}
}


// 重选按钮
function onloadButton(){
  $('.buyOperator button').eq(1).click(function(){
    $('#buyList').empty();
    $('#allCount').text(0);
    $('#allMoney').text(0);
  })
}


  
   
 



