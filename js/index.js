$(function(){
	$('.kaishi').on('click',function(){
		$('.kaishi').css('display','none')
		$('#canvas').css('display','block')
	})
	var canvass=600;
	var row=15;
	var blocks=canvass/row;
	var ctx=$('#canvas').get(0).height=canvass;
	var ctx=$('#canvas').get(0).width=canvass;
	var starRadius=5;
    var ctx=$('#canvas').get(0).getContext('2d')
	var draw=function(){
		var ctx=$('#canvas').get(0).getContext('2d')
		var jiange=blocks/2+0.5;
		var lineWidth=canvass-blocks

		ctx.save();
		ctx.beginPath();
		for(var i=0;i<row;i++){
			if(i===0){
				ctx.translate(jiange,jiange)
			}else{
				ctx.translate(0,blocks)
			}
			ctx.moveTo(0,0)
			ctx.lineTo(lineWidth,0)
			
		}
		ctx.stroke()
		ctx.closePath();
		ctx.restore();

		ctx.save();
		ctx.beginPath();
		for(var i=0;i<row;i++){
			if(i===0){
				ctx.translate(jiange,jiange)
			}else{
				ctx.translate(blocks,0)
			}
			ctx.moveTo(0,0)
			ctx.lineTo(0,lineWidth)
			
		}
		ctx.stroke()
		ctx.closePath();
		ctx.restore();


        var points=[3.5*blocks+0.5,11.5*blocks+0.5]
        for(var i=0;i<2;i++){
        	for(var j=0;j<2;j++){
        		var x=points[i];
        		var y=points[j];
        		ctx.save()
				ctx.beginPath()
				ctx.translate(x,y)
				ctx.arc(0,0,starRadius,0,(Math.PI/180)*360)
				ctx.fill()
				ctx.closePath()
				ctx.restore()
        	}
        }
        ctx.save()
		ctx.beginPath()
		ctx.translate(7.5*blocks+0.5,7.5*blocks+0.5)
		ctx.arc(0,0,starRadius,0,(Math.PI/180)*360)
		ctx.fill()
		ctx.closePath()
		ctx.restore()
	}
	draw()


	// var drop=function(qizi){
	// 	var ctx=$('#canvas').get(0).getContext('2d')
	// 	ctx.save();
	// 	ctx.beginPath();
	// 	ctx.translate((qizi.x+0.5)*blocks,(qizi.y+0.5)*blocks)
	// 	ctx.arc(0,0,15,0,(Math.PI/180)*360)
		
 //     if(qizi.color===1){
 //     	ctx.fillStyle="#ccc";
 //     	ctx.arc(0,0,15,0,(Math.PI/180)*360)
 //     	// $('#black').get(0).play();
 //     }else if(qizi.color==0){
 //     	ctx.fillStyle="red";
 //     	ctx.arc(0,0,15,0,(Math.PI/180)*360)
 //     	// $('#white').get(0).play();
 //     }
 //     ctx.fill()
 //     ctx.closePath()
 //     ctx.restore()
	// }

	// ////点击落子
 //   var kaiguan=true
 //   var step=0;
 //   var All={}
 //   $('#canvas').on('click',function(e){
 //   	var x=Math.floor(e.offsetX/blocks)
 //   	var y=Math.floor(e.offsetY/blocks)
 //   	if(All[x+'-'+y]){
 //   		return;
 //   	}
 //   	if(kaiguan){
 //   		var qizi={x:x,y:y,color:1,step:step++}
 //   		drop(qizi)
 //   		kaiguan=false;
 //   	}else{
 //   		var qizi={x:x,y:y,color:0,step:step++}
 //   		drop(qizi)
 //   		kaiguan=true;
 //   	}
 //   	All[x+'-'+y]=qizi;
 //   })
 //   var img = new Image();
 //    img.src = "images/1.png";




 var qiziRadius = blocks/2*0.8;

  var drop = function(qizi){
  	var ctx=$('#canvas').get(0).getContext('2d')
    ctx.save();
    ctx.beginPath();
    ctx.translate((qizi.x+0.5)*blocks + 0.5, (qizi.y+0.5)*blocks + 0.5);
    ctx.arc(0,0,qiziRadius,0,Math.PI/180*360);
    if( qizi.color === 1){
    	ctx.fillStyle="#000";
        ctx.fill();
    }else{
	    ctx.fillStyle="#fff";
	    ctx.fill();    }
	    ctx.closePath();
	    ctx.restore();
  }

  var kaiguan = true;
  all = {};
  var step = 1;

  panduan = function(qizi){
    var shuju = {};
    $.each(all,function(k,v){
      if( v.color === qizi.color ){
        shuju[k] = v;
      }
    })
    var shu = 1,hang=1,zuoxie=1,youxie=1;
    var tx,ty;

    /*|*/
    tx = qizi.x; ty = qizi.y;
    while ( shuju [ tx + '-' + (ty + 1) ]){
      shu ++;ty++;
    }
    tx = qizi.x; ty = qizi.y;
    while ( shuju [ tx + '-' + (ty - 1) ]){
      shu ++; ty--;
    }

    /*-*/
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + ty ] ){
      hang++;tx++;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + ty ] ){
      hang++;tx--;
    }

    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + (ty-1) ] ){
      zuoxie++;tx--;ty--;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + (ty+1) ] ){
      zuoxie++;tx++;ty++;
    }

    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + (ty-1) ] ){
      youxie++;tx++;ty--;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + (ty+1) ] ){
      youxie++;tx--;ty++;
    }

    if( shu >=5  || hang>=5 || zuoxie>=5 || youxie>=5){
      return true;
    }
  }

 $('#canvas').on('click',function(e){
    var x = Math.floor(e.offsetX/blocks);
    var y = Math.floor(e.offsetY/blocks);

    if( all[ x + '-' + y ]){
      return;
    }

    var qizi;

    if(kaiguan){
      qizi = {x:x,y:y,color:1,step:step};
      drop(qizi);
      if( panduan(qizi) ){
        $('.cartel').show().find('#hying').text('display','block');
      };
    }else{
      qizi = {x:x,y:y,color:0,step:step};
      drop(qizi);
      if( panduan(qizi) ){
      	$('.cartel').show().find('.bying').text('display','block');
        return;
      };
    }
    step += 1;
    kaiguan = !kaiguan;
    all[ x + '-' + y ] = qizi;

  });

  $("#restart").on('click',function(){
    $('.cartel').hide();
    ctx.clearRect(0,0,600,600);
    draw();
    kaiguan = true;
    all = {};
    step = 1;
  })

  $('#qipu').on('click',function(){
    $('.cartel').hide();
    $('#save').show();
    ctx.save();
    ctx.font = "20px consolas";
    for( var i in all){
      if( all[i].color === 1){
          ctx.fillStyle = '#fff';
      }else{
        ctx.fillStyle = 'black';
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(all[i].step,
        (all[i].x+0.5)*blocks,
        (all[i].y+0.5)*blocks);
    }
    ctx.restore();
    var image = $('#canvas').get(0).toDataURL('image/jpg',1);
    $('#save').attr('href',image);
    $('#save').attr('download','qipu.png');
  })

  $('.tips').on('click',false);
  $('#close').on('click',function(){
      $('.cartel').hide();
  })
  $('.cartel').on('click',function(){
    $(this).hide();
  })

})