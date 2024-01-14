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
      I have completed my under graduation in Computer Science and Engineering from Maharaja Surajmal Institute of Technology in New Delhi. 
      I mostly engage in Backend Development with a satisfactory knowledge of frontend frameworks. 
      I am a keen learner ready to learn new and exciting technologies. 
      I have worked on tech stacks like Node.js , Nest.js , Express.js , and react.js
    </motion.p>

  </>
  )
}

export default SectionWrapper(About, "about");