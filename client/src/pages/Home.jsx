import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import { state } from "../store";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text text-white">
                LET'S
                <br className="xl:block hidden" />
                DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-white text-base">
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style.
              </p>

              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyles=" px-4 py-2.5 font-bold text-sm"
              />
              <CustomButton
                type="filled"
                title="Back To Store"
                handleClick={() => navigate("/home")}
                customStyles=" px-4 py-2.5 font-bold text-sm text-white "
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;