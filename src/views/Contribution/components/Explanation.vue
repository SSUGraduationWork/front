<template>
    <div class="black-bg" @mousedown="handleBlackBgClick">
        <div class = "white-bg"  @mousedown="handleWhiteBgClick">
            <div class="header">
                <div class = "title">
                    <div>
                        <i class="fi fi-ss-thumbtack"></i>
                    </div>
                    <div>
                        <span>기여도 측정 방식</span>
                    </div>
                </div>
                <div class="close-icon" @mousedown="handleCloseClick"><i class="fi fi-sr-cross"></i></div>
            </div>
            <div class = "content">
                <p class = "exp">기여도는 작업 점수와 피드백 점수의 총합으로 계산됩니다.</p>
                <div class="work tag-sub">
                    <div>
                        <i class="fi fi-sr-tags"></i>
                    </div>
                    <div class = "tag-sub-content">
                        <span>작업 점수</span>
                    </div>
                </div>
                <p class="sub">작업 점수는 아래의 과정을 거쳐서 얻을 수 있습니다.</p>
                <ul>
                    <li>자신이 담당한 작업에 대한 결과물을 <span class = "tag tag-file">파일</span>에서 글쓰기를 통해 올립니다.</li>
                    <li>모든 팀원은 게시글에 대한 피드백을 남길 수 있는데, <span class = "tag">"수정 요청이 아닌 피드백"</span>을 남기면 해당 게시글을 <span class = "status allow">[수락]</span>한 상태가 되고, 
                        <span class = "tag">"수정 요청 피드백"</span>을 남기면 <span class = "status refuse">[거절]</span>한 상태가 됩니다.</li>
                    <li>본인을 제외한 모든 팀원들이 해당 게시글에 대해 <span class = "status allow">[수락]</span> 상태가 되면, 해당 작업은 <span class = "status done">[완료]</span> 상태가 되어 본인만 <span class = "tag">'작업 중요도'</span>만큼 점수를 획득하게 됩니다.</li>
                    <li>만약 팀원 중 한 명이라도 수정요청을 한 경우, 수정 요청을 반영해서 게시글을 수정해야 합니다. 
                        게시글을 수정하면 수정요청을 한 팀원에게 수정에 대한 [수락/거절]가 알림으로 전송되며, 모든 팀원이 <span class = "status allow">[승인]</span> 상태가 되기 전까지는 작업 점수가 부여되지 않습니다.</li>
                </ul>
                <div class="feedback tag-sub ">
                    <div>
                        <i class="fi fi-sr-tags"></i>
                    </div>
                    <div class = "tag-sub-content">
                        <span>피드백 점수</span>
                    </div>
                </div>
                <p class="sub">피드백 점수는 아래의 과정을 거쳐서 얻을 수 있습니다.</p>
                <ul>
                    <li>팀원들이 <span class = "tag tag-file">파일</span>에 올린 게시글에 피드백을 하면 수정요청 여부에 관계없이 피드백 점수 <span class="tag">1점</span>을 획득합니다.</li>
                    <li>게시글에 작성할 수 있는 피드백 개수에는 제한이 없으나, 피드백 점수는 각 게시글당 최대 1점까지 획득 가능합니다.</li>
                    <li>본인이 쓴 게시글에는 피드백을 작성해도 점수를 받을 수 없습니다.</li>
                </ul>

                <div class="caution tag-sub">
                    <div class = "caution-icon">
                        <span><i class="fi fi-ss-triangle-warning"></i></span>
                    </div>
                    <div class="tag-sub-content caution-span">
                        <span>주의사항</span>
                    </div>
                </div>
                <ul>
                    <li>작업 마감일 이전에 해당 작업에 대한 게시글을 올려야 작업 점수 전체를 획득할 수 있습니다.</li>
                    <li>작업 마감일이 지나고 <span class="tag">24시간 이내</span>에 게시글을 올린 경우, 작업 점수의 <span class="tag">절반</span>만큼만 획득할 수 있습니다. 
                        즉, <span class="tag">2023.08.03 00:00</span>이 마감일이었다면 <span class="tag">2023.08.04 00:00</span> 이전에 올려야 작업 점수를 절반이라도 받을 수 있습니다.</li>
                    <li>작업 마감일로부터 <span class="tag">24시간 이후</span>에 게시글을 올리는 경우 작업 점수를 받을 수 없습니다. 
                        즉, 위 예시에서 <span class="tag">2023.08.04 00:00</span> 이후부터 작업 점수는 <span class="tag">0점</span>입니다.</li>
                    <li>피드백을 할 수 있는 기한은 게시글이 올라온 후 <span class="tag">48시간 이내</span>입니다. 만약 48시간 이내에 피드백을 하지 않으면 
                        자동으로 <span class = "status allow">[수락]</span> 상태가 되고, 피드백 점수는 <span class = "tag">0점</span>이 됩니다.</li>
                    <li>하나의 게시글에 대한 수정요청은 한 사람당 <span class="tag">3번</span>까지 가능합니다. 이후부터는 자동으로 <span class = "status allow">[수락]</span> 상태가 되며, 
                        계속해서 수정 요청을 하더라도 작업의 <span class = "status done">[완료]</span> 여부에 영향을 끼치지 않습니다.</li>
                </ul>
                <!--
                <div class="example tag-sub">
                    <div class = "example-icon">
                        <span><i class="fi fi-sr-key"></i></span>
                    </div>
                    <div class="tag-sub-content example-span">
                        <span>예시</span>
                    </div>
                </div>
                <div>
                    <p>작업 담당자 중 한 명이라도 게시글을 올리면 작업은 <span class="status">[피드백]</span> 상태가 됩니다.</p>
                    <img class = "work-img" src="../../../assets/ex1.png">
                    <p>....</p>
                    <p>최종적으로 "홍길동"님은 2.5점을 획득하게 됩니다. ( 중요도(5) / 담당자 수(2) = 2.5 )</p>
                </div>
                -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(["closeEx", "openEx"]);
