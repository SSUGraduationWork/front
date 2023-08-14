
<template>
    <div class = "all">
        <MultiSelect v-model="selectedCountries" :options="countries" filter optionLabel="name" placeholder="Select Countries " display="comma" closeIcon = "false" 
        v-on:before-show="reset" v-on:before-hide = "lastStatus" :maxSelectedLabels="1" showToggleAll=false emptyFilterMessage=" " class="multi-select">
            <template #value>
                <div v-if="status == -1">
                    <div v-for="(a,i) in selectedCountries" :key="i" class = "values">
                        <img class = "user-img" src="https://lh3.googleusercontent.com/a/AAcHTtfBzWtoD5mKMGXRaZn0xV3VQH6feUTAVXXGwzKoAgc-=s96-c" />
                        <span class = "user-name">{{ a.name }}</span>
                    </div>
                </div>
            </template>
            <template #filtericon>
                <div class = "filter-icon">
                    <i class="fi fi-rr-search"></i>
                </div>
            </template>
            <template #option="slotProps">
                <div class="options">
                    <img class = "option-img" src="https://lh3.googleusercontent.com/a/AAcHTtfBzWtoD5mKMGXRaZn0xV3VQH6feUTAVXXGwzKoAgc-=s96-c" />
                    <div class = "option-name">{{ slotProps.option.name }}</div>
                </div>
            </template>
            <template #empty>

            </template>
        </MultiSelect>
    </div>
</template>

<script setup>
import "primevue/resources/primevue.min.css"; //core CSS
import { ref, computed } from "vue";
import MultiSelect from 'primevue/multiselect';

const selectedCountries = ref();
const countries = ref([
    { name: '20202971 박윤혜', code: 'AU' },
    { name: '20201234 홍길동', code: 'BR' },
    { name: '20202222 김땡땡', code: 'CN' },
    { name: '20202345 박땡땡', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);
let status = 1;
let value = 0;
let lastValue = 0;

const reset = () => {
    console.log("hi")
    status = 1;
}

let updateValue = (selectedCountries) => {
    status = 0;
    if(selectedCountries) {
        value = selectedCountries.length;
        console.log(value + " ongoing");
    }
}
let lastStatus = () => {
    console.log("bye");
    status = -1;
    lastValue = value;
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');

* {
    --dp-font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    font-size: 15px;
}

img{
    width: 30px;
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
    background : #F5F6FA; 
}
.p-multiselect{
    width: 100%;
    padding: 10px;
}
.values{
    min-width: 180px;
    height: 40px;
    padding: 2px;
}
.options{
    width: 100%;
    height: 40px;
}
.option-img{
    float: left;
    margin-top: 5px;
    margin-left: 15px;
}
.option-name{
    float: left;
    margin-top: 11px;
    margin-left: 15px;
}
.user-name{
    float:left;
    margin-left: 14px;
    margin-top: 6px;
}
.user-img{
    float:left;
    margin-left: 14px;
    margin-top: 2px;
}
.filter-icon{
    cursor: pointer;
    margin-left: 2px;
    border: 1px solid black;
    height: 30px;
    width: 30px;
    border-radius: 5px;;
    display: flex;
    background-color: black;
}
.filter-icon i{
    color: white;
   justify-content: center;
   margin-top: 5px;
   margin-left: 4px;

}
label{
    width: 15px;
    height: 15px;
    border: 1px solid black;
    border-radius: 5px;
    display: inline-block;
    cursor: pointer;
}
</style>