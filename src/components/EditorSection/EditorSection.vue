<template>
  <div class="editor-content" v-html="renderContent"></div>
</template>
<script>
export default {
  name: 'EditorSection',
  props: {
    renderContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  }
};

</script>
<style scoped>
.editor-content{
  line-height: normal;
    box-sizing: border-box;
    overflow: hidden;
}
.editor-content >>> p{
  /*margin: 0;
  color: #333;*/
}
.editor-content >>> img{
  max-width: 100%;
  height: auto;
}
/*
.editor-content >>>  ul{
  list-style-type:disc; 
  list-style-position:inside;
}
.editor-content >>>  ol{
  list-style-type:decimal; 
  list-style-position:inside;
}*/
</style>
