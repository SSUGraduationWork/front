<template>
  <div class="dropdown">
    <button @mouseenter="openDropdown" @mouseleave="closeDropdown" class="dropdown-button">{{ selectedOption }}</button>
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
  },
  data() {
    return {
      isOpen: false,
      selectedOption: 'Select an option',
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
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  padding: 2px; /* 더 작은 패딩값으로 조정 */
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
}

.dropdown-list {
  position: absolute;
  top: 100%; /* 선택된 옵션 아래에 배치 */
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  overflow-x: auto;
  z-index: 1;
  min-width: 100%; /* 최소 너비를 버튼과 같게 설정 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
  max-height: 150px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 적용 */
}

.dropdown-list li {
  padding: 5px; /* 더 작은 패딩값으로 조정 */
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-list li:hover {
  background-color: #f0f0f0;
}
</style>
