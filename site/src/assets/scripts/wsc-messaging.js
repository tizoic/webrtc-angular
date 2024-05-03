/*! wsc Built on: 2020-09-03 */
var wsc=function(a){var b=a._private=a._private||{},c=b.wscConst,d=a.getLogger(),e=function(a,b){b?this.packageType=b:this.packageType=c.PACKAGE.MESSAGING,a.registerPackage(this),this.session=a,this.messagingInstance=null};e.prototype={createMessaging:function(){var a=new f;return this.register(a),a},register:function(a){a.session=this.session,a.pkgInstance=this,this.messagingInstance=a},onMessage:function(a){var b=a.header.initiator,c=a.header.target,e=(a.control.type,a.getExtHeaders()),f=a.payload.content,g=a.control.subsession_id,h=a.control.correlation_id;if(this.messagingInstance)if(a.isRequest())if(this.messagingInstance.onNewMessage){var i={msgId:g,initiator:b,target:c,correlation_id:h,content:f};this.session.putSubSession(this.packageType,g,i),this.messagingInstance.onNewMessage(i,e)}else d.warn("messagingInstance have not onNewMessage callback");else if(a.isResponse()){if(this.messagingInstance.onSuccessResponse){var j=this.messagingInstance.getMessage(g);j&&this.messagingInstance.onSuccessResponse(j,e),this.session.removeSubSession(g)}}else if(a.isError()){if(this.messagingInstance.onErrorResponse){var k=a.header.error_code,l=a.header.reason,m=this.messagingInstance.getMessage(g);m&&this.messagingInstance.onErrorResponse(m,k,l,e)}this.session.removeSubSession(g)}else d.warn("Got unexpected message in MessagingPackage");else d.warn("no messagingInstance of MessagingPackage")},toJSON:function(){var a={};return a}};var f=function(){this.session=null,this.pkgInstance=null,this.onNewMessage=null,this.onSuccessResponse=null,this.onErrorResponse=null};return f.prototype={send:function(b,c,d){var e={control:{type:"request",package_type:this.pkgInstance.packageType,subsession_id:this.session.generateSubSessionId()},header:{action:"send",initiator:this.session.userName,target:c},payload:{content:b}},f=new a.Message(e);d&&f.addExtHeaders(d),this.session.sendMessage(f);var g={initiator:e.header.initiator,target:e.header.target,msgId:e.control.subsession_id,content:e.payload.content};return this.session.putSubSession(this.pkgInstance.packageType,g.msgId,g),e.control.subsession_id},accept:function(b,d){var e=b.initiator,f=b.target,g=b.msgId,h={control:{type:"response",package_type:this.pkgInstance.packageType,subsession_id:g,message_state:c.MESSAGESTATE.FINAL,correlation_id:b.correlation_id},header:{action:"send",initiator:e,target:f}},i=new a.Message(h);d&&i.addExtHeaders(d),this.session.sendMessage(i),this.session.removeSubSession(g)},reject:function(b,d,e,f){var g=b.initiator,h=b.target,i=b.msgId;d||(d=603),e||(e="Decline");var j={control:{type:c.TYPE.ERROR,package_type:this.pkgInstance.packageType,subsession_id:i,correlation_id:b.correlation_id},header:{action:"send",initiator:g,target:h,error_code:d,reason:e}},k=new a.Message(j);f&&k.addExtHeaders(f),this.session.sendMessage(k),this.session.removeSubSession(i)},getMessage:function(a){return this.session.getSubSession(a)},toJSON:function(){var a={},b={session:""};for(var c in this)c in b||(a[c]=this[c]);return a}},a.MessagingPackage=e,a.Messaging=f,console.log("wsc-Messaging initialized."),a}(wsc||{});