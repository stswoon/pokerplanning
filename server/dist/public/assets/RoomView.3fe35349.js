import{d as _,_ as h,o as n,c as r,a,n as w,f as B,p as N,g as S,t as b,b as I,F as p,h as m,i as $,j as l,e as g,r as k}from"./index.8e224840.js";import{r as u,u as V}from"./room.service.0fddc71d.js";const D=_({props:["cardShirt","rotateAngle","value","nonVisible","showAnimation","flipCardAnimation"],data:function(){return{showAnimationState:this.showAnimation}},computed:{displayText:function(){return this.value===.5?"&half;":this.value}},watch:{value:function(e,s){if(e!=s){const o=this.showAnimationState==="UP"?"_run-transformation-up":"_run-transformation-down",i=this.$el;i.classList.remove(o),i.offsetWidth,i.classList.add(o)}}}});const R=e=>(N("data-v-cec2be46"),e=e(),S(),e),L={class:"flip-card-inner"},F=R(()=>a("div",{class:"flip-card-back"},[a("img")],-1)),P={class:"flip-card-front"},O=["innerHTML"];function W(e,s,o,i,v,f){return n(),r("div",{class:w(["card-container",{"_run-transformation-up":this.showAnimationState==="UP","_run-transformation-down":this.showAnimationState==="DOWN","_run-flip-animation":e.flipCardAnimation}])},[a("div",{class:w(["flip-card card",{"_non-visible":e.nonVisible,"flip-card-show":e.cardShirt}]),style:B({transform:`rotate(${e.rotateAngle}deg)`})},[a("div",L,[F,a("div",P,[a("span",{innerHTML:e.displayText},null,8,O)])])],6)],2)}const A=h(D,[["render",W],["__scopeId","data-v-cec2be46"]]),j="/assets/u1.5cab49a1.png",M="/assets/u2.9124d0ae.png",q="/assets/u3.b92d06b8.png",z="/assets/u4.9cbaa497.png",E="/assets/u5.50729001.png",H="/assets/u3.b92d06b8.png",Q="/assets/u2.9124d0ae.png",G="/assets/u8.45c59d43.png",J=_({props:["userName","display","displayName","order"],computed:{backgroundImage:function(){const e=new URL(Object.assign({"./icons/u1.png":j,"./icons/u2.png":M,"./icons/u3.png":q,"./icons/u4.png":z,"./icons/u5.png":E,"./icons/u6.png":H,"./icons/u7.png":Q,"./icons/u8.png":G})[`./icons/u${this.order}.png`],self.location).href;return"url("+e+")"}}});const K={key:0,class:"user-name"},X={key:1,class:"user-name"};function Y(e,s,o,i,v,f){return n(),r("div",{class:w(["user-container",{"user-in-line":e.display==="line"}])},[e.displayName==="up"?(n(),r("div",K,b(e.userName),1)):I("",!0),a("div",{class:"user",style:B([{"'q":"q'"},{"background-image":e.backgroundImage}])},null,4),e.displayName==="down"||e.display==="line"?(n(),r("div",X,b(e.userName),1)):I("",!0)],2)}const U=h(J,[["render",Y],["__scopeId","data-v-038839c4"]]),Z=_({components:{User:U},emits:["clearCards","flipCards","changeName"],props:{votes:{type:Array,default:[]},showCards:{type:Boolean,default:!1}},methods:{cardValueDisplay:function(e){return this.showCards?e.cardValue==null?"no card":e.cardValue:e.cardValue==null?"waiting":"??"}},computed:{average:function(){const e=this.votes.filter(o=>typeof o.cardValue=="number");let s=e.reduce((o,i)=>o+i.cardValue,0);return s=s/e.length,s=Math.round(s*10)/10,s}}});const C=e=>(N("data-v-f457af44"),e=e(),S(),e),x={class:"scoreboard"},ee=C(()=>a("hr",null,null,-1)),se={class:"average"},ae=C(()=>a("hr",null,null,-1)),oe={class:"scoreboard__user-line"},ne=C(()=>a("span",null,":\xA0",-1)),te=C(()=>a("hr",null,null,-1));function re(e,s,o,i,v,f){const c=l("User");return n(),r("div",x,[a("button",{onClick:s[0]||(s[0]=d=>this.$emit("clearCards"))},"Clear cards"),a("button",{onClick:s[1]||(s[1]=d=>this.$emit("flipCards"))},"Flip cards"),ee,a("div",se,"Average: "+b(e.showCards?e.average:"??"),1),ae,a("div",null,[(n(!0),r(p,null,m(e.votes,(d,t)=>(n(),r("div",oe,[a("span",null,[$(c,{"user-name":d.userName,display:"line",order:t+1},null,8,["user-name","order"])]),ne,a("span",null,b(e.cardValueDisplay(d)),1)]))),256))]),te,a("button",{onClick:s[2]||(s[2]=d=>this.$emit("changeName"))},"Change name")])}const de=h(Z,[["render",re],["__scopeId","data-v-f457af44"]]),ie=_({components:{Card:A,User:U},props:["votes","showCards"],computed:{voteUp:function(){let e=this.votes.map((s,o)=>(s.order=o+1,s));return e=e.filter((s,o)=>o%2===0),e},voteDown:function(){let e=this.votes.map((s,o)=>(s.order=o+1,s));return e=e.filter((s,o)=>o%2!==0),e}}});const T=e=>(N("data-v-e9b216fa"),e=e(),S(),e),ce={class:"table-container"},le={class:"table-bench",id:"bench-up"},_e={class:"table"},ue=T(()=>a("div",{class:"table__left"},null,-1)),pe={class:"table__middle"},me={class:"table__middle-up"},he={class:"table__middle-down"},ve=T(()=>a("div",{class:"table__right"},null,-1)),fe={class:"table-bench",id:"bench-down"};function ge(e,s,o,i,v,f){const c=l("User"),d=l("Card");return n(),r("div",ce,[a("div",le,[(n(!0),r(p,null,m(e.voteUp,t=>(n(),g(c,{userName:t.userName,"display-name":"up",order:t.order},null,8,["userName","order"]))),256))]),a("div",_e,[ue,a("div",pe,[a("div",me,[(n(!0),r(p,null,m(e.voteUp,t=>(n(),g(d,{value:t.cardValue,rotateAngle:t.rotateAngle,cardShirt:!e.showCards,"non-visible":t.cardValue==null,"show-animation":"DOWN"},null,8,["value","rotateAngle","cardShirt","non-visible"]))),256))]),a("div",he,[(n(!0),r(p,null,m(e.voteDown,t=>(n(),g(d,{value:t.cardValue,rotateAngle:t.rotateAngle,cardShirt:!e.showCards,"non-visible":t.cardValue==null,"show-animation":"UP"},null,8,["value","rotateAngle","cardShirt","non-visible"]))),256))])]),ve]),a("div",fe,[(n(!0),r(p,null,m(e.voteDown,t=>(n(),g(c,{userName:t.userName,"display-name":"down",order:t.order},null,8,["userName","order"]))),256))])])}const $e=h(ie,[["render",ge],["__scopeId","data-v-e9b216fa"]]);let y=[0,.5,1,2,3,4,5,6,7,8,9,10,12,15,30,"?"];y=y.map(e=>({value:e,cardBack:!0}));const be=_({components:{Card:A},emits:["throwCard"],data(){return{avCards:y}},mounted(){this.avCards.forEach((e,s)=>{setTimeout(()=>e.cardBack=!1,1e3+s*100)})}});const Ce={class:"card-board"},we=["onClick"];function ye(e,s,o,i,v,f){const c=l("Card");return n(),r("div",Ce,[(n(!0),r(p,null,m(e.avCards,d=>(n(),r("button",{class:"card",onClick:t=>this.$emit("throwCard",d.value)},[$(c,{value:d.value,"card-shirt":d.cardBack},null,8,["value","card-shirt"])],8,we))),256))])}const Ne=h(be,[["render",ye],["__scopeId","data-v-ec470b21"]]),Se=_({components:{CardBoard:Ne,Table:$e,ScoreBoard:de,Card:A},data(){return{votes:[],showCards:!1}},methods:{throwCard:function(e){u.throwCard(e)},clearCards:function(){u.clearCards()},flipCards:function(){u.flipCards()},changeName:function(){u.setUserName("");const e=V.getQueryParameter("roomId");k.push(`/?redirectRoomId=${e}`)}},mounted(){if(u.getUserName())u.attachWsToRoom(s=>{this.votes=Object.values(s.votes),this.showCards=s.showCards});else{const s=V.getQueryParameter("roomId");k.push(`/?redirectRoomId=${s}`)}}});const Ae={class:"room-container"},Ie={class:"room-container__table"},ke={class:"room-container__card-board"},Ve={class:"room-container__score-board"};function Be(e,s,o,i,v,f){const c=l("Table"),d=l("CardBoard"),t=l("ScoreBoard");return n(),r("div",Ae,[a("div",Ie,[$(c,{votes:e.votes,"show-cards":e.showCards},null,8,["votes","show-cards"])]),a("div",ke,[$(d,{onThrowCard:e.throwCard},null,8,["onThrowCard"])]),a("div",Ve,[$(t,{votes:e.votes,"show-cards":e.showCards,onClearCards:e.clearCards,onFlipCards:e.flipCards,onChangeName:e.changeName},null,8,["votes","show-cards","onClearCards","onFlipCards","onChangeName"])])])}const Ue=h(Se,[["render",Be],["__scopeId","data-v-0bc86348"]]),Re=_({__name:"RoomView",setup(e){return(s,o)=>(n(),g(Ue))}});export{Re as default};
//# sourceMappingURL=RoomView.3fe35349.js.map
