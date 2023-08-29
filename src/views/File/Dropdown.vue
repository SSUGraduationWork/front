<template>
  <div class="dropdown">
    <button @mouseenter="openDropdown" @mouseleave="closeDropdown" class="dropdown-button">{{ selectedOption }}<i class="fi fi-rr-angle-small-down"></i></button>
    <ul v-show="isOpen" class="dropdown-list" @mouseenter="openDropdown" @mouseleave="closeDropdown">
      <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
        {{ option }}
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
      options: ['전체','피드백', '피드백']
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
  position: relative;
  display: inline-block;
}

.dropdown-button {
  border-radius: 7px;
  width: 120px;
  height: 37px; 
  background-color: #F5F6FA;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin: 0 auto;
  font-size: 14px;
}

.dropdown-list {
  position: absolute;
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

.dropdown-list li {
  padding: 5px; /* 더 작은 패딩값으로 조정 */
  cursor: pointer;
  height: 23px;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.2s;
}

.dropdown-list li:hover {
  background-color: #f0f0f0;
}
.fi-rr-angle-small-down{
  float: right;
  margin-right: 10px;
  margin-top: 2px;
}
</style>
