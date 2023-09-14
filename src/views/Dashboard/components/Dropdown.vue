<template>
    <div class="dropdown">
      <div class = "dropdown-label">학기</div>
      <button @mouseenter="Dropdown" @mouseleave = "closeDropdown" class="dropdown-button">
        <div class = "selected-content">
          {{ selectedOption }}
        </div>
        <div class = "icon"><i class="fi fi-rr-caret-down"></i></div>
      </button>
      <ul v-show="isOpen" class="dropdown-list" @mouseenter="openDropdown" @mouseleave="closeDropdown">
        <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </template>
  
  
  
  <script>
  export default {
  
    mounted() {
      this.selectedOption = this.initialWorkName ? this.initialWorkName : "전체";
    },
    data() {
      return {
        isOpen: false,
        selectedOption: '전체',
        options: ['전체', '2022-1', '2022-2', '2023-1', '2023-2', '2024-1', '2024-2', '2025-1', '2025-2'],
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
        this.selectedOption = option;
        // 선택한 작업의 workId를 부모 컴포넌트로 전달
        this.$emit('selected', option);
        this.isOpen = false;
      },
      Dropdown() {
        this.isOpen = !this.isOpen;
      }
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
    position: relative;
    z-index: 1; /* 다른 요소보다 위에 나타나도록 설정 */
  }
  
  .dropdown-button {
    border-radius: 7px;
    width: 150px;
    height: 37px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    color: black;
    background-color: white;
  }
  .icon{
    float: right;
    width: 20px;
    margin-top: 0.5px;
  }
  .selected-content{
    float: left;
    margin-left: 7px;
    width: 100px;
    height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap;
    text-align: left;
    font-weight: 600;
  }
  .dropdown-list {
    width: 150px;
    top: 100%; /* 선택된 옵션 아래에 배치 */
    left: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: var(--sidebar-bg-color);
    border: 1px solid var(--sidebar-bg-color);
    border-radius: 6px;
    white-space: nowrap;
    overflow-x: auto;
    z-index: 1;
    min-width: 100%; /* 최소 너비를 버튼과 같게 설정 */
    box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
    overflow-y: auto; /* 세로 스크롤 적용 */
    max-height: 150px;
    position: absolute;
  }
  
  .dropdown-list li {
    height: 30px;
    margin-left: 3px;
    line-height: 30px;
    font-weight: 600;
    font-size: 14px;
    padding: 5px; /* 더 작은 패딩값으로 조정 */
    padding-left: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: black; 
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .dropdown-list li:hover {
    background-color: #f0f0f0;
  }
  .dropdown-label{
    font-size: 12px;
    font-weight: 500;
    color: #777777;
    margin-left: 13px;
  }
  </style>
  