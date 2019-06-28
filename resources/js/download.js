function download(callback,data) {
	var ff = null;
	// 是否已经下载过
	var cd = osg.get(cacheKeys.downloads);
	if(cd) {
		cd = JSON.parse(cd);
		for(var j = 0; j < cd.length; j++) {
			if(data._id == cd[j]._id) {
				ff = cd[j].url;
				ff = plus.io.convertLocalFileSystemURL(ff);
				break;
			}
		}
	}
	if(ff) {
		var rff = ff;
		if(mui.os.ios) {
			if(!rff.indexOf('file://') == 0)
				rff = 'file://' + rff;
		}
		plus.io.resolveLocalFileSystemURL(rff, function(entry) {
			if(callback)
				callback(ff);
			else
				osg.toast("已下载成功过!");
		}, function(e) {
			// 文件不存在或其他原因
			doDownload(callback,data);
		});
	} else
		doDownload(callback,data);
}

function doDownload(callback,data) {
	osg.toast("已加入我的下载！");
	var logoUrl;
	osg.download(qiniuRoot+data.logo, function(fn) {
		plus.io.resolveLocalFileSystemURL(fn, function(file) {
			plus.io.resolveLocalFileSystemURL('_downloads', function(dir) {
				file.moveTo(dir, data.logo);
				var ul = '_downloads/' + data.logo;
				logoUrl = ul;
				ul = plus.io.convertLocalFileSystemURL(ul);
			});
		});

	},true);
	osg.download(data.fileidUrl, function(fn) {
		plus.io.resolveLocalFileSystemURL(fn, function(file) {
			plus.io.resolveLocalFileSystemURL('_downloads', function(dir) {
				var cd = osg.get(cacheKeys.downloads);
				if(!cd)
					cd = [];
				else
					cd = JSON.parse(cd);
				file.moveTo(dir, data._id+".mp3");
				var ul = '_downloads/' + data._id+".mp3";
				cd.push({
					"type": 1,
					"_id": data._id,
					"title": data.title,
					"fileid": data.fileidUrl,
					"url": ul,
					"logo": logoUrl,
					"strDuration": data.strDuration,
					"times": data.times
				});
				osg.set(cacheKeys.downloads, cd);
				if(callback) {
					ul = plus.io.convertLocalFileSystemURL(ul);
					callback(ul);
				}
			});
		});

	},true);
}

//下载过图标变换成带对号的
function hasDown(){
	var cd = osg.get(cacheKeys.downloads);
	if(cd) {
		cd = JSON.parse(cd);
		for(var j = 0; j < cd.length; j++) {
			$("[data-down='" + cd[j]._id + "']").html("&#xe653;").css("fontSize","1.2rem");
		}
	}
}
var downloadId="";
function fileDownload($this){
	var data = $this.data("data");
	if(downloadId && downloadId==data._id){
		osg.toast("已下载成功过!");
		return;
	}else{
		downloadId=data._id;
	}
	osg.set("dodownload",data);
	osg.evtFireEvent('dodownload');
}