const handleWhiteBgClick = (event) => {
    event.stopPropagation();
    emit('openEx');
}
const handleBlackBgClick = () => {
    emit('closeEx');
}
const handleCloseClick = () => {
    emit('closeEx');
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
}
.black-bg{
  z-index: 15;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.3);
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
}
.white-bg{
  position: fixed;
  left: 0;
  right: 0;
  z-index: 20;
  width: 45em; background: white;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 65px;
  margin: 0 auto;
  margin-top: 4em;
  height: 40em;
  overflow: scroll;
}
.header{
    height: 70px;
}
.close-icon{
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    line-height: 42px;
    font-size: 15px;
    float: right;
}
.close-icon:hover{
    background-color:#F5F6FA;
}
.title{
    display: flex;
    float: left;
    height: 50px;
}
.title i {
    line-height: 55px;
    font-size: 23px;
    margin-right: 15px;
    color: #EA3A3A;
}
.title span{
    float: left;
    margin: 0px;
    line-height: 50px;
    font-weight: 700;
    font-size: 25px;
}
.tag{
    padding-right: 10px;
    padding-left: 10px;
    border-radius: 5px;
    background-color: #E1E1E1;
    font-weight: 600;
}
.content{
    text-align: left;
    font-size: 16.5px;
}
.sub{
    line-height: 80%;
}
.tag-sub{
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 17px;
    font-weight: 500;
    border-radius: 5px;
    background-color: #3772FF;
    color: white;
}
.tag-sub-content{
    margin-left: 33px;
}
.fi-sr-tags{
    margin-left: 9px;
    margin-top: 2px;
    float: left;
}
.exp{
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 40px;
}
li{
    margin-top: 12px;
    line-height: 150%;
}
.status{
    font-weight: 700;
}
.feedback{
    margin-top: 50px;
}
.caution,
.example{
    margin-top: 50px;
    background-color: #EE6C6C;
    display: flex;
    width: 103px;
    color: white;
}
.caution-icon,
.example-icon{
    line-height: 30px;
    margin-left: 9px;
    margin-top: 2px;
}
.caution-span,
.example-span{
    margin-left: 7px;
}
.work{
    width: 105px;
}
.example{
    background-color: #FABB18;
    width: 75px;
}
.work-img{
    width: 103%;
}
</style>