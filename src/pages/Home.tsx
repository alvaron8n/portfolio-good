import { Hero } from '../sections/Hero'
import { WhatIDo } from '../sections/WhatIDo'
import { ForWho } from '../sections/ForWho'
import { HowIWork } from '../sections/HowIWork'
import { WhatMakesMeDifferent } from '../sections/WhatMakesMeDifferent'
import { FeaturedProjects } from '../sections/FeaturedProjects'
import { CTA } from '../sections/CTA'

export function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <ForWho />
      <HowIWork />
      <WhatMakesMeDifferent />
      <FeaturedProjects />
      <CTA />
    </>
  )
}
