<template>
  <div class="dropdown">
    <button @mouseenter="openDropdown" @mouseleave="closeDropdown" class="dropdown-button">{{ selectedOption }}<i class="fi fi-rr-angle-small-down"></i></button>
    <ul v-show="isOpen" class="dropdown-list" @mouseenter="openDropdown" @mouseleave="closeDropdown">
      <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
        {{ option.workName }}
      </li>
    </ul>
  </div>
</template>



<script>
export default {
  props: {
    options: Array,
   initialWorkName: null,
  },

  mounted() {
    this.selectedOption = this.initialWorkName ? this.initialWorkName : "선택";
  },
  data() {
    return {
      isOpen: false,
      selectedOption: '전체',
    };
  },
  methods: {
    openDropdown() {
      this.isOpen = true;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    selectOption(option) {
      this.selectedOption = option.workName;
      this.isOpen = false;

      // 선택한 작업의 workId를 부모 컴포넌트로 전달
      this.$emit('selected', option.workId);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
}
.dropdown {

  display: inline-block;
  margin-top: 100px;
  margin-left: 400px;
  position: absolute;

}

.dropdown-button {
  border-radius: 7px;
  width: 120px;
  height: 37px;
  background-color: #3772FF;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin: 0 auto;
  font-size: 14px;
  color: white; /* 글자 색상을 흰색으로 설정 */
}

.dropdown-list {

  top: 100%; /* 선택된 옵션 아래에 배치 */
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #3772FF;
  border: 1px solid #3772FF;
  border-radius: 6px;
  white-space: nowrap;
  overflow-x: auto;
  z-index: 1;
  min-width: 100%; /* 최소 너비를 버튼과 같게 설정 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
  overflow-y: auto; /* 세로 스크롤 적용 */
}

.dropdown-list li {
  height: 23px;
  font-weight: 600;
  font-size: 14px;
  padding: 5px; /* 더 작은 패딩값으로 조정 */
  cursor: pointer;
  transition: background-color 0.2s;
  color: white; /* 글자 색상을 흰색으로 설정 */
}

.dropdown-list li:hover {
  background-color: #3772FF;
}
.fi-rr-angle-small-down{
  float: right;
  margin-right: 10px;
  margin-top: 2px;
}
</style>
