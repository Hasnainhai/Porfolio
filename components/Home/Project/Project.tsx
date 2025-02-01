import SectionHeading from "@/components/Helper/SectionHeading";
import { projectData } from "@/Data/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Project = () => {
  return (
    <div className="pt-16 pb-16 bg-[#050709]" id="project">
      <SectionHeading>My Projects</SectionHeading>
      <div className="w-[80%] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
        {projectData.map((project, i) => {
          return (
            <>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-delay={`${i * 150}`}
                key={project.id}
                className="bg-blue-950 p-6 rounded-lg hover:scale-105 transition-all duration-300"
              >
                <div className="mb-3 flex justify-between">
                  <h1 className="text-sm font-normal text-white">
                    {project.title}
                  </h1>

                  {/* <Link
                    className="text-white font-extralight"
                    href={project.url}
                    target="_blank"
                  >
                    Project Link
                  </Link> */}
                </div>
                <video style={{ height: "200px", width: "100%" }} controls>
                  <source src={`${project.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
