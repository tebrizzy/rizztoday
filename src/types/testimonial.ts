export interface Testimonial {
  id: string
  name: string
  title: string
  pfp: string
  badge: string
  quote: string
  job: {
    type: string
    logo: string
    text: string
    duration?: string
    ongoing?: boolean
  }
}
