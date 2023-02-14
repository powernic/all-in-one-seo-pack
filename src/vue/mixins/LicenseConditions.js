import { mapGetters } from 'vuex'

export const LicenseConditions = {
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		shouldShowLite () {
			return this.isUnlicensed
		}
	},
	methods : {
		shouldShowMain (sectionSlug, feature) {
			return !this.isUnlicensed && this.$license.hasCoreFeature(sectionSlug, feature)
		},
		shouldShowUpgrade (sectionSlug, feature) {
			return !this.isUnlicensed && !this.$license.hasCoreFeature(sectionSlug, feature)
		}
	}
}