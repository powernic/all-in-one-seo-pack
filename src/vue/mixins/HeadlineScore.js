export const HeadlineScore = {
	data () {
		return {
			strings : {
				weveGotWorkToDo : this.$t.sprintf(
					// Translators: 1 - HTML Line break tag.
					this.$t.__('We\'ve got some%1$swork to do!', this.$td),
					'<br>'
				),
				needsImprovement : this.$t.sprintf(
					// Translators: 1 - HTML Line break tag.
					this.$t.__('Needs%1$sImprovement!', this.$td),
					'<br>'
				),
				veryGood  : this.$t.__('Very Good!', this.$td),
				excellent : this.$t.__('Excellent!', this.$td)
			}
		}
	},
	computed : {
		description () {
			switch (true) {
				case 45 >= this.score:
					return this.strings.weveGotWorkToDo
				case 70 >= this.score:
					return this.strings.needsImprovement
				case 90 >= this.score:
					return this.strings.veryGood
				default:
					return this.strings.excellent
			}
		}
	}
}