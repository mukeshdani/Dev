import React from 'react'
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
    >
      I am a Software Engineer with over 2+ years of hands-on experience in full stack development, specializing in backend technologies.
      I graduated with a degree in Computer Science and Engineering from Maharaja Surajmal Institute of Technology in New Delhi. 
      My expertise lies in integrating complex systems, optimizing performance, and developing robust APIs.
      I’ve also worked on agentic AI systems and intelligent chatbots to automate workflows and enhance user interaction.
    </motion.p>

  </>
  )
}

export default SectionWrapper(About, "about");