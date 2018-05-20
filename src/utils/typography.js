import Typography from 'typography'
import lincolnTheme from 'typography-theme-lincoln'
import Config from '../../gatsby-config'

lincolnTheme.bodyColor = Config.siteMetadata.colors.foreground
lincolnTheme.headerColor = Config.siteMetadata.colors.aqua

const typography = new Typography(lincolnTheme)

export default typography
