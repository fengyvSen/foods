<template>
	<view>
		<view class="nav-bar">
			<veiw class="search-bar">
				<u--input :value="searchStr" disabled disabledColor="#eee" placeholder="家常菜" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399">
				</u--input>
			</veiw>
			<view class="cancel-btn" @click="goBack">
				取消
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchStr:'',
			};
		}
	}
</script>

<style lang="scss">

</style>
