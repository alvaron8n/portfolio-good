import { Hero } from '../sections/Hero'
import { SocialProof } from '../sections/SocialProof'
import { About } from '../sections/About'
import { Services } from '../sections/Services'
import { FeaturedProjects } from '../sections/FeaturedProjects'
import { CTA } from '../sections/CTA'

export function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <About />
      <Services />
      <FeaturedProjects />
      <CTA />
    </>
  )
}
