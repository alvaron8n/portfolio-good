import { Hero } from '../sections/Hero'
import { SocialProof } from '../sections/SocialProof'
import { WhatIDo } from '../sections/WhatIDo'
import { About } from '../sections/About'
import { Services } from '../sections/Services'
import { Fit } from '../sections/Fit'
import { ImmersiveWorkGrid } from '../sections/ImmersiveWorkGrid'
import { FeaturedProjects } from '../sections/FeaturedProjects'
import { CTA } from '../sections/CTA'

export function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <WhatIDo />
      <About />
      <Services />
      <Fit />
      <ImmersiveWorkGrid />
      <FeaturedProjects />
      <CTA />
    </>
  )
}
