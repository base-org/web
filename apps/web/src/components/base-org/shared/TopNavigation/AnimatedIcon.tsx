import React from 'react';
import { motion } from 'framer-motion';

const AnimatedIcon = ({
  icon = '',
  duration = 1200,
  delay = 0,
  easing = [0.76, 0, 0.24, 1], // quartInOut
  scaleEasing = [0.55, 0, 0.45, 1], // quadInOut
  startScale = 1.2,
}) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  const svgVariants = {
    hidden: { scale: startScale, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const getIcon = () => {
    switch (icon) {
      case 'Build':
        return (
          <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: duration / 1000, delay: delay / 1000, ease: scaleEasing }}
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration - 50) / 1000, delay: delay / 1000, ease: easing }}
              d="M0 44.1851H32.5663"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 50) / 1000, ease: easing }}
              d="M86.3714 44.1851H53.8052"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 40) / 1000, ease: easing }}
              d="M0 2.06152H32.5663"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration - 80) / 1000, ease: easing }}
              d="M86.3714 2.06152H53.8052"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M0 85.6011H32.5663"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 20) / 1000, delay: delay / 1000, ease: easing }}
              d="M86.3714 85.6011H53.8052"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration - 105) / 1000, delay: delay / 1000, ease: easing }}
              d="M59.4688 65.4243H26.9026"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration - 80) / 1000, delay: delay / 1000, ease: easing }}
              d="M59.4688 23.6543H26.9026"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
          </motion.svg>
        );
      case 'Explore':
        return (
          <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M43.1858 0V32.5663"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 50) / 1000, delay: delay / 1000, ease: easing }}
              d="M12.6479 12.6475L35.678 35.6775"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 100) / 1000, delay: delay / 1000, ease: easing }}
              d="M0 43.1855H32.5663"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 150) / 1000, delay: delay / 1000, ease: easing }}
              d="M12.6479 73.7234L35.678 50.6934"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 100) / 1000, delay: delay / 1000, ease: easing }}
              d="M43.1858 86.3709V53.8047"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 50) / 1000, delay: delay / 1000, ease: easing }}
              d="M73.7236 73.7234L50.6936 50.6934"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M86.3714 43.1855H53.8052"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M73.7236 12.6475L50.6936 35.6775"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
          </motion.svg>
        );
      case 'Community':
        return (
          <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
            width="85"
            height="85"
            viewBox="0 0 85 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M60.1349 65.3755H24.5767"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M60.1349 19.7681H24.5767"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 70) / 1000, ease: easing }}
              d="M65.1597 24.793V60.3512"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M19.5522 24.793V60.3512"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M37.2347 83.9275L1 47.6929"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration - 30) / 1000, ease: easing }}
              d="M83.7117 37.4505L47.4771 1.21582"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 40) / 1000, ease: easing }}
              d="M83.7117 47.6929L47.4771 83.9275"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: (duration + 80) / 1000, ease: easing }}
              d="M37.2347 1.21582L1 37.4505"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
          </motion.svg>
        );
      case 'About':
        return (
          <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M43.1858 0V32.5663"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M0 43.1855H32.5663"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M43.1858 86.3709V53.8047"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M86.3714 43.1855H53.8052"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
          </motion.svg>
        );
      case 'Socials':
        return (
          <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
            width="86"
            height="86"
            viewBox="0 0 86 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M30.2454 1.83887H56.4051"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M5.01733 22.8017L23.5124 4.30273"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M2 55.4644V29.3047"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M22.9628 80.6923L4.46387 62.1934"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M55.6253 83.71H29.4656"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M55.6253 83.71H29.4656"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M80.8534 62.7471L62.3545 81.246"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M83.8711 30.0845V56.2442"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M62.908 4.85645L81.4069 23.3515"
              stroke="#B7B7B7"
              strokeWidth="2.72903"
              strokeMiterlimit="10"
            />
          </motion.svg>
        );
      case 'about2':
        return (
          <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
            width="69"
            height="69"
            viewBox="0 0 69 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M3.64893 3.64868L26.6767 26.6765"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M3.6488 64.7227L26.6766 41.6948"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M64.7226 64.7224L41.6948 41.6946"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M64.7226 3.64869L41.6948 26.6765"
              stroke="#B7B7B7"
              strokeWidth="2.47787"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M59.9777 67.2202H8.73413"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M59.9777 1.4917H8.73413"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M67.2202 8.73413V59.9777"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
            <motion.path
              variants={pathVariants}
              transition={{ duration: duration / 1000, delay: delay / 1000, ease: easing }}
              d="M1.4917 8.73413V59.9777"
              stroke="#B7B7B7"
              strokeWidth="2.70552"
              strokeMiterlimit="10"
            />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  return getIcon();
};

export default AnimatedIcon;
