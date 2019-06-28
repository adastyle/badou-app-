myFunc(function() {
	
	var voice1Obj = $('.voice_item');
	voice1Obj.remove().removeClass("debug");
	playNowHom();
	//播放监听
	osg.evtAddListener(function(d) {
		if(d && d=="deleteIndexToHome"){
			var currDelIndex=localStorage.getItem("currDelIndex");
			var playList=$(".voice_list>.voice_item");
			if(currDelIndex && playList.length>0){
				for(var j=0;j<playList.length;j++){
					if(j==currDelIndex){
						playList[j].remove();
						/*如果当前音频被删除完了就不显示播放条了*/
						if(!$(".voice_list>li").length){
					 		$(".lookMoreRadio").hide();
					 		$(".audioListShadow").hide();
					 	}
					}
				}
			}
		}
		else if(d && (d == 'play')) { // 播放事件
			$(".play_bon").html("&#xe63c;");
			$(".allAudioPlay").find(".iconfont").html("&#xe683;");
			$(".allAudioPlay").find(".isPlayStop").html("全部暂停")
			var voice = osg.getObj('voice_now');
			$(".now_title").text(voice.title);
			if(voice.logo){
				var str = voice.logo.substring(0,3);
				if(isNaN(str)){
					$(".now_logo").attr('src', voice.logo);
				}else{
					$(".now_logo").attr("src",qiniuRoot+voice.logo+"!app.voicesmall.img");
				}
			}
			$('.lookMoreRadio').show();
			$(".currPlayActive").removeClass("currPlayActive");
			$("[data_playId='" + voice._id + "']").addClass("currPlayActive");
		} else if(d && (d == 'stop')){
			$(".play_bon").html("&#xe61d;");
			$(".allAudioPlay").find(".iconfont").html("&#xe685;");
			$(".allAudioPlay").find(".isPlayStop").html("全部播放")
		}else if(d && (d == 'update' || d == 'swapPlaylists')){
			var voice = osg.getObj('voice_now');
			playNowHom();
		}
	});
	
	$(".isPlay").tap(function() {
		event.stopPropagation(); // 禁止事件冒泡到父节点点击事件
		var isPaly = osg.get('isPlay');
		if(isPaly){
			osg.evtFireEvent('stop1');
		}else{
			osg.evtFireEvent('play1');
		}
	});
		/*点击播放列表*/
	$(".videoList").tap(function(){
		event.stopPropagation();
		$(".audioListShadow").show();
		$(".mui-bar").css("zIndex",0);
	});
	$(".closeList").tap(function(){
		$(".audioListShadow").hide();
		$(".mui-bar").css("zIndex",10);
	});
	$(".toAudioPlay").tap(function() {
		var detailsView = plus.webview.getWebviewById("details");
		if(detailsView){
			osg.evtFireEvent('update');
		}
		osg.open('audioPlay.html', {
		}, null, {
			im: 1,
			id:"details"
		});
	});
	/*列表最近播放点击事件*/
	$(".recents").tap(function(){
		osg.open('../home/hotListen.html', {
			"voiceInfo":"最近播放"
		}, null, {
			im: 1
		});
	});
	$(".playing").tap(function(){
		osg.evtFireEvent('screenplays');
	});
	
	var voice_cun = osg.getObj('voice_now');
	var detailsView = plus.webview.getWebviewById("details");
	if(voice_cun && detailsView){
		$('.lookMoreRadio').show();//页面加载先把播放条隐藏
		$(".now_title").text(voice_cun.title);
		var str = voice_cun.logo.substring(0,3);
		if(isNaN(str)){
			$(".now_logo").attr('src', voice_cun.logo);
		}else{
			$(".now_logo").attr('src', qiniuRoot + voice_cun.logo+"!app.voicesmall.img");
		}
	}
	//向播放列表添加内容
	function playNowHom(){
		var voiceData = osg.getObj('voice_now');
		$(".voice_list").children().remove();
		var voiceList = osg.getObj('voice_list');//从缓存里面取播放列表
		if(!voiceList&&voiceData){
			voiceList=[];
			voiceList.push(voiceData);
		}
		if(voiceList){
			for(var i = 0; i < voiceList.length; i++) {
				var voiceItemObj = voice1Obj.clone();
				if(voiceList[i]._id==voiceData._id){
					voiceItemObj.addClass("currPlayActive");
				}
				if(voiceList[i].logo){
					var str = voiceList[i].logo.substring(0,3);
					if(isNaN(str)){
						voiceItemObj.find(".voiceOne_logo").attr('src', voiceList[i].logo);
					}else{
						voiceItemObj.find(".voiceOne_logo").attr('src', qiniuRoot + voiceList[i].logo+"!app.voicesmall.img");
					}
				}
				voiceItemObj.find(".voiceOne_title").text(voiceList[i].title);
				voiceItemObj.find(".voiceOne_title").attr("data_playId",voiceList[i]._id);
				voiceItemObj.attr("voice_id",voiceList[i]._id);
				voiceItemObj.find(".voiceOne_title").tap(function() {
					event.stopPropagation(); // 禁止事件冒泡到父节点点击事件
					var id = $(this).attr("data_playId");
					osg.set('palylist_number',id);//更新当前播放的角标
					osg.evtFireEvent('palylist');
				});
				voiceItemObj.find(".delete").tap(function() {
					var currIndex= $(this).parent().index();
					var id= $(this).parent().attr("voice_id");
					osg.set('delete_id',id);
				 	$(this).parent().remove();
				 	localStorage.setItem("currDelIndexToPlay",currIndex);
				 	osg.evtFireEvent('deleteIndexToPlay');
				 	/*如果当前音频被删除完了就不显示播放条了*/
				 	if(!$(".voice_list>li").length){
				 		$(".lookMoreRadio").hide();
				 		$(".audioListShadow").hide();
				 	}
				});
				$(".voice_list").append(voiceItemObj);
			}
		}
		
	}
});
