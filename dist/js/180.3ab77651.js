"use strict";(self["webpackChunkco_work"]=self["webpackChunkco_work"]||[]).push([[180],{2180:function(e,t,a){a.r(t),a.d(t,{default:function(){return k}});a(7658);var r=a(3396),s=a(6565),o=a(2483),u=a(65),c=a(4870),i=a(4217);const l={class:"container"},n="registerStore",d="userStore";var m={__name:"GoogleOAuthCallback",setup(e){const t=(0,o.yj)(),a=(0,o.tv)(),m=(0,u.oR)(),h=(0,c.iH)(m.state.redirectURL);return s.be.get(`/user-service/accounts/oauth2/google/callback?code=${t.query.code}`).then((e=>{e.data&&(null==e.data.user_id?(m.commit(`${n}/setUserEmail`,e.data.user_email),m.commit(`${n}/setPictureUrl`,e.data.picture_url),a.push("/accounts/signup")):(m.commit(`${d}/setUserId`,e.data.user_id),m.commit(`${d}/setJwtToken`,e.data.jwtToken),m.commit(`${d}/setRole`,e.data.role),null!=h.value?(m.commit("setRedirectURL",null),a.push(`${h.value}`)):a.push(`/dashboard/${e.data.role}/${e.data.user_id}`)))})),(e,t)=>((0,r.wg)(),(0,r.iD)("div",l,[(0,r.Wm)(i.Z)]))}};const h=m;var k=h}}]);
//# sourceMappingURL=180.3ab77651.js.map