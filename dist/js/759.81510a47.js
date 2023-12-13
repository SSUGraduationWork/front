"use strict";(self["webpackChunkco_work"]=self["webpackChunkco_work"]||[]).push([[759],{5759:function(e,a,t){t.r(a),t.d(a,{default:function(){return K}});var s=t(3396),o=t(7139),l=t(9242);const d=e=>((0,s.dD)("data-v-512ad3a0"),e=e(),(0,s.Cn)(),e),i={key:0,class:"loading-container"},n={key:1},c=d((()=>(0,s._)("h1",{class:"logo"},[(0,s.Uk)("Co"),(0,s._)("span",null,"Work")],-1))),r=[c],m={class:"white-bg"},p=d((()=>(0,s._)("div",{class:"icon-box"},[(0,s._)("div",{class:"icon-circle"},[(0,s._)("i",{class:"fa fa-users","aria-hidden":"true"})])],-1))),u={class:"update-modal-overlay"},h={class:"footer"},v={class:"dialog-footer"},_={class:"white-bg"},g=d((()=>(0,s._)("div",{class:"icon-box"},[(0,s._)("div",{class:"icon-circle"},[(0,s._)("i",{class:"fa fa-users","aria-hidden":"true"})])],-1))),b={class:"update-modal-overlay"},y={class:"footer"},f={class:"dialog-footer"},T={class:"white-bg-delete"},k=(0,s.uE)('<div class="icon-box" data-v-512ad3a0><div class="icon-circle delete-icon-circle" data-v-512ad3a0><i class="fi fi-rs-trash" data-v-512ad3a0></i></div></div><div class="delete-text" data-v-512ad3a0><div class="large" data-v-512ad3a0>이 팀을 삭제하시겠습니까?</div><div class="small" data-v-512ad3a0>삭제 후에는 다시 복구할 수 없습니다.</div></div>',2),w={class:"delete-footer"},j={class:"content"},I={class:"top"},N={class:"watchProjectName"},D=d((()=>(0,s._)("i",{class:"fi fi-br-plus"},null,-1))),C={class:"teams"},M={class:"container1"},P={class:"teamName"},S=d((()=>(0,s._)("div",{class:"semester"},null,-1))),B={class:"participant"},x={class:"teamNumber"},$=d((()=>(0,s._)("div",{class:"margin-space"},null,-1)));function O(e,a,t,d,c,O){const Z=(0,s.up)("Loader"),U=(0,s.up)("el-button"),W=(0,s.up)("Avatar"),z=(0,s.up)("router-link");return c.loading?((0,s.wg)(),(0,s.iD)("div",i,[(0,s.Wm)(Z)])):((0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("div",null,[(0,s._)("span",{class:"collapse-icon",onClick:a[0]||(a[0]=(...a)=>e.toggleSidebar&&e.toggleSidebar(...a))},r)]),(0,s._)("div",{class:"black-bg",style:(0,o.j5)({display:c.updateModalDisplay})},[(0,s._)("div",m,[p,(0,s._)("div",u,[(0,s.wy)((0,s._)("input",{style:{"margin-top":"10px"},"onUpdate:modelValue":a[1]||(a[1]=e=>c.updateTeamName=e),class:"custom-input-style"},null,512),[[l.nr,c.updateTeamName]])]),(0,s._)("div",h,[(0,s._)("span",v,[(0,s._)("button",{onClick:a[2]||(a[2]=e=>O.updateClose()),class:"cancel"},"취소"),(0,s._)("button",{type:"primary",onClick:a[3]||(a[3]=e=>O.updateTeams()),class:"ok"},"수정")])])])],4),(0,s._)("div",{class:"black-bg",style:(0,o.j5)({display:c.postModalDisplay})},[(0,s._)("div",_,[g,(0,s._)("div",b,[(0,s.wy)((0,s._)("input",{placeholder:"팀명을 입력해 주세요",style:{"margin-top":"10px"},"onUpdate:modelValue":a[4]||(a[4]=e=>c.postTeamName=e),class:"custom-input-style"},null,512),[[l.nr,c.postTeamName]])]),(0,s._)("div",y,[(0,s._)("span",f,[(0,s._)("button",{onClick:a[5]||(a[5]=e=>O.close()),class:"cancel"},"취소"),(0,s._)("button",{type:"primary",onClick:a[6]||(a[6]=e=>O.postTeams()),class:"ok"},"생성")])])])],4),(0,s._)("div",{class:"black-bg",style:(0,o.j5)({display:c.deleteModalDisplay})},[(0,s._)("div",T,[k,(0,s._)("div",w,[(0,s._)("button",{type:"danger",onClick:a[7]||(a[7]=e=>O.deleteTeams()),class:"delete"},"삭제"),(0,s._)("button",{type:"primary",onClick:a[8]||(a[8]=e=>O.deleteClose()),class:"cancel"},"취소")])])],4),(0,s._)("div",j,[(0,s._)("div",I,[(0,s._)("div",N,(0,o.zw)(this.projectName),1),(0,s.Wm)(U,{type:"primary",class:"new",onClick:a[9]||(a[9]=e=>O.generate())},{default:(0,s.w5)((()=>[D,(0,s.Uk)("팀 생성")])),_:1})]),(0,s._)("div",C,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(c.teams,(e=>((0,s.wg)(),(0,s.j4)(z,{key:e.teamId,to:{name:"Work",params:{teamId:e.teamId}},class:"team"},{default:(0,s.w5)((()=>[(0,s._)("div",M,[(0,s._)("div",P,(0,o.zw)(e.teamName),1)]),S,(0,s._)("div",B,[(0,s.Wm)(W,{number:e.teamNumber},null,8,["number"]),(0,s._)("div",x,(0,o.zw)(e.teamNumber)+"명 참여",1)])])),_:2},1032,["to"])))),128))]),$])]))}var Z=t(6565),U=t(8514),W=t(8418),z=t(4217),A=t(65);(0,A.oR)();var G={props:["teams"],components:{TeamDeleteButton:U.Z,Avatar:W.Z,Loader:z.Z},computed:{projectId(){return this.$route.params.projectId},postSetParams(){const e={projectId:this.projectId,teamName:this.postTeamName,teamNumber:0};return console.log("params: ",e),e},updateSetParams(){const e={projectId:this.updateProjectId,teamId:this.updateTeamId,teamName:this.updateTeamName,teamNumber:this.updateTeam.teamNumber};return console.log("params: ",e),e}},mounted(){this.showTeams()},data(){return{teams:null,projectName:null,postTeam:null,postTeamName:null,postModalDisplay:"none",updateTeam:null,updateTeamName:null,updateProjectId:null,updateTeamId:null,updateModalDisplay:"none",deleteTeamId:null,deleteModalDisplay:"none",moreButtonOpen:{},loading:!0,owner:!1}},methods:{generate(){this.postModalDisplay="flex"},postTeams(){(0,A.oR)();const e=this.$store.state.userStore.user_id;console.log("studentId: "+e),Z.be.post(`/dashboard-service/dashboard/teams/${this.projectId}/${e}`,this.postSetParams).then((e=>{"Success"==e.data.message&&(this.postTeam=e,this.$router.go(0))})).catch((e=>{console.log(e)}))},close(){this.postModalDisplay="none",this.postTeam=null,this.postTeamName=null},async getTeams(){try{const e=await Z.be.get(`/dashboard-service/dashboard/teamsByPro/${this.projectId}`);"Success"===e.data.message&&(this.teams=e.data.data.object1,this.projectName=e.data.data.string,e.data.data.owner&&(this.owner=e.data.data.owner),console.log(e.data.data)),this.loading=!1}catch(e){console.log(e)}},async showTeams(){await this.getTeams()},updateGenerate(e){this.updateModalDisplay="flex",this.updateTeam=e,this.updateTeamId=e.teamId,this.updateTeamName=e.teamName,this.updateProjectId=e.projectId},updateTeams(){Z.be.post(`/dashboard-service/dashboard/teams/${this.updateTeamId}`,this.updateSetParams).then((e=>{"Success"==e.data.message&&(this.postTeam=e.data.data),this.$router.go(0)})).catch((e=>{console.log(e)}))},updateClose(){this.updateModalDisplay="none",this.updateProject=null,this.updateTeamName=null},deleteClose(){this.deleteModalDisplay="none"},deleteTeams(){console.log(this.deleteTeamId),Z.be.delete(`/dashboard-service/dashboard/teams/${this.deleteTeamId}`).then((e=>{"Success"==e.data.message&&console.log("Completely Delete"),this.$router.go(0)})).catch((e=>{console.log(e)}))},deleteConfirm(){this.deleteModalDisplay="flex"},modButtonControl(e){const a=e.toString();1==this.moreButtonOpen[a]?this.moreButtonOpen[a]=!1:this.moreButtonOpen[a]=!0},deleteGenerate(e){this.deleteModalDisplay="flex",this.deleteTeamId=e}}},q=t(89);const H=(0,q.Z)(G,[["render",O],["__scopeId","data-v-512ad3a0"]]);var K=H},8418:function(e,a,t){t.d(a,{Z:function(){return n}});var s=t(3396),o=t(4870);const l={class:"card flex justify-content-center"};var d={__name:"Avatar",props:{number:{type:Number}},setup(e){const a=e;let t=0,d=0;a.number>3?(t=3,d=a.number-t):t=a.number;const i=`+${d}`;return(e,a)=>{const n=(0,s.up)("Avatar",!0),c=(0,s.up)("AvatarGroup");return(0,s.wg)(),(0,s.iD)("div",l,[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,o.SU)(t),(e=>((0,s.wg)(),(0,s.j4)(n,{key:e,image:"https://cdn-icons-png.flaticon.com/128/149/149071.png",size:"large",shape:"circle"})))),128)),(0,o.SU)(d)>0?((0,s.wg)(),(0,s.j4)(n,{key:0,label:i,shape:"circle",size:"large",style:{color:"'#ffffff'"}})):(0,s.kq)("",!0)])),_:1})])}}};const i=d;var n=i},8514:function(e,a,t){t.d(a,{Z:function(){return u}});var s=t(3396);const o=e=>((0,s.dD)("data-v-0c6505fe"),e=e(),(0,s.Cn)(),e),l={key:0,class:"modification"},d=o((()=>(0,s._)("div",{class:"icon"},[(0,s._)("i",{class:"fi fi-rr-pencil"})],-1))),i=[d],n=o((()=>(0,s._)("div",{class:"icon"},[(0,s._)("i",{class:"fi fi-rs-trash"})],-1))),c=[n];var r={__name:"TeamDeleteButton",props:{moreButtonOpen:{type:Boolean}},emits:["deleteProject","updateProject","closeMod"],setup(e,{emit:a}){const t=e,o=()=>{a("deleteProject"),t.moreButtonOpen=!1,console.log("delete")},d=()=>{a("updateProject"),t.moreButtonOpen=!1,console.log("mod")};return(a,t)=>e.moreButtonOpen?((0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("div",{class:"options"},[(0,s._)("div",{class:"mod",onClick:d},i),(0,s._)("div",{class:"delete",onClick:o},c)])])):(0,s.kq)("",!0)}},m=t(89);const p=(0,m.Z)(r,[["__scopeId","data-v-0c6505fe"]]);var u=p}}]);
//# sourceMappingURL=759.81510a47.js.map