"use strict";(self["webpackChunkco_work"]=self["webpackChunkco_work"]||[]).push([[25],{3025:function(a,s,c){c.r(s),c.d(s,{default:function(){return X}});var t=c(3396),n=c(4870),l=c(7139);const i=a=>((0,t.dD)("data-v-5c26f132"),a=a(),(0,t.Cn)(),a),d={class:"progress"},o={class:"content"},e=i((()=>(0,t._)("span",{class:"title"},"전체 작업 ",-1))),v={class:"circle circle-all"},p={class:"content"},r=i((()=>(0,t._)("span",{class:"title"},"진행 중 ",-1))),u={class:"circle circle-inprogress"},g={class:"content"},_=i((()=>(0,t._)("span",{class:"title"},"완료 ",-1))),b={class:"circle circle-done"};var w={__name:"Progress",props:{progress:{type:Object,default:{totalWorks:0,notStarted:0,inProgress:0,done:0}}},setup(a){return(s,c)=>((0,t.wg)(),(0,t.iD)("div",d,[(0,t._)("div",o,[e,(0,t._)("div",v,[(0,t._)("span",null,(0,l.zw)(a.progress.totalWorks),1)])]),(0,t._)("div",p,[r,(0,t._)("div",u,[(0,t._)("span",null,(0,l.zw)(a.progress.inProgress),1)])]),(0,t._)("div",g,[_,(0,t._)("div",b,[(0,t._)("span",null,(0,l.zw)(a.progress.done),1)])])]))}},f=c(89);const k=(0,f.Z)(w,[["__scopeId","data-v-5c26f132"]]);var m=k;c(7658);const h=a=>((0,t.dD)("data-v-8022de60"),a=a(),(0,t.Cn)(),a),x={class:"contribution-graph"},E={class:"explanation"},D=h((()=>(0,t._)("h3",null,"기여도 그래프",-1))),y={class:"contribution"},C=["src"],q={class:"user-info"},j={class:"student-number"},z={class:"user-name"},I={class:"graph-space"},H={class:"c-number"};var P={__name:"Graph",props:{contribution:{type:Array,default:[]}},setup(a){const s=a,c=s.contribution.reduce(((a,s,c,t)=>a+s.contribution),0),n=[];for(let t of s.contribution)n.push(t.contribution/c*160+"%");return(s,c)=>((0,t.wg)(),(0,t.iD)("div",x,[(0,t._)("div",E,[D,(0,t._)("i",{class:"fi fi-ss-interrogation",onClick:c[0]||(c[0]=a=>s.$emit("openEx"))})]),(0,t._)("div",y,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(a.contribution,((a,s)=>((0,t.wg)(),(0,t.iD)("div",{key:s,class:"member"},[(0,t._)("img",{class:"user-img",src:a.pictureUrl},null,8,C),(0,t._)("div",q,[(0,t._)("p",j,(0,l.zw)(a.studentNumber),1),(0,t._)("p",z,(0,l.zw)(a.name),1)]),(0,t._)("div",I,[(0,t._)("div",{class:"stick",style:(0,l.j5)({"--graph-width":n[s]})},null,4),(0,t._)("span",H,(0,l.zw)(a.contribution),1)])])))),128))])]))}};const S=(0,f.Z)(P,[["__scopeId","data-v-8022de60"]]);var U=S;const Z=a=>((0,t.dD)("data-v-322ac0c3"),a=a(),(0,t.Cn)(),a),M={class:"header"},O=Z((()=>(0,t._)("div",{class:"title"},[(0,t._)("div",null,[(0,t._)("i",{class:"fi fi-ss-thumbtack"})]),(0,t._)("div",null,[(0,t._)("span",null,"기여도 측정 방식")])],-1))),W=Z((()=>(0,t._)("i",{class:"fi fi-sr-cross"},null,-1))),$=[W],A=(0,t.uE)('<div class="content" data-v-322ac0c3><p class="exp" data-v-322ac0c3>기여도는 작업 점수와 피드백 점수의 총합으로 계산됩니다.</p><div class="work tag-sub" data-v-322ac0c3><div data-v-322ac0c3><i class="fi fi-sr-tags" data-v-322ac0c3></i></div><div class="tag-sub-content" data-v-322ac0c3><span data-v-322ac0c3>작업 점수</span></div></div><p class="sub" data-v-322ac0c3>작업 점수는 아래의 과정을 거쳐서 얻을 수 있습니다.</p><ul data-v-322ac0c3><li data-v-322ac0c3>자신이 담당한 작업에 대한 결과물을 <span class="tag tag-file" data-v-322ac0c3>파일</span>에서 글쓰기를 통해 올립니다.</li><li data-v-322ac0c3>모든 팀원은 게시글에 대한 피드백을 남길 수 있는데, <span class="tag" data-v-322ac0c3>&quot;수정 요청이 아닌 피드백&quot;</span>을 남기면 해당 게시글을 <span class="status allow" data-v-322ac0c3>[수락]</span>한 상태가 되고, <span class="tag" data-v-322ac0c3>&quot;수정 요청 피드백&quot;</span>을 남기면 <span class="status refuse" data-v-322ac0c3>[거절]</span>한 상태가 됩니다.</li><li data-v-322ac0c3>본인을 제외한 모든 팀원들이 해당 게시글에 대해 <span class="status allow" data-v-322ac0c3>[수락]</span> 상태가 되면, 해당 작업은 <span class="status done" data-v-322ac0c3>[완료]</span> 상태가 되어 본인만 <span class="tag" data-v-322ac0c3>&#39;작업 중요도&#39;</span>만큼 점수를 획득하게 됩니다.</li><li data-v-322ac0c3>만약 팀원 중 한 명이라도 수정요청을 한 경우, 수정 요청을 반영해서 게시글을 수정해야 합니다. 게시글을 수정하면 수정요청을 한 팀원에게 수정에 대한 [수락/거절]가 알림으로 전송되며, 모든 팀원이 <span class="status allow" data-v-322ac0c3>[승인]</span> 상태가 되기 전까지는 작업 점수가 부여되지 않습니다.</li></ul><div class="feedback tag-sub" data-v-322ac0c3><div data-v-322ac0c3><i class="fi fi-sr-tags" data-v-322ac0c3></i></div><div class="tag-sub-content" data-v-322ac0c3><span data-v-322ac0c3>피드백 점수</span></div></div><p class="sub" data-v-322ac0c3>피드백 점수는 아래의 과정을 거쳐서 얻을 수 있습니다.</p><ul data-v-322ac0c3><li data-v-322ac0c3>팀원들이 <span class="tag tag-file" data-v-322ac0c3>파일</span>에 올린 게시글에 피드백을 하면 수정요청 여부에 관계없이 피드백 점수 <span class="tag" data-v-322ac0c3>1점</span>을 획득합니다.</li><li data-v-322ac0c3>게시글에 작성할 수 있는 피드백 개수에는 제한이 없으나, 피드백 점수는 각 게시글당 최대 1점까지 획득 가능합니다.</li><li data-v-322ac0c3>본인이 쓴 게시글에는 피드백을 작성해도 점수를 받을 수 없습니다.</li></ul><div class="caution tag-sub" data-v-322ac0c3><div class="caution-icon" data-v-322ac0c3><span data-v-322ac0c3><i class="fi fi-ss-triangle-warning" data-v-322ac0c3></i></span></div><div class="tag-sub-content caution-span" data-v-322ac0c3><span data-v-322ac0c3>주의사항</span></div></div><ul data-v-322ac0c3><li data-v-322ac0c3>작업 마감일 이전에 해당 작업에 대한 게시글을 올려야 작업 점수 전체를 획득할 수 있습니다.</li><li data-v-322ac0c3>작업 마감일이 지나고 <span class="tag" data-v-322ac0c3>24시간 이내</span>에 게시글을 올린 경우, 작업 점수의 <span class="tag" data-v-322ac0c3>절반</span>만큼만 획득할 수 있습니다. 즉, <span class="tag" data-v-322ac0c3>2023.08.03 00:00</span>이 마감일이었다면 <span class="tag" data-v-322ac0c3>2023.08.04 00:00</span> 이전에 올려야 작업 점수를 절반이라도 받을 수 있습니다.</li><li data-v-322ac0c3>작업 마감일로부터 <span class="tag" data-v-322ac0c3>24시간 이후</span>에 게시글을 올리는 경우 작업 점수를 받을 수 없습니다. 즉, 위 예시에서 <span class="tag" data-v-322ac0c3>2023.08.04 00:00</span> 이후부터 작업 점수는 <span class="tag" data-v-322ac0c3>0점</span>입니다.</li><li data-v-322ac0c3>피드백을 할 수 있는 기한은 게시글이 올라온 후 <span class="tag" data-v-322ac0c3>48시간 이내</span>입니다. 만약 48시간 이내에 피드백을 하지 않으면 자동으로 <span class="status allow" data-v-322ac0c3>[수락]</span> 상태가 되고, 피드백 점수는 <span class="tag" data-v-322ac0c3>0점</span>이 됩니다.</li><li data-v-322ac0c3>하나의 게시글에 대한 수정요청은 한 사람당 <span class="tag" data-v-322ac0c3>3번</span>까지 가능합니다. 이후부터는 자동으로 <span class="status allow" data-v-322ac0c3>[수락]</span> 상태가 되며, 계속해서 수정 요청을 하더라도 작업의 <span class="status done" data-v-322ac0c3>[완료]</span> 여부에 영향을 끼치지 않습니다.</li></ul></div>',1);var G={__name:"Explanation",emits:["closeEx","openEx"],setup(a,{emit:s}){const c=a=>{a.stopPropagation(),s("openEx")},n=()=>{s("closeEx")},l=()=>{s("closeEx")};return(a,s)=>((0,t.wg)(),(0,t.iD)("div",{class:"black-bg",onMousedown:n},[(0,t._)("div",{class:"white-bg",onMousedown:c},[(0,t._)("div",M,[O,(0,t._)("div",{class:"close-icon",onMousedown:l},$,32)]),A],32)],32))}};const K=(0,f.Z)(G,[["__scopeId","data-v-322ac0c3"]]);var N=K,Y=c(6565),B=c(2483);const F=a=>((0,t.dD)("data-v-fde63728"),a=a(),(0,t.Cn)(),a),J={class:"contribution"},L=F((()=>(0,t._)("div",{class:"margin-space"},null,-1))),Q={class:"contribution-graph"},R=F((()=>(0,t._)("div",{class:"margin-space"},null,-1)));var T={__name:"Contribution",setup(a){const s=(0,B.yj)(),{teamId:c}=s.params,l=(0,n.iH)(),i=(0,n.iH)();let d=(0,n.iH)(!1);Y.be.get(`/dashboard-service/contributions/${c}`).then((a=>{console.log(a),l.value=a.data.progress,i.value=a.data.contribution}));const o=()=>{d.value=!0},e=()=>{d.value=!1};return(a,s)=>((0,t.wg)(),(0,t.iD)("div",J,[1==(0,n.SU)(d)?((0,t.wg)(),(0,t.j4)(N,{key:0,onCloseEx:e,onOpenEx:o})):(0,t.kq)("",!0),l.value?((0,t.wg)(),(0,t.j4)((0,n.SU)(m),{key:1,progress:l.value},null,8,["progress"])):(0,t.kq)("",!0),L,(0,t._)("div",Q,[i.value?((0,t.wg)(),(0,t.j4)((0,n.SU)(U),{key:0,contribution:i.value,onOpenEx:o},null,8,["contribution"])):(0,t.kq)("",!0)]),R]))}};const V=(0,f.Z)(T,[["__scopeId","data-v-fde63728"]]);var X=V}}]);
//# sourceMappingURL=25.6aeca5f1.js.map