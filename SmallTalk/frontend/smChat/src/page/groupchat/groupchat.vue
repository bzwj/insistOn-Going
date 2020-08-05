<template>
	<div class="content">
		<div class="msglist">
			<grouplist></grouplist>
		</div>
		<div class="chatbox">
			<groupmessage></groupmessage>
			<groupText></groupText>
		</div>
	</div>
</template>

<script>
// import search from '../../components/search/search'
import grouplist from '../../components/grouplist/grouplist'
import groupmessage from '../../components/groupmessage/groupmessage'
import groupText from '../../components/grouptext/grouptext'
export default {
   components: {
   	//  search,
   	 grouplist,
   	 groupmessage,
   	 groupText
   }
}
</script>

<style lang="stylus" scoped>
.content
  display: flex
  width: 800px
  .msglist
    width: 250px
    background: rgb(230,230,230)
  .chatbox
    flex: 1
</style>
