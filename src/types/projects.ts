export interface Project {
  title: string
  link: string
  logo?: string
  logoAlt?: string
  type: 'grid' | 'video'
  images?: string[]
  video?: string
}
