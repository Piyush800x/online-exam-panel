import NavBar from "@/app/components/NavBar";
import Image from "next/image";

export default function ExamUi({ params }: { params: { slug: string } }) {
  const totalQuestions = 100;
  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);
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
      <div className="px-52 py-2 flex min-h-2">
        {/* questions pane */}
        <div className="w-3/5  justify-start border-l-2 border-t-2 border-b-2 border-black rounded-xl overflow-scroll overscroll-contain">
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
          <div className="flex justify-between align-center border-t-2 border-black pt-4 m-3 mt-5 gap-5">
            <button className="transition ease-in-out delay-75 bg-green-400 hover:-translate-y-1 hover:scale-80 hover:bg-green-500 duration-300 text-white font-bold py-2 px-4 rounded">
              Save & Next 
            </button>
            <button className="transition ease-in-out delay-75 bg-white hover:-translate-y-1 hover:scale-80 hover:bg-red-600  duration-300 text-black hover:text-white font-bold py-2 px-4 border-2 rounded">
              Clear
            </button>
            <button className="transition ease-in-out delay-75 bg-orange-300 hover:-translate-y-1 hover:scale-80 hover:bg-orange-400 duration-300 text-white font-bold py-2 px-4 rounded">
              Save & Mark for Review
            </button>
            <button className="transition ease-in-out delay-75 bg-blue-500  hover:-translate-y-1 hover:scale-80 hover:bg-blue-600 duration-300 text-white font-bold py-2 px-4 rounded">
              Mark for Review & Next
            </button>
          </div>
          <div className="bg-gray-200 flex justify-between align-center p-4 mt-5 gap-5 rounded-md">
            <div className="flex gap-2">
              <button className="transition ease-in-out delay-75 bg-white hover:-translate-x-2 hover:scale-80 hover:bg-stone-100 duration-300  backdrop-blur-50 backdrop-brightness-200 text-black font-bold py-2 px-4 rounded">
                {"<<"}Previous
              </button>
              <button className="transition ease-in delay-75 bg-white hover:translate-x-2 hover:scale-80 hover:bg-stone-100 duration-300  text-black font-bold py-2 px-4 rounded">
                Next{">>"}
              </button>
            </div>
            <div>
              <button className="transition ease-in delay-75 bg-green-400 hover:-translate-y-1 hover:scale-80 hover:bg-green-500 duration-300 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="pt-5 p-5 w-2/5 justify-end border-2 border-black rounded-lg shadow-sm">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="inline-block w-8 h-8 bg-gray-200 rounded-full text-center leading-8 mr-2">74</span>
              Not Visited
            </div>
            <div className="flex items-center mb-2">
              <span className="inline-block w-8 h-8 bg-orange-200 rounded-full text-center leading-8 mr-2">1</span>
              Not Answered
            </div>
            <div className="flex items-center mb-2">
              <span className="inline-block w-8 h-8 bg-green-200 rounded-full text-center leading-8 mr-2">0</span>
              Answered
            </div>
            <div className="flex items-center mb-2">
              <span className="inline-block w-8 h-8 bg-purple-200 rounded-full text-center leading-8 mr-2">0</span>
              Marked for Review
            </div>
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 bg-indigo-200 rounded-full text-center leading-8 mr-2">0</span>
              Answered & Marked for Review
              <br />
              (will be considered for evaluation)
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {questionNumbers.map((number) => (
              <button
                key={number}
                className="w-10 h-10 bg-gray-200 rounded text-center leading-10 hover:bg-gray-300"
              >
                {number < 10 ? `0${number}` : number}
              </button>
            ))}
          </div>
        </div>

              
      </div>
    </>
  );
}
