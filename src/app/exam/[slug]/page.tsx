import NavBar from "@/app/components/NavBar";
import Image from "next/image";

export default function ExamUi({ params }: { params: { slug: string } }) {
  return (
    <>
      <NavBar />

      {/* candidate info */}
      <div className="px-52 py-2 border">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-4">
            <Image
              src={"/default_user.png"}
              height={100}
              width={100}
              alt="user pfp"
              className="shadow-none"
            />
            <div className="flex flex-col">
              <h1>Candidate Name</h1>
              <h1>Exam Name</h1>
              <h1>Subject Name</h1>
              <h1>Remaining Time</h1>
            </div>
            <div className="text-orange-600 font-bold">
              <h1>:Name</h1>
              <h1>:{params.slug}</h1>
              <h1>:418634_BTECH 9th jan 2024 Shift 2</h1>
              <h1>:Time</h1>
            </div>
          </div>
        </div>
      </div>

      {/* exam panel */}
      <div className="px-52 py-2">
        {/* questions pane */}
        <div className="w-3/5 overflow-scroll overscroll-contain">
          <h1 className="border-b-2 border-black">Question 1</h1>
          <Image
            src={"/questions/q1.jpg"}
            height={300}
            width={300}
            alt="q1"
            className="border-b-2 border-black mb-4"
          />
          <form
            method="POST"
            action="https://www.formbackend.com/f/664decaabbf1c319"
          ></form>
          <div className="flex justify-start gap-24">
            <label htmlFor="">
              1.
              <input type="radio" name="" id="" />
            </label>

            <label htmlFor="">
              2.
              <input type="radio" name="" id="" />
            </label>

            <label htmlFor="">
              3.
              <input type="radio" name="" id="" />
            </label>

            <label htmlFor="">
              4.
              <input type="radio" name="" id="" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
