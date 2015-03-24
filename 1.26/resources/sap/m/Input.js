/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./Dialog','./InputBase','./List','./Popover','./StandardListItem','./Table','./Toolbar','./ToolbarSpacer','./library','sap/ui/core/IconPool','jquery.sap.strings'],function(q,B,D,I,L,P,S,T,a,b,l,c){"use strict";var d=I.extend("sap.m.Input",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.InputType",group:"Data",defaultValue:sap.m.InputType.Text},maxLength:{type:"int",group:"Behavior",defaultValue:0},dateFormat:{type:"string",group:"Misc",defaultValue:'YYYY-MM-dd',deprecated:true},showValueHelp:{type:"boolean",group:"Behavior",defaultValue:false},showSuggestion:{type:"boolean",group:"Behavior",defaultValue:false},valueHelpOnly:{type:"boolean",group:"Behavior",defaultValue:false},filterSuggests:{type:"boolean",group:"Behavior",defaultValue:true},maxSuggestionWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},startSuggestion:{type:"int",group:"Behavior",defaultValue:1},showTableSuggestionValueHelp:{type:"boolean",group:"Behavior",defaultValue:true},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'50%'},valueLiveUpdate:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"suggestionItems",aggregations:{suggestionItems:{type:"sap.ui.core.Item",multiple:true,singularName:"suggestionItem"},suggestionColumns:{type:"sap.m.Column",multiple:true,singularName:"suggestionColumn",bindable:"bindable"},suggestionRows:{type:"sap.m.ColumnListItem",multiple:true,singularName:"suggestionRow",bindable:"bindable"}},events:{liveChange:{parameters:{value:{type:"string"}}},valueHelpRequest:{parameters:{fromSuggestions:{type:"boolean"}}},suggest:{parameters:{suggestValue:{type:"string"},suggestionColumns:{type:"sap.m.ListBase"}}},suggestionItemSelected:{parameters:{selectedItem:{type:"sap.ui.core.Item"},selectedRow:{type:"sap.m.ColumnListItem"}}}}}});c.insertFontFaceStyle();d._DEFAULTFILTER=function(v,i){return q.sap.startsWithIgnoreCase(i.getText(),v)};d._DEFAULTFILTER_TABULAR=function(v,C){var e=C.getCells(),i=0;for(;i<e.length;i++){if(e[i].getText){return q.sap.startsWithIgnoreCase(e[i].getText(),v)}}return false};d._DEFAULTRESULT_TABULAR=function(C){var e=C.getCells(),i=0;for(;i<e.length;i++){if(e[i].getText){return e[i].getText()}}return""};d.prototype.init=function(){I.prototype.init.call(this);this._inputProxy=q.proxy(this._onInput,this);this._fnFilter=d._DEFAULTFILTER;this._bUseDialog=sap.ui.Device.system.phone;this._bFullScreen=sap.ui.Device.system.phone};d.prototype.exit=function(){this._deregisterEvents();if(this._oSuggestionPopup){this._oSuggestionPopup.destroy();this._oSuggestionPopup=null}if(this._oList){this._oList.destroy();this._oList=null}if(this._oValueHelpIcon){this._oValueHelpIcon.destroy();this._oValueHelpIcon=null}if(this._oSuggestionTable){this._oSuggestionTable.destroy();this._oSuggestionTable=null}if(this._oButtonToolbar){this._oButtonToolbar.destroy();this._oButtonToolbar=null}if(this._oShowMoreButton){this._oShowMoreButton.destroy();this._oShowMoreButton=null}};d.prototype._resizePopup=function(){var t=this;if(this._oList&&this._oSuggestionPopup){if(this.getMaxSuggestionWidth()){this._oSuggestionPopup.setContentWidth(this.getMaxSuggestionWidth())}else{this._oSuggestionPopup.setContentWidth((this.$().outerWidth())+"px")}setTimeout(function(){if(t._oSuggestionPopup&&t._oSuggestionPopup.isOpen()&&t._oSuggestionPopup.$().outerWidth()<t.$().outerWidth()){t._oSuggestionPopup.setContentWidth((t.$().outerWidth())+"px")}},0)}};d.prototype.onBeforeRendering=function(){I.prototype.onBeforeRendering.call(this);this._deregisterEvents()};d.prototype.onAfterRendering=function(){var t=this;I.prototype.onAfterRendering.call(this);this.bindToInputEvent(this._inputProxy);if(!this._bFullScreen){this._resizePopup();this._sPopupResizeHandler=sap.ui.core.ResizeHandler.register(this.getDomRef(),function(){t._resizePopup()})}if(this._bUseDialog){this.$().on("click",q.proxy(function(e){if(this.getShowSuggestion()&&this._oSuggestionPopup&&e.target.id!=this.getId()+"__vhi"){this._oSuggestionPopup.open()}},this))}};d.prototype._getValueHelpIcon=function(){var t=this;if(!this._oValueHelpIcon){var u=c.getIconURI("value-help");this._oValueHelpIcon=c.createControlByURI({id:this.getId()+"__vhi",src:u});this._oValueHelpIcon.addStyleClass("sapMInputValHelpInner");this._oValueHelpIcon.attachPress(function(e){if(!t.getValueHelpOnly()){t.fireValueHelpRequest({fromSuggestions:false})}})}return this._oValueHelpIcon};d.prototype._fireValueHelpRequestForValueHelpOnly=function(){if(this.getEnabled()&&this.getEditable()&&this.getShowValueHelp()&&this.getValueHelpOnly()){this.fireValueHelpRequest({fromSuggestions:false})}};d.prototype.ontap=function(e){this._fireValueHelpRequestForValueHelpOnly()};d.prototype.setWidth=function(w){return I.prototype.setWidth.call(this,w||"100%")};d.prototype.getWidth=function(){return this.getProperty("width")||"100%"};d.prototype.setFilterFunction=function(f){if(f===null||f===undefined){this._fnFilter=d._DEFAULTFILTER;return this}this._fnFilter=f;return this};d.prototype.setRowResultFunction=function(f){if(f===null||f===undefined){this._fnRowResultFilter=d._DEFAULTRESULT_TABULAR;return this}this._fnRowResultFilter=f;return this};d.prototype._doSelect=function(s,e){if(sap.ui.Device.support.touch){return}var o=this._$input[0];if(o){var r=this._$input;o.focus();r.selectText(s?s:0,e?e:r.val().length)}return this};d.prototype._scrollToItem=function(i,s){var p=this._oSuggestionPopup,o=this._oList;if(!(p instanceof P)||!o){return}var e=o.getItems()[i],f=e&&e.$()[0];if(f){f.scrollIntoView(s==="up")}};d.prototype._isSuggestionItemSelectable=function(i){return i.getVisible()&&(this._hasTabularSuggestions()||i.getType()!==sap.m.ListType.Inactive)};d.prototype._onsaparrowkey=function(e,s,i){if(!this.getEnabled()||!this.getEditable()){return}if(!this._oSuggestionPopup||!this._oSuggestionPopup.isOpen()){return}if(s!=="up"&&s!=="down"){return}e.preventDefault();e.stopPropagation();var f=false,o=this._oList,g=this.getSuggestionItems(),h=o.getItems(),j=this._iPopupListSelectedIndex,n,O=j;if(s==="up"&&j===0){return}if(s=="down"&&j===h.length-1){return}var k;if(i>1){if(s=="down"&&j+i>=h.length){s="up";i=1;h[j].setSelected(false);k=j;j=h.length-1;f=true}else if(s=="up"&&j-i<0){s="down";i=1;h[j].setSelected(false);k=j;j=0;f=true}}if(j===-1){j=0;if(this._isSuggestionItemSelectable(h[j])){O=j;f=true}else{s="down"}}if(s==="down"){while(j<h.length-1&&(!f||!this._isSuggestionItemSelectable(h[j]))){h[j].setSelected(false);j=j+i;f=true;i=1;if(k===j){break}}}else{while(j>0&&(!f||!h[j].getVisible()||!this._isSuggestionItemSelectable(h[j]))){h[j].setSelected(false);j=j-i;f=true;i=1;if(k===j){break}}}if(!this._isSuggestionItemSelectable(h[j])){if(O>=0){h[O].setSelected(true)}return}else{h[j].setSelected(true)}if(sap.ui.Device.system.desktop){this._scrollToItem(j,s)}if(sap.m.ColumnListItem&&h[j]instanceof sap.m.ColumnListItem){n=this._getInputValue(this._fnRowResultFilter(h[j]))}else{var m=(g[0]instanceof sap.ui.core.ListItem?true:false);if(m){n=this._getInputValue(h[j].getLabel())}else{n=this._getInputValue(h[j].getTitle())}}this._$input.val(n);this._sSelectedSuggViaKeyboard=n;this._doSelect();this._iPopupListSelectedIndex=j};d.prototype.onsapup=function(e){this._onsaparrowkey(e,"up",1)};d.prototype.onsapdown=function(e){this._onsaparrowkey(e,"down",1)};d.prototype.onsappageup=function(e){this._onsaparrowkey(e,"up",5)};d.prototype.onsappagedown=function(e){this._onsaparrowkey(e,"down",5)};d.prototype.onsaphome=function(e){if(this._oList){this._onsaparrowkey(e,"up",this._oList.getItems().length)}};d.prototype.onsapend=function(e){if(this._oList){this._onsaparrowkey(e,"down",this._oList.getItems().length)}};d.prototype.onsapescape=function(e){if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){e.originalEvent._sapui_handledByControl=true;this._oSuggestionPopup.close();return}if(I.prototype.onsapescape){I.prototype.onsapescape.apply(this,arguments)}};d.prototype.onsapenter=function(e){if(I.prototype.onsapenter){I.prototype.onsapenter.apply(this,arguments)}if(this._iSuggestDelay){q.sap.clearDelayedCall(this._iSuggestDelay);this._iSuggestDelay=null}if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){if(this._iPopupListSelectedIndex>=0){var s=this._oList.getItems()[this._iPopupListSelectedIndex];if(s){this._fireSuggestionItemSelectedEvent(s)}this._doSelect();this._iPopupListSelectedIndex=-1}this._oSuggestionPopup.close()}};d.prototype.onsapfocusleave=function(e){var p=this._oSuggestionPopup;if(p instanceof P){if(e.relatedControlId&&q.sap.containsOrEquals(p.getDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){this.focus()}else{if(this._$input.val()===this._sSelectedSuggViaKeyboard){this._sSelectedSuggViaKeyboard=null}}}var f=sap.ui.getCore().byId(e.relatedControlId);if(!(p&&f&&q.sap.containsOrEquals(p.getDomRef(),f.getFocusDomRef()))){I.prototype.onfocusout.apply(this,[e])}};d.prototype.onmousedown=function(e){var p=this._oSuggestionPopup;if((p instanceof P)&&p.isOpen()){e.stopPropagation()}};d.prototype._deregisterEvents=function(){if(this._sPopupResizeHandler){sap.ui.core.ResizeHandler.deregister(this._sPopupResizeHandler);this._sPopupResizeHandler=null}if(this._bUseDialog&&this._oSuggestionPopup){this.$().off("click")}};d.prototype.updateSuggestionItems=function(){this.updateAggregation("suggestionItems");this._refreshItemsDelayed();return this};d.prototype._triggerSuggest=function(v){if(this._iSuggestDelay){q.sap.clearDelayedCall(this._iSuggestDelay);this._iSuggestDelay=null}if(!v){v=""}if(v.length>=this.getStartSuggestion()){this._iSuggestDelay=q.sap.delayedCall(300,this,function(){this._bBindingUpdated=false;this.fireSuggest({suggestValue:v});if(!this.bBindingUpdate){this._refreshItemsDelayed()}})}else if(this._bUseDialog){if(this._oList instanceof T){this._oList.addStyleClass("sapMInputSuggestionTableHidden")}else{this._oList.destroyItems()}}else if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){this._oSuggestionPopup.close()}};(function(){d.prototype.setShowSuggestion=function(v){this.setProperty("showSuggestion",v,true);this._iPopupListSelectedIndex=-1;if(v){this._lazyInitializeSuggestionPopup(this)}else{g(this)}return this};d.prototype.setShowTableSuggestionValueHelp=function(v){this.setProperty("showTableSuggestionValueHelp",v,true);if(!this._oSuggestionPopup){return this}if(v){this._addShowMoreButton()}else{this._removeShowMoreButton()}return this};d.prototype._getShowMoreButton=function(){var t=this,m=sap.ui.getCore().getLibraryResourceBundle("sap.m");return this._oShowMoreButton||(this._oShowMoreButton=new sap.m.Button({text:m.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:function(){if(t.getShowTableSuggestionValueHelp()){t.fireValueHelpRequest({fromSuggestions:true});t._oSuggestionPopup.close()}}}))};d.prototype._getButtonToolbar=function(){var s=this._getShowMoreButton();return this._oButtonToolbar||(this._oButtonToolbar=new a({content:[new b(),s]}))};d.prototype._addShowMoreButton=function(t){if(!this._oSuggestionPopup||!t&&!this._hasTabularSuggestions()){return}if(this._oSuggestionPopup instanceof D){var s=this._getShowMoreButton();this._oSuggestionPopup.setEndButton(s)}else{var h=this._getButtonToolbar();this._oSuggestionPopup.setFooter(h)}};d.prototype._removeShowMoreButton=function(){if(!this._oSuggestionPopup||!this._hasTabularSuggestions()){return}if(this._oSuggestionPopup instanceof D){this._oSuggestionPopup.setEndButton(null)}else{this._oSuggestionPopup.setFooter(null)}};d.prototype._onInput=function(E){var v=this._$input.val();if(this.getMaxLength()>0&&v.length>this.getMaxLength()){v=v.substring(0,this.getMaxLength());this._$input.val(v)}if(this.getValueLiveUpdate()){this.setProperty("value",v,true)}this.fireLiveChange({value:v,newValue:v});if(this.getShowSuggestion()&&!this._bUseDialog){this._triggerSuggest(v)}};d.prototype.getValue=function(){return this.getDomRef("inner")?this._$input.val():this.getProperty("value")};d.prototype._refreshItemsDelayed=function(){q.sap.clearDelayedCall(this._iRefreshListTimeout);this._iRefreshListTimeout=q.sap.delayedCall(0,this,r,[this])};d.prototype.addSuggestionItem=function(i){this.addAggregation("suggestionItems",i,true);this._refreshItemsDelayed();f(this);return this};d.prototype.insertSuggestionItem=function(i,h){this.insertAggregation("suggestionItems",h,i,true);this._refreshItemsDelayed();f(this);return this};d.prototype.removeSuggestionItem=function(i){var h=this.removeAggregation("suggestionItems",i,true);this._refreshItemsDelayed();return h};d.prototype.removeAllSuggestionItems=function(){var h=this.removeAllAggregation("suggestionItems",true);this._refreshItemsDelayed();return h};d.prototype.destroySuggestionItems=function(){this.destroyAggregation("suggestionItems",true);this._refreshItemsDelayed();return this};d.prototype.addSuggestionRow=function(i){i.setType(sap.m.ListType.Active);this.addAggregation("suggestionRows",i);this._refreshItemsDelayed();f(this);return this};d.prototype.insertSuggestionRow=function(i,h){i.setType(sap.m.ListType.Active);this.insertAggregation("suggestionRows",h,i);this._refreshItemsDelayed();f(this);return this};d.prototype.removeSuggestionRow=function(i){var h=this.removeAggregation("suggestionRows",i);this._refreshItemsDelayed();return h};d.prototype.removeAllSuggestionRows=function(){var h=this.removeAllAggregation("suggestionRows");this._refreshItemsDelayed();return h};d.prototype.destroySuggestionRows=function(){this.destroyAggregation("suggestionRows");this._refreshItemsDelayed();return this};d.prototype.bindAggregation=function(){var h=Array.prototype.slice.call(arguments);if(h[0]==="suggestionRows"||h[0]==="suggestionColumns"||h[0]==="suggestionItems"){f(this,h[0]==="suggestionRows"||h[0]==="suggestionColumns");this._bBindingUpdated=true}this._callMethodInManagedObject.apply(this,["bindAggregation"].concat(h));return this};d.prototype._lazyInitializeSuggestionPopup=function(){if(!this._oSuggestionPopup){e(this)}};function e(i){var m=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(i._bUseDialog){i._oPopupInput=new d(i.getId()+"-popup-input",{width:"100%",valueLiveUpdate:true,liveChange:function(E){var v=E.getParameter("newValue");i._$input.val(i._getInputValue(i._oPopupInput.getValue()));i._triggerSuggest(v);i.fireLiveChange({value:v,newValue:v})}}).addStyleClass("sapMInputSuggInDialog")}i._oSuggestionPopup=!i._bUseDialog?(new P(i.getId()+"-popup",{showHeader:false,placement:sap.m.PlacementType.Vertical,initialFocus:i}).attachAfterClose(function(){i._iPopupListSelectedIndex=-1;if(i._oList instanceof T){i._oList.removeSelections(true)}else{i._oList.destroyItems()}})):(new D(i.getId()+"-popup",{beginButton:new sap.m.Button(i.getId()+"-popup-closeButton",{text:m.getText("MSGBOX_CLOSE"),press:function(){i._oSuggestionPopup.close()}}),stretch:i._bFullScreen,contentHeight:i._bFullScreen?undefined:"20rem",customHeader:new B(i.getId()+"-popup-header",{contentMiddle:i._oPopupInput}),horizontalScrolling:false,initialFocus:i._oPopupInput}).attachBeforeOpen(function(){i._oPopupInput.setPlaceholder(i.getPlaceholder());i._oPopupInput.setMaxLength(i.getMaxLength())}).attachBeforeClose(function(){i._$input.val(i._getInputValue(i._oPopupInput.getValue()));i._changeProxy()}).attachAfterClose(function(){if(T&&!(i._oList instanceof T)){i._oList.destroyItems()}else{i._oList.removeSelections(true)}}).attachAfterOpen(function(){var v=i.getValue();i._oPopupInput.setValue(v);i.fireSuggest({suggestValue:v});r(i)}));i._oSuggestionPopup.addStyleClass("sapMInputSuggestionPopup");i.addDependent(i._oSuggestionPopup);if(!i._bUseDialog){o(i._oSuggestionPopup,i)}if(i._oList){i._oSuggestionPopup.addContent(i._oList)}if(i.getShowTableSuggestionValueHelp()){i._addShowMoreButton()}}function f(i,t){if(i._oList){return}if(!i._hasTabularSuggestions()&&!t){i._oList=new L(i.getId()+"-popup-list",{width:"100%",showNoData:false})}else{if(i._fnFilter===d._DEFAULTFILTER){i._fnFilter=d._DEFAULTFILTER_TABULAR}if(!i._fnRowResultFilter){i._fnRowResultFilter=d._DEFAULTRESULT_TABULAR}i._oList=i._getSuggestionsTable();if(i.getShowTableSuggestionValueHelp()){i._addShowMoreButton(t)}}if(i._oSuggestionPopup){if(i._bUseDialog){i._oSuggestionPopup.addAggregation("content",i._oList,true);var R=i._oSuggestionPopup.$("scrollCont")[0];if(R){var h=sap.ui.getCore().createRenderManager();h.renderControl(i._oList);h.flush(R);h.destroy()}}else{i._oSuggestionPopup.addContent(i._oList)}}}function g(i){if(i._oList instanceof T){i._oSuggestionPopup.removeAllContent();i._removeShowMoreButton()}if(i._oSuggestionPopup){i._oSuggestionPopup.destroy();i._oSuggestionPopup=null}if(i._oList instanceof L){i._oList.destroy();i._oList=null}}function o(p,i){p._marginTop=0;p._marginLeft=0;p._marginRight=0;p._marginBottom=0;p._arrowOffset=0;p._offsets=["0 0","0 0","0 0","0 0"];p._myPositions=["begin bottom","begin center","begin top","end center"];p._atPositions=["begin top","end center","begin bottom","begin center"];p.open=function(){this.openBy(i,false,true)};p.oPopup.setAnimations(function(R,h,O){O()},function(R,h,C){C()})}function r(h){var s=h.getShowSuggestion();h._iPopupListSelectedIndex=-1;if(!(s&&h.getDomRef()&&(h._bUseDialog||h.$().hasClass("sapMInputFocused")))){return false}var j,k=h.getSuggestionItems(),t=h.getSuggestionRows(),m=h._$input.val(),n=h._oList,F=m&&m.length>0,H=[],p=0,u=h._oSuggestionPopup,v={ontouchstart:function(E){(E.originalEvent||E)._sapui_cancelAutoClose=true}},w,i;if(h._oList){if(h._oList instanceof T){n.removeSelections(true)}else{n.destroyItems()}}if(!F&&h.getFilterSuggests()){if(!h._bUseDialog){u.close()}else{if(h._hasTabularSuggestions()&&h._oList){h._oList.addStyleClass("sapMInputSuggestionTableHidden")}}return false}else{F=h.getFilterSuggests()}if(h._hasTabularSuggestions()){if(h._bUseDialog&&h._oList){h._oList.removeStyleClass("sapMInputSuggestionTableHidden")}for(i=0;i<t.length;i++){if(!F||h._fnFilter(m,t[i])){t[i].setVisible(true);H.push(t[i])}else{t[i].setVisible(false)}}}else{var x=(k[0]instanceof sap.ui.core.ListItem?true:false);for(i=0;i<k.length;i++){j=k[i];if(!F||h._fnFilter(m,j)){if(x){w=new sap.m.DisplayListItem(j.getId()+"-dli");w.setLabel(j.getText());w.setValue(j.getAdditionalText())}else{w=new S(j.getId()+"-sli");w.setTitle(j.getText())}w.setType(j.getEnabled()?sap.m.ListType.Active:sap.m.ListType.Inactive);w.attachPress(function(){var O=h.getValue(),N;h.fireSuggestionItemSelected({selectedItem:this._oItem});if(O!==h.getValue()){N=h.getValue()}else if(x){N=this.getLabel()}else{N=this.getTitle()}if(h._bUseDialog){h._oPopupInput.setValue(N);h._oPopupInput._doSelect()}else{h._$input.val(h._getInputValue(N));h._changeProxy()}u.close();if(!sap.ui.Device.support.touch){h._doSelect()}});w._oItem=j;w.addEventDelegate(v);H.push(w)}}}p=H.length;if(p>0){if(!h._hasTabularSuggestions()){for(i=0;i<p;i++){n.addItem(H[i])}}if(!h._bUseDialog){if(h._sCloseTimer){clearTimeout(h._sCloseTimer);h._sCloseTimer=null}if(!u.isOpen()&&!h._sOpenTimer){h._sOpenTimer=setTimeout(function(){h._resizePopup();h._sOpenTimer=null;u.open()},0)}}}else{if(!h._bUseDialog){if(u.isOpen()){h._sCloseTimer=setTimeout(function(){u.close()},0)}}else{if(h._hasTabularSuggestions()&&h._oList){h._oList.addStyleClass("sapMInputSuggestionTableHidden")}}}}})();d.prototype.onfocusin=function(e){I.prototype.onfocusin.apply(this,arguments);this.$().addClass("sapMInputFocused");if(!this.getStartSuggestion()&&!this.getValue()){this._triggerSuggest(this.getValue())}};d.prototype.onsapshow=function(e){if(!this.getEnabled()||!this.getShowValueHelp()){return}this.fireValueHelpRequest({fromSuggestions:false});e.preventDefault();e.stopPropagation()};d.prototype.onsaphide=d.prototype.onsapshow;d.prototype.onsapselect=function(e){this._fireValueHelpRequestForValueHelpOnly()};d.prototype.onfocusout=function(e){this.$().removeClass("sapMInputFocused");this.closeValueStateMessage(this)};d.prototype._hasTabularSuggestions=function(){return!!(this.getAggregation("suggestionColumns")&&this.getAggregation("suggestionColumns").length)};d.prototype._getSuggestionsTable=function(){var t=this;if(!this._oSuggestionTable){this._oSuggestionTable=new T(this.getId()+"-popup-table",{mode:sap.m.ListMode.SingleSelectMaster,showNoData:false,showSeparators:"All",width:"100%",enableBusyIndicator:false,rememberSelection:false,selectionChange:function(e){var i=t,o=i.getValue(),s=e.getParameter("listItem"),n;t.fireSuggestionItemSelected({selectedRow:s});if(o!==i.getValue()){n=i.getValue()}else{n=t._fnRowResultFilter(s)}if(t._bUseDialog){t._oPopupInput.setValue(n);t._oPopupInput._doSelect()}else{t._$input.val(t._getInputValue(n));t._changeProxy()}t._oSuggestionPopup.close();if(!sap.ui.Device.support.touch){t._doSelect()}}});if(this._bUseDialog){this._oSuggestionTable.addStyleClass("sapMInputSuggestionTableHidden")}this._oSuggestionTable.updateItems=function(){T.prototype.updateItems.apply(this,arguments);t._refreshItemsDelayed();return this}}return this._oSuggestionTable};d.prototype._fireSuggestionItemSelectedEvent=function(s){if(sap.m.ColumnListItem&&s instanceof sap.m.ColumnListItem){this.fireSuggestionItemSelected({selectedRow:s})}else{this.fireSuggestionItemSelected({selectedItem:s._oItem})}};d.prototype._callMethodInManagedObject=function(f,A){var e=Array.prototype.slice.call(arguments),s;if(A==="suggestionColumns"){s=this._getSuggestionsTable();return s[f].apply(s,["columns"].concat(e.slice(2)))}else if(A==="suggestionRows"){s=this._getSuggestionsTable();return s[f].apply(s,["items"].concat(e.slice(2)))}else{return sap.ui.core.Control.prototype[f].apply(this,e.slice(1))}};d.prototype.validateAggregation=function(A,o,m){return this._callMethodInManagedObject("validateAggregation",A,o,m)};d.prototype.setAggregation=function(A,o,s){this._callMethodInManagedObject("setAggregation",A,o,s);return this};d.prototype.getAggregation=function(A,o){return this._callMethodInManagedObject("getAggregation",A,o)};d.prototype.indexOfAggregation=function(A,o){return this._callMethodInManagedObject("indexOfAggregation",A,o)};d.prototype.insertAggregation=function(A,o,i,s){this._callMethodInManagedObject("insertAggregation",A,o,i,s);return this};d.prototype.addAggregation=function(A,o,s){this._callMethodInManagedObject("addAggregation",A,o,s);return this};d.prototype.removeAggregation=function(A,o,s){return this._callMethodInManagedObject("removeAggregation",A,o,s)};d.prototype.removeAllAggregation=function(A,s){return this._callMethodInManagedObject("removeAllAggregation",A,s)};d.prototype.destroyAggregation=function(A,s){this._callMethodInManagedObject("destroyAggregation",A,s);return this};d.prototype.getBinding=function(A){return this._callMethodInManagedObject("getBinding",A)};d.prototype.getBindingInfo=function(A){return this._callMethodInManagedObject("getBindingInfo",A)};d.prototype.getBindingPath=function(A){return this._callMethodInManagedObject("getBindingPath",A)};return d},true);
