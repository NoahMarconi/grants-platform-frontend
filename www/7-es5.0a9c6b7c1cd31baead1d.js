(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"/QED":function(n,t,l){"use strict";l.d(t,"a",(function(){return o}));var e=l("mrSG"),u=l("CcnG"),r=(l("ZZ/e"),l("ODeS")),i=l("gIcY"),o=(l("qfBg"),l("syeQ"),function(){function n(n,t,l,e,r,o,s){var a=this;this.popoverCtrl=n,this.modalController=t,this.route=l,this.grantService=e,this.events=r,this.userService=o,this.fb=s,this.searchBar=!1,this.searchResult=[],this.picture=!1,this.onChange=new u.m,this.getUserData(),this.events.subscribe("profile-change",(function(n){n&&a.getUserData()})),this.path=this.route.snapshot.pathFromRoot[3].url[0].path,"my-grants"!=this.path&&"latest-grants"!=this.path&&"trending-grants"!=this.path||(this.searchBar=!0),this.myForm=this.fb.group({searchBox:new i.f})}return n.prototype.ngOnInit=function(){},n.prototype.userMenuPopover=function(n){return e.__awaiter(this,void 0,void 0,(function(){return e.__generator(this,(function(n){switch(n.label){case 0:return[4,this.popoverCtrl.create({component:r.a,event:event,translucent:!0,cssClass:"poopover-user-option"})];case 1:return[4,n.sent().present()];case 2:return[2,n.sent()]}}))}))},n.prototype.getUserData=function(){var n=this;this.userService.getUser().subscribe((function(t){n.userData=t.data,n.userData&&n.userData.hasOwnProperty("picture")&&n.userData.picture&&(n.picture=!0)}))},n.prototype.onSearch=function(){this.onChange.emit(this.myForm.controls.searchBox.value)},n.prototype.selectGrant=function(n){this.myForm.controls.searchBox.setValue(n.grantName),this.onSearch()},n}())},"/zMi":function(n,t,l){"use strict";l.d(t,"a",(function(){return c}));var e=l("mrSG"),u=l("K9Ia"),r=l("CHF0"),i=l("lGQG"),o=l("Of3r"),s=l("CcnG"),a=l("t/Na"),c=function(n){function t(t,l){var e=n.call(this)||this;return e.auth=t,e.http=l,e.userDataSubject=new u.a,e.onUserDataChange=e.userDataSubject.asObservable(),localStorage.getItem(r.a.localStorage_keys.userData)&&(e.userData=JSON.parse(localStorage.getItem(r.a.localStorage_keys.userData))),e.subscriptions(),e}return e.__extends(t,n),t.prototype.subscriptions=function(){this.auth.authState.subscribe((function(n){}))},Object.defineProperty(t.prototype,"getUserData",{get:function(){return this.userData},enumerable:!0,configurable:!0}),t.prototype.setUserData=function(n){this.userData=n,localStorage.setItem(r.a.localStorage_keys.userData,JSON.stringify(this.userData)),this.userDataSubject.next(this.userData)},t.ngInjectableDef=s.Vb({factory:function(){return new t(s.Wb(i.a),s.Wb(a.c))},token:t,providedIn:"root"}),t}(o.a)},"02rE":function(n,t,l){"use strict";var e=l("CcnG"),u=l("oBZk"),r=l("ZZ/e"),i=l("gIcY"),o=l("Ip0R");l("/QED"),l("ZYCi"),l("syeQ"),l("qfBg"),l.d(t,"a",(function(){return s})),l.d(t,"b",(function(){return b}));var s=e.ub({encapsulation:0,styles:[["ion-header[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{-o-object-fit:fill;object-fit:fill;border-radius:50%}ion-header[_ngcontent-%COMP%]   .user-icon[_ngcontent-%COMP%]{margin-right:15px}ion-header[_ngcontent-%COMP%]   .ion-buttons[_ngcontent-%COMP%]{width:0!important}ion-header[_ngcontent-%COMP%]   .sc-ion-card-md-s[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:unset}ion-header[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{margin:0;margin-bottom:8px!important}"]],data:{}});function a(n){return e.Sb(0,[(n()(),e.wb(0,0,null,null,1,"ion-title",[],null,null,null,u.ab,u.z)),e.vb(1,49152,null,0,r.Ab,[e.h,e.k,e.B],null,null)],null,null)}function c(n){return e.Sb(0,[(n()(),e.wb(0,0,null,null,15,"ion-item",[["class","custom-search"],["lines","none"]],null,null,null,u.N,u.m)),e.vb(1,49152,null,0,r.H,[e.h,e.k,e.B],{lines:[0,"lines"]},null),(n()(),e.wb(2,0,null,0,2,"ion-label",[["slot","start"]],null,null,null,u.O,u.n)),e.vb(3,49152,null,0,r.N,[e.h,e.k,e.B],null,null),(n()(),e.Qb(-1,0,["Find"])),(n()(),e.wb(5,0,null,0,6,"ion-input",[["formControlName","searchBox"],["mode","md"],["placeholder","grant ..."],["type","search"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionBlur"],[null,"ionChange"]],(function(n,t,l){var u=!0;return"ionBlur"===t&&(u=!1!==e.Ib(n,6)._handleBlurEvent(l.target)&&u),"ionChange"===t&&(u=!1!==e.Ib(n,6)._handleInputEvent(l.target)&&u),u}),u.M,u.l)),e.vb(6,16384,null,0,r.Pb,[e.k],null,null),e.Nb(1024,null,i.n,(function(n){return[n]}),[r.Pb]),e.vb(8,671744,null,0,i.g,[[3,i.b],[8,null],[8,null],[6,i.n],[2,i.y]],{name:[0,"name"]},null),e.Nb(2048,null,i.o,null,[i.g]),e.vb(10,16384,null,0,i.p,[[4,i.o]],null,null),e.vb(11,49152,null,0,r.G,[e.h,e.k,e.B],{mode:[0,"mode"],placeholder:[1,"placeholder"],type:[2,"type"]},null),(n()(),e.wb(12,0,null,0,3,"ion-button",[["color","primary"],["mode","md"],["slot","end"]],null,[[null,"click"]],(function(n,t,l){var e=!0;return"click"===t&&(e=!1!==n.component.onSearch()&&e),e}),u.C,u.b)),e.vb(13,49152,null,0,r.k,[e.h,e.k,e.B],{color:[0,"color"],mode:[1,"mode"]},null),(n()(),e.wb(14,0,null,0,1,"ion-icon",[["class","gp-search"]],null,null,null,u.L,u.k)),e.vb(15,49152,null,0,r.C,[e.h,e.k,e.B],null,null)],(function(n,t){n(t,1,0,"none"),n(t,8,0,"searchBox"),n(t,11,0,"md","grant ...","search"),n(t,13,0,"primary","md")}),(function(n,t){n(t,5,0,e.Ib(t,10).ngClassUntouched,e.Ib(t,10).ngClassTouched,e.Ib(t,10).ngClassPristine,e.Ib(t,10).ngClassDirty,e.Ib(t,10).ngClassValid,e.Ib(t,10).ngClassInvalid,e.Ib(t,10).ngClassPending)}))}function h(n){return e.Sb(0,[(n()(),e.wb(0,0,null,null,0,"img",[["alt",""],["class","image"],["style","max-width: 20%;"]],[[8,"src",4]],null,null,null,null))],null,(function(n,t){var l=t.component;n(t,0,0,(null==l.userData?null:l.userData.picture)||"")}))}function p(n){return e.Sb(0,[(n()(),e.wb(0,0,null,null,1,"ion-icon",[["name","person"],["size","large"]],null,null,null,u.L,u.k)),e.vb(1,49152,null,0,r.C,[e.h,e.k,e.B],{name:[0,"name"],size:[1,"size"]},null)],(function(n,t){n(t,1,0,"person","large")}),null)}function b(n){return e.Sb(0,[(n()(),e.wb(0,0,null,null,31,"ion-header",[["mode","md"],["no-border",""]],null,null,null,u.K,u.j)),e.vb(1,49152,null,0,r.B,[e.h,e.k,e.B],{mode:[0,"mode"]},null),(n()(),e.wb(2,0,null,0,29,"ion-card",[],null,null,null,u.F,u.d)),e.vb(3,49152,null,0,r.m,[e.h,e.k,e.B],null,null),(n()(),e.wb(4,0,null,0,27,"ion-toolbar",[["color","light"]],null,null,null,u.bb,u.A)),e.vb(5,49152,null,0,r.Cb,[e.h,e.k,e.B],{color:[0,"color"]},null),(n()(),e.wb(6,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,u.D,u.c)),e.vb(7,49152,null,0,r.l,[e.h,e.k,e.B],null,null),(n()(),e.wb(8,0,null,0,1,"ion-menu-button",[],null,null,null,u.R,u.r)),e.vb(9,49152,null,0,r.R,[e.h,e.k,e.B],null,null),(n()(),e.lb(16777216,null,0,1,null,a)),e.vb(11,16384,null,0,o.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(n()(),e.wb(12,0,null,0,7,"form",[["class",""],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(n,t,l){var u=!0;return"submit"===t&&(u=!1!==e.Ib(n,14).onSubmit(l)&&u),"reset"===t&&(u=!1!==e.Ib(n,14).onReset()&&u),u}),null,null)),e.vb(13,16384,null,0,i.z,[],null,null),e.vb(14,540672,null,0,i.i,[[8,null],[8,null]],{form:[0,"form"]},null),e.Nb(2048,null,i.b,null,[i.i]),e.vb(16,16384,null,0,i.q,[[4,i.b]],null,null),(n()(),e.wb(17,0,null,null,2,"div",[],null,null,null,null,null)),(n()(),e.lb(16777216,null,null,1,null,c)),e.vb(19,16384,null,0,o.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(n()(),e.wb(20,0,null,0,11,"ion-buttons",[["slot","end"]],null,null,null,u.D,u.c)),e.vb(21,49152,null,0,r.l,[e.h,e.k,e.B],null,null),(n()(),e.wb(22,0,null,0,4,"div",[["class","user-icon"]],null,null,null,null,null)),(n()(),e.lb(16777216,null,null,1,null,h)),e.vb(24,16384,null,0,o.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(n()(),e.lb(16777216,null,null,1,null,p)),e.vb(26,16384,null,0,o.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(n()(),e.wb(27,0,null,0,4,"ion-button",[["class","user-profile-menu"],["mode","md"]],null,null,null,u.C,u.b)),e.vb(28,49152,null,0,r.k,[e.h,e.k,e.B],{mode:[0,"mode"]},null),(n()(),e.wb(29,0,null,0,2,"span",[],null,null,null,null,null)),(n()(),e.Qb(30,null,["",""])),(n()(),e.wb(31,0,null,null,0,"i",[["class","gp-arrow-down"]],null,[[null,"click"]],(function(n,t,l){var e=!0;return"click"===t&&(e=!1!==n.component.userMenuPopover(l)&&e),e}),null,null))],(function(n,t){var l=t.component;n(t,1,0,"md"),n(t,5,0,"light"),n(t,11,0,!l.searchBar),n(t,14,0,l.myForm),n(t,19,0,l.searchBar),n(t,24,0,l.picture),n(t,26,0,!l.picture),n(t,28,0,"md")}),(function(n,t){var l=t.component;n(t,12,0,e.Ib(t,16).ngClassUntouched,e.Ib(t,16).ngClassTouched,e.Ib(t,16).ngClassPristine,e.Ib(t,16).ngClassDirty,e.Ib(t,16).ngClassValid,e.Ib(t,16).ngClassInvalid,e.Ib(t,16).ngClassPending),n(t,30,0,null!=l.userData&&l.userData.userName?null==l.userData?null:l.userData.userName:"")}))}},Gi3i:function(n,t,l){"use strict";var e=l("mrSG"),u=l("FFOo"),r=l("h9Dq"),i=new(l("CS9Q").a)(r.a);function o(n,t){return void 0===t&&(t=i),function(l){return l.lift(new s(n,t))}}l.d(t,"a",(function(){return o}));var s=function(){function n(n,t){this.dueTime=n,this.scheduler=t}return n.prototype.call=function(n,t){return t.subscribe(new a(n,this.dueTime,this.scheduler))},n}(),a=function(n){function t(t,l,e){var u=n.call(this,t)||this;return u.dueTime=l,u.scheduler=e,u.debouncedSubscription=null,u.lastValue=null,u.hasValue=!1,u}return e.__extends(t,n),t.prototype._next=function(n){this.clearDebounce(),this.lastValue=n,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(c,this.dueTime,this))},t.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},t.prototype.debouncedNext=function(){if(this.clearDebounce(),this.hasValue){var n=this.lastValue;this.lastValue=null,this.hasValue=!1,this.destination.next(n)}},t.prototype.clearDebounce=function(){var n=this.debouncedSubscription;null!==n&&(this.remove(n),n.unsubscribe(),this.debouncedSubscription=null)},t}(u.a);function c(n){n.debouncedNext()}},ODeS:function(n,t,l){"use strict";l.d(t,"a",(function(){return e})),l("lGQG"),l("ZZ/e");var e=function(){function n(n,t,l,e){this.router=n,this.toastr=t,this.popoverCtrl=l,this.authService=e,this.toastTitle="User"}return n.prototype.ngOnInit=function(){},n.prototype.dismiss=function(){this.popoverCtrl.dismiss()},n.prototype.signOut=function(){this.authService.logout(),this.toastr.success("Sign out successfully",this.toastTitle),this.router.navigate(["auth"]),this.dismiss()},n.prototype.profile=function(){this.router.navigate(["pages/user-profile"]),this.dismiss()},n}()},ej43:function(n,t,l){"use strict";l.d(t,"a",(function(){return o}));var e=l("mrSG"),u=l("Of3r"),r=l("67Y/"),i=l("CHF0"),o=(l("lGQG"),l("/zMi"),function(n){function t(t,l,e){var u=n.call(this)||this;return u.http=t,u.userManagementService=l,u.authService=e,u.user=JSON.parse(localStorage.getItem(i.a.localStorage_keys.userData)),u}return e.__extends(t,n),t.prototype.signin=function(n){var t=this;return this.http.post(this.apiUrl+"/auth/login",n).pipe(Object(r.a)((function(n){return delete n.data.privateKey,localStorage.setItem(i.a.localStorage_keys.token,n.data.token),delete n.data.token,delete n.data.picture,t.userManagementService.setUserData(n.data),t.authService.setAuthState({is_logged_in:!0}),n})))},t.prototype.getUserData=function(){return this.http.get(this.apiUrl+"/user/"+this.user._id,this.getHttpOptions())},t.prototype.signup=function(n){return this.http.post(this.apiUrl+"/auth/signUp",n).pipe(Object(r.a)((function(n){return n})))},t}(u.a))},hCpU:function(n,t,l){"use strict";var e=l("CcnG"),u=l("oBZk"),r=l("ZZ/e"),i=l("ODeS"),o=l("ZYCi"),s=l("SZbH"),a=l("lGQG");l.d(t,"a",(function(){return b}));var c=e.ub({encapsulation:0,styles:[[""]],data:{}});function h(n){return e.Sb(0,[(n()(),e.wb(0,0,null,null,6,"ion-buttons",[["slot","end"]],null,null,null,u.D,u.c)),e.vb(1,49152,null,0,r.l,[e.h,e.k,e.B],null,null),(n()(),e.wb(2,0,null,0,4,"ion-button",[["class","user-profile-menu"],["mode","md"]],null,[[null,"click"]],(function(n,t,l){var e=!0;return"click"===t&&(e=!1!==n.component.profile()&&e),e}),u.C,u.b)),e.vb(3,49152,null,0,r.k,[e.h,e.k,e.B],{mode:[0,"mode"]},null),(n()(),e.wb(4,0,null,0,1,"ion-icon",[["name","contact"]],null,null,null,u.L,u.k)),e.vb(5,49152,null,0,r.C,[e.h,e.k,e.B],{name:[0,"name"]},null),(n()(),e.Qb(-1,0,["\xa0 My Profile "])),(n()(),e.wb(7,0,null,null,0,"hr",[["class","dassed-line"]],null,null,null,null,null)),(n()(),e.wb(8,0,null,null,6,"ion-buttons",[["slot","end"]],null,null,null,u.D,u.c)),e.vb(9,49152,null,0,r.l,[e.h,e.k,e.B],null,null),(n()(),e.wb(10,0,null,0,4,"ion-button",[["class","user-profile-menu"],["mode","md"]],null,[[null,"click"]],(function(n,t,l){var e=!0;return"click"===t&&(e=!1!==n.component.signOut()&&e),e}),u.C,u.b)),e.vb(11,49152,null,0,r.k,[e.h,e.k,e.B],{mode:[0,"mode"]},null),(n()(),e.wb(12,0,null,0,1,"ion-icon",[["name","log-out"]],null,null,null,u.L,u.k)),e.vb(13,49152,null,0,r.C,[e.h,e.k,e.B],{name:[0,"name"]},null),(n()(),e.Qb(-1,0,["\xa0 Sign Out "]))],(function(n,t){n(t,3,0,"md"),n(t,5,0,"contact"),n(t,11,0,"md"),n(t,13,0,"log-out")}),null)}function p(n){return e.Sb(0,[(n()(),e.wb(0,0,null,null,1,"app-menu-popover",[],null,null,null,h,c)),e.vb(1,114688,null,0,i.a,[o.m,s.j,r.Lb,a.a],null,null)],(function(n,t){n(t,1,0)}),null)}var b=e.sb("app-menu-popover",i.a,p,{},{},[])},"iIA+":function(n,t,l){"use strict";l.d(t,"a",(function(){return e}));var e=function(){return function(){}}()},mJ8l:function(n,t,l){"use strict";l.d(t,"a",(function(){return e})),l("ODeS");var e=function(){return function(){}}()},syeQ:function(n,t,l){"use strict";l.d(t,"a",(function(){return u}));var e=l("mrSG"),u=function(n){function t(t){var l=n.call(this)||this;return l.http=t,l}return e.__extends(t,n),t.prototype.createGrant=function(n){return this.http.post(this.apiUrl+"/grant",n,this.getHttpOptions())},t.prototype.getAll=function(){return this.http.get(this.apiUrl+"/grant",this.getHttpOptions())},t.prototype.getById=function(n){return this.http.get(this.apiUrl+"/grant/get/"+n,this.getHttpOptions())},t.prototype.getGrantCreatedByMe=function(){return this.http.get(this.apiUrl+"/grant/createdByMe",this.getHttpOptions())},t.prototype.getGrantFundedByMe=function(){return this.http.get(this.apiUrl+"/grant/fundedByMe",this.getHttpOptions())},t.prototype.getGrantManagedByMe=function(){return this.http.get(this.apiUrl+"/grant/managedByMe",this.getHttpOptions())},t.prototype.getTrendingGrants=function(){return this.http.get(this.apiUrl+"/grant/trendingGrants",this.getHttpOptions())},t}(l("Of3r").a)}}]);