<template>
    <div class="progress">
        <div class = "content">
            <p>전체 작업 :</p>
            <div class = "bar bar-yellow"><span>36</span></div>
        </div>
        <div class = "content">
            <p>진행중 :</p>
            <div class = "bar bar-blue"><span>4</span></div>
        </div>
        <div class = "content">
            <p>완료 :</p>
            <div class = "bar bar-purple"><span>32</span></div>
        </div>
    </div>
</template>
<script setup>


</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
  font-size:15px;
}
.bar{
    margin-left: 2px;
    width: 5px;
    height: 40px;
    border-radius: 3px;
}
.content{
    float: left;
    margin-left: 6em;
    margin-right: 8em;
}
.progress{
    height: 110px;
}
.bar span{
    line-height: 40px;
    margin-left: 20px;
    font-weight: 700;
    font-size: 20px;
}
.bar-yellow{
    background-color: #FABB18;
}
.bar-blue{
    background-color: #6C81CC;
}
.bar-purple{
    background-color: #BD86E9;
}
</style>