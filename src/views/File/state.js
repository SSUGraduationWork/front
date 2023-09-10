import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 400 //180
export const SIDEBAR_WIDTH_COLLAPSED = 60//38
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)
export const SIDEBAR_HEIGHT = '61.5' + 'vh';
export const SIDEBAR_COLLAPSED = '70' + 'px';
export const sidebarHeight = computed(
  () => `${collapsed.value ? SIDEBAR_COLLAPSED : SIDEBAR_HEIGHT}`
)