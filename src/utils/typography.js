import Typography from 'typography'
import githubTheme from 'typography-theme-github'
import Colors from './Colors'

githubTheme.bodyColor = Colors.foreground
githubTheme.headerColor = Colors.foreground

const typography = new Typography(githubTheme)

export const { scale, rhythm, options } = typography
export default typography
