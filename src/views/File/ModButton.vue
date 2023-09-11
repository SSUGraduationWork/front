<template>
    <div class ="modification">
        <div class = "options">
            <div class = "mod">
                <div>
                    <i class="fi fi-rr-pencil"></i>
                </div>
                <div>
                    <span>
                  <button type="submit" class="submit-button" @click="goToUpdatePage(memberId, boardId,teamId)">수정</button>
                    </span>
                </div>
            </div>
            <div class = "delete">
            </div>
        </div>
    </div>

</template>
<script>
export default {
props: ['boardId','memberId','teamId'],

methods: {
  goToUpdatePage() {
    this.$router.push({ name: 'UpdatePage', params: { memberId: this.memberId, boardId: this.boardId ,teamId: this.teamId} });
  },
}
}
</script>
<style scoped>
.modification{
    position: absolute;
    right: 20px;
    width: 150px;
}
.options{
    margin-right: 100px;
    border: 1px solid black;
    width: 150px;
    height: 120px;
    background-color: white;
}
</style>