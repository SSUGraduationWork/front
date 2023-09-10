<template>
  <div class="dropdown2">
    <button @mouseenter="openDropdown" @mouseleave="closeDropdown" class="dropdown-button2">{{ selectedOption }}<i class="fi fi-rr-angle-small-down"></i></button>
    <ul v-show="isOpen" class="dropdown-list2" @mouseenter="openDropdown" @mouseleave="closeDropdown">
      <li v-for="(option, index) in options" :key="index" @click="selectOption(index)">
        {{ option }}
        <div class  = "status-icon">
            <i
              :class="{'fa-solid fa-circle text-green':  index === 1, 'fa-solid fa-circle text-red': index === 2,'fa-solid fa-circle text-gray': index === 3}"
          ></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
  },

  data() {
    return {
      isOpen: false,
      selectedOption: '전체',
      // options 데이터를 배열로 변경하고 각각 다른 값을 가지도록 수정
      options: ['전체','남은 피드백', '완료한 피드백','내가 쓴 글'],
    };
  },
  methods: {
    openDropdown() {
      this.isOpen = true;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    selectOption(index) {
      // 선택된 인덱스를 기반으로 옵션을 선택합니다.
      this.selectedOption = this.options[index];
      this.isOpen = false;

      // 선택한 작업의 index를 부모 컴포넌트로 전달
      this.$emit('selected', index);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
}
.dropdown2 {

  display: inline-block;

  position: absolute;
  z-index: 1; /* 다른 요소보다 위에 나타나도록 설정 */
}

.dropdown-button2 {
  border-radius: 7px;
  width: 140px;
  height: 37px;
  background-color: #F5F6FA;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin: 0 auto;
  font-size: 14px;
}

.dropdown-list2 {

  top: 100%; /* 선택된 옵션 아래에 배치 */
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color:#F5F6FA;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  white-space: nowrap;
  overflow-x: auto;
  z-index: 1;
  min-width: 100%; /* 최소 너비를 버튼과 같게 설정 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
  overflow-y: auto; /* 세로 스크롤 적용 */
}

.dropdown-list2 li {
  height: 23px;
  font-weight: 600;
  font-size: 14px;
  padding: 5px; /* 더 작은 패딩값으로 조정 */
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-list2 li:hover {
  background-color: #f0f0f0;
}
.fi-rr-angle-small-down{
  float: right;
  margin-right: 10px;
  margin-top: 2px;
}

.text-green {
  color: #99CC8C; /* 초록색으로 설정 */
  font-size: 13px;
}

.text-red {
  color: #EE6C6C; /* 빨간색으로 설정 */
  font-size: 13px;
}
.text-gray{
  color: #BABABA;
  font-size: 13px;
}
li{
  text-align: center;
}
.status-icon{
  float: right;
  margin-right: 12px;
}
</style>
