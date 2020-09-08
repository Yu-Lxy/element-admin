import defaultSettings from '@/plugins/settings'

const title = defaultSettings.title || 'vue-cherrs-admin'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
