export default function useAssets(asset: string): string | undefined {
  const assets = import.meta.glob<{default: string}>(['/assets/*/*/*'], { eager: true });

  const getAssetUrl = () => {
    if (assets[asset]) {
      return assets[asset].default
    }
  }

  return getAssetUrl()
}