var qcloud = require('qcloud_video');

var appid="10043034"
var secret_id="AKIDbnwjN1CFkYzWP6uQRnmFSEfYU16ateNa";
var secret_key="wCDA37AeXk3ueuYiDcmMOpPJrK5CGOsn";
var bucket="sfvedio"

qcloud.conf.setAppInfo(appid,secret_id,secret_key);
var expired = parseInt(Date.now() / 1000) + qcloud.conf.EXPIRED_SECONDS;
var sign1  = qcloud.auth.signMore(bucket, expired);
qcloud.video.createFolder(bucket, '/myFolder/', function(ret) {
console.log(ret);}
);