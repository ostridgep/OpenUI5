/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/model/type/Date','./library'],function(q,C,L,I,D,l){"use strict";var a=C.extend("sap.ui.unified.Calendar",{metadata:{library:"sap.ui.unified",properties:{intervalSelection:{type:"boolean",group:"Misc",defaultValue:false},singleSelection:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},events:{select:{},cancel:{}}}});(function(){a.prototype.init=function(){this._mouseMoveProxy=q.proxy(this._handleMouseMove,this);this._iMode=0;this._oFormatYyyymmdd=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMdd"});this.data("sap-ui-fastnavgroup","true",true);this._oMinDate=new Date(Date.UTC(1,0,1));this._oMinDate.setUTCFullYear(1);this._oMaxDate=new Date(Date.UTC(9999,11,31))};a.prototype.exit=function(){if(this._sRenderMonth){q.sap.clearDelayedCall(this._sRenderMonth)}};a.prototype.onAfterRendering=function(){var i=this;e(i);u(i);w(i,this._getFocusedDate(),true)};a.prototype.invalidate=function(O){if(!O||!(O instanceof sap.ui.unified.DateRange)){C.prototype.invalidate.apply(this,arguments)}else if(this.getDomRef()&&this._iMode==0&&!this._sRenderMonth){var i=this;this._sRenderMonth=q.sap.delayedCall(0,this,f,[i])}};a.prototype.setLocale=function(i){if(this._sLocale!=i){this._sLocale=i;this._oLocaleData=undefined;this.invalidate()}return this};a.prototype.getLocale=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};a.prototype._getFocusedDate=function(){if(!this._oFocusedDate){var i=this;k(i)}return this._oFocusedDate};a.prototype._setFocusedDate=function(i){this._oFocusedDate=new Date(i)};a.prototype.focusDate=function(i){if(i&&(!this._oFocusedDate||this._oFocusedDate.getTime()!=i.getTime())){if(!(i instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this)}var y=i.getFullYear();if(y<1||y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this)}this._setFocusedDate(h(i));if(this.getDomRef()&&this._iMode==0){var z=this;f(z)}}return this};a.prototype.setPopupMode=function(P){this._bPoupupMode=P};a.prototype._getLocaleData=function(){if(!this._oLocaleData){var i=this.getLocale();var y=new sap.ui.core.Locale(i);this._oLocaleData=L.getInstance(y)}return this._oLocaleData};a.prototype.onclick=function(E){if(E.isMarked("delayedMouseEvent")){return}var i=this;var F=this._getFocusedDate();if(q.sap.containsOrEquals(this.getDomRef("next"),E.target)&&!this.$("next").attr("disabled")){switch(this._iMode){case 0:F.setUTCMonth(F.getUTCMonth()+1,1);f(i);break;case 1:F.setUTCFullYear(F.getUTCFullYear()+1);this.$("year").text(F.getUTCFullYear());w(i,F);break;case 2:t(i,true,this._oItemNavigation.getFocusedIndex());break}}else if(q.sap.containsOrEquals(this.getDomRef("prev"),E.target)&&!this.$("prev").attr("disabled")){switch(this._iMode){case 0:F.setUTCDate(1);F.setUTCDate(F.getUTCDate()-1);f(i);break;case 1:F.setUTCFullYear(F.getUTCFullYear()-1);this.$("year").text(F.getUTCFullYear());w(i,F);break;case 2:t(i,false,this._oItemNavigation.getFocusedIndex());break}}else if(E.target.id==this.getId()+"-month"){if(this._iMode!=1){m(i)}else{n(i)}this.addDelegate(this._oItemNavigation)}else if(E.target.id==this.getId()+"-year"){if(this._iMode!=2){p(i)}else{r(i)}this.addDelegate(this._oItemNavigation)}else if(E.target.id==this.getId()+"-cancel"){this.onsapescape(E)}};a.prototype._handleMouseMove=function(E){if(!this.$().is(":visible")){q(window.document).unbind('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined}var T=q(E.target);if(T.hasClass("sapUiCalDayNum")){T=T.parent()}if(T.hasClass("sapUiCalDay")){var F=this._getFocusedDate();var O=F;F=this._oFormatYyyymmdd.parse(T.attr("data-sap-day"),true);this._setFocusedDate(F);if(F.getTime()!=O.getTime()){var i=this;if(T.hasClass("sapUiCalDayOtherMonth")){f(i)}else{j(i,F,false,true);this._bMoveChange=true}}}};a.prototype.onmouseup=function(E){if(this._bMouseMove){q(window.document).unbind('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined;var F=this._getFocusedDate();var y=this.$("days").children(".sapUiCalDay");for(var i=0;i<y.length;i++){var $=q(y[i]);if(!$.hasClass("sapUiCalDayOtherMonth")){if($.attr("data-sap-day")==this._oFormatYyyymmdd.format(F,true)){$.focus();break}}}if(this._bMoveChange){var z=this;j(z,F);this._bMoveChange=false;v(z)}}};a.prototype.onsapselect=function(E){var i=this;var y=0;switch(this._iMode){case 0:if(q.sap.containsOrEquals(this.getDomRef("days"),E.target)){j(i,i._getFocusedDate());v(i);E.stopPropagation();E.preventDefault()}break;case 1:if(q.sap.containsOrEquals(this.getDomRef("months"),E.target)){y=this._oItemNavigation.getFocusedIndex();o(i,y)}break;case 2:if(q.sap.containsOrEquals(this.getDomRef("years"),E.target)){y=this._oItemNavigation.getFocusedIndex();s(i,y)}break}};a.prototype.onsapselectmodifiers=function(E){this.onsapselect(E)};a.prototype.onsapescape=function(E){var i=this;switch(this._iMode){case 0:this.fireCancel();break;case 1:n(i);break;case 2:r(i);break}};a.prototype.onsapshow=function(E){if(this._bPoupupMode){var i=this;switch(this._iMode){case 1:n(i);break;case 2:r(i);break}this.fireCancel();E.preventDefault()}};a.prototype.onsaphide=a.prototype.onsapshow;a.prototype.onsappageupmodifiers=function(E){if(q.sap.containsOrEquals(this.getDomRef("days"),E.target)){var F=this._getFocusedDate();var i=this;var y=F.getUTCFullYear();if(E.metaKey||E.ctrlKey){F.setUTCFullYear(y-10)}else{F.setUTCFullYear(y-1)}if(F.getTime()<this._oMinDate.getTime()){this._setFocusedDate(this._oMinDate)}f(i)}E.preventDefault()};a.prototype.onsappagedownmodifiers=function(E){if(q.sap.containsOrEquals(this.getDomRef("days"),E.target)){var F=this._getFocusedDate();var i=this;var y=F.getUTCFullYear();if(E.metaKey||E.ctrlKey){F.setUTCFullYear(y+10)}else{F.setUTCFullYear(y+1)}if(F.getTime()>this._oMaxDate.getTime()){this._setFocusedDate(this._oMaxDate)}f(i)}E.preventDefault()};a.prototype.onsappageup=function(E){if(E.target.id==this.getId()+"-month"||E.target.id==this.getId()+"-year"){E.preventDefault()}};a.prototype.onsappagedown=a.prototype.onsappageup;a.prototype.onsaptabnext=function(E){if(q.sap.containsOrEquals(this.getDomRef("days"),E.target)||q.sap.containsOrEquals(this.getDomRef("months"),E.target)||q.sap.containsOrEquals(this.getDomRef("years"),E.target)){q.sap.focus(this.getDomRef("month"));if(!this._bPoupupMode){q(this._oItemNavigation.getItemDomRefs()[this._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1")}this.removeDelegate(this._oItemNavigation);E.preventDefault()}else if(E.target.id==this.getId()+"-month"){q.sap.focus(this.getDomRef("year"));this.removeDelegate(this._oItemNavigation);E.preventDefault()}else if(E.target.id==this.getId()+"-year"){this.addDelegate(this._oItemNavigation)}};a.prototype.onsaptabprevious=function(E){if(q.sap.containsOrEquals(this.getDomRef("days"),E.target)||q.sap.containsOrEquals(this.getDomRef("months"),E.target)||q.sap.containsOrEquals(this.getDomRef("years"),E.target)){if(this._bPoupupMode){q.sap.focus(this.getDomRef("year"));this.removeDelegate(this._oItemNavigation);E.preventDefault()}}else if(E.target.id==this.getId()+"-month"){this.addDelegate(this._oItemNavigation);this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());E.preventDefault()}else if(E.target.id==this.getId()+"-year"){q.sap.focus(this.getDomRef("month"));E.preventDefault()}};a.prototype.onsapnext=function(E){if(E.target.id==this.getId()+"-month"||E.target.id==this.getId()+"-year"){E.preventDefault()}};a.prototype.onsapprevious=a.prototype.onsapnext;a.prototype.onfocusin=function(E){if(E.target.id==this.getId()+"-end"){q.sap.focus(this.getDomRef("year"));q(this._oItemNavigation.getItemDomRefs()[this._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");this.removeDelegate(this._oItemNavigation)}q.sap.byId(this.getId()+"-end").attr("tabindex","-1")};a.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){q.sap.byId(this.getId()+"-end").attr("tabindex","0");this.addDelegate(this._oItemNavigation)}};a.prototype._checkDateSelected=function(y){if(!(y instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this)}var S=0;var z=this.getSelectedDates();var T=y.getTime();for(var i=0;i<z.length;i++){var R=z[i];var A=h(R.getStartDate());var B;var E=0;if(A){B=A;E=B.getTime()}var F;var G=0;if(this.getIntervalSelection()){A=h(R.getEndDate());if(A){F=A;G=F.getTime()}}if(T==E&&!F){S=1;break}else if(T==E&&F){S=2;if(F&&T==G){S=5}break}else if(F&&T==G){S=3;break}else if(F&&T>E&&T<G){S=4;break}if(this.getSingleSelection()){break}}return S};a.prototype._getDateType=function(y){if(!(y instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this)}var T;var S=this.getSpecialDates();var z=y.getTime();for(var i=0;i<S.length;i++){var R=S[i];var A=h(R.getStartDate());var B;var E=0;if(A){B=A;E=B.getTime()}var F;var G=0;A=h(R.getEndDate());if(A){F=A;G=F.getTime()}if((z==E&&!F)||(z>=E&&z<=G)){T={type:R.getType(),tooltip:R.getTooltip_AsString()};break}}return T};function _(y){var z=y.getParameter("index");var E=y.getParameter("event");if(!E){return}var A=this;var F=this._getFocusedDate();if(this._iMode==0){var B=this.$("days").children(".sapUiCalDay");var i=0;var $=q(B[z]);var G;if($.hasClass("sapUiCalDayOtherMonth")){if(E.type=="saphomemodifiers"&&(E.metaKey||E.ctrlKey)){F.setUTCDate(1);x(A,F)}else if(E.type=="sapendmodifiers"&&(E.metaKey||E.ctrlKey)){for(i=B.length-1;i>0;i--){G=q(B[i]);if(!G.hasClass("sapUiCalDayOtherMonth")){F=this._oFormatYyyymmdd.parse(G.attr("data-sap-day"),true);this._setFocusedDate(F);break}}if(F.getTime()>=this._oMinDate.getTime()&&F.getTime()<=this._oMaxDate.getTime()){this._oItemNavigation.focusItem(i)}else{x(A,F)}}else{F=this._oFormatYyyymmdd.parse($.attr("data-sap-day"),true);if(!F){F=this._getFocusedDate()}if(F.getTime()>=this._oMinDate.getTime()&&F.getTime()<=this._oMaxDate.getTime()){this._setFocusedDate(F);f(A)}else{x(A,F)}}}else{if(!q(E.target).hasClass("sapUiCalWeekNum")){F=this._oFormatYyyymmdd.parse($.attr("data-sap-day"),true);if(F.getTime()>=this._oMinDate.getTime()&&F.getTime()<=this._oMaxDate.getTime()){this._setFocusedDate(F)}else{x(A,F)}}}}if(E.type=="mousedown"){c(A,E,F,z)}}function b(i){var y=i.getParameter("index");var E=i.getParameter("event");if(!E){return}if(E.type=="mousedown"){var z=this;var F=this._getFocusedDate();c(z,E,F,y)}}function c(T,E,F,i){switch(T._iMode){case 0:j(T,F,E.shiftKey);v(T);if(T.getIntervalSelection()&&T.$().is(":visible")){q(window.document).bind('mousemove',T._mouseMoveProxy);T._bMouseMove=true}break;case 1:o(T,i);break;case 2:s(T,i);break}E.preventDefault();E.setMark("cancelAutoClose")}function d(i){var E=i.getParameter("event");var M=0;var F=this._getFocusedDate();if(E.type){var y=this;switch(this._iMode){case 0:switch(E.type){case"sapnext":case"sapnextmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_DOWN){F.setUTCDate(F.getUTCDate()+7)}else{F.setUTCDate(F.getUTCDate()+1)}break;case"sapprevious":case"sappreviousmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_UP){F.setUTCDate(F.getUTCDate()-7)}else{F.setUTCDate(F.getUTCDate()-1)}break;case"sappagedown":M=F.getUTCMonth()+1;F.setUTCMonth(M);if(M%12!=F.getUTCMonth()){while(M!=F.getUTCMonth()){F.setUTCDate(F.getUTCDate()-1)}}break;case"sappageup":M=F.getUTCMonth()-1;F.setUTCMonth(M);if(M<0){M=11}if(M!=F.getUTCMonth()){while(M!=F.getUTCMonth()){F.setUTCDate(F.getUTCDate()-1)}}break;default:break}if(F.getTime()>this._oMaxDate.getTime()){F.setUTCFullYear(this._oMaxDate.getUTCFullYear());F.setUTCMonth(this._oMaxDate.getUTCMonth());F.setUTCDate(this._oMaxDate.getUTCDate())}if(F.getTime()<this._oMinDate.getTime()){F.setUTCFullYear(this._oMinDate.getUTCFullYear());F.setUTCMonth(this._oMinDate.getUTCMonth());F.setUTCDate(this._oMinDate.getUTCDate())}f(y);break;case 1:break;case 2:switch(E.type){case"sapnext":case"sapnextmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_DOWN){t(y,true,this._oItemNavigation.getFocusedIndex()-16)}else{t(y,true,0)}break;case"sapprevious":case"sappreviousmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_UP){t(y,false,16+this._oItemNavigation.getFocusedIndex())}else{t(y,false,19)}break;case"sappagedown":t(y,true,this._oItemNavigation.getFocusedIndex());break;case"sappageup":t(y,false,this._oItemNavigation.getFocusedIndex());break;default:break}break}}}function e(T){var y=T._getFocusedDate();var Y=T._oFormatYyyymmdd.format(y,true);var z=[];var R;var A=0;var B=0;var N=false;var E=true;switch(T._iMode){case 0:R=T.$("days").get(0);z=T.$("days").children(".sapUiCalDay");for(var i=0;i<z.length;i++){var $=q(z[i]);if($.attr("data-sap-day")===Y){A=i}}B=7;N=true;E=false;break;case 1:R=T.$("months").get(0);z=T.$("months").children(".sapUiCalMonth");A=y.getUTCMonth();B=3;break;case 2:R=T.$("years").get(0);z=T.$("years").children(".sapUiCalYear");A=10;B=4;N=true;E=false;break}if(!T._oItemNavigation){T._oItemNavigation=new I();T._oItemNavigation.attachEvent(I.Events.AfterFocus,_,T);T._oItemNavigation.attachEvent(I.Events.FocusAgain,b,T);T._oItemNavigation.attachEvent(I.Events.BorderReached,d,T);T.addDelegate(T._oItemNavigation);T._oItemNavigation.setHomeEndColumnMode(true,true);T._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]})}T._oItemNavigation.setRootDomRef(R);T._oItemNavigation.setItemDomRefs(z);T._oItemNavigation.setCycling(E);T._oItemNavigation.setColumns(B,N);T._oItemNavigation.setFocusedIndex(A);T._oItemNavigation.setPageSize(z.length)}function f(T){T._sRenderMonth=undefined;var i=T._getFocusedDate();var $=T.$("days");if($.length>0){var R=sap.ui.getCore().createRenderManager();T.getRenderer().renderDays(R,T,i);R.flush($[0]);R.destroy()}T.fireEvent("_renderMonth",{days:$.children(".sapUiCalDay").length});var M=[];if(T._bLongMonth||!T._bNamesLengthChecked){M=T._getLocaleData().getMonthsStandAlone("wide")}else{M=T._getLocaleData().getMonthsStandAlone("abbreviated")}T.$("month").text(M[i.getUTCMonth()]);T.$("year").text(i.getUTCFullYear());e(T);T._oItemNavigation.focusItem(T._oItemNavigation.getFocusedIndex());w(T,i,true)}function g(i){if(i){return new Date(i.getTime()+i.getTimezoneOffset()*60000)}}function h(i){if(i){var U=new Date(Date.UTC(i.getFullYear(),i.getMonth(),i.getDate()));if(i.getFullYear()<1000){U.setUTCFullYear(i.getFullYear())}return U}}function j(T,y,z,M){var S=T.getSelectedDates();var A;var B=T.$("days").children(".sapUiCalDay");var $;var Y;var i=0;if(T.getSingleSelection()){var E;if(S.length>0){A=S[0];E=h(A.getStartDate())}else{A=new sap.ui.unified.DateRange();T.addAggregation("selectedDates",A,true)}if(T.getIntervalSelection()&&(!A.getEndDate()||M)&&E){var F;if(y.getTime()<E.getTime()){F=E;E=y;if(!M){A.setProperty("startDate",g(E),true);A.setProperty("endDate",g(F),true)}}else if(y.getTime()>=E.getTime()){F=y;if(!M){A.setProperty("endDate",g(F),true)}}var G;for(i=0;i<B.length;i++){$=q(B[i]);G=T._oFormatYyyymmdd.parse($.attr("data-sap-day"),true);if(G.getTime()==E.getTime()){$.addClass("sapUiCalDaySelStart");$.addClass("sapUiCalDaySel");if(F&&G.getTime()==F.getTime()){$.addClass("sapUiCalDaySelEnd")}}else if(F&&G.getTime()>E.getTime()&&G.getTime()<F.getTime()){$.addClass("sapUiCalDaySel");$.addClass("sapUiCalDaySelBetween")}else if(F&&G.getTime()==F.getTime()){$.addClass("sapUiCalDaySelEnd");$.addClass("sapUiCalDaySel")}else{if($.hasClass("sapUiCalDaySel")){$.removeClass("sapUiCalDaySel")}if($.hasClass("sapUiCalDaySelStart")){$.removeClass("sapUiCalDaySelStart")}else if($.hasClass("sapUiCalDaySelBetween")){$.removeClass("sapUiCalDaySelBetween")}else if($.hasClass("sapUiCalDaySelEnd")){$.removeClass("sapUiCalDaySelEnd")}}}}else{Y=T._oFormatYyyymmdd.format(y,true);for(i=0;i<B.length;i++){$=q(B[i]);if(!$.hasClass("sapUiCalDayOtherMonth")&&$.attr("data-sap-day")==Y){$.addClass("sapUiCalDaySel")}else if($.hasClass("sapUiCalDaySel")){$.removeClass("sapUiCalDaySel")}if($.hasClass("sapUiCalDaySelStart")){$.removeClass("sapUiCalDaySelStart")}else if($.hasClass("sapUiCalDaySelBetween")){$.removeClass("sapUiCalDaySelBetween")}else if($.hasClass("sapUiCalDaySelEnd")){$.removeClass("sapUiCalDaySelEnd")}}A.setProperty("startDate",g(y),true);A.setProperty("endDate",undefined,true)}}else{if(T.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection")}else{var H=T._checkDateSelected(y);if(H>0){for(i=0;i<S.length;i++){if(S[i].getStartDate()&&y.getTime()==h(S[i].getStartDate()).getTime()){T.removeAggregation("selectedDates",i,true);break}}}else{A=new sap.ui.unified.DateRange({startDate:g(y)});T.addAggregation("selectedDates",A,true)}Y=T._oFormatYyyymmdd.format(y,true);for(i=0;i<B.length;i++){$=q(B[i]);if(!$.hasClass("sapUiCalDayOtherMonth")&&$.attr("data-sap-day")==Y){if(H>0){$.removeClass("sapUiCalDaySel")}else{$.addClass("sapUiCalDaySel")}}}}}}function k(T){var S=T.getSelectedDates();if(S&&S[0]&&S[0].getStartDate()){T._oFocusedDate=h(S[0].getStartDate())}else{var i=new Date();T._oFocusedDate=h(i)}}function m(T){if(T._iMode==2){r(T)}var i=T._getFocusedDate();var R=sap.ui.getCore().createRenderManager();var $=T.$();T.getRenderer().renderMonthPicker(R,T,i);R.flush($[0],false,true);R.destroy();T._iMode=1;q(T._oItemNavigation.getItemDomRefs()[T._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");e(T);q.sap.focus(T._oItemNavigation.getItemDomRefs()[T._oItemNavigation.getFocusedIndex()]);w(T,i,false)}function n(T){T.$("months").remove();T._iMode=0;e(T);q.sap.focus(T._oItemNavigation.getItemDomRefs()[T._oItemNavigation.getFocusedIndex()]);var F=T._getFocusedDate();T.$("year").text(F.getUTCFullYear());w(T,F,true)}function o(T,M){var F=T._getFocusedDate();F.setUTCMonth(M);if(M!=F.getUTCMonth()){F.setUTCDate(0)}if(F.getTime()<T._oMinDate.getTime()){T._setFocusedDate(T._oMinDate)}else if(F.getTime()>T._oMaxDate.getTime()){T._setFocusedDate(T._oMaxDate)}f(T);n(T)}function p(T){if(T._iMode==1){n(T)}var i=T._getFocusedDate();var R=sap.ui.getCore().createRenderManager();var $=T.$();var y=T._oMaxDate.getUTCFullYear();var Y=T._oMinDate.getUTCFullYear();if(y-Y<=20){return}if(i.getUTCFullYear()>(y-10)){i.setUTCFullYear(y-9);T.$("next").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled")}else{T.$("next").toggleClass("sapUiCalDsbl",false).removeAttr("disabled")}if(i.getUTCFullYear()<(Y+9)){i.setUTCFullYear(Y+10);T.$("prev").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled")}else{T.$("prev").toggleClass("sapUiCalDsbl",false).removeAttr("disabled")}T.getRenderer().renderYearPicker(R,T,i);R.flush($[0],false,true);R.destroy();var z=T.$("days").children(".sapUiCalDay");if(z.length==28){T.$("years").addClass("sapUiCalYearNoTop")}T._iMode=2;q(T._oItemNavigation.getItemDomRefs()[T._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");e(T);q.sap.focus(T._oItemNavigation.getItemDomRefs()[T._oItemNavigation.getFocusedIndex()])}function r(T){T.$("years").remove();T._iMode=0;e(T);q.sap.focus(T._oItemNavigation.getItemDomRefs()[T._oItemNavigation.getFocusedIndex()]);var F=T._getFocusedDate();w(T,F,true)}function s(T,i){var F=T._getFocusedDate();var y=T.$("years").children(".sapUiCalYear");var Y=q(y[i]).text();F.setUTCFullYear(Y);if(F.getTime()<T._oMinDate.getTime()){T._setFocusedDate(T._oMinDate)}else if(F.getTime()>T._oMaxDate.getTime()){T._setFocusedDate(T._oMaxDate)}f(T);r(T)}function t(T,F,S){var y=T.$("years").children(".sapUiCalYear");var z=parseInt(q(y[0]).text(),10);var A=T._getFocusedDate();var B=A.getUTCFullYear().toString();var Y=T._oMaxDate.getUTCFullYear();var E=T._oMinDate.getUTCFullYear();if(F){z=z+20}else{z=z-20}if(z>=Y-19){z=Y-19;T.$("next").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled")}else{T.$("next").toggleClass("sapUiCalDsbl",false).removeAttr("disabled")}if(z<=E){z=E;T.$("prev").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled")}else{T.$("prev").toggleClass("sapUiCalDsbl",false).removeAttr("disabled")}var G=z;for(var i=0;i<y.length;i++){var $=q(y[i]);$.attr("id",T.getId()+"-y"+G);$.text(G);if($.hasClass("sapUiCalYearSel")&&$.text()!=B){$.removeClass("sapUiCalYearSel")}else if(!$.hasClass("sapUiCalYearSel")&&$.text()==B){$.addClass("sapUiCalYearSel")}G++}T._oItemNavigation.focusItem(S)}function u(T){if(!T._bNamesLengthChecked){var i=0;var W;var y;var z=T.$().children(".sapUiCalWH");var A=false;for(i=0;i<z.length;i++){W=z[i];if(W.clientWidth<W.scrollWidth){A=true;break}}if(A){T._bLongWeekDays=false;y=T._getLocaleData();var F=y.getFirstDayOfWeek();var B=y.getDaysStandAlone("narrow");for(i=0;i<B.length;i++){W=z[i];q(W).text(B[(i+F)%7])}}else{T._bLongWeekDays=true}m(T);var M=T.$("months").children();A=false;for(i=0;i<M.length;i++){var E=M[i];if(E.clientWidth<E.scrollWidth){A=true;break}}if(A){T._bLongMonth=false;if(!y){y=T._getLocaleData()}var G=y.getMonthsStandAlone("abbreviated");var H=T._getFocusedDate();T.$("month").text(G[H.getUTCMonth()])}else{T._bLongMonth=true}n(T);T._bNamesLengthChecked=true}}function v(T){if(T._bMouseMove){q(window.document).unbind('mousemove',T._mouseMoveProxy);T._bMouseMove=undefined}T.fireSelect()}function w(T,i,y){var Y=i.getUTCFullYear();var z=T._oMaxDate.getUTCFullYear();var A=T._oMinDate.getUTCFullYear();var M=i.getUTCMonth();var B=T._oMaxDate.getUTCMonth();var E=T._oMinDate.getUTCMonth();if(Y>z||(Y==z&&(!y||M>=B))){T.$("next").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled")}else{T.$("next").toggleClass("sapUiCalDsbl",false).removeAttr("disabled")}if(Y<A||(Y==A&&(!y||M<=E))){T.$("prev").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled")}else{T.$("prev").toggleClass("sapUiCalDsbl",false).removeAttr("disabled")}}function x(T,y){var F;if(y.getTime()<T._oMinDate.getTime()){F=T._oMinDate}else if(y.getTime()>T._oMaxDate.getTime()){F=T._oMaxDate}else{F=y}T._setFocusedDate(F);var Y=T._oFormatYyyymmdd.format(F,true);var z=T._oItemNavigation.getItemDomRefs();var $;for(var i=0;i<z.length;i++){$=q(z[i]);if($.attr("data-sap-day")==Y){T._oItemNavigation.focusItem(i);break}}}}());return a},true);
