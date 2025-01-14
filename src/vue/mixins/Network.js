import { mapState } from 'vuex'
import { arrayDiff } from '@/vue/utils/helpers'
export const Network = {
	computed : {
		...mapState([ 'networkData' ]),
		getSites () {
			return JSON.parse(JSON.stringify(this.networkData.sites.sites))
		},
		getSitesIds () {
			return Array.from(this.getSites, site => this.getUniqueSiteId(site))
		},
		inactiveSitesIds () {
			return arrayDiff(this.getSitesIds, this.activeSitesIds)
		},
		activeSitesIds () {
			const ids = []

			this.getSites.forEach(s => {
				if (this.networkData.activeSites.some(as => as.domain === s.domain && as.path === s.path)) {
					ids.push(this.getUniqueSiteId(s))
				}
			})

			return ids
		}
	},
	methods : {
		getUniqueSiteId (site) {
			return `${site.blog_id}_${site.domain}_${site.path}`
		},
		getMainSite () {
			let mainSite = null
			this.getSites.forEach(site => {
				if (this.isMainSite(site.domain, site.path)) {
					mainSite = site
				}
			})

			return mainSite
		},
		isMainSite (domain, path) {
			return (this.$aioseo.urls.mainSiteUrl + '/').includes(`${(this.$aioseo.data.isSsl ? 'https' : 'http')}://${domain}${path}`)
		},
		getSiteByDomainAndPath (domain, path) {
			return this.getSites.find(s => s.domain === domain && s.path === path)
		},
		getSiteByUniqueId (uniqueSiteId) {
			return this.getSites.find(s => this.getUniqueSiteId(s) === uniqueSiteId)
		},
		getActiveSiteByUniqueId (uniqueSiteId) {
			const site = this.getSiteByUniqueId(uniqueSiteId)
			if (site) {
				return this.networkData.activeSites.find(s => s.domain === site.domain && s.path === site.path)
			}

			return null
		},
		isSiteActive (site) {
			return this.activeSitesIds.includes(this.getUniqueSiteId(site))
		},
		parseSiteValue (sites) {
			const parsedSites = []
			sites.forEach(uniqueSiteId => {
				parsedSites.push(this.getSiteByUniqueId(uniqueSiteId))
			})

			return parsedSites
		}
	}
}