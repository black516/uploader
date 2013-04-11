KISSY.add("gallery/uploader/1.4/base",function(d,j,i,e,b,c,a,f,g){function h(a){h.superclass.constructor.call(this,a)}d.mix(h,{type:{AUTO:"auto",IFRAME:"iframe",AJAX:"ajax",FLASH:"flash"},event:{SELECT:"select",ADD:"add",START:"start",PROGRESS:"progress",COMPLETE:"complete",SUCCESS:"success",UPLOAD_FILES:"uploadFiles",CANCEL:"cancel",ERROR:"error",REMOVE:"remove",RESTORE:"restore"},status:{WAITING:"waiting",START:"start",PROGRESS:"progress",SUCCESS:"success",CANCEL:"cancel",ERROR:"error"}});d.extend(h,
j,{upload:function(a){if(!d.isNumber(a))return!1;var b=this.get("uploadType"),f=this.get("type"),c=this.get("queue"),g=c.get("files")[a],e;if(!d.isPlainObject(g))return d.log("[uploader]:\u961f\u5217\u4e2d\u4e0d\u5b58\u5728id\u4e3a"+a+"\u7684\u6587\u4ef6"),!1;if(""!=this.get("curUploadIndex"))return alert("\u7b2c"+this.get("curUploadIndex")+"\u6587\u4ef6\u6b63\u5728\u4e0a\u4f20\uff0c\u8bf7\u4e0a\u4f20\u5b8c\u540e\u518d\u64cd\u4f5c\uff01"),!1;e=g.input.id||g.input;"ajax"==f&&(e=g.data);if("error"===g.status)return!1;this.set("curUploadIndex",a);this.fire(h.event.START,{index:a,file:g});if(!this.get("isAllowUpload"))return!1;c.fileStatus(a,
h.status.START);b.upload(e)},cancel:function(a){var b=this.get("uploadType"),f=this.get("queue"),c=h.status,g=f.fileStatus(a);d.isNumber(a)&&g!=c.SUCCESS?(b.stop(),f.fileStatus(a,c.CANCEL)):(b.stop(),this._continueUpload());return this},stop:function(){this.set("uploadFilesStatus","");this.cancel();return this},uploadFiles:function(a){d.isString(a)||(a=h.status.WAITING);this.set("uploadFilesStatus",a);this._uploaderStatusFile(a);return this},_uploaderStatusFile:function(a){a=this.get("queue").getIndexs(a);
if(!a.length)return this.set("uploadFilesStatus",""),this.fire(h.event.UPLOAD_FILES),!1;this.upload(a[0]);return this},isSupportAjax:function(){var a=!1;try{FormData&&(a=!0)}catch(b){a=!1}return a},isSupportFlash:function(){var a=d.UA.fpv();return d.isArray(a)&&0<a.length},_renderUploaderCore:function(){var a=this,b=a.get("type"),b=a.getUploadType(b);if(!b)return!1;var f={action:a.get("action"),data:a.get("data"),dataType:"json"},c=a.get("button");a.get("type")==h.type.FLASH&&d.mix(f,{swfUploader:c.get("swfUploader")});
f.fileDataName=a.get("name");f=new b(f);b=b.event;f.on(b.SUCCESS,a._uploadCompleteHanlder,a);f.on(b.ERROR,function(b){a.fire(event.ERROR,{status:b.status,result:b.result});a._continueUpload()},a);if(b.PROGRESS)f.on(b.PROGRESS,a._uploadProgressHandler,a);f.on(b.STOP,a._uploadStopHanlder,a);a.set("uploadType",f);return f},getUploadType:function(a){var b=this,f=h.type,c;a==f.AUTO&&(a=[f.AJAX,f.IFRAME]);d.isArray(a)&&0<a.length?d.each(a,function(a){if(c=b._getType(a))return!1}):c=b._getType(a);return c},
_getType:function(a){var f=h.type,g=this.isSupportAjax(),i=this.isSupportFlash();switch(a){case f.IFRAME:f=e;break;case f.AJAX:f=g&&b||!1;break;case f.FLASH:f=i&&c||!1;break;default:return d.log("[uploader]:type\u53c2\u6570\u4e0d\u5408\u6cd5"),!1}f&&d.log("[uploader]:\u4f7f\u7528"+a+"\u4e0a\u4f20\u65b9\u5f0f");this.set("type",a);return f},_renderButton:function(){var b,c;c=this.get("type");b=this.get("target");var g=this.get("multiple"),e=this.get("disabled"),g={name:this.get("name"),multiple:g,disabled:e};c==h.type.FLASH?(c=f,d.mix(g,{size:this.get("swfSize")})):
c=a;b=new c(b,g);b.on("change",this._select,this);b.render();this.set("button",b);return b},_renderQueue:function(){var a=this,b=new g;b.set("uploader",a);b.on("add",function(b){a.fire(h.event.ADD,b)});b.on("remove",function(b){a.fire(h.event.REMOVE,b)});a.set("queue",b);return b},_select:function(a){var b=this,f=b.get("autoUpload"),c=b.get("queue"),g=b.get("curUploadIndex"),e=a.files;d.each(e,function(b){b.size||(b.size=0);b.name||(b.name=b.fileName||"");b.input=a.input||b});e=b._processExceedMultiple(e);
b.fire(h.event.SELECT,{files:e});if(!b.get("isAllowUpload"))return!1;c.add(e,function(){""==g&&f&&b.uploadFiles()})},_processExceedMultiple:function(a){var b=this.get("multipleLen");return 0>b||!d.isArray(a)||!a.length?a:d.filter(a,function(a,f){return f<b})},_uploadCompleteHanlder:function(a){var a=a.result,b,f=h.event,c=this.get("queue"),g=this.get("curUploadIndex");if(!d.isObject(a))return!1;c.updateFile(g,{result:a});b=Number(a.status);1===b?(c.fileStatus(g,h.status.SUCCESS),this._success(a.data),
this.fire(f.SUCCESS,{index:g,file:c.getFile(g),result:a})):(c.fileStatus(g,h.status.ERROR,{msg:a.msg||a.message||"",result:a}),this.fire(f.ERROR,{status:b,result:a,index:g,file:c.getFile(g)}));this.set("curUploadIndex","");this.fire(f.COMPLETE,{index:g,file:c.getFile(g),result:a});this._continueUpload()},_uploadStopHanlder:function(){var a=this.get("queue"),b=this.get("curUploadIndex");a.fileStatus(b,h.status.CANCEL);this.set("curUploadIndex","");this.fire(h.event.CANCEL,{index:b})},_continueUpload:function(){var a=
this.get("uploadFilesStatus");""!=a&&this._uploaderStatusFile(a)},_uploadProgressHandler:function(a){var b=this.get("queue"),f=this.get("curUploadIndex"),c=b.getFile(f);d.mix(a,{file:c});b.fileStatus(f,h.status.PROGRESS,a);this.fire(h.event.PROGRESS,a)},_success:function(a){if(!d.isObject(a))return!1;var a=a.url,b=this.get("curUploadIndex"),f=this.get("queue");if(!d.isString(a))return!1;f.updateFile(b,{sUrl:a})}},{ATTRS:{button:{value:{}},queue:{value:{}},curUploadIndex:{value:""},uploadType:{value:{}},
urlsInput:{value:""},uploadFilesStatus:{value:""},swfSize:{value:{}}}});return h},{requires:"base,node,./type/iframe,./type/ajax,./type/flash,./button/base,./button/swfButton,./queue".split(",")});
KISSY.add("gallery/uploader/1.4/button/base",function(d,j,i){function e(c,a){a=d.merge({target:b(c)},a);e.superclass.constructor.call(this,a)}var b=j.all;d.mix(e,{event:{beforeShow:"beforeShow",afterShow:"afterShow",beforeHide:"beforeHide",afterHide:"afterHide",beforeRender:"beforeRender",afterRender:"afterRender",CHANGE:"change"},getFileName:function(b){return b.replace(/.*(\/|\\)/,"")}});d.extend(e,i,{render:function(){var b=this.get("target");if(!1===this.fire(e.event.beforeRender))return d.log("[Uploader-Button] button render was prevented."),
!1;if(null==b)return d.log("[Uploader-Button] Cannot find target!"),!1;this._createInput();this.fire(e.event.afterRender);return this},show:function(){this.get("target").show();this.fire(e.event.afterShow);return e},hide:function(){this.get("target").hide();this.fire(e.event.afterHide);return e},reset:function(){var c=this.get("inputContainer");b(c).remove();this.set("inputContainer","");this.set("fileInput","");this._createInput();return this},_createInput:function(){var c=this.get("target"),a=this.get("name"),
f=this.get("tpl");if(!d.isString(a)||!d.isString(f))return d.log("[Uploader-Button] No name or tpl specified."),!1;a=d.substitute(f,{name:a});a=b(a);b(a).appendTo(c);c=b(a).children("input");6==d.UA.ie&&c.css("fontSize","400px");b(c).on("change",this._changeHandler,this);this.set("fileInput",c);this.set("inputContainer",a);this._setDisabled(this.get("disabled"));this._setMultiple(this.get("multiple"));return a},_changeHandler:function(c){var a=this.get("fileInput"),f=b(a).val(),c=c.target.files,g=
[];if(""==f)return d.log("[Uploader-Button] No file selected."),!1;c?d.each(c,function(a){d.isObject(a)&&g.push({name:a.name,type:a.type,size:a.size,data:a})}):g.push({name:e.getFileName(f)});this.fire(e.event.CHANGE,{files:g,input:a.getDOMNode()});this.reset()},_setDisabled:function(c){var a=this.get("cls").disabled,f=this.get("target"),g=this.get("fileInput");if(!f.length||!d.isBoolean(c))return!1;c?(f.addClass(a),b(g).hide()):(f.removeClass(a),b(g).show());return c},_setMultiple:function(b){var a=
this.get("fileInput");if(!a.length)return!1;b&&a.attr("multiple","multiple")||a.removeAttr("multiple");return b}},{ATTRS:{target:{value:null},fileInput:{value:""},inputContainer:{value:""},tpl:{value:'<div class="file-input-wrapper" style="overflow: hidden;"><input type="file" name="{name}" hidefocus="true" class="file-input" /></div>'},name:{value:"fileInput",setter:function(c){this.get("fileInput")&&b(this.get("fileInput")).attr("name",c);return c}},disabled:{value:!1,setter:function(b){this._setDisabled(b);
return b}},multiple:{value:!0,setter:function(b){this._setMultiple(b);return b}},cls:{value:{disabled:"uploader-button-disabled"}}}});return e},{requires:["node","base"]});
KISSY.add("gallery/uploader/1.4/button/swfButton",function(d,j,i,e){function b(a,f){f=d.merge({target:c(a)},f);b.superclass.constructor.call(this,f)}var c=j.all;d.mix(b,{event:{RENDER:"render",CHANGE:"change",MOUSE_OVER:"mouseOver",MOUSE_DOWN:"mouseDown",MOUSE_UP:"mouseUp",MOUSE_OUT:"mouseOut",CLICK:"click"}});d.extend(b,i,{render:function(){var a=this,f=a.get("target"),c,d=a.get("multiple"),e=a.get("fileFilters");f.css("position","relative");a.set("swfWrapper",a._createSwfWrapper());a._setFlashSizeConfig();
c=a._initSwfUploader();c.on("contentReady",function(){c.browse(d,e);a._bindBtnEvent();c.on("fileSelect",a._changeHandler,a);a._setDisabled(a.get("disabled"));a.fire(b.event.RENDER)},a)},_createSwfWrapper:function(){var a=this.get("target"),b=this.get("tpl"),g=""!=this.get("swfWrapperId")&&this.get("swfWrapperId")||"swf-uploader-wrapper-"+d.guid(),b=d.substitute(b,{id:g});this.set("swfWrapperId",g);return c(b).appendTo(a)},_initSwfUploader:function(){var a=this.get("flash"),b=this.get("swfWrapperId"),
c;d.mix(a,{id:"swfUploader"+d.guid()});try{c=new e(b,a),this.set("swfUploader",c)}catch(h){}return c},_bindBtnEvent:function(){var a=this,f=b.event,c=a.get("swfUploader");if(!c)return!1;d.each(f,function(b){c.on(b,function(){a.fire(b)},a)});return a},_setFlashSizeConfig:function(){var a=this.get("flash"),b=this.get("target"),c=this.get("size");d.isEmptyObject(c)?d.mix(a.attrs,{width:b.innerWidth(),height:b.innerHeight()}):d.mix(a.attrs,c);this.set("flash",a)},_changeHandler:function(a){this.fire(b.event.CHANGE,
{files:a.fileList})},_setDisabled:function(a){var b=this.get("swfUploader"),c=this.get("cls").disabled,e=this.get("target"),i=this.get("swfWrapper");if(!b||!d.isBoolean(a))return!1;a?(e.addClass(c),i.css("top","-3000px")):(e.removeClass(c),i.css("top",0));return a},show:function(){this.get("target").show()},hide:function(){this.get("target").hide()}},{ATTRS:{target:{value:""},swfWrapper:{value:""},swfWrapperId:{value:""},tpl:{value:'<div id="{id}" class="uploader-button-swf" style="position: absolute;top:0;left:0;z-index:2000;"></div>'},
multiple:{value:!0,setter:function(a){var b=this.get("swfUploader");b&&b.multifile(a);return a}},fileFilters:{value:[],setter:function(a){var b=this.get("swfUploader");d.isObject(a)&&(a=[a]);b&&d.isArray(a)&&d.later(function(){b.filter(a)},800);return a}},disabled:{value:!1,setter:function(a){this.get("swfUploader")&&this._setDisabled(a);return a}},cls:{value:{disabled:"uploader-button-disabled"}},size:{value:{}},flash:{value:{src:"http://a.tbcdn.cn/s/kissy/gallery/uploader/1.4/plugins/ajbridge/uploader.swf",
id:"swfUploader",params:{bgcolor:"#fff",wmode:"transparent"},attrs:{},hand:!0,btn:!0}},swfUploader:{value:""}}});return b},{requires:["node","base","../plugins/ajbridge/uploader"]});
KISSY.add("gallery/uploader/1.4/index",function(d,j,i,e,b){var c=j.all,a=e.extend([i],{constructor:function(b,c){a.superclass.constructor.call(this,c);this.set("target",b);this._init()},_init:function(){if(!this.get("target").length)return d.log("\u76ee\u6807\u5143\u7d20\u4e0d\u5b58\u5728\uff01"),!1;this._replaceBtn();this._renderButton();this._renderQueue();this._renderUploaderCore();return this},_replaceBtn:function(){var a=this.get("target");if(!a.length)return!1;var b=a[0].defaultValue||"\u4e0a\u4f20\u6587\u4ef6",b=d.substitute(this.get("btnTpl"),{text:b}),
b=c(b).insertAfter(a);!this.get("name")&&a.attr("name")&&this.set("name",a.attr("name"));this.set("_oldInput",a.clone());a.remove();this.set("target",b);return b},theme:function(a){var b=this.get("theme");if(!a)return!1;if(b)return d.log("\u4e0d\u652f\u6301\u91cd\u65b0\u6e32\u67d3\u4e3b\u9898\uff01"),this;a.set("uploader",this);a.set("queue",this.get("queue"));a.render&&a.render();this.fire("themeRender",{theme:b,uploader:this});this.set("theme",a);return this},restore:function(a){var g=this,e;if(a){a=c(a);if(!a.length)return d.log("restore()\uff1a\u4e0d\u5b58\u5728target\uff01"),
!1;e=a.text()}else{a=g.get("theme");if(!a)return!1;a=a.get("queueTarget");if(!a||!a.length)return!1;a.all("script").each(function(a){"text/uploader-files"==a.attr("type")&&(e=a.text())})}e=b.parse(e);if(!e.length)return!1;var i=g.get("queue"),j;d.each(e,function(a){a.status=1;j={type:"restore",name:a.name||"",url:a.url||"",result:a};var a=i.add(j),b=a.id,c=i.getFileIndex(b);i.fileStatus(c,"success",{index:c,id:b,file:a});g.fire("success",{file:a,result:a.result})})}},{ATTRS:{target:{value:"",getter:function(a){return c(a)}},
fileInput:{value:"",getter:function(){return this.get("target").all(".file-input")}},theme:{value:""},btnTpl:{value:'<a href="javascript:void(0)" class="g-u ks-uploader-button"><span class="btn-text">{text}</span></a>'},button:{value:{}},queue:{value:{}},type:{value:"auto"},multiple:{value:!1,setter:function(a){var b=this.get("button");!d.isEmptyObject(b)&&d.isBoolean(a)&&b.set("multiple",a);return a}},multipleLen:{value:-1},disabled:{value:!1,setter:function(a){var b=this.get("button");!d.isEmptyObject(b)&&
d.isBoolean(a)&&b.set("disabled",a);return a}},action:{value:"",setter:function(a){var b=this.get("uploadType");b&&b.set("action",a);return a}},data:{value:{},setter:function(a){if(d.isObject(a)){var b=this.get("uploadType");b&&b.set("data",a)}return a}},isAllowUpload:{value:!0},autoUpload:{value:!0},filter:{value:"",setter:function(a){var b=this.get("uploadType");b&&b.set("filter",a);return a}},curUploadIndex:{value:""},uploadType:{value:""},swfSize:{value:{}}}},"Uploader");return a},{requires:["node",
"./base","rich-base","json"]});
KISSY.add("gallery/uploader/1.4/queue",function(d,j,i){function e(b){e.superclass.constructor.call(this,b)}d.mix(e,{event:{ADD:"add",ADD_FILES:"addFiles",REMOVE:"remove",CLEAR:"clear",FILE_STATUS:"statusChange",UPDATE_FILE:"updateFile"},status:{WAITING:"waiting",START:"start",PROGRESS:"progress",SUCCESS:"success",CANCEL:"cancel",ERROR:"error",RESTORE:"restore"},FILE_ID_PREFIX:"file-"});d.extend(e,i,{add:function(b,c){var a=this,f={};if(0<b.length){var f=[],e=a.get("uploader"),h=a.get("files").length,
i=0<e.get("max");d.each(b,function(b,c){i?e.get("max")>=h+c+1&&f.push(a._addFile(b)):f.push(a._addFile(b))})}else f=a._addFile(b);c&&c.call(a);return f},_addFile:function(b,c){if(!d.isObject(b))return d.log("[uploader-queue]:_addFile()\u53c2\u6570file\u4e0d\u5408\u6cd5\uff01"),!1;var a=this._setAddFileData(b),f=this.getFileIndex(a.id),g=this.get("fnAdd");d.isFunction(g)&&(a=g(f,a));this.fire(e.event.ADD,{index:f,file:a,uploader:this.get("uploader")});c&&c.call(this,f,a);return a},remove:function(b,c){var a=this.get("files"),f;
d.isString(b)&&(b=this.getFileIndex(b));f=a[b];if(!d.isObject(f))return d.log("[uploader-queue]:remove()\u4e0d\u5b58\u5728index\u4e3a"+b+"\u7684\u6587\u4ef6\u6570\u636e"),!1;a=d.filter(a,function(a,c){return c!==b});this.set("files",a);this.fire(e.event.REMOVE,{index:b,file:f});c&&c.call(this,b,f);return f},clear:function(){function b(){a=c.get("files");if(!a.length)return c.fire(e.event.CLEAR),!1;c.remove(0,function(){b()})}var c=this,a;b()},fileStatus:function(b,c,a){if(!d.isNumber(b))return!1;var f=this.getFile(b);this.get("theme");var g;
if(!f)return!1;g=f.status;if(!c)return g;if(g==c)return this;this.updateFile(b,{status:c});this.fire(e.event.FILE_STATUS,{index:b,status:c,args:a,file:f});return this},getFile:function(b){if(!d.isNumber(b))return!1;b=this.get("files")[b];d.isPlainObject(b)||(b={});return b},getFileIndex:function(b){var c=this.get("files"),a=-1;d.each(c,function(c,d){if(c.id==b)return a=d,!0});return a},updateFile:function(b,c){if(!d.isNumber(b))return!1;if(!d.isObject(c))return d.log("[uploader-queue]:updateFile()\u7684data\u53c2\u6570\u6709\u8bef\uff01"),
!1;var a=this.get("files"),f=this.getFile(b);if(!f)return!1;d.mix(f,c);a[b]=f;this.set("files",a);this.fire(e.event.UPDATE_FILE,{index:b,file:f});return f},getIndexs:function(b){var c=this.get("files"),a,f=[];if(!c.length)return f;d.each(c,function(c,e){d.isObject(c)&&(a=c.status,a==b&&f.push(e))});return f},getFiles:function(b){var c=this.get("files"),a=[];if(!c.length)return[];d.each(c,function(c){c&&c.status==b&&a.push(c)});return a},_setAddFileData:function(b){var c=this.get("files");if(!d.isObject(b))return d.log("[uploader-queue]:_updateFileData()\u53c2\u6570file\u4e0d\u5408\u6cd5\uff01"),
!1;b.id||(b.id=d.guid(e.FILE_ID_PREFIX));if(b.size){var a;a=b.size;var f=-1;do a/=1024,f++;while(99<a);a=Math.max(a,0.1).toFixed(1)+"kB,MB,GB,TB,PB,EB".split(",")[f];b.textSize=a}b.status="waiting";c.push(b);return b}},{ATTRS:{fnAdd:{value:""},files:{value:[]},uploader:{value:""}}});return e},{requires:["node","base"]});
KISSY.add("gallery/uploader/1.4/type/ajax",function(d,j,i){function e(b){e.superclass.constructor.call(this,b)}d.mix(e,{event:d.merge(i.event,{PROGRESS:"progress"})});d.extend(e,i,{upload:function(b){if(!b)return d.log("[uploader-AjaxType]:upload()\uff0cfileData\u53c2\u6570\u6709\u8bef\uff01"),!1;this._setFormData();this._addFileData(b);this.send();return this},stop:function(){var b=this.get("xhr");if(!d.isObject(b))return d.log("[uploader-AjaxType]:stop()\uff0cio\u503c\u9519\u8bef\uff01"),!1;b.abort();this.fire(e.event.STOP);return this},send:function(){var b=
this,c=b.get("action"),a=b.get("formData"),d=new XMLHttpRequest;d.upload.addEventListener("progress",function(a){b.fire(e.event.PROGRESS,{loaded:a.loaded,total:a.total})});d.onload=function(){var a=b._processResponse(d.responseText);b.fire(e.event.SUCCESS,{result:a})};d.open("POST",c,!0);a.append("type","ajax");d.send(a);b._setFormData();b.set("xhr",d);return b},_setFormData:function(){try{this.set("formData",new FormData),this._processData()}catch(b){d.log("[uploader-AjaxType]:something error when reset FormData."),
d.log(b,"dir")}},_processData:function(){var b=this.get("data"),c=this.get("formData");d.each(b,function(a,b){c.append(b,a)});this.set("formData",c)},_addFileData:function(b){if(!d.isObject(b))return d.log("[uploader-AjaxType]:_addFileData()\uff0cfile\u53c2\u6570\u6709\u8bef\uff01"),!1;var c=this.get("formData"),a=this.get("fileDataName");c.append(a,b);this.set("formData",c)}},{ATTRS:{formData:{value:""},ajaxConfig:{value:{type:"post",processData:!1,cache:!1,dataType:"json",contentType:!1}},xhr:{value:""},fileDataName:{value:""},
form:{value:{}},fileInput:{value:""}}});return e},{requires:["node","./base"]});
KISSY.add("gallery/uploader/1.4/type/base",function(d,j,i){function e(b){e.superclass.constructor.call(this,b)}d.mix(e,{event:{START:"start",STOP:"stop",SUCCESS:"success",ERROR:"error"}});d.extend(e,i,{upload:function(){},stop:function(){},_processResponse:function(b){var c=this.get("filter"),a={};""!=c&&(b=c.call(this,b));if(d.isString(b))try{a=d.JSON.parse(b),a=this._fromUnicode(a)}catch(f){b+="\uff0c\u8fd4\u56de\u7ed3\u679c\u96c6responseText\u683c\u5f0f\u4e0d\u5408\u6cd5\uff01",d.log(b),this.fire("error",{status:-1,result:{msg:b}})}else d.isObject(b)&&
(a=this._fromUnicode(b));d.log("\u670d\u52a1\u5668\u7aef\u8f93\u51fa\uff1a"+d.JSON.stringify(a));return a},_fromUnicode:function(b){function c(a){d.each(a,function(b,e){d.isObject(a[e])?c(a[e]):a[e]=d.isString(b)&&d.fromUnicode(b)||b})}if(!d.isObject(b))return b;c(b);return b}},{ATTRS:{action:{value:""},data:{value:{}},filter:{value:""}}});return e},{requires:["node","base"]});
KISSY.add("gallery/uploader/1.4/type/flash",function(d,j,i){function e(b){e.superclass.constructor.call(this,b);this.isHasCrossdomain();this._init()}d.mix(e,{event:d.merge(i.event,{SWF_READY:"swfReady",PROGRESS:"progress"})});d.extend(e,i,{_init:function(){var b=this,c=b.get("swfUploader");if(!c)return d.log("[uploader-FlashType]:swfUploader\u5bf9\u8c61\u4e3a\u7a7a\uff01"),!1;c.on("contentReady",function(){b.fire(e.event.SWF_READY)},b);c.on("uploadStart",b._uploadStartHandler,b);c.on("uploadProgress",b._uploadProgressHandler,
b);c.on("uploadCompleteData",b._uploadCompleteDataHandler,b);c.on("uploadError",b._uploadErrorHandler,b)},upload:function(b){var c=this.get("swfUploader"),a=this.get("action"),f=this.get("data"),e=this.get("fileDataName");e||(e="Filedata");this.set("uploadingId",b);d.mix(f,{type:"flash"});c.upload(b,a,"POST",f,e);return this},stop:function(){var b=this.get("swfUploader"),c=this.get("uploadingId");""!=c&&(b.cancel(c),this.fire(e.event.STOP,{id:c}));return this},_uploadStartHandler:function(b){this.fire(e.event.START,
{file:b.file})},_uploadProgressHandler:function(b){d.mix(b,{loaded:b.bytesLoaded,total:b.bytesTotal});d.log("[uploader-FlashType]:\u5df2\u7ecf\u4e0a\u4f20\u5b57\u8282\u6570\u4e3a\uff1a"+b.bytesLoaded);this.fire(e.event.PROGRESS,{loaded:b.loaded,total:b.total})},_uploadCompleteDataHandler:function(b){b=this._processResponse(b.data);this.set("uploadingId","");this.fire(e.event.SUCCESS,{result:b})},_uploadErrorHandler:function(b){this.set("uploadingId","");this.fire(e.event.ERROR,{msg:b.msg})},isHasCrossdomain:function(){d.io({url:"http://"+location.hostname+
"/crossdomain.xml",dataType:"xml",error:function(){d.log("\u7f3a\u5c11crossdomain.xml\u6587\u4ef6\u6216\u8be5\u6587\u4ef6\u4e0d\u5408\u6cd5\uff01")}})}},{ATTRS:{action:{value:"",getter:function(b){if(!/^http/.test(b))var c=location.href.split("/"),b=d.filter(c,function(a,b){return b<c.length-1}).join("/")+"/"+b;return b}},swfUploader:{value:""},uploadingId:{value:""}}});return e},{requires:["node","./base"]});
KISSY.add("gallery/uploader/1.4/type/iframe",function(d,j,i){function e(b){e.superclass.constructor.call(this,b)}var b=j.all;d.mix(e,{tpl:{IFRAME:'<iframe src="javascript:false;" name="{id}" id="{id}" border="no" width="1" height="1" style="display: none;" />',FORM:'<form method="post" enctype="multipart/form-data" action="{action}" target="{target}" style="visibility: hidden;">{hiddenInputs}</form>',HIDDEN_INPUT:'<input type="hidden" name="{name}" value="{value}" />'},event:d.mix(i.event,{CREATE:"create",
REMOVE:"remove"})});d.extend(e,i,{upload:function(c){c=b(c);if(!c.length)return!1;this.fire(e.event.START,{input:c});this.set("fileInput",c);this._create();c=this.get("form");if(!c)return d.log("[uploader-iframeType]:form\u8282\u70b9\u4e0d\u5b58\u5728\uff01"),!1;c.getDOMNode().submit()},stop:function(){this.get("iframe").attr("src",'javascript:"<html></html>";');this._remove();this.fire(e.event.STOP);this.fire(e.event.ERROR,{status:"abort",msg:"\u4e0a\u4f20\u5931\u8d25\uff0c\u539f\u56e0\uff1aabort"});return this},dataToHidden:function(b){if(!d.isObject(b)||d.isEmptyObject(b))return"";
var a="",f=this.get("tpl").HIDDEN_INPUT;if(!d.isString(f))return"";for(var e in b)a+=d.substitute(f,{name:e,value:b[e]});return a},_createIframe:function(){var c="ks-uploader-iframe-"+d.guid(),a=this.get("tpl"),f=a.IFRAME,e=this.get("iframe");if(!d.isEmptyObject(e))return e;if(!d.isString(f))return d.log("[uploader-iframeType]:iframe\u7684\u6a21\u677f\u4e0d\u5408\u6cd5\uff01"),!1;if(!d.isString(c))return d.log("[uploader-iframeType]:id\u5fc5\u987b\u5b58\u5728\u4e14\u4e3a\u5b57\u7b26\u4e32\u7c7b\u578b\uff01"),!1;a=d.substitute(a.IFRAME,{id:c});a=b(a);a.on("load",this._iframeLoadHandler,this);
b("body").append(a);this.set("id",c);this.set("iframe",a);return a},_iframeLoadHandler:function(b){var a=b.target,b=e.event.ERROR,a=a.contentDocument||window.frames[a.id].document;if(!a||!a.body)return this.fire(b,{msg:"\u670d\u52a1\u5668\u7aef\u8fd4\u56de\u6570\u636e\u6709\u95ee\u9898\uff01"}),!1;b=a.body.innerHTML;if(""==b)return!1;b=this._processResponse(b);this.fire(e.event.SUCCESS,{result:b});this._remove()},_createForm:function(){var c=this.get("id"),a=this.get("tpl").FORM,e=this.get("data"),g=this.get("action"),h=this.get("fileInput");if(!d.isString(a))return d.log("[uploader-iframeType]:form\u6a21\u677f\u4e0d\u5408\u6cd5\uff01"),
!1;if(!d.isString(g))return d.log("[uploader-iframeType]:action\u53c2\u6570\u4e0d\u5408\u6cd5\uff01"),!1;e=this.dataToHidden(e);e+=this.dataToHidden({type:"iframe"});c=d.substitute(a,{action:g,target:c,hiddenInputs:e});h=b(c).append(h);b("body").append(h);this.set("form",h);return h},_create:function(){var b=this._createIframe(),a=this._createForm();this.fire(e.event.CREATE,{iframe:b,form:a})},_remove:function(){var b=this.get("form");if(!b)return!1;b.remove();this.reset("form");this.fire(e.event.REMOVE,{form:b})}},{ATTRS:{tpl:{value:e.tpl},
id:{value:"ks-uploader-iframe-"+d.guid()},iframe:{value:{}},form:{value:""},fileInput:{value:""}}});return e},{requires:["node","./base"]});
