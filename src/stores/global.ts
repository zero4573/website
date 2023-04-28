export const useGlobalStore = defineStore(
  'global-store',
  {
    state: () => (
      {
        theme: localStorage.theme || 'system',
        isLoading: false,
      }
    ),
    getters: {
      isDarkTheme() {
        let mediaIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (this.theme === 'dark' || (this.theme === 'system' && mediaIsDark)) {
          return true
        }

        return false
      },
    },
    actions: {
      toggle() {
        if (this.theme === 'light') {
          this.theme = 'dark'
        }
        else if (this.theme === 'dark') {
          this.theme = 'system'
        }
        else {
          this.theme = 'light'
        }

        localStorage.theme = this.theme
      },
      setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading
      }
    },
  }
)