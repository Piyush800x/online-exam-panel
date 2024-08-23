export default function Instructions() {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md mt-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">
          GENERAL INSTRUCTIONS
        </h1>
        <h2 className="text-lg text-center font-semibold mb-4 text-red-500">
          Please read the instructions carefully
        </h2>
        <div className="text-left">
          <h3 className="text-lg font-bold">General Instructions:</h3>
          <ol className="list-decimal list-inside ml-4">
            <li>Total duration of the exam is 90 min.</li>
            <li>
              The clock will be set at the server. The countdown timer in the
              top right corner of the screen will display the remaining time
              available for you to complete the examination. When the timer
              reaches zero, the examination will end by itself. You will not be
              required to end or submit your examination.
            </li>
            <li>
              The Questions Palette displayed on the right side of the screen
              will show the status of each question using one of the following
              symbols:
              <ol className="list-none ml-8">
                <li>
                  <span className="inline-block w-4 h-4 bg-gray-200 border border-gray-500"></span>{" "}
                  You have not visited the question yet.
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-red-500 border border-red-700"></span>{" "}
                  You have not answered the question.
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-green-500 border border-green-700"></span>{" "}
                  You have answered the question.
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-purple-500 border border-purple-700"></span>{" "}
                  You have not answered the question, but have marked the
                  question for review.
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-blue-500 border border-blue-700"></span>{" "}
                  The question(s) &quot;Answered and Marked for Review&quot; will be
                  considered for evaluation.
                </li>
              </ol>
            </li>
            <li>
              You can click on the arrow which appears to the left of the
              question palette to collapse the question palette thereby
              maximizing the question window. To view the question palette
              again, you can click on
            </li>
            <li>
              You can click on your &quot;Profile&quot; image on the top right corner of
              your screen to change the language during the exam for the entire
              question paper. On clicking of Profile image you will get a
              drop-down to change the question content to the desired language.
            </li>
            <li>
              You can click on{" "}
              <span className="inline-block text-blue-500">&#8595;</span> to
              navigate to the bottom and{" "}
              <span className="inline-block text-blue-500">&#8593;</span> to
              navigate to the top of the question area, without scrolling.
            </li>
          </ol>
        </div>
      </div>
    )
}