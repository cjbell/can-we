// Big Bird
// v0.1.1
// by @cjbell88, @ninjabiscuit & @callumj_ all from @madebymany
(function(){function u(e){return e.charAt(0).toUpperCase()+e.slice(1)}var e=window.BigBird={};e.VERSION="0.1.1";var t=jQuery;!t&&typeof require!="undefined"&&(t=require("jquery"));var n=t({});t.subscribe=function(){n.on.apply(n,arguments)},t.unsubscribe=function(){n.off.apply(n,arguments)},t.publish=function(){n.trigger.apply(n,arguments)};var r={base:t(document.body),module:"data-module",action:"data-action",modules:{}},i=e.Initializer=function(e){this.options=t.extend({},r,e||{}),this.initialize.apply(this,arguments)};t.extend(i.prototype,{initialize:function(){this.base=this.options.base,this.module=this.base.attr(this.options.module),this.action=this.base.attr(this.options.action),this.application=this.options.modules;if(this.module===undefined||this.action===undefined||this.application===undefined)return!1;this.module&&(this.module=this.module.toLowerCase()),this.action&&(this.action=this.action.toLowerCase()),t(document.body).ready(t.proxy(this.setup,this))},setup:function(){this.execute("common","initialize"),this.execute(this.module,"initialize"),this.execute(this.module,this.action)},rerunAction:function(){return this.execute(this.module,this.action)},execute:function(e,t){e=this.getModule(e);if(e===undefined)return!1;if(e[t]===undefined||typeof e[t]!="function")return!1;e[t].apply()},getModule:function(e){return this.application.hasOwnProperty(e)?this.application[e]:(e=u(e),this.application.hasOwnProperty(e)?this.application[e]:undefined)}}),e.StateMachine=function(e){this.o=t({}),e&&this.addCollection(e)},e.StateMachine.prototype={publish:function(){this.o.trigger.apply(this.o,arguments)},subscribe:function(){this.o.bind.apply(this.o,arguments)},addCollection:function(e){t.each(e,t.proxy(function(e){this.add(e)},this))},add:function(e){this.subscribe("change",function(t,n){return n===e?e.activate():e.deactivate()}),e.active=t.proxy(function(){this.publish("change",e)},this)}};var s=e.Module=function(e){this._setOptions(e||{}),this.el&&this.setElement(this.el),this.subscriptions&&this.subscribeToEvents(),this.events&&this.delegateEvents(),this.proxied&&this.proxyFunctions(),this.initialize.apply(this,arguments)};t.extend(s.prototype,{publish:t.publish,subscribe:t.subscribe,$el:null,initialize:function(){},$:function(e){if(this.$el===null)return;return this.$el.find(e)},proxyFunctions:function(){var e=this.proxied.length;for(e;e--;){var n=this.proxied[e];typeof this[n]=="function"&&(this[n]=t.proxy(this[n],this))}},subscribeToEvents:function(){for(var e in this.subscriptions){var n=this.subscriptions[e];this.subscribe(e,t.proxy(this[n],this))}},delegateEvents:function(){if(this.$el===null)return;for(var e in this.events){var n=this.events[e],r=t.proxy(this[n],this),i=e.match(this.eventSplitter),s=i[1],o=i[2];o===""?this.$el.bind(s,r):this.$el.delegate(o,s,r)}},eventSplitter:/^(\S+)\s*(.*)$/,activate:function(){this.$el.addClass("active")},deactivate:function(){this.$el.removeClass("active")},setElement:function(e){this.el=e||this.el,this.$el=this.el instanceof t?this.el:t(this.el),this.el=this.$el[0],this.data=this.$el.data()},destroy:function(){if(this.$el===null)return;for(var e in this.events){var t=e.match(this.eventSplitter),n=t[1],r=t[2],i=r===""?this.$el:this.$el.find(r);i.unbind(n)}},_setOptions:function(e){this.options=e;for(var t in this.options)this[t]=this.options[t]}});var o=function(e,n){var r=this,i;e&&e.hasOwnProperty("constructor")?i=e.constructor:i=function(){r.apply(this,arguments)},t.extend(i,r,n);var s=function(){this.constructor=i};return s.prototype=r.prototype,i.prototype=new s,e&&t.extend(i.prototype,e),i.__super__=r.prototype,i};s.extend=o,typeof define!="undefined"&&typeof define=="function"&&define.amd&&define("bigbird",[],function(){return e})})(),!function(e,t,n){"use strict";e.Gallery=n.Module.extend({proxied:["on_window_resize","on_item_click"],initialize:function(){this.$w=t(window),this.$inner=this.$el.find(".gallery-content__inner"),this.$items=this.$inner.find(".gallery__item"),this.items_length=this.$items.length,this.setup()},setup:function(){this.current_index=1,this.bind_extra(),this.on_window_resize()},bind_extra:function(){this.$items.bind("click",this.on_item_click),this.$w.bind("resize",this.on_window_resize)},on_window_resize:function(){var e=this.$w.width(),t=this.calculate_item_size(e),n=t*.15;this.update_item_sizes(t),this.update_container_width(t+10),this.offset_container(n),this.$inner.css({left:-(this.current_width*this.current_index)+"px"}),this.current_gutter=n,this.current_width=t+10},on_item_click:function(e){var n=t(e.currentTarget),r=this.$items.index(n);this.$inner.css({left:-(this.current_width*r)+"px"}),this.current_index=r},calculate_item_size:function(e){return Math.floor(e-e*.15)},update_item_sizes:function(e){this.$items.css({width:e+"px"})},update_container_width:function(e){this.$inner.css({width:e*this.items_length+"px"})},offset_container:function(e){this.$inner.css({"margin-left":e/2+"px"})}})}(this,jQuery,BigBird);var CanWe={};CanWe.Common={initialize:function(){}},CanWe.Content={initialize:function(){new Gallery({el:$(".gallery-content")})}},new BigBird.Initializer({modules:CanWe});