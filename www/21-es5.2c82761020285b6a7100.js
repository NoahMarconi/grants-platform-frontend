(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"/QED":function(l,n,u){"use strict";u.d(n,"a",(function(){return r}));var t=u("mrSG"),e=u("CcnG"),o=(u("ZZ/e"),u("ODeS")),i=u("gIcY"),r=(u("qfBg"),u("syeQ"),function(){function l(l,n,u,t,o,r,a){var s=this;this.popoverCtrl=l,this.modalController=n,this.route=u,this.grantService=t,this.events=o,this.userService=r,this.fb=a,this.searchBar=!1,this.searchResult=[],this.picture=!1,this.onChange=new e.m,this.getUserData(),this.events.subscribe("profile-change",(function(l){l&&s.getUserData()})),this.path=this.route.snapshot.pathFromRoot[3].url[0].path,"my-grants"!=this.path&&"latest-grants"!=this.path&&"trending-grants"!=this.path||(this.searchBar=!0),this.myForm=this.fb.group({searchBox:new i.f})}return l.prototype.ngOnInit=function(){},l.prototype.userMenuPopover=function(l){return t.__awaiter(this,void 0,void 0,(function(){return t.__generator(this,(function(l){switch(l.label){case 0:return[4,this.popoverCtrl.create({component:o.a,event:event,translucent:!0,cssClass:"poopover-user-option"})];case 1:return[4,l.sent().present()];case 2:return[2,l.sent()]}}))}))},l.prototype.getUserData=function(){var l=this;this.userService.getUser().subscribe((function(n){l.userData=n.data,l.userData&&l.userData.hasOwnProperty("picture")&&l.userData.picture&&(l.picture=!0)}))},l.prototype.onSearch=function(){this.onChange.emit(this.myForm.controls.searchBox.value)},l.prototype.selectGrant=function(l){this.myForm.controls.searchBox.setValue(l.grantName),this.onSearch()},l}())},"/zMi":function(l,n,u){"use strict";u.d(n,"a",(function(){return c}));var t=u("mrSG"),e=u("K9Ia"),o=u("CHF0"),i=u("lGQG"),r=u("Of3r"),a=u("CcnG"),s=u("t/Na"),c=function(l){function n(n,u){var t=l.call(this)||this;return t.auth=n,t.http=u,t.userDataSubject=new e.a,t.onUserDataChange=t.userDataSubject.asObservable(),localStorage.getItem(o.a.localStorage_keys.userData)&&(t.userData=JSON.parse(localStorage.getItem(o.a.localStorage_keys.userData))),t.subscriptions(),t}return t.__extends(n,l),n.prototype.subscriptions=function(){this.auth.authState.subscribe((function(l){}))},Object.defineProperty(n.prototype,"getUserData",{get:function(){return this.userData},enumerable:!0,configurable:!0}),n.prototype.setUserData=function(l){this.userData=l,localStorage.setItem(o.a.localStorage_keys.userData,JSON.stringify(this.userData)),this.userDataSubject.next(this.userData)},n.ngInjectableDef=a.Vb({factory:function(){return new n(a.Wb(i.a),a.Wb(s.c))},token:n,providedIn:"root"}),n}(r.a)},"02rE":function(l,n,u){"use strict";var t=u("CcnG"),e=u("oBZk"),o=u("ZZ/e"),i=u("gIcY"),r=u("Ip0R");u("/QED"),u("ZYCi"),u("syeQ"),u("qfBg"),u.d(n,"a",(function(){return a})),u.d(n,"b",(function(){return g}));var a=t.ub({encapsulation:0,styles:[["ion-header[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{-o-object-fit:fill;object-fit:fill;border-radius:50%}ion-header[_ngcontent-%COMP%]   .user-icon[_ngcontent-%COMP%]{margin-right:15px}ion-header[_ngcontent-%COMP%]   .ion-buttons[_ngcontent-%COMP%]{width:0!important}ion-header[_ngcontent-%COMP%]   .sc-ion-card-md-s[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:unset}ion-header[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{margin:0;margin-bottom:8px!important}"]],data:{}});function s(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"ion-title",[],null,null,null,e.ab,e.z)),t.vb(1,49152,null,0,o.Ab,[t.h,t.k,t.B],null,null)],null,null)}function c(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,15,"ion-item",[["class","custom-search"],["lines","none"]],null,null,null,e.N,e.m)),t.vb(1,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"]},null),(l()(),t.wb(2,0,null,0,2,"ion-label",[["slot","start"]],null,null,null,e.O,e.n)),t.vb(3,49152,null,0,o.N,[t.h,t.k,t.B],null,null),(l()(),t.Qb(-1,0,["Find"])),(l()(),t.wb(5,0,null,0,6,"ion-input",[["formControlName","searchBox"],["mode","md"],["placeholder","grant ..."],["type","search"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var e=!0;return"ionBlur"===n&&(e=!1!==t.Ib(l,6)._handleBlurEvent(u.target)&&e),"ionChange"===n&&(e=!1!==t.Ib(l,6)._handleInputEvent(u.target)&&e),e}),e.M,e.l)),t.vb(6,16384,null,0,o.Pb,[t.k],null,null),t.Nb(1024,null,i.n,(function(l){return[l]}),[o.Pb]),t.vb(8,671744,null,0,i.g,[[3,i.b],[8,null],[8,null],[6,i.n],[2,i.y]],{name:[0,"name"]},null),t.Nb(2048,null,i.o,null,[i.g]),t.vb(10,16384,null,0,i.p,[[4,i.o]],null,null),t.vb(11,49152,null,0,o.G,[t.h,t.k,t.B],{mode:[0,"mode"],placeholder:[1,"placeholder"],type:[2,"type"]},null),(l()(),t.wb(12,0,null,0,3,"ion-button",[["color","primary"],["mode","md"],["slot","end"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onSearch()&&t),t}),e.C,e.b)),t.vb(13,49152,null,0,o.k,[t.h,t.k,t.B],{color:[0,"color"],mode:[1,"mode"]},null),(l()(),t.wb(14,0,null,0,1,"ion-icon",[["class","gp-search"]],null,null,null,e.L,e.k)),t.vb(15,49152,null,0,o.C,[t.h,t.k,t.B],null,null)],(function(l,n){l(n,1,0,"none"),l(n,8,0,"searchBox"),l(n,11,0,"md","grant ...","search"),l(n,13,0,"primary","md")}),(function(l,n){l(n,5,0,t.Ib(n,10).ngClassUntouched,t.Ib(n,10).ngClassTouched,t.Ib(n,10).ngClassPristine,t.Ib(n,10).ngClassDirty,t.Ib(n,10).ngClassValid,t.Ib(n,10).ngClassInvalid,t.Ib(n,10).ngClassPending)}))}function b(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,0,"img",[["alt",""],["class","image"],["style","max-width: 20%;"]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){var u=n.component;l(n,0,0,(null==u.userData?null:u.userData.picture)||"")}))}function d(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"ion-icon",[["name","person"],["size","large"]],null,null,null,e.L,e.k)),t.vb(1,49152,null,0,o.C,[t.h,t.k,t.B],{name:[0,"name"],size:[1,"size"]},null)],(function(l,n){l(n,1,0,"person","large")}),null)}function g(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,31,"ion-header",[["mode","md"],["no-border",""]],null,null,null,e.K,e.j)),t.vb(1,49152,null,0,o.B,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.wb(2,0,null,0,29,"ion-card",[],null,null,null,e.F,e.d)),t.vb(3,49152,null,0,o.m,[t.h,t.k,t.B],null,null),(l()(),t.wb(4,0,null,0,27,"ion-toolbar",[["color","light"]],null,null,null,e.bb,e.A)),t.vb(5,49152,null,0,o.Cb,[t.h,t.k,t.B],{color:[0,"color"]},null),(l()(),t.wb(6,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,e.D,e.c)),t.vb(7,49152,null,0,o.l,[t.h,t.k,t.B],null,null),(l()(),t.wb(8,0,null,0,1,"ion-menu-button",[],null,null,null,e.R,e.r)),t.vb(9,49152,null,0,o.R,[t.h,t.k,t.B],null,null),(l()(),t.lb(16777216,null,0,1,null,s)),t.vb(11,16384,null,0,r.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.wb(12,0,null,0,7,"form",[["class",""],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,u){var e=!0;return"submit"===n&&(e=!1!==t.Ib(l,14).onSubmit(u)&&e),"reset"===n&&(e=!1!==t.Ib(l,14).onReset()&&e),e}),null,null)),t.vb(13,16384,null,0,i.z,[],null,null),t.vb(14,540672,null,0,i.i,[[8,null],[8,null]],{form:[0,"form"]},null),t.Nb(2048,null,i.b,null,[i.i]),t.vb(16,16384,null,0,i.q,[[4,i.b]],null,null),(l()(),t.wb(17,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),t.lb(16777216,null,null,1,null,c)),t.vb(19,16384,null,0,r.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.wb(20,0,null,0,11,"ion-buttons",[["slot","end"]],null,null,null,e.D,e.c)),t.vb(21,49152,null,0,o.l,[t.h,t.k,t.B],null,null),(l()(),t.wb(22,0,null,0,4,"div",[["class","user-icon"]],null,null,null,null,null)),(l()(),t.lb(16777216,null,null,1,null,b)),t.vb(24,16384,null,0,r.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.lb(16777216,null,null,1,null,d)),t.vb(26,16384,null,0,r.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.wb(27,0,null,0,4,"ion-button",[["class","user-profile-menu"],["mode","md"]],null,null,null,e.C,e.b)),t.vb(28,49152,null,0,o.k,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.wb(29,0,null,0,2,"span",[],null,null,null,null,null)),(l()(),t.Qb(30,null,["",""])),(l()(),t.wb(31,0,null,null,0,"i",[["class","gp-arrow-down"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.userMenuPopover(u)&&t),t}),null,null))],(function(l,n){var u=n.component;l(n,1,0,"md"),l(n,5,0,"light"),l(n,11,0,!u.searchBar),l(n,14,0,u.myForm),l(n,19,0,u.searchBar),l(n,24,0,u.picture),l(n,26,0,!u.picture),l(n,28,0,"md")}),(function(l,n){var u=n.component;l(n,12,0,t.Ib(n,16).ngClassUntouched,t.Ib(n,16).ngClassTouched,t.Ib(n,16).ngClassPristine,t.Ib(n,16).ngClassDirty,t.Ib(n,16).ngClassValid,t.Ib(n,16).ngClassInvalid,t.Ib(n,16).ngClassPending),l(n,30,0,null!=u.userData&&u.userData.userName?null==u.userData?null:u.userData.userName:"")}))}},ODeS:function(l,n,u){"use strict";u.d(n,"a",(function(){return t})),u("lGQG"),u("ZZ/e");var t=function(){function l(l,n,u,t){this.router=l,this.toastr=n,this.popoverCtrl=u,this.authService=t,this.toastTitle="User"}return l.prototype.ngOnInit=function(){},l.prototype.dismiss=function(){this.popoverCtrl.dismiss()},l.prototype.signOut=function(){this.authService.logout(),this.toastr.success("Sign out successfully",this.toastTitle),this.router.navigate(["auth"]),this.dismiss()},l.prototype.profile=function(){this.router.navigate(["pages/user-profile"]),this.dismiss()},l}()},ej43:function(l,n,u){"use strict";u.d(n,"a",(function(){return r}));var t=u("mrSG"),e=u("Of3r"),o=u("67Y/"),i=u("CHF0"),r=(u("lGQG"),u("/zMi"),function(l){function n(n,u,t){var e=l.call(this)||this;return e.http=n,e.userManagementService=u,e.authService=t,e.user=JSON.parse(localStorage.getItem(i.a.localStorage_keys.userData)),e}return t.__extends(n,l),n.prototype.signin=function(l){var n=this;return this.http.post(this.apiUrl+"/auth/login",l).pipe(Object(o.a)((function(l){return delete l.data.privateKey,localStorage.setItem(i.a.localStorage_keys.token,l.data.token),delete l.data.token,delete l.data.picture,n.userManagementService.setUserData(l.data),n.authService.setAuthState({is_logged_in:!0}),l})))},n.prototype.getUserData=function(){return this.http.get(this.apiUrl+"/user/"+this.user._id,this.getHttpOptions())},n.prototype.signup=function(l){return this.http.post(this.apiUrl+"/auth/signUp",l).pipe(Object(o.a)((function(l){return l})))},n}(e.a))},hCpU:function(l,n,u){"use strict";var t=u("CcnG"),e=u("oBZk"),o=u("ZZ/e"),i=u("ODeS"),r=u("ZYCi"),a=u("SZbH"),s=u("lGQG");u.d(n,"a",(function(){return g}));var c=t.ub({encapsulation:0,styles:[[""]],data:{}});function b(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,6,"ion-buttons",[["slot","end"]],null,null,null,e.D,e.c)),t.vb(1,49152,null,0,o.l,[t.h,t.k,t.B],null,null),(l()(),t.wb(2,0,null,0,4,"ion-button",[["class","user-profile-menu"],["mode","md"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.profile()&&t),t}),e.C,e.b)),t.vb(3,49152,null,0,o.k,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.wb(4,0,null,0,1,"ion-icon",[["name","contact"]],null,null,null,e.L,e.k)),t.vb(5,49152,null,0,o.C,[t.h,t.k,t.B],{name:[0,"name"]},null),(l()(),t.Qb(-1,0,["\xa0 My Profile "])),(l()(),t.wb(7,0,null,null,0,"hr",[["class","dassed-line"]],null,null,null,null,null)),(l()(),t.wb(8,0,null,null,6,"ion-buttons",[["slot","end"]],null,null,null,e.D,e.c)),t.vb(9,49152,null,0,o.l,[t.h,t.k,t.B],null,null),(l()(),t.wb(10,0,null,0,4,"ion-button",[["class","user-profile-menu"],["mode","md"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.signOut()&&t),t}),e.C,e.b)),t.vb(11,49152,null,0,o.k,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.wb(12,0,null,0,1,"ion-icon",[["name","log-out"]],null,null,null,e.L,e.k)),t.vb(13,49152,null,0,o.C,[t.h,t.k,t.B],{name:[0,"name"]},null),(l()(),t.Qb(-1,0,["\xa0 Sign Out "]))],(function(l,n){l(n,3,0,"md"),l(n,5,0,"contact"),l(n,11,0,"md"),l(n,13,0,"log-out")}),null)}function d(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"app-menu-popover",[],null,null,null,b,c)),t.vb(1,114688,null,0,i.a,[r.m,a.j,o.Lb,s.a],null,null)],(function(l,n){l(n,1,0)}),null)}var g=t.sb("app-menu-popover",i.a,d,{},{},[])},"iIA+":function(l,n,u){"use strict";u.d(n,"a",(function(){return t}));var t=function(){return function(){}}()},jfhi:function(l,n,u){"use strict";var t=u("CcnG"),e=u("oBZk"),o=u("ZZ/e"),i=u("Ip0R"),r=u("gIcY"),a=u("tQ5D"),s=u("SZbH"),c=u("ZYCi"),b=u("xb1B"),d=u("syeQ");u.d(n,"a",(function(){return I}));var g=t.ub({encapsulation:0,styles:[["hr[_ngcontent-%COMP%]{margin:0!important}"]],data:{}});function m(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,t.Ab(1,"",null==n.context.$implicit?null:n.context.$implicit.picture,""))}))}function h(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"a",[["href",""]],null,null,null,null,null)),(l()(),t.Qb(-1,null,["View All"]))],null,null)}function p(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,17,"li",[],[[8,"className",0]],null,null,null,null)),(l()(),t.wb(1,0,null,null,1,"span",[["class","status"]],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,0,"i",[["class","gp-check-circle"]],null,null,null,null,null)),(l()(),t.wb(3,0,null,null,14,"ion-item",[["lines","none"]],null,null,null,e.N,e.m)),t.vb(4,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"]},null),(l()(),t.wb(5,0,null,0,5,"ion-label",[],null,null,null,e.O,e.n)),t.vb(6,49152,null,0,o.N,[t.h,t.k,t.B],null,null),(l()(),t.wb(7,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(8,null,["Milestone ",""])),(l()(),t.wb(9,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),t.Qb(10,null,["",""])),(l()(),t.wb(11,0,null,0,6,"ion-label",[["class","cost"],["slot","end"],["text-right",""]],null,null,null,e.O,e.n)),t.vb(12,49152,null,0,o.N,[t.h,t.k,t.B],null,null),t.vb(13,16384,null,0,o.d,[t.k],null,null),(l()(),t.wb(14,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),t.Qb(15,null,["$ ",""])),(l()(),t.wb(16,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(17,null,["OUT OF $ ",""]))],(function(l,n){l(n,4,0,"none")}),(function(l,n){var u=n.component;l(n,0,0,t.Ab(1,"",null==n.context.$implicit?null:n.context.$implicit.status,"")),l(n,8,0,n.context.$implicit.milestoneNumber),l(n,10,0,n.context.$implicit.completionDate),l(n,15,0,n.context.$implicit.funding),l(n,17,0,null==u.grant?null:u.grant.grantAmount)}))}function v(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,3,"div",[["class","delivery-date-milestone"]],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,2,"ul",[["class","milestone-status"]],null,null,null,null,null)),(l()(),t.lb(16777216,null,null,1,null,p)),t.vb(4,278528,null,0,i.j,[t.R,t.O,t.u],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,4,0,null==u.grant?null:u.grant.multipleMilestones)}),null)}function f(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,25,"div",[],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,24,"div",[["class","delivery-date-milestone"]],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,4,"div",[["class","time-of-deliver"]],null,null,null,null,null)),(l()(),t.wb(3,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.Qb(-1,null,["Delivery Date"])),(l()(),t.wb(5,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(6,null,["",""])),(l()(),t.wb(7,0,null,null,18,"ul",[["class","milestone-status"]],null,null,null,null,null)),(l()(),t.wb(8,0,null,null,17,"li",[],[[8,"className",0]],null,null,null,null)),(l()(),t.wb(9,0,null,null,1,"span",[["class","status"]],null,null,null,null,null)),(l()(),t.wb(10,0,null,null,0,"i",[["class","gp-check-circle"]],null,null,null,null,null)),(l()(),t.wb(11,0,null,null,14,"ion-item",[["lines","none"]],null,null,null,e.N,e.m)),t.vb(12,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"]},null),(l()(),t.wb(13,0,null,0,5,"ion-label",[],null,null,null,e.O,e.n)),t.vb(14,49152,null,0,o.N,[t.h,t.k,t.B],null,null),(l()(),t.wb(15,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(-1,null,["Completion Date"])),(l()(),t.wb(17,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),t.Qb(18,null,["",""])),(l()(),t.wb(19,0,null,0,6,"ion-label",[["class","cost"],["slot","end"],["text-right",""]],null,null,null,e.O,e.n)),t.vb(20,49152,null,0,o.N,[t.h,t.k,t.B],null,null),t.vb(21,16384,null,0,o.d,[t.k],null,null),(l()(),t.wb(22,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),t.Qb(23,null,["$ ",""])),(l()(),t.wb(24,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(25,null,["OUT OF $ ",""]))],(function(l,n){l(n,12,0,"none")}),(function(l,n){var u=n.component;l(n,6,0,null==u.grant?null:u.grant.singleDeliveryDate.fundingExpiryDate),l(n,8,0,t.Ab(1,"",null==u.grant?null:u.grant.singleDeliveryDate.status,"")),l(n,18,0,null==u.grant?null:u.grant.singleDeliveryDate.completionDate),l(n,23,0,null==u.grant?null:u.grant.singleDeliveryDate.funding),l(n,25,0,null==u.grant?null:u.grant.grantAmount)}))}function w(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"label",[["class","error"]],null,null,null,null,null)),(l()(),t.Qb(-1,null,[" Please Enter Amount "]))],null,null)}function k(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,22,"div",[["class","footer-details"]],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,21,"ion-row",[],null,null,null,e.W,e.v)),t.vb(2,49152,null,0,o.jb,[t.h,t.k,t.B],null,null),(l()(),t.wb(3,0,null,0,14,"ion-col",[["size","8"]],null,null,null,e.H,e.g)),t.vb(4,49152,null,0,o.t,[t.h,t.k,t.B],{size:[0,"size"]},null),(l()(),t.wb(5,0,null,0,10,"ion-item",[["lines","none"]],null,null,null,e.N,e.m)),t.vb(6,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"]},null),(l()(),t.wb(7,0,null,0,8,"ion-input",[["name","amount"],["placeholder","Amount"],["required",""],["type","number"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var e=!0,o=l.component;return"ionBlur"===n&&(e=!1!==t.Ib(l,10)._handleBlurEvent(u.target)&&e),"ionChange"===n&&(e=!1!==t.Ib(l,10)._handleIonChange(u.target)&&e),"ngModelChange"===n&&(e=!1!==(o.grantFund.amount=u)&&e),e}),e.M,e.l)),t.vb(8,16384,null,0,r.u,[],{required:[0,"required"]},null),t.Nb(1024,null,r.m,(function(l){return[l]}),[r.u]),t.vb(10,16384,null,0,o.Jb,[t.k],null,null),t.Nb(1024,null,r.n,(function(l){return[l]}),[o.Jb]),t.vb(12,671744,[["amount",4]],0,r.s,[[8,null],[6,r.m],[8,null],[6,r.n]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Nb(2048,null,r.o,null,[r.s]),t.vb(14,16384,null,0,r.p,[[4,r.o]],null,null),t.vb(15,49152,null,0,o.G,[t.h,t.k,t.B],{name:[0,"name"],placeholder:[1,"placeholder"],required:[2,"required"],type:[3,"type"]},null),(l()(),t.lb(16777216,null,0,1,null,w)),t.vb(17,16384,null,0,i.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.wb(18,0,null,0,4,"ion-col",[["size","4"]],null,null,null,e.H,e.g)),t.vb(19,49152,null,0,o.t,[t.h,t.k,t.B],{size:[0,"size"]},null),(l()(),t.wb(20,0,null,0,2,"ion-button",[["expand","block"],["mode","md"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.creteteGrantFund()&&t),t}),e.C,e.b)),t.vb(21,49152,null,0,o.k,[t.h,t.k,t.B],{disabled:[0,"disabled"],expand:[1,"expand"],mode:[2,"mode"]},null),(l()(),t.Qb(-1,0,[" Fund Grant "]))],(function(l,n){var u=n.component;l(n,4,0,"8"),l(n,6,0,"none"),l(n,8,0,""),l(n,12,0,"amount",u.grantFund.amount),l(n,15,0,"amount","Amount","","number"),l(n,17,0,u.submitted&&t.Ib(n,12).invalid),l(n,19,0,"4"),l(n,21,0,u.processing,"block","md")}),(function(l,n){l(n,7,0,t.Ib(n,8).required?"":null,t.Ib(n,14).ngClassUntouched,t.Ib(n,14).ngClassTouched,t.Ib(n,14).ngClassPristine,t.Ib(n,14).ngClassDirty,t.Ib(n,14).ngClassValid,t.Ib(n,14).ngClassInvalid,t.Ib(n,14).ngClassPending)}))}function C(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,33,"ion-header",[["class","modal-header-funds"],["mode","md"],["no-border",""]],null,null,null,e.K,e.j)),t.vb(1,49152,null,0,o.B,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.wb(2,0,null,0,12,"ion-toolbar",[["mode","md"]],null,null,null,e.bb,e.A)),t.vb(3,49152,null,0,o.Cb,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.wb(4,0,null,0,4,"div",[["class","detailed-header-title"]],null,null,null,null,null)),(l()(),t.wb(5,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),t.Qb(6,null,["",""])),(l()(),t.wb(7,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(8,null,["",""])),(l()(),t.wb(9,0,null,0,5,"ion-buttons",[["slot","end"]],null,null,null,e.D,e.c)),t.vb(10,49152,null,0,o.l,[t.h,t.k,t.B],null,null),(l()(),t.wb(11,0,null,0,3,"ion-button",[["color","medium"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.dismiss()&&t),t}),e.C,e.b)),t.vb(12,49152,null,0,o.k,[t.h,t.k,t.B],{color:[0,"color"]},null),(l()(),t.wb(13,0,null,0,1,"ion-icon",[["class","gp-close"],["slot","icon-only"]],null,null,null,e.L,e.k)),t.vb(14,49152,null,0,o.C,[t.h,t.k,t.B],null,null),(l()(),t.wb(15,0,null,0,18,"ion-toolbar",[["class","grant-recepients"],["mode","md"],["no-padding",""]],null,null,null,e.bb,e.A)),t.vb(16,49152,null,0,o.Cb,[t.h,t.k,t.B],{mode:[0,"mode"]},null),t.vb(17,16384,null,0,o.d,[t.k],null,null),(l()(),t.wb(18,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),t.Qb(-1,null,["Grant Recepients"])),(l()(),t.wb(20,0,null,0,13,"ion-item",[["lines","none"]],null,null,null,e.N,e.m)),t.vb(21,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"]},null),(l()(),t.wb(22,0,null,0,5,"div",[["class","users-container"]],null,null,null,null,null)),(l()(),t.wb(23,0,null,null,2,"div",[["class","users"]],null,null,null,null,null)),(l()(),t.lb(16777216,null,null,1,null,m)),t.vb(25,278528,null,0,i.j,[t.R,t.O,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.lb(16777216,null,null,1,null,h)),t.vb(27,16384,null,0,i.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.wb(28,0,null,0,5,"div",[["class","cost-details"],["slot","end"]],null,null,null,null,null)),(l()(),t.wb(29,0,null,null,4,"div",[["class","cost"]],null,null,null,null,null)),(l()(),t.wb(30,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t.Qb(31,null,["$ ",""])),(l()(),t.wb(32,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(33,null,["OUT OF $",""])),(l()(),t.wb(34,0,null,null,8,"ion-content",[],null,null,null,e.I,e.h)),t.vb(35,49152,null,0,o.u,[t.h,t.k,t.B],null,null),(l()(),t.lb(16777216,null,0,1,null,v)),t.vb(37,16384,null,0,i.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.lb(16777216,null,0,1,null,f)),t.vb(39,16384,null,0,i.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.wb(40,0,null,0,0,"hr",[],null,null,null,null,null)),(l()(),t.lb(16777216,null,0,1,null,k)),t.vb(42,16384,null,0,i.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,1,0,"md"),l(n,3,0,"md"),l(n,12,0,"medium"),l(n,16,0,"md"),l(n,21,0,"none"),l(n,25,0,null==u.grant?null:u.grant.donors),l(n,27,0,(null==u.grant?null:u.grant.donors.length)>4),l(n,37,0,u.multipleMilestones),l(n,39,0,!u.multipleMilestones),l(n,42,0,u.allowFunding)}),(function(l,n){var u=n.component;l(n,6,0,null==u.grant?null:u.grant.grantName),l(n,8,0,null==u.grant?null:u.grant.grantLink),l(n,31,0,null==u.grant?null:u.grant.fund),l(n,33,0,null==u.grant?null:u.grant.grantAmount)}))}function B(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"app-view-grunt",[],null,null,null,C,g)),t.vb(1,114688,null,0,a.a,[o.Gb,s.j,o.Ib,c.m,b.a,d.a],null,null)],(function(l,n){l(n,1,0)}),null)}var I=t.sb("app-view-grunt",a.a,B,{grantData:"grantData"},{},[])},jvSz:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=u("mrSG"),o=u("ZZ/e"),i=u("ODeS"),r=u("syeQ"),a=u("tQ5D"),s=function(){function l(l,n,u){this.popoverCtrl=l,this.modalController=n,this.grantService=u,this.getTrendingGrants()}return l.prototype.ngOnInit=function(){},l.prototype.userMenuPopover=function(l){return e.__awaiter(this,void 0,void 0,(function(){return e.__generator(this,(function(l){switch(l.label){case 0:return[4,this.popoverCtrl.create({component:i.a,event:event,translucent:!0,cssClass:"poopover-user-option"})];case 1:return[4,l.sent().present()];case 2:return[2,l.sent()]}}))}))},l.prototype.handleChange=function(l){console.log("e",l),this.seachResult=""==l?this.trendingGrants:this.trendingGrants.filter((function(n){return n.grantName.toLowerCase().includes(l.toLowerCase())}))},l.prototype.viewGrunt=function(l){return e.__awaiter(this,void 0,void 0,(function(){var n,u=this;return e.__generator(this,(function(t){switch(t.label){case 0:return[4,this.modalController.create({component:a.a,cssClass:"custom-modal-style",mode:"ios",componentProps:{grantData:l}})];case 1:return(n=t.sent()).onDidDismiss().then((function(l){var n=l.data;console.log(n),n&&n.hasOwnProperty("reload")&&n.reload&&u.getTrendingGrants()})),[4,n.present()];case 2:return[2,t.sent()]}}))}))},l.prototype.getTrendingGrants=function(){var l=this;this.grantService.getTrendingGrants().subscribe((function(n){l.trendingGrants=n.data,l.seachResult=l.trendingGrants}))},l}(),c=function(){return function(){}}(),b=u("hCpU"),d=u("pMnS"),g=u("oBZk"),m=u("Ip0R"),h=u("02rE"),p=u("/QED"),v=u("ZYCi"),f=u("qfBg"),w=u("gIcY"),k=t.ub({encapsulation:0,styles:[[""]],data:{}});function C(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,(null==n.context.$implicit?null:n.context.$implicit.picture)||"")}))}function B(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,(null==n.context.$implicit?null:n.context.$implicit.picture)||"")}))}function I(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,(null==n.context.$implicit?null:n.context.$implicit.picture)||"")}))}function O(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"a",[["href",""]],null,null,null,null,null)),(l()(),t.Qb(-1,null,["SEE ALL"]))],null,null)}function y(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,49,"ion-card",[["class","grant"],["mode","md"]],null,null,null,g.F,g.d)),t.vb(1,49152,null,0,o.m,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.wb(2,0,null,0,47,"ion-card-content",[],null,null,null,g.E,g.e)),t.vb(3,49152,null,0,o.n,[t.h,t.k,t.B],null,null),(l()(),t.wb(4,0,null,0,45,"ul",[["class","multi-section"]],null,null,null,null,null)),(l()(),t.wb(5,0,null,null,13,"li",[["class","grants-details"]],null,null,null,null,null)),(l()(),t.wb(6,0,null,null,12,"ion-item",[["lines","none"],["mode","md"]],null,null,null,g.N,g.m)),t.vb(7,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),t.wb(8,0,null,0,10,"ion-label",[],null,null,null,g.O,g.n)),t.vb(9,49152,null,0,o.N,[t.h,t.k,t.B],null,null),(l()(),t.wb(10,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),t.Qb(11,null,["",""])),(l()(),t.wb(12,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(13,null,["",""])),(l()(),t.wb(14,0,null,0,4,"div",[["class","users-container"]],null,null,null,null,null)),(l()(),t.wb(15,0,null,null,3,"div",[["class","users"]],null,null,null,null,null)),(l()(),t.lb(16777216,null,null,2,null,C)),t.vb(17,278528,null,0,m.j,[t.R,t.O,t.u],{ngForOf:[0,"ngForOf"]},null),t.Kb(0,m.t,[]),(l()(),t.wb(19,0,null,null,7,"li",[],null,null,null,null,null)),(l()(),t.wb(20,0,null,null,6,"div",[["class","manager-details"]],null,null,null,null,null)),(l()(),t.wb(21,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),t.Qb(-1,null,["Grant Manager"])),(l()(),t.lb(16777216,null,null,1,null,B)),t.vb(24,278528,null,0,m.j,[t.R,t.O,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.wb(25,0,null,null,1,"a",[["href",""]],null,null,null,null,null)),(l()(),t.Qb(26,null,["",""])),(l()(),t.wb(27,0,null,null,9,"li",[],null,null,null,null,null)),(l()(),t.wb(28,0,null,null,8,"div",[["class","recepients-details"]],null,null,null,null,null)),(l()(),t.wb(29,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),t.Qb(-1,null,["Grant Recepients"])),(l()(),t.wb(31,0,null,null,3,"div",[["class","users"]],null,null,null,null,null)),(l()(),t.lb(16777216,null,null,2,null,I)),t.vb(33,278528,null,0,m.j,[t.R,t.O,t.u],{ngForOf:[0,"ngForOf"]},null),t.Kb(0,m.t,[]),(l()(),t.lb(16777216,null,null,1,null,O)),t.vb(36,16384,null,0,m.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(l()(),t.wb(37,0,null,null,12,"li",[["class","cost-details"]],null,null,null,null,null)),(l()(),t.wb(38,0,null,null,11,"ion-item",[["lines","none"],["mode","md"]],null,null,null,g.N,g.m)),t.vb(39,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),t.wb(40,0,null,0,9,"ion-label",[["text-right",""]],null,null,null,g.O,g.n)),t.vb(41,49152,null,0,o.N,[t.h,t.k,t.B],null,null),t.vb(42,16384,null,0,o.d,[t.k],null,null),(l()(),t.wb(43,0,null,0,1,"h3",[],null,null,null,null,null)),(l()(),t.Qb(44,null,["$ ",""])),(l()(),t.wb(45,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Qb(46,null,["OUT OF $ ",""])),(l()(),t.wb(47,0,null,0,2,"ion-button",[["class","details"],["mode","md"],["slot","end"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.viewGrunt(l.context.$implicit)&&t),t}),g.C,g.b)),t.vb(48,49152,null,0,o.k,[t.h,t.k,t.B],{mode:[0,"mode"]},null),(l()(),t.Qb(-1,0,["See Details"]))],(function(l,n){l(n,1,0,"md"),l(n,7,0,"none","md"),l(n,17,0,t.Rb(n,17,0,t.Ib(n,18).transform(n.context.$implicit.grantees,0,4))),l(n,24,0,n.context.$implicit.grantManager),l(n,33,0,t.Rb(n,33,0,t.Ib(n,34).transform(n.context.$implicit.donors,0,4))),l(n,36,0,n.context.$implicit.donors.length>4),l(n,39,0,"none","md"),l(n,48,0,"md")}),(function(l,n){l(n,11,0,n.context.$implicit.grantName),l(n,13,0,n.context.$implicit.grantLink),l(n,26,0,n.context.$implicit.grantManager.userName),l(n,44,0,n.context.$implicit.fund),l(n,46,0,n.context.$implicit.grantAmount)}))}function S(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"app-header",[],null,[[null,"onChange"]],(function(l,n,u){var t=!0;return"onChange"===n&&(t=!1!==l.component.handleChange(u)&&t),t}),h.b,h.a)),t.vb(1,114688,null,0,p.a,[o.Lb,o.Gb,v.a,r.a,o.e,f.a,w.e],null,{onChange:"onChange"}),(l()(),t.wb(2,0,null,null,16,"ion-content",[["color","light"]],null,null,null,g.I,g.h)),t.vb(3,49152,null,0,o.u,[t.h,t.k,t.B],{color:[0,"color"]},null),(l()(),t.wb(4,0,null,0,14,"ion-row",[["class","page-row"]],null,null,null,g.W,g.v)),t.vb(5,49152,null,0,o.jb,[t.h,t.k,t.B],null,null),(l()(),t.wb(6,0,null,0,12,"ion-col",[["size","12"]],null,null,null,g.H,g.g)),t.vb(7,49152,null,0,o.t,[t.h,t.k,t.B],{size:[0,"size"]},null),(l()(),t.wb(8,0,null,0,7,"ion-item",[["class","heading"],["lines","none"],["mode","md"]],null,null,null,g.N,g.m)),t.vb(9,49152,null,0,o.H,[t.h,t.k,t.B],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),t.wb(10,0,null,0,2,"ion-label",[],null,null,null,g.O,g.n)),t.vb(11,49152,null,0,o.N,[t.h,t.k,t.B],null,null),(l()(),t.Qb(-1,0,["Trending Grants"])),(l()(),t.wb(13,0,null,0,2,"ion-button",[["color","dark"],["fill","clear"],["mode","md"],["size","large"],["slot","end"]],null,null,null,g.C,g.b)),t.vb(14,49152,null,0,o.k,[t.h,t.k,t.B],{color:[0,"color"],fill:[1,"fill"],mode:[2,"mode"],size:[3,"size"]},null),(l()(),t.wb(15,0,null,0,0,"i",[["class","gp-filter"]],null,null,null,null,null)),(l()(),t.wb(16,0,null,0,0,"hr",[["class","dassed-line"]],null,null,null,null,null)),(l()(),t.lb(16777216,null,0,1,null,y)),t.vb(18,278528,null,0,m.j,[t.R,t.O,t.u],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,1,0),l(n,3,0,"light"),l(n,7,0,"12"),l(n,9,0,"none","md"),l(n,14,0,"dark","clear","md","large"),l(n,18,0,u.seachResult)}),null)}function D(l){return t.Sb(0,[(l()(),t.wb(0,0,null,null,1,"app-trending-grants",[],null,null,null,S,k)),t.vb(1,114688,null,0,s,[o.Lb,o.Gb,r.a],null,null)],(function(l,n){l(n,1,0)}),null)}var G=t.sb("app-trending-grants",s,D,{},{},[]),Q=u("jfhi"),x=u("ej43"),_=u("t/Na"),N=u("/zMi"),M=u("lGQG"),F=u("xb1B"),R=u("mJ8l"),$=u("iIA+"),j=u("BS6g");u.d(n,"TrendingGrantsModuleNgFactory",(function(){return P}));var P=t.tb(c,[],(function(l){return t.Fb([t.Gb(512,t.j,t.eb,[[8,[b.a,d.a,G,Q.a]],[3,t.j],t.z]),t.Gb(4608,m.m,m.l,[t.w,[2,m.A]]),t.Gb(4608,w.x,w.x,[]),t.Gb(4608,o.a,o.a,[t.B,t.g]),t.Gb(4608,o.Gb,o.Gb,[o.a,t.j,t.s]),t.Gb(4608,o.Lb,o.Lb,[o.a,t.j,t.s]),t.Gb(4608,w.e,w.e,[]),t.Gb(4608,x.a,x.a,[_.c,N.a,M.a]),t.Gb(4608,r.a,r.a,[_.c]),t.Gb(4608,F.a,F.a,[_.c]),t.Gb(1073742336,m.c,m.c,[]),t.Gb(1073742336,w.w,w.w,[]),t.Gb(1073742336,w.k,w.k,[]),t.Gb(1073742336,o.Eb,o.Eb,[]),t.Gb(1073742336,w.t,w.t,[]),t.Gb(1073742336,R.a,R.a,[]),t.Gb(1073742336,$.a,$.a,[]),t.Gb(1073742336,j.a,j.a,[]),t.Gb(1073742336,v.q,v.q,[[2,v.v],[2,v.m]]),t.Gb(1073742336,c,c,[]),t.Gb(1024,v.k,(function(){return[[{path:"",component:s}]]}),[])])}))},mJ8l:function(l,n,u){"use strict";u.d(n,"a",(function(){return t})),u("ODeS");var t=function(){return function(){}}()}}]);