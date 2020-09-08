<!-- <template>
	<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
    <el-button>上左</el-button>
  </el-tooltip>
</template> -->

<script>
import { cutStrByFullLength, getStrFullLength } from '@/components/_util/util'

export default {
	name: 'Ellipsis',
	props: {
		tooltip: {
      type: Boolean
    },
    length: {
      type: Number,
      required: true
    }
	},
	created() {

	},
	methods: {
		getStrDom (str, fullLength) {
      return (
        <span>{ cutStrByFullLength(str, this.length) + (fullLength > this.length ? '...' : '') }</span>
      )
    },
    getTooltip (fullStr, fullLength) {
      return (
      	<div class="cheers-ellipsis">
				  <el-tooltip class="item" effect="dark" content={ fullStr } placement="top-start">
						{ this.getStrDom(fullStr, fullLength) }
				  </el-tooltip>
				</div>
      )
    }
	},
	render () {
		const { tooltip, length } = this.$props
    const str = this.$slots.default.map(vNode => vNode.text).join('')
    const fullLength = getStrFullLength(str)
    const strDom = tooltip && fullLength > length ? this.getTooltip(str, fullLength) : this.getStrDom(str, fullLength)
		return (
      strDom
    )
	}
}
</script>
<style lang="scss" scoped>
/deep/.el-tooltip__popper{
	max-width: 50%;
}
</style>