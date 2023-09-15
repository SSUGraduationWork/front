<template>
    <div class="dropdown">
      <button @click="Dropdown" v-click-outside = "closeDropdown" class="dropdown-button">
        <div class = "selected-content">
          {{ selectedOption }} 학기
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
  import vClickOutside from 'click-outside-vue3'
  export default {
    props: ['updateSemester'],
    directives : {
        clickOutside: vClickOutside.directive
    },
    mounted() {
      this.selectedOption = this.updateSemester;
      console.log(this.updateSemester);
    },
    data() {
      return {
        isOpen: false,
        selectedOption: this.updateSemester,
        options: ['2022-1', '2022-2', '2023-1', '2023-2', '2024-1', '2024-2', '2025-1', '2025-2'],
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
    border-bottom: 1px solid #ccc;
  }
  
  .dropdown-button {
    border-radius: 7px;
    width: 170px;
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
    font-size: 18px;
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
    font-weight: 500;
    text-align: center;
    margin-left: 28px;
  }
  .dropdown-list {
    width: 150px;
    top: 100%; /* 선택된 옵션 아래에 배치 */
    left: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 5px;
    background-color: var(--sidebar-bg-color);
    border: 1px solid var(--sidebar-bg-color);
    border-radius: 6px;
    white-space: nowrap;
    overflow-x: auto;
    z-index: 1;
    min-width: 100%; /* 최소 너비를 버튼과 같게 설정 */
    box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
    overflow-y: auto; /* 세로 스크롤 적용 */
    max-height: 110px;
    position: absolute;
  }
  
  .dropdown-list li {
    height: 30px;
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
